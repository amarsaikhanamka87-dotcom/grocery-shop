#!/usr/bin/env node
// PreToolUse hook: blocks Write/Edit that leave a code file over MAX_LINES lines.
// Existing over-limit files may still be edited as long as the edit does not grow them,
// so they can be split up gradually. Exit code 2 = block; stderr is shown to Claude.
import { existsSync, readFileSync } from "node:fs";

const MAX_LINES = 150;
const CODE_FILE = /\.(ts|tsx|js|jsx|mjs|cjs|css|prisma)$/;

const countLines = (text) => (text === "" ? 0 : text.split("\n").length - (text.endsWith("\n") ? 1 : 0));

const input = JSON.parse(readFileSync(0, "utf8"));
const { tool_name: tool, tool_input: args = {} } = input;
const file = args.file_path ?? "";
if (!CODE_FILE.test(file)) process.exit(0);

const before = existsSync(file) ? readFileSync(file, "utf8") : null;
let after;
if (tool === "Write") {
  after = args.content ?? "";
} else if (tool === "Edit") {
  if (before === null) process.exit(0);
  const { old_string: oldStr = "", new_string: newStr = "", replace_all: all } = args;
  after = all ? before.split(oldStr).join(newStr) : before.replace(oldStr, () => newStr);
} else {
  process.exit(0);
}

const newCount = countLines(after);
const oldCount = before === null ? 0 : countLines(before);
if (newCount <= MAX_LINES || newCount <= oldCount) process.exit(0);

process.stderr.write(
  `Blocked: ${file} would have ${newCount} lines (limit ${MAX_LINES}` +
    (before === null ? "" : `, currently ${oldCount}`) +
    `). Split it into smaller modules/components instead of growing one file.\n`,
);
process.exit(2);
