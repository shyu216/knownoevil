---
title: Learning-based Axial Video Motion Magnification
shortTitle: Axial-MM
icon: note-sticky
timeline: true
tag:
    - Image Processing
    - Motion Magnification
---

## What is the idea?

It is a subsequent work of the 2018 learning-based video motion magnification method. They use the same dataset. They generate the videos by manually overlapping two objects in the video and controlling the motion of different objects. Smaller implies raw video, larger implies magnified video. The goal is to learn the motion of the objects and magnify it. They focus on "motion/edge/phase", not "color/surface".

The original EVM shows potential in rPPG, but MM does not follow this path. The 2014 phase MM just implied that it can help remove the motion by setting the factor to negative, making the motion smaller. But many of the rPPG or rrMonitoring methods use running average to remove the motion, so they may think MM is not that practical.

Axial MM has 3 parameters, factor along x-axis, factor along y-axis, and angle respected to one axis. It will magnify all motion in the video, so cropping is necessary.