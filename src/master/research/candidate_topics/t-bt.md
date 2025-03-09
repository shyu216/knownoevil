---
title: Breath Tracking using a Depth Camera for XV Scanner
shortTitle: Breath Tracking
order: 4
icon: poop
category:
   - 25S1
---

The XV Scanner™ is the world’s only fully dedicated X-ray lung function scanner, designed to do something completely unique–capture a single, full-breath cycle in motion, from four different angles simultaneously.


To optimise the scanning procedure, it is desirable to have a real-time, non-contact method for monitoring the patient’s breathing. This project is focused on the development of a depth-camera based breath tracking method/algorithm to extract a highly dependable, real-time breath trace from a seated patient. As the breath trace may be used for automatically initiating and terminating X-ray exposures during the patient’s breathing cycle.


The project will collaborate with 4DMedical and require considering the following:

- Exploring the integration of machine learning techniques with traditional computer vision algorithms.
- Consideration of camera positioning, geometry and utilisation of multiple cameras.
- Designing to handle factors such as patient size, shape, and non-breath related movements.
- Real-time signal processing and filtering to optimise the breath trace output.
- Testing and evaluation of the preferred approaches performance and reliability.

Supervisor: [Bin Chen](https://binchen.me/), [Lingyan Ruan](https://lyruan.com/)

https://4dmedical.com/products/hardware/xv-scanner/

# 侧重点

- goal: real-time, handle factors
- factors: patient size, shape, and non-breath related movements. cloth
- resource: SLURM, HPC, depth camera, linux device
- method: first traditional (cpp), then deep learning
- output: breath trace/circle/curve

# 文献阅读

## 1. [Algorithmic insights of camera-based respiratory motion extraction](https://iopscience.iop.org/article/10.1088/1361-6579/ac5b49/pdf)

### 呼吸追踪步骤?

Region of Interest (RoI) detection, motion estimation, and respiratory signal/rate
construction.

## 2. [Respiration Tracking for People Counting and Recognition](https://blog.csdn.net/a_beatiful_knife/article/details/119716157)

### sensor?

channel state information (CSI) of a single pair of commercial WiFi devices.

### 相关性?

弱.

## 3. [Catch Your Breath: Simultaneous RF Tracking and Respiration Monitoring With Radar Pairs](https://blog.csdn.net/zzq0523/article/details/128633338)

### sensor?

Impulse-Radio Ultra-Wideband (IR-UWB) Radar. 波.

## 4. A real-time camera-based adaptive breathing monitoring system

### 设置实验?

和reference medical device比较. ge dash 5000.