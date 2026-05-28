const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../client/dist");
const dest = path.resolve(__dirname, "../public");

function copyDir(source, target) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source directory does not exist: ${source}`);
  }
  fs.mkdirSync(target, { recursive: true });
  for (const item of fs.readdirSync(source, { withFileTypes: true })) {
    const srcPath = path.join(source, item.name);
    const destPath = path.join(target, item.name);
    if (item.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}
copyDir(src, dest);
console.log(`Copied client/dist to public (${src} -> ${dest})`);
