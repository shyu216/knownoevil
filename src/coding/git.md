---
title: Git 的基本使用
icon: mug-hot
---

## How to clean a GitHub repository using a new branch?

```
git checkout --orphan new-branch
git add -A
git commit -m "init"
git branch -D main
git branch -m main
git push -f origin main
```