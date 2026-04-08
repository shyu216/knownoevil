import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const katex = require("katex");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");
const SRC_DIR = join(PROJECT_ROOT, "src");

const errors = [];

function walkDir(dir) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          files.push(...walkDir(fullPath));
        } else if (extname(entry) === ".md") {
          files.push(fullPath);
        }
      } catch {}
    }
  } catch {}
  return files;
}

function parseFrontmatter(content) {
  if (!content.startsWith("---")) {
    return { attributes: {}, body: content };
  }

  const endIndex = content.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { attributes: {}, body: content };
  }

  const yamlContent = content.slice(4, endIndex);
  const body = content.slice(endIndex + 4);

  const attributes = {};
  const lines = yamlContent.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1);
      if (inner.includes('"')) {
        attributes[key] = inner.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      } else if (inner.includes("'")) {
        attributes[key] = inner.split(",").map((v) => v.trim().replace(/^'|'$/g, ""));
      } else if (inner.trim()) {
        attributes[key] = inner.split(",").map((v) => v.trim());
      } else {
        attributes[key] = [];
      }
    } else if (value === "true") {
      attributes[key] = true;
    } else if (value === "false") {
      attributes[key] = false;
    } else if (!isNaN(value) && value !== "") {
      attributes[key] = Number(value);
    } else {
      attributes[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { attributes, body };
}

function extractLatex(content) {
  const formulas = [];

  const blockRegex = /\$\$([\s\S]+?)\$\$/g;
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    const text = match[1];
    const dollarCount = (text.match(/\$\$/g) || []).length;
    if (dollarCount === 0) {
      formulas.push({ type: "block", text, index: match.index });
    }
  }

  const tempContent = content.replace(/\$\$[\s\S]+?\$\$/g, "");
  const inlineRegex = /\$([^\n$]+?)\$/g;
  while ((match = inlineRegex.exec(tempContent)) !== null) {
    const text = match[1];
    const dollarCount = (text.match(/\$/g) || []).length;
    if (dollarCount === 0) {
      formulas.push({ type: "inline", text, index: match.index });
    }
  }

  return formulas;
}

function validateLatex(latex, displayMode = false) {
  try {
    katex.renderToString(latex, {
      throwOnError: true,
      displayMode,
    });
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

function validateMarkdown(content, filePath) {
  const lines = content.split("\n");
  const relativePath = relative(SRC_DIR, filePath);

  try {
    const fm = parseFrontmatter(content);
    if (!fm.attributes || typeof fm.attributes !== "object") {
      errors.push({
        file: relativePath,
        line: 1,
        type: "frontmatter",
        message: "Missing or invalid frontmatter attributes",
      });
    }
  } catch (e) {
    errors.push({
      file: relativePath,
      line: 1,
      type: "frontmatter",
      message: `Frontmatter parse error: ${e.message}`,
    });
  }

  let inCodeBlock = false;
  let codeBlockLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      } else {
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) continue;

    if (line.match(/^:::/) || line.match(/^:::/)) {
      const containerMatch = line.match(/^:::\s*(\w+)/);
      if (containerMatch) {
        const container = containerMatch[1];
        const knownContainers = [
          "tip",
          "warning",
          "info",
          "danger",
          "details",
          "note",
          "caption",
          "quote",
          "stereotype",
        ];
        if (!knownContainers.includes(container)) {
          errors.push({
            file: relativePath,
            line: i + 1,
            type: "vuepress-container",
            message: `Unknown container: ${container}`,
          });
        }
      }
    }

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(line)) !== null) {
      const url = linkMatch[2];
      if (url.startsWith("http://")) {
        errors.push({
          file: relativePath,
          line: i + 1,
          type: "insecure-url",
          message: `Insecure HTTP URL: ${url}`,
        });
      }
    }

    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let imageMatch;
    while ((imageMatch = imageRegex.exec(line)) !== null) {
    }

    const vueComponentRegex = /<([A-Z][a-zA-Z]*)(?:\s|>|{)/g;
    let componentMatch;
    while ((componentMatch = vueComponentRegex.exec(line)) !== null) {
      const tagName = componentMatch[1];
      const knownComponents = [
        "PDF",
        "Badge",
        "Chart",
        "CodePen",
        "Font",
        "Img",
        "Video",
        "YouTube",
        "Audio",
        "Replit",
        "StackBlitz",
        "Style",
        "Link",
        "RouterLink",
        "ClientOnly",
        "Outbound",
        "Catalog",
        "PID",
      ];
      if (!knownComponents.includes(tagName) && !tagName.startsWith("V")) {
        errors.push({
          file: relativePath,
          line: i + 1,
          type: "unknown-component",
          message: `Unknown Vue component: <${tagName}>`,
        });
      }
    }

    const tagMatch = line.match(/^tag\s*:\s*(.+)/);
    if (tagMatch) {
      const tagContent = tagMatch[1].trim();
      if (!tagContent.startsWith("[")) {
        errors.push({
          file: relativePath,
          line: i + 1,
          type: "tag-syntax",
          message: `tag should be array: ${tagContent}`,
        });
      }
    }

    const timelineMatch = line.match(/^timeline\s*:\s*(.+)/);
    if (timelineMatch) {
      const val = timelineMatch[1].trim();
      if (val !== "true" && val !== "false" && val !== "frontmatter") {
        errors.push({
          file: relativePath,
          line: i + 1,
          type: "timeline-syntax",
          message: `Invalid timeline value: ${val}`,
        });
      }
    }

    const categoryMatch = line.match(/^category\s*:\s*(.+)/);
    if (categoryMatch) {
      const catContent = categoryMatch[1].trim();
      if (!catContent.startsWith("[") && catContent !== "frontmatter") {
        errors.push({
          file: relativePath,
          line: i + 1,
          type: "category-syntax",
          message: `Invalid category syntax: ${catContent}`,
        });
      }
    }
  }

  const formulas = extractLatex(content);

  for (const formula of formulas) {
    let lineNumber = 1;
    let charCount = 0;
    for (let j = 0; j < lines.length; j++) {
      charCount += lines[j].length + 1;
      if (charCount > formula.index) {
        lineNumber = j + 1;
        break;
      }
    }

    if (formula.text.trim()) {
      const result = validateLatex(formula.text, formula.type === "block");
      if (!result.valid) {
        errors.push({
          file: relativePath,
          line: lineNumber,
          type: "latex",
          message: `LaTeX error (${formula.type}): ${result.error}`,
          latex: formula.text.slice(0, 80),
        });
      }
    }
  }
}

function main() {
  console.log("🔍 Checking VuePress markdown files...\n");

  const mdFiles = walkDir(SRC_DIR);
  console.log(`Found ${mdFiles.length} markdown files\n`);

  for (const file of mdFiles) {
    try {
      const content = readFileSync(file, "utf-8");
      validateMarkdown(content, file);
    } catch (e) {
      const relativePath = relative(SRC_DIR, file);
      errors.push({
        file: relativePath,
        line: 1,
        type: "read-error",
        message: `Cannot read file: ${e.message}`,
      });
    }
  }

  if (errors.length === 0) {
    console.log("✅ No errors found!");
  } else {
    console.log(`❌ Found ${errors.length} error(s):\n`);

    const byFile = {};
    for (const err of errors) {
      if (!byFile[err.file]) byFile[err.file] = [];
      byFile[err.file].push(err);
    }

    for (const [file, fileErrors] of Object.entries(byFile)) {
      console.log(`📄 ${file}`);
      for (const err of fileErrors) {
        console.log(`   Line ${err.line}: [${err.type}] ${err.message}`);
        if (err.latex) {
          const displayLatex = err.latex.length > 60 ? err.latex.slice(0, 60) + "..." : err.latex;
          console.log(`              LaTeX: ${displayLatex}`);
        }
      }
      console.log();
    }

    const typeCount = {};
    for (const err of errors) {
      typeCount[err.type] = (typeCount[err.type] || 0) + 1;
    }
    console.log("\n📊 Error summary:");
    for (const [type, count] of Object.entries(typeCount)) {
      console.log(`   ${type}: ${count}`);
    }
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main();
