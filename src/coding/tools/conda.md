---
title: Anaconda 的基本使用
icon: mug-hot
---

- Open Anaconda Prompt
- Run `where conda` to find the path of conda
- Then add those paths to the environment variable `PATH`:
  - `...\anaconda3`
  - `...\anaconda3\Scripts`
  - `...\anaconda3\Library\bin`



- List conda installed packages and pip packages
  - Both: `conda list`
  - Conda: `conda list --explicit`
  - Pip: `pip list`

- Remove a conda environment: `conda env remove -n <env_name>`




### Download conda in WSL

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

bash Miniconda3-latest-Linux-x86_64.sh

eval "$(/home/shyu/miniconda3/bin/conda shell.bash hook)"

```