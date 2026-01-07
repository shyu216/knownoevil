import os
import re

def check_frontmatter_value(root, keyword='readme', value='article: false'):
    for dirpath, _, filenames in os.walk(root):
        for fname in filenames:
            if keyword.lower() in fname.lower() and fname.lower().endswith('.md'):
                fpath = os.path.join(dirpath, fname)
                with open(fpath, encoding='utf-8') as f:
                    content = f.read()
                # 匹配 YAML frontmatter
                m = re.match(r'^---(.*?)---', content, re.DOTALL)
                if m:
                    header = m.group(1)
                    if value in header:
                        print(f'✅ {fpath} 含有 {value}')
                    else:
                        print(f'❌ {fpath} 不含 {value}')
                else:
                    print(f'⚠️ {fpath} 没有 YAML header')

# 用法示例
check_frontmatter_value('src', keyword='readme', value='article: false')