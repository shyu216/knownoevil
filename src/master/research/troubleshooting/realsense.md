---
title: Intel RealSense Depth Camera D415
shortTitle: RealSense D415
icon: mug-hot
---

## Problems on Windows

Pyrealsense does not support Python 3.12 on Windows, so pip cannot find it.

## Problems on macOS

On macOS, it can be installed by `brew install librealsense`. There are examples to run in the `/usr/local/Cellar/librealsense/2.56.3/bin`. And sudo is needed.

### How to check the info of connected USB devices?

```
system_profiler SPUSBDataType
```

### How to use brew?

Homebrew is a package manager for macOS. 

```
yusihong@yusihongs-MBP knownoevil % brew -h
Example usage:
  brew search TEXT|/REGEX/
  brew info [FORMULA|CASK...]
  brew install FORMULA|CASK...
  brew update
  brew upgrade [FORMULA|CASK...]
  brew uninstall FORMULA|CASK...
  brew list [FORMULA|CASK...]

Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA|CASK

Contributing:
  brew create URL [--no-fetch]
  brew edit [FORMULA|CASK...]

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```