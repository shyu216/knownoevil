---
title: Git 的基本使用
icon: mug-hot
---

## How to clean a GitHub repository commit history?

```
git checkout --orphan new-branch
git add -A
git commit -m "init"
git branch -D main
git branch -m main
git push -f origin main
```

## 怎么查看git commit所有历史的大小，和目前main里面的大小？

```sh
# 查看 main 分支文件列表和总大小
(git ls-tree -r -l main | ForEach-Object { [long]($_.Split()[3]) } | Measure-Object -Sum).Sum / 1MB

# Git 对象总大小
git count-objects -vH
```

## 怎么从 Git 仓库中删除但保留本地文件？
```sh
# 1. 从 Git 仓库删除，但保留本地文件
git rm -r --cached results/word_similarity_v2

# 2. 添加到 .gitignore（防止再次跟踪）
echo "results/word_similarity_v2/" >> .gitignore

# 3. 提交更改
git add .gitignore
git commit -m "Remove results/word_similarity_v2 from repo and add to .gitignore"
```