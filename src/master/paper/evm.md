---
title: Eulerian Video Magnification for Revealing Subtle Changes in the World
icon: note-sticky
tag:
    - Image Processing
    - Computer Vision
    - Motion Magnification
---

website: https://people.csail.mit.edu/mrub/evm/

## What is the goal of EVM?

Combine spatial decomposition and temporal filtering to reveal/magnify/amplify color and motion changes for perceptually appealing visualization (artifact-free).

## What assumptions are made in EVM?

Brightness constancy. Smooth motion. 

## What are the spatial decomposition and temporal filtering steps in EVM?

First decompose the video into different spatial frequency bands. Then perform temporal filtering on each band.

### What is frequency band? What information does it contain? How to get from a video file? 

There are 2 types of bands: spatial and temporal. 

1. Spatial bands relate to the variation of pixel intensity in space (width and height). High frequency represents fine details (edge), while low frequency represents smooth regions (background). 
2. Temporal bands relate to the variation of pixel intensity in time (frame rate). Frequency corresponds to the speed of motion. 

Fourier transform can be used to get frequency bands. 

Band-pass filter can be used to isolate a specific frequency band. A demo of band-pass filter is shown below.

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 读取图像
image = cv2.imread("cuhk.jpg", cv2.IMREAD_GRAYSCALE)

# 显示原始图像
plt.figure(figsize=(10, 5))
plt.subplot(231), plt.imshow(image, cmap='gray')
plt.title("Original Image"), plt.xticks([]), plt.yticks([])

# 对图像进行二维傅里叶变换
f_transform = np.fft.fft2(image)
f_transform_shifted = np.fft.fftshift(f_transform)  # 将零频率分量移到中心

# 计算幅度谱并显示
magnitude_spectrum = 20 * np.log(np.abs(f_transform_shifted))
plt.subplot(232), plt.imshow(magnitude_spectrum, cmap='gray')
plt.title("Magnitude Spectrum"), plt.xticks([]), plt.yticks([])

# 获取图像的尺寸
rows, cols = image.shape
crow, ccol = rows // 2, cols // 2  # 中心点

# 创建一个掩码（初始值为0）
mask = np.zeros((rows, cols), np.uint8)

# 定义带通滤波器的频率范围
r_inner = 0  # 内半径（低频截止）
r_outer = 60  # 外半径（高频截止）

# 在掩码上创建一个环形区域（值为1）
center = [crow, ccol]
x, y = np.ogrid[:rows, :cols]
mask_area = (x - center[0]) ** 2 + (y - center[1]) ** 2
mask[(mask_area >= r_inner ** 2) & (mask_area <= r_outer ** 2)] = 1

# 显示掩码
plt.subplot(233), plt.imshow(mask, cmap='gray')
plt.title("Band-Pass Mask"), plt.xticks([]), plt.yticks([])

# 将掩码应用到傅里叶变换结果上
f_transform_filtered = f_transform_shifted * mask

# 计算滤波后的幅度谱
magnitude_spectrum_filtered = 20 * np.log(np.abs(f_transform_filtered) + 1e-5)  # 避免log(0)

# 显示滤波后的幅度谱
plt.subplot(234), plt.imshow(magnitude_spectrum_filtered, cmap='gray')
plt.title("Filtered Magnitude Spectrum"), plt.xticks([]), plt.yticks([])

# 将滤波后的结果逆变换回空间域
f_transform_filtered_shifted = np.fft.ifftshift(f_transform_filtered)
image_filtered = np.fft.ifft2(f_transform_filtered_shifted)
image_filtered = np.abs(image_filtered)

# 显示滤波后的图像
plt.subplot(235), plt.imshow(image_filtered, cmap='gray')
plt.title("Filtered Image"), plt.xticks([]), plt.yticks([])
plt.show()
```

## What are spatial decomposition techniques?

1. Lagrangian: Track how specific points or regions move across frames. It decomposes the image or video into trajectories of these points.
2. Eulerian: Analyze changes (intensity of pixels) at fixed locations. It decomposes the signal into temporal variations at specific spatial locations.
3. Laplacian: Based on the Laplacian operator. It decomposes an image into multiple scales or frequency bands using a Laplacian pyramid. Each level of the pyramid captures details at a specific scale (e.g., fine edges vs. coarse structures).
4. Gaussian: Based on the Gaussian filter. It decomposes an image into multiple scales using a Gaussian pyramid. Each level of the pyramid represents the image at a different resolution (from fine to coarse).

## What are temporal filtering techniques?

1. Ideal band-pass filter: It allows a specific range of frequencies to pass through while blocking others. It is ideal in the sense that it has a sharp cutoff and no ripples in the passband or stopband.
2. Butterworth filter: It has a smooth frequency response. It is characterized by the order (number of poles) and cutoff frequency. Higher order filters have steeper roll-off but more ripples in the passband.
3. IIR (Infinite Impulse Response) filter: It uses feedback to achieve a desired frequency response. It is characterized by the poles and zeros in the z-plane. It can be unstable if the poles are outside the unit circle.

## What is first-order Taylor series expansion?

It is a linear approximation of a function around a specific point. It is used to estimate the value of a function near the point. The approximation is given by the first-order Taylor series expansion:

$$f(x) \approx f(x_0) + f'(x_0)(x - x_0)$$

where $f(x)$ is the function, $f(x_0)$ is the function value at $x_0$, $f'(x_0)$ is the derivative of the function at $x_0$, and $x$ is the point of interest.