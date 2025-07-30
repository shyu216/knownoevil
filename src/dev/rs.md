---
title: Intel RealSense Depth Camera D415
shortTitle: RealSense D415
icon: mug-hot
---

## What are all the supported modes?

USB 3 could support 1280x720 @ 30fps, USB 2 only supports 640x480 @ 30fps.

## Problems on Windows

Pyrealsense does not support Python 3.12 on Windows, so pip cannot find it.

## Problems on macOS

On macOS, it can be installed by `brew install librealsense`. There are examples to run in the `/usr/local/Cellar/librealsense/2.56.3/bin`. And sudo is needed.

Can use[ `pyrealsense2-macosx`](https://github.com/cansik/pyrealsense2-macosx). [Sudo needed](https://github.com/IntelRealSense/librealsense/issues/9916#issuecomment-1082893427).

When activate color stream, the frames doesn't arrive when running the code in the second time. Remove and insert the USB again can solve.

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

### How to kill the dead process?

1. Find the PID of the process by `ps aux | grep <your process name>`.
2. Kill the process by `kill -9 <PID>`.




### How to setup it in WSL?

install `usbipd`, then see: https://learn.microsoft.com/en-us/windows/wsl/connect-usb#attach-a-usb-device