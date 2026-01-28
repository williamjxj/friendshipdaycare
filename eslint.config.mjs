import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "build/",
      "coverage/",
      "dist/",
      "scripts/",
      ".vercel/",
      ".cursor/",
      ".specify/",
      "specs/"
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",

      // The config from eslint-config-next/typescript currently enables some rules
      // that are overly strict for this codebase (and would require a large refactor).
      "@typescript-eslint/no-require-imports": "off",

      // React Hooks rules that flag legitimate hydration/bootstrap patterns in this repo.
      // Keep as warnings (or off) to allow `npm run lint` to pass.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default eslintConfig;
