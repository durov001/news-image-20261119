// Entry point for the news-image-20261119 bounty.
//
// The entry itself is a single front-page image (entry.png) that lives
// in this repository. All this program does is copy those bytes into
// the harness output directory, untouched, so the judge receives the
// exact image that was committed.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The directory holding this script — the repository root at eval time.
const repoDir = dirname(fileURLToPath(import.meta.url));

// The harness tells us where to put our output. Fall back to /output
// when the variable is absent, matching the evaluation contract.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const source = join(repoDir, "entry.png");
const destination = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

// Guard against a truncated write: the copy must be exactly as long
// as the source, or the run fails loudly instead of shipping a
// half-written image.
if (statSync(source).size !== statSync(destination).size) {
  throw new Error("entry.png copy is incomplete");
}
