// @ts-check

import { flatConfig } from "@linkedmink/eslint-config";
import tsEslint from "typescript-eslint";

export default tsEslint.config(...flatConfig);
