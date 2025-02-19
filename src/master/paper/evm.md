---
title: Eulerian Video Magnification for Revealing Subtle Changes in the World
shortTitle: EVM
icon: note-sticky
tag:
    - Image Processing
    - Computer Vision
    - Motion Magnification
    - Fourier Transform
---

website: [https://people.csail.mit.edu/mrub/evm/](https://people.csail.mit.edu/mrub/evm/)

youtube: [https://www.youtube.com/watch?v=ONZcjs1Pjmk](https://www.youtube.com/watch?v=ONZcjs1Pjmk)

## What is the goal of EVM?

Combine spatial decomposition and temporal filtering to reveal/magnify/amplify color and motion changes for perceptually appealing visualization (artifact-free).

## What assumptions are made in EVM?

Brightness constancy. Smooth motion. 

## What are the spatial decomposition and temporal filtering steps in EVM?

First decompose the video into different spatial frequency bands. Then perform temporal filtering on each band.


### What does the 2D Fourier transform of an image do?

Originally, image was a matrix of pixels (spatial domain). Through FT, it becomes a combination of frequency planes (spectrum) with different weight (frequency domain). Each plane represents a different spatial frequency. High frequency spectrum looks like dense wave.

A demo of 2D Fourier transform is shown below.

```python
import numpy as np
import matplotlib.pyplot as plt
import cv2

# 读取图像
image = cv2.imread('cuhk.jpg', cv2.IMREAD_GRAYSCALE)

# 计算傅里叶变换
f_transform = np.fft.fft2(image)
f_transform_shifted = np.fft.fftshift(f_transform)

# 计算幅度谱
magnitude_spectrum = np.abs(f_transform_shifted)

# 找出权重最大的10个频率成分
indices = np.unravel_index(np.argsort(magnitude_spectrum.ravel())[-10:], magnitude_spectrum.shape)

# 创建一个空的复数数组，用于存储合成图像的傅里叶变换
f_transform_combined = np.zeros_like(f_transform_shifted, dtype=complex)

# 可视化原始图像和幅度谱
plt.figure(figsize=(15, 15))

# 原始图像
plt.subplot(4, 4, 1)
plt.imshow(image, cmap='gray')
plt.title('Original Image')
plt.axis('off')

# 幅度谱
plt.subplot(4, 4, 2)
plt.imshow(20 * np.log(magnitude_spectrum + 1), cmap='gray')
plt.title('Magnitude Spectrum')
plt.axis('off')

# 生成仅包含一个频率成分的图像并合成
for i, (row, col) in enumerate(zip(*indices)):
    single_freq_mask = np.zeros_like(f_transform_shifted, dtype=complex)
    single_freq_mask[row, col] = f_transform_shifted[row, col]
    
    # 计算仅包含一个频率成分的图像
    f_transform_single_freq = np.fft.ifftshift(single_freq_mask)
    image_single_freq = np.fft.ifft2(f_transform_single_freq)
    image_single_freq = np.abs(image_single_freq)
    
    # 将单频图像的傅里叶变换累加到合成图像的傅里叶变换中
    f_transform_combined += single_freq_mask
    
    # 可视化仅包含一个频率成分的图像
    plt.subplot(4, 4, i + 3)
    plt.imshow(image_single_freq, cmap='gray')
    plt.title(f'Single Frequency {i + 1}')
    plt.axis('off')

# 计算合成图像
f_transform_combined_shifted = np.fft.ifftshift(f_transform_combined)
image_combined = np.fft.ifft2(f_transform_combined_shifted)
image_combined = np.abs(image_combined)

# 可视化合成图像
plt.subplot(4, 4, 13)
plt.imshow(image_combined, cmap='gray')
plt.title('Combined Image')
plt.axis('off')

plt.show()
```

Output:

![Fourier Transform](/EVMFTdemo.png)

### What is frequency band? What information does it contain? How to get from a video file? 

Frequency band is a range of frequencies in the spectrum. There are 2 types of bands: spatial and temporal. 

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

Output:

![Band-Pass Filter](/EVMBandpassdemo.png)

## What are spatial decomposition techniques?

1. Lagrangian method: Track how specific points or regions move across frames. It decomposes the image or video into trajectories of these points.
2. Eulerian approach: Analyze changes (intensity of pixels) at fixed locations. It decomposes the signal into temporal variations at specific spatial locations.
3. Laplacian pyramid: Based on the Laplacian operator. It decomposes an image into multiple scales or frequency bands using a Laplacian pyramid. Each level of the pyramid captures details at a specific scale (e.g., fine edges vs. coarse structures).
4. Gaussian pyramid: Based on the Gaussian filter. It decomposes an image into multiple scales using a Gaussian pyramid. Each level of the pyramid represents the image at a different resolution (from fine to coarse).

### What is pyramid of a video?

A pyramid of a video is a multi-scale representation of a video sequence, where each level of the pyramid corresponds to a different spatial or temporal resolution.

## What are temporal filtering techniques?

1. Ideal band-pass filter: It allows a specific range of frequencies to pass through while blocking others. It is ideal in the sense that it has a sharp cutoff and no ripples in the passband or stopband.
2. Butterworth filter: It has a smooth frequency response. It is characterized by the order (number of poles) and cutoff frequency. Higher order filters have steeper roll-off but more ripples in the passband.
3. IIR (Infinite Impulse Response) filter: It uses feedback to achieve a desired frequency response. It is characterized by the poles and zeros in the z-plane. It can be unstable if the poles are outside the unit circle.

### What are passband and stopband in a filter?

The passband is the range of frequencies that are allowed to pass through the filter with minimal attenuation. The stopband is the range of frequencies that are blocked or attenuated by the filter.

### What are poles and zeros in a z-plane?

Poles and zeros are points in the z-plane that determine the frequency response of a filter. Poles are the roots of the denominator polynomial, while zeros are the roots of the numerator polynomial in the z-transform of the filter.

Z-plane is a complex plane where the z-transform of a discrete-time signal or system is represented. The poles and zeros of the transfer function in the z-plane provide insights into the stability and frequency response of the system.

### What is first-order Taylor series expansion? Why is it used?

It is a linear approximation of a function around a specific point. It is used to estimate the value of a function near the point. The approximation is given by the first-order Taylor series expansion:

$$f(x) \approx f(x_0) + f'(x_0)(x - x_0)$$

where $f(x)$ is the function, $f(x_0)$ is the function value at $x_0$, $f'(x_0)$ is the derivative of the function at $x_0$, and $x$ is the point of interest.

To explain the relationship between temporal processing and motion magnification. Efficient to approximate the intensity changes.

### What is the displacement function δ(t) (delta)?

I(x, t) denote the image intensity at position x and time t.

It is used to express the observed intensity I(x, t) = f(x + δ(t)) from I(x, 0) = f(x).

It will be automatically estimated from the input video.

### What is the amplification factor α (alpha)?

It is a scalar value that controls the strength of the motion magnification effect. A larger α results in more pronounced motion changes, while may produce more artifacts.

To amplify the spatial displacement δ(t) of image f(x) at time t to a magnitude (1 + α).

### What is temporal attenuation factor γk (gamma)?

In general case, the displacement function is not entirely within the passband of the temporal filter. δk(t) represents different temporal spectral components of δ(t). Each δk(t) will be attenuated by the temporal filtering by a factor γk.

### Why use sinusoidal function to estimate the image intensity?

Commonly used. Fits well for Fourier analysis. Periodic motion.

### What is spatial frequency ω (omega) and wavelength λ (lambda)?

To make sure processed signal to be approximately equal to the true magnified motion.

$$\lambda = 2\pi / \omega$$