import { existsSync, mkdirSync, readdirSync, writeFileSync, lstatSync, readFileSync } from "fs";
import { resolve, dirname, join, basename } from "path";
import { fileURLToPath } from "url";
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';

// Get the directory name (ESM workaround)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Path Configs
const srcDir = resolve(__dirname, "../i18n");
const outputDir = resolve(__dirname, "../../dist/lang");

async function buildLanguages(dir) {
  // Reading directory.
  const files = readdirSync(dir);
  for (const file of files) {
    // Recursively call the function for nested directories.
    if (!['interfaces', 'types'].includes(file) && lstatSync(join(dir, file)).isDirectory()) {
      await buildLanguages(join(dir, file));
    } else {
      if (file === 'lang.ts') {
        const parentDir = basename(dir);
        const newDir = join(outputDir, parentDir);
        // Ensure output directory exists.
        if (!existsSync(newDir)) mkdirSync(newDir, { recursive: true });
        const inputCode = readFileSync(join(dir, file), { encoding: 'utf8' });
        // Transpile the code.
        const outputCode = transpileModule(inputCode, {
          compilerOptions: {
            module: ModuleKind.ESNext,
            target: ScriptTarget.ESNext,
            removeComments: true,
          }
        }).outputText;
        // Write the transpiled code to the output directory.
        writeFileSync(join(newDir, 'lang.js'), outputCode, "utf-8");
      }
    }
  }
}

buildLanguages(srcDir).catch(console.error);