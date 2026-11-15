import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import oneLogicPerFile from "./eslint/one-logic-per-file.mjs";

// Pinebaatars standards: https://pinebaatars-stack.pineconegpt1.workers.dev/standards#eslint
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Must come after the presets: turns off rules that conflict with Prettier.
  prettier,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      eqeqeq: "error",
      "no-console": ["warn", { allow: ["error"] }],
      "prefer-const": "error",
      // Keep files small.
      "max-lines": ["error", { max: 150 }],
      // 1 file = 1 job: one React component and at most one class per file.
      "react/no-multi-comp": ["error", { ignoreStateless: false }],
      "max-classes-per-file": ["error", 1],
    },
  },
  // 1 file = 1 logic (see .claude/rules/one-file-one-job.md).
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      "src/components/ui/**", // shadcn-generated
      "src/types/**", // type-only
      "src/lib/constants.ts", // settings values, no logic
    ],
    plugins: { local: { rules: { "one-logic-per-file": oneLogicPerFile } } },
    rules: { "local/one-logic-per-file": "error" },
  },
  // The seed script is a CLI tool; logging progress is expected there.
  {
    files: ["prisma/**"],
    rules: { "no-console": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
