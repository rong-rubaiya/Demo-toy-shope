const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);
const hookRegex = /\b(useState|useEffect|useMemo|useCallback|useRef|useContext|useApp|React\.useEffect|React\.useMemo|React\.useCallback)\b/;
const funcStartRegex = /^(\s*)(export\s+)?(async\s+)?(function\s+\w+\s*\(|const\s+\w+\s*=\s*(async\s*)?\(.*\)\s*=>\s*\{|const\s+\w+\s*=\s*(async\s*)?function\s*\()/;
const isNode = (file) => file.endsWith('.ts') || file.endsWith('.tsx');

function walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      if (file.name === 'node_modules' || file.name === '.next') continue;
      walk(full);
    } else if (isNode(full)) {
      checkFile(full);
    }
  }
}

function checkFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let inFunc = false;
  let braceLevel = 0;
  let funcStart = null;
  let returns = [];
  let hooks = [];
  function closeFunc() {
    if (funcStart != null) {
      for (const hook of hooks) {
        if (returns.some(r => r < hook.line)) {
          console.log(`HOOK_AFTER_RETURN ${file}:${hook.line+1}`);
          const start = Math.max(0, funcStart);
          const end = Math.min(lines.length, hook.line+3);
          for (let i = start; i < end; i++) {
            console.log(`${i+1}: ${lines[i]}`);
          }
          console.log('---');
          break;
        }
      }
    }
    inFunc = false;
    braceLevel = 0;
    funcStart = null;
    returns = [];
    hooks = [];
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFunc && funcStartRegex.test(line)) {
      inFunc = true;
      funcStart = i;
      braceLevel = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      returns = [];
      hooks = [];
      if (braceLevel <= 0) {
        closeFunc();
      }
      continue;
    }
    if (inFunc) {
      const open = (line.match(/\{/g) || []).length;
      const close = (line.match(/\}/g) || []).length;
      braceLevel += open - close;
      if (/\breturn\b/.test(line)) {
        returns.push(i);
      }
      if (hookRegex.test(line)) {
        hooks.push({ line: i, text: line.trim() });
      }
      if (braceLevel <= 0) {
        closeFunc();
      }
    }
  }
}

walk(root);
