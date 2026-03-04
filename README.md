
# Knownoevil

A personal knowledge base website containing course notes, review outlines, technical summaries, and random thoughts.
[Knownoevil](https://yourusername.github.io/knownoevil/) is written in Chinglish and optimized with Doubao in TRAE, based on free [FontAwesome](https://fontawesome.com/search) icons and [VuePress Theme Hope](https://theme-hope.vuejs.press/guide/) theme.


## Project Introduction

This is a personal knowledge management website built with VuePress, aimed at organizing and sharing various technical and life-related content.


### Main Content

- **Programming Technology**: Learning notes and practical experience with Python, C#, Docker, Git, and other tech stacks
- **Academic Research**: Course notes, research directions, and academic resources
- **Life Insights**: Reading notes, life experiences, and personal thoughts
- **Development Logs**: Technical optimization, project deployment, and development experience sharing

## Tech Stack

- **Frontend Framework**: VuePress v2
- **Theme**: VuePress Theme Hope
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## How to Use

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build production version
npm run docs:build
```

### Content Contribution

1. Fork this repository
2. Create a new branch
3. Add or modify content
4. Submit a Pull Request

## Directory Structure

```
src/
├── coding/        # Programming-related content
├── life/          # Life-related content
├── study/         # Study-related content
└── README.md      # Website homepage
```

### Adding Content

#### Adding PDF

```md
<PDF src="https://xxx.pdf" />
<PDF src="/coding/xxx.pdf" />
```

#### Page Header Configuration

```md
---
title: Page Title
shortTitle: Short Title
icon: note-sticky
timeline: true
tag:
    - Tag 1
    - Tag 2
---
```

#### Adding Images

```md
![](/assets/images/image-name.png)

![](./image-name.png)<!-- related to the md file -->
```

## Contribution Guide

Welcome to submit Issues and Pull Requests to help improve this project!

## Contact

If you have any questions or suggestions, please contact me through GitHub Issues.

## Recommendation

If you're looking for a powerful and flexible documentation framework, I highly recommend VuePress with the [Theme Hope](https://theme-hope.vuejs.press/guide/). It provides excellent features for building beautiful and functional knowledge bases.