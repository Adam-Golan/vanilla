import { existsSync, mkdirSync, readdirSync, writeFileSync, lstatSync, readFileSync, rmSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { transpileModule, ModuleKind, ScriptTarget } from 'typescript';

// Get the directory name (ESM workaround)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Path Configs
const srcDir = resolve(__dirname, "../i18n");
const outputDir = resolve(__dirname, "../assets/lang");

if (existsSync(outputDir)) {
  const content = readdirSync(outputDir);
  for (const entity of content)
    rmSync(join(outputDir, entity), { recursive: true, force: true });
}

async function buildLanguages(dir) {
  // Reading directory.
  const files = readdirSync(dir);
  for (const file of files) {
    if (['interfaces', 'types', '.d.ts'].includes(file)) continue;
    // Recursively call the function for nested directories.
    if (lstatSync(join(dir, file)).isDirectory()) {
      await buildLanguages(join(dir, file));
    } else {
      const newDir = join(outputDir, dir.slice(dir.indexOf('i18n') + 5));
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
      writeFileSync(join(newDir, file.replace('.ts', '.js')), outputCode, "utf-8");
    }
  }
}

buildLanguages(srcDir).catch(console.error);
