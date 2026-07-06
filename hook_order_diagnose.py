import pathlib
import re
import json
root = pathlib.Path(__file__).parent
hook_pattern = re.compile(r'\b(useState|useEffect|useMemo|useCallback|useRef|useContext|useApp|React\.useEffect|React\.useMemo|React\.useCallback|useForm)\s*\(')
func_start_pattern = re.compile(r'^\s*(export\s+)?(const\s+\w+\s*=\s*(async\s+)?\(?[^=]*\)?\s*=>|function\s+\w+\s*\()')
ignore_dirs = {'node_modules', '.next'}


def walk(dir_path):
    for entry in sorted(dir_path.iterdir()):
        if entry.is_dir():
            if entry.name in ignore_dirs:
                continue
            walk(entry)
        elif entry.suffix in {'.ts', '.tsx'}:
            analyze_file(entry)


def analyze_file(path):
    lines = path.read_text(encoding='utf-8', errors='ignore').splitlines()
    func_stack = []
    for idx, line in enumerate(lines):
        stripped = line.strip()
        if func_start_pattern.match(line):
            func_stack.append({'start': idx, 'brace': line.count('{') - line.count('}'), 'returns': [], 'hooks': []})
            continue
        if not func_stack:
            continue
        current = func_stack[-1]
        # update braces, but ignore braces in comments? crude
        current['brace'] += line.count('{') - line.count('}')
        if 'return' in line:
            current['returns'].append(idx)
        if hook_pattern.search(line):
            current['hooks'].append((idx, stripped))
        if current['brace'] <= 0:
            # function ended
            if current['returns'] and current['hooks']:
                for hook_idx, hook_line in current['hooks']:
                    if any(ret < hook_idx for ret in current['returns']):
                        print(f'{path}:{hook_idx+1}: hook after return in function starting at line {current["start"]+1}')
                        start = max(0, current['start'] - 2)
                        end = min(len(lines), hook_idx + 3)
                        for i in range(start, end):
                            print(f'{i+1}: {lines[i]}')
                        print('---')
                        break
            func_stack.pop()


if __name__ == '__main__':
    walk(root)
