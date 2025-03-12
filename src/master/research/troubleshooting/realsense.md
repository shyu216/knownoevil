---
title: Intel RealSense Depth Camera D415
shortTitle: RealSense D415
icon: mug-hot
---

## What are all the supported modes?

`get_stream_profiles()` gives:

```
<pyrealsense2.[video_]stream_profile: Infrared(0) 1280x720 @ 6fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 1280x720 @ 6fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 1280x720 @ 6fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 1280x720 @ 6fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 1280x720 @ 6fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 10fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 10fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 10fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 10fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 10fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 6fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 6fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 6fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 6fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 848x480 @ 6fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 30fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 30fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 30fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 30fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 30fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 15fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 15fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 15fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 15fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 15fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 6fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 6fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 6fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 6fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x480 @ 6fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x360 @ 30fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x360 @ 30fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x360 @ 30fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x360 @ 30fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 640x360 @ 30fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 60fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 60fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 60fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 60fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 60fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 30fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 30fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 30fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 30fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 30fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 15fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 15fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 15fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 15fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 15fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 6fps UYVY>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 6fps BGRA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 6fps RGBA8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 6fps BGR8>
<pyrealsense2.[video_]stream_profile: Infrared(0) 480x270 @ 6fps RGB8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 1280x720 @ 6fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 848x480 @ 10fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 848x480 @ 6fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 640x480 @ 30fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 640x480 @ 15fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 640x480 @ 6fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 640x360 @ 30fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 480x270 @ 60fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 480x270 @ 30fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 480x270 @ 15fps Y8>
<pyrealsense2.[video_]stream_profile: Infrared(1) 480x270 @ 6fps Y8>
<pyrealsense2.[video_]stream_profile: Depth(0) 1280x720 @ 6fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 848x480 @ 10fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 848x480 @ 6fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 640x480 @ 30fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 640x480 @ 15fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 640x480 @ 6fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 640x360 @ 30fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 480x270 @ 60fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 480x270 @ 30fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 480x270 @ 15fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 480x270 @ 6fps Z16>
<pyrealsense2.[video_]stream_profile: Depth(0) 256x144 @ 90fps Z16>
```

## Problems on Windows

Pyrealsense does not support Python 3.12 on Windows, so pip cannot find it.

## Problems on macOS

On macOS, it can be installed by `brew install librealsense`. There are examples to run in the `/usr/local/Cellar/librealsense/2.56.3/bin`. And sudo is needed.

Can use `pyrealsense2-macosx`. Sudo needed.

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