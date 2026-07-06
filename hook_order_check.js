const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);
const hookExpr = /(useState|useEffect|useMemo|useCallback|useRef|useContext|useApp|React\.useEffect|React\.useMemo|React\.useCallback)\s*\(/;
const funcStartExpr = /^\s*(export\s+)?(async\s+)?(function\s+\w+|const\s+\w+\s*=\s*(async\s+)?\(?[^=]*\)?\s*=>|const\s+\w+\s*=\s*(async\s+)?function)\s*/;
const ignoreDirs = new Set(['node_modules', '.next']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      checkFile(path.join(dir, entry.name));
    }
  }
}

function checkFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let funcStack = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (funcStartExpr.test(line) && !line.includes('=> () =>')) {
      funcStack.push({ start: i, brace: (line.match(/{/g) || []).length - (line.match(/}/g) || []).length, returns: [], hooks: [] });
      continue;
    }
    if (funcStack.length === 0) continue;
    const current = funcStack[funcStack.length - 1];
    current.brace += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
    if (/\breturn\b/.test(line)) current.returns.push(i);
    if (hookExpr.test(line)) current.hooks.push({ line: i, code: line.trim() });
    if (current.brace <= 0) {
      if (current.returns.length && current.hooks.length) {
        const firstHookAfterReturn = current.hooks.find((hook) => current.returns.some((r) => r < hook.line));
        if (firstHookAfterReturn) {
          console.log(`HOOK_AFTER_RETURN ${file}:${firstHookAfterReturn.line + 1}`);
          const start = Math.max(0, current.start);
          const end = Math.min(lines.length, firstHookAfterReturn.line + 3);
          for (let j = start; j < end; j++) console.log(`${j + 1}: ${lines[j]}`);
          console.log('---');
        }
      }
      funcStack.pop();
    }
  }
}

walk(root);
