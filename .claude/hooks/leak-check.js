#!/usr/bin/env node
// PreToolUse hook for personal-os.
//
// Two jobs:
//   1. Block direct Write/Edit on the PRIVATE strategy files. Troy edits these manually.
//   2. Scan outgoing Write/Edit content for leak signatures from the PRIVATE files.
//      Public-leaning destinations get a strict warning; internal destinations get a soft one.
//
// Exit codes:
//   0 -> allow (no issues found)
//   2 -> block + surface stderr to Claude (Claude must confirm with Troy before retrying)
//
// Signatures live in .claude/hooks/leak-signatures.txt, one per line.
// Lines starting with # are comments.

const fs = require("fs");
const path = require("path");

const HOOK_DIR = path.dirname(fs.realpathSync(__filename));
const SIGNATURES_FILE = path.join(HOOK_DIR, "leak-signatures.txt");

const PRIVATE_FILES = [
  "docs/comprehensive-long-term-plan.md",
  "docs/personal-long-term-plan-PRIVATE.md",
];

const PUBLIC_LEANING_FILES = [
  "docs/projects/wardforge.md",
  "docs/projects/substack.md",
  "README.md",
  "CLAUDE.md",
  "docs/ARCHITECTURE.md",
];

const PUBLIC_LEANING_DIRS = [
  "docs/notes/",
  "docs/goals/long-term/substack",
];

function loadSignatures() {
  try {
    const raw = fs.readFileSync(SIGNATURES_FILE, "utf8");
    return raw
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("#"));
  } catch (e) {
    // If the signatures file is missing, fall back to a small built-in list
    // and warn — but don't block.
    return [
      "NOT FOR WARDFORGE REPO",
      "personal-long-term-plan-PRIVATE",
      "comprehensive-long-term-plan",
    ];
  }
}

function isPrivate(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  return PRIVATE_FILES.some((p) => norm.endsWith(p) || norm.includes(`/${p}`));
}

function isPublicLeaning(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  if (PUBLIC_LEANING_FILES.some((p) => norm.endsWith(p) || norm.includes(`/${p}`))) {
    return true;
  }
  return PUBLIC_LEANING_DIRS.some((d) => norm.includes(d));
}

function findMatches(content, signatures) {
  const lower = content.toLowerCase();
  return signatures.filter((sig) => lower.includes(sig.toLowerCase()));
}

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    // Unparseable input — allow rather than risk false-blocking real work.
    process.exit(0);
  }

  const tool = payload.tool_name || "";
  const params = payload.tool_input || {};

  // Only check write-shaped tools.
  if (!["Write", "Edit", "MultiEdit", "create_file", "str_replace"].includes(tool)) {
    process.exit(0);
  }

  const filePath =
    params.file_path || params.path || params.filename || "";

  if (!filePath) {
    process.exit(0);
  }

  // 1. Hard block on writes to PRIVATE files
  if (isPrivate(filePath)) {
    process.stderr.write(
      `BLOCKED: ${filePath} is a PRIVATE strategy file.\n\n` +
        `Direct agent edits to PRIVATE files are blocked. Troy edits these manually.\n` +
        `If you have a specific update to propose, surface the proposed diff to Troy in chat\n` +
        `instead of writing it to disk.\n`
    );
    process.exit(2);
  }

  // 2. Leak-signature scan on outgoing content
  const content =
    params.content ||
    params.new_string ||
    params.file_text ||
    (params.edits ? params.edits.map((e) => e.new_string || "").join("\n") : "") ||
    "";

  if (!content) {
    process.exit(0);
  }

  const signatures = loadSignatures();
  const matches = findMatches(content, signatures);

  if (matches.length === 0) {
    process.exit(0);
  }

  // 3. Tier-aware escalation
  const publicLeaning = isPublicLeaning(filePath);
  const severity = publicLeaning ? "STRICT" : "SOFT";
  const matchList = matches.map((m) => `  - "${m}"`).join("\n");

  process.stderr.write(
    `LEAK SIGNATURE DETECTED [${severity}] in ${filePath}\n\n` +
      `Matches:\n${matchList}\n\n` +
      (publicLeaning
        ? `This file is public-leaning. Content from PRIVATE strategy docs\n` +
          `should NOT be paraphrased into it.\n\n` +
          `Surface this warning to Troy and confirm before proceeding. If Troy says go,\n` +
          `re-attempt the write — the hook will fire again, but with explicit approval\n` +
          `you can proceed.\n`
        : `Content appears to reference PRIVATE strategy material.\n\n` +
          `Surface this warning to Troy and confirm before proceeding.\n`)
  );
  process.exit(2);
});
