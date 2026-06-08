// index.ts — Latin syntaxis bundle, compiled and ready to use.
import { load } from "@561-group/language-parsing/bundle";
import { rawBundle } from "./bundle.ts";

export { rawBundle } from "./bundle.ts";

/** Compiled Latin bundle — pass to articulate(), construe(), parse(). */
export const bundle = load(rawBundle);
export default bundle;
