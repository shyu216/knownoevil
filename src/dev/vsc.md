---
title: VSCode
icon: mug-hot
---

## How to use `.*` in VSCode?

- `\d+` matches any digit, like `0`, `12345`, etc.
- `\w+` matches any word character, like `a`, `abc123`, etc.
- `\n` matches any newline character.
- `(abc)` matches any string that contains `abc`.

### How to find a pattern and replace it with another?

For example, want to hide all images,

1. Find `!\[(.*?)\]\((.*?)\)`
2. Replace with `![Image]($2)`