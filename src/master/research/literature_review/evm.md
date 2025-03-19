---
title: Eulerian Video Magnification for Revealing Subtle Changes in the World
shortTitle: EVM
icon: note-sticky
timeline: true
tag:
    - Image Processing
    - Computer Vision
    - Motion Magnification
    - Signal Processing
---

- paper website: [https://people.csail.mit.edu/mrub/evm/](https://people.csail.mit.edu/mrub/evm/)
- related work: [https://people.csail.mit.edu/mrub/vidmag/](https://people.csail.mit.edu/mrub/vidmag/)
- paper with code: [https://paperswithcode.com/task/motion-magnification](https://paperswithcode.com/task/motion-magnification)
- connected papers: [https://www.connectedpapers.com/main/1ad1b8a6b365ff7011b7eac1dded748639ae972b/graph?utm_source=share_popup&utm_medium=copy_link&utm_campaign=share_graph](https://www.connectedpapers.com/main/1ad1b8a6b365ff7011b7eac1dded748639ae972b/graph?utm_source=share_popup&utm_medium=copy_link&utm_campaign=share_graph)
- youtube: [https://www.youtube.com/watch?v=ONZcjs1Pjmk](https://www.youtube.com/watch?v=ONZcjs1Pjmk)
- an english blog: [https://hbenbel.github.io/blog/evm/](https://hbenbel.github.io/blog/evm/)
- a chinese blog: [https://www.hahack.com/codes/eulerian-video-magnification/](https://www.hahack.com/codes/eulerian-video-magnification/)

## What is the goal?

Combine spatial decomposition and temporal filtering to reveal color and motion changes for perceptually appealing visualization (artifact-free).

## Where idea comes from?

EVM relies on the optical flow algorithm to estimate the motion between frames, assuming that changes in pixel intensity represent pixel motion, provided that the image brightness does not change and the motion is smooth.

## How to achieve?

1. decompose the video into different spatial frequency bands. 
2. perform temporal filtering on each band.
3. amplify the motion in each band.
4. reconstruct the video.

| Property | Spatial Decomposition | Temporal Filtering | 
| --- | --- | --- |
| Goal | Separate the video into different spatial frequency bands. | Extract and amplify the motion in the temporal domain. |
| Key variable | $\lambda_c$ (cutoff wavelength) | $\omega_l$/$\omega_h$ (band-pass frequency range) |
| Method | Pyramid | Band-pass filter |
| Main role | Control motion at different scales (such as large range vibration and small detail changes) | Extract movement at a specific time frequency (e.g., heart rate, camera vibration) |

### What does the 2D Fourier transform of an image do?

Originally, an image is a matrix of pixels in the spatial domain. Through Fourier Transform (FT), it becomes a combination of frequency planes (spectrum) with different weights in the frequency domain. Each plane represents a different spatial frequency. The high-frequency spectrum appears denser and represents the edges of objects.

![Fourier Transform](/EVMFTdemo.png)

## What is spatial decomposition?

this method uses a Gaussian pyramid for color magnification and a Laplacian pyramid for motion magnification.

1. Gaussian pyramid: It is a multi-scale representation of an image, where each level of the pyramid corresponds to a different spatial resolution. The image is downsampled and smoothed using Gaussian blur, which is achieved by convolving the image with a Gaussian kernel (convolution operation).
2. Laplacian pyramid: It is a representation of the image in terms of the difference between the original image and the upsampled and smoothed version of the image in Gaussian pyramid (Laplacian of Gaussian operation). It captures the high-frequency details of the image.

### What is frequency band?

Frequency band is a range of frequencies in the spectrum. There are 2 types of bands: spatial and temporal. 

1. Spatial bands relate to the variation of pixel intensity in space (width and height). High frequency represents fine details (edge), while low frequency represents smooth regions (background). 
2. Temporal bands relate to the variation of pixel intensity in time (frame rate). Frequency corresponds to the speed of motion. 

Fourier transform and Band-pass filter can be used to isolate a specific frequency band. A demo of band-pass filter is shown below.

![Band-Pass Filter](/EVMFilterdemo.png)

### What is pyramid representation?

A pyramid of a video is a multi-scale representation of a video sequence, where each level of the pyramid corresponds to a different spatial or temporal resolution. 

In pyramid representation of this method, as the level increases, the resolution of the image decreases, and the frequency information contained in it gradually changes from high frequency to low frequency. At the top of the pyramid is the lowest resolution image, which mainly contains low-frequency information.

## What is temporal filtering?

This method uses a Butterworth band-pass filter to amplify the motion in the temporal domain.

1. Ideal band-pass filter: It allows a specific range of frequencies to pass through while blocking others. It is ideal in the sense that it has a sharp cutoff and no ripples in the passband or stopband. It is hard to implement in practice due to its infinite impulse response and non-causal nature.
2. Butterworth filter and IIR (Infinite Impulse Response) filter: It is a type of filter that has a smooth rolloff in the frequency domain. It can be implemented using recursive formulas and is more practical for real-time applications.

### What are passband and stopband in a filter?

The passband is the range of frequencies that are allowed to pass through the filter with minimal attenuation. The stopband is the range of frequencies that are blocked or attenuated by the filter.

### What are spatial, temporal and frequency domain?

1. Spatial domain (x,y,intensity(x,y)): The original representation of an image or video in terms of pixel values. It is the domain where the image is defined in terms of its spatial coordinates (width and height).
2. Temporal domain (intensity(x,y,t),t): The domain where the video is defined in terms of time (frame rate). It captures the changes in pixel values over time.
3. Frequency domain (u,v,magnitude(u,v)): The domain where the image or video is represented in terms of spatial or temporal frequencies. It provides insights into the frequency content of the signal, such as the presence of high or low frequencies.

## How to amplify motion?

EVM achieves motion amplification through the following steps:

1. Modeling: The motion is viewed as the product of the spatial gradient of the signal and the displacement in the time domain.
   Assume that the initial intensity distribution of signal is f(x), small translation over time t is δ(t), and the observed signal is
    $$I(x, t) = f(x + δ(t))$$
2. Approximation: Taylor expansion linearized small shifts.
   When the displacement δ(t) is small, the intensity change can be approximated by the first-order Taylor series expansion:
    $$I(x, t) ≈ f(x) + δ(t) ∂f(x)/∂x$$  
3. Processing: Time filter extracts the moving component of the target, amplifies and reconstructs the signal.
   Decompose the displacement δ(t) in the frequency domain (such as Fourier transform), and the target frequency band is extracted through a band-pass filter:
    $$δ_{filtered}(t) = ∑_k γ_k δ_k(t)$$
    Apply the amplification factor α to the filtered displacement:
    $$δ_{amplified}(t) = (1 + α) δ_{filtered}(t)$$
    Reconstruct the amplified signal:
    $$I_{amplified}(x, t) ≈ f(x) + δ_{amplified}(t) ∂f(x)/∂x$$

Where：

- $I(x, t)$: observed intensity at position x and time t.
- $f(x)$: intensity distribution of the signal, which can be represented as a (a set of) sinusoidal function(s).
- $δ(t)$ delta: displacement function over time t.
- $∂f(x)/∂x$ derivative: spatial gradient of the signal.
- $γ_k$ gamma: temporal attenuation factor of a filter for different frequency components.
- $δ_k(t)$: different temporal spectral components of the displacement.
- $α$ alpha: amplification factor for the motion.

### How to explain F3 and F4 in the paper?

- X-axis: represents spatial position (such as horizontal one-dimensional coordinates).
- Y-axis (or signal strength axis) : represents the light intensity value (such as brightness) of the signal.
- Timeline (implicit dimension) : In the model, time t is an implicit variable, not directly as a coordinate axis, but reflected by the time evolution of the signal. For example, the displacement function δ(t) describes the overall translation of the signal with time t, but the analysis usually fixed the spatial position xx and observed its brightness change with time (i.e., time series analysis).


### What is first-order Taylor series expansion?

It is a linear approximation of a function around a specific point. It is used to estimate the value of a function near the point. The approximation is given by the first-order Taylor series expansion:

$$f(x) \approx f(x_0) + f'(x_0)(x - x_0)$$

where $f(x)$ is the function, $f(x_0)$ is the function value at $x_0$, $f'(x_0)$ is the derivative of the function at $x_0$, and $x$ is the point of interest.

### Why use sinusoidal function to estimate the image intensity?

It is the basic function in Fourier analysis. It captures the periodic nature of the intensity changes in the image.

### What is spatial frequency ω (omega) and wavelength λ (lambda)?

$$\lambda = 2\pi / \omega$$

They are in inverse relationship. High frequency has short wavelength, while low frequency has long wavelength. High frequency represents fine details (edge), while low frequency represents smooth regions (background).

In the multi-scale processing (spatial decomposition) of EVM, the amplification factor $α_k$ of each spatial frequency band k is adjusted:
$$
α_k = 
\begin{cases} 
α_0 & \text{if} & \lambda_k > \lambda_c \\
0 & \text{if} & \lambda_k \leq \lambda_c 
\end{cases}
$$

### What will motion magnification errors? 

The difference between the estimated motion $\hat{I}(x, t)$ and the actual motion $\tilde{I}(x, t)$.

### Why the lowpass1 and lowpass2 keep updating in the code?

Accumulate filter states to filter the video signal in the time domain, rather than depending only on the current/previous frame.

### Why updating the filter equals to computing the temporal derivative?

The temporal derivative is the rate of change of a signal with respect to time. By updating the filter, the motion is estimated by the temporal changes in the signal.

$$\frac{dI}{dt} = \frac{I(t) - I(t-1)}{dt}$$

### Why r1 and r2 are used in the code?

They are the ratio of the current frame to the previous frame, controlling the response speed of the filter:

- When r approaches 1, the filter responds faster to the input signal and is able to capture higher frequency changes.

- When r approaches 0, the filter responds more slowly to the input signal and can only capture changes in lower frequencies.

A more academic explanation of above 2 questions would be the following.

## What is a first-order digital lowpass filter?

:::tip
一阶数字低通滤波器（first-order digital lowpass filter）通常是 IIR滤波器（Infinite Impulse Response filter）的一种。
:::

:::tip
传递函数（Transfer Function）是描述系统输入和输出之间关系的函数。在频域中，传递函数是输入信号和输出信号的傅里叶变换之间的比值。

对于一个线性时不变系统（LTI系统），传递函数 $H(s)$ 定义为输出信号的拉普拉斯变换 $Y(s)$ 与输入信号的拉普拉斯变换 $X(s)$ 之间的比值：

$$ H(s) = \frac{Y(s)}{X(s)} $$

其中：

$H(s)$ 是传递函数。
$Y(s)$ 是输出信号的拉普拉斯变换。
$X(s)$ 是输入信号的拉普拉斯变换。
$s$ 是复频域变量。
在离散时间系统中，传递函数通常用 $z$ 变换表示：

$$ H(z) = \frac{Y(z)}{X(z)} $$

其中：

$H(z)$ 是离散时间系统的传递函数。
$Y(z)$ 是输出信号的 $z$ 变换。
$X(z)$ 是输入信号的 $z$ 变换。
$z$ 是复频域变量。
:::

:::tip
拉普拉斯变换（Laplace Transform）是一种数学变换方法，用于将一个函数从时间域转换到复频域。

对于一个时间域函数 $f(t)$，其拉普拉斯变换 $F(s)$ 定义为：

$$ F(s) = \mathcal{L}{f(t)} = \int_{0}^{\infty} f(t) e^{-st} , dt $$

其中：

- $F(s)$ 是 $f(t)$ 的拉普拉斯变换。
- $f(t)$ 是时间域函数。
- $s$ 是复频域变量，通常表示为 $s = \sigma + j\omega$，其中 $\sigma$ 和 $\omega$ 是实数，$j$ 是虚数单位。

逆拉普拉斯变换用于将复频域函数 $F(s)$ 转换回时间域函数 $f(t)$，其定义为：

$$ f(t) = \mathcal{L}^{-1}{F(s)} = \frac{1}{2\pi j} \int_{\gamma - j\infty}^{\gamma + j\infty} F(s) e^{st} , ds $$

其中：

- $f(t)$ 是 $F(s)$ 的逆拉普拉斯变换。
- $F(s)$ 是复频域函数。
- $\gamma$ 是实数，使得积分路径位于 $F(s)$ 的所有奇点的右侧。
:::

:::tip
Z变换（Z Transform）是一种数学变换方法，用于将一个离散时间序列从时间域转换到复频域。

对于一个离散时间序列 $x[n]$，其Z变换 $X(z)$ 定义为：

$$ X(z) = \mathcal{Z}{x[n]} = \sum_{n=-\infty}^{\infty} x[n] z^{-n} $$

其中：

- $X(z)$ 是 $x[n]$ 的Z变换。
- $x[n]$ 是离散时间序列。
- $z$ 是复频域变量，通常表示为 $z = re^{j\omega}$，其中 $r$ 是幅度，$\omega$ 是角频率，$j$ 是虚数单位。
:::

It is a kind of "moving average" filter, which is used to smooth the signal and remove high-frequency noise. Given input signal $x[n]$ and output signal $y[n]$, the first-order digital lowpass filter can be represented by the following difference equation:

$$y[n] = (1 - \alpha) y[n-1] + \alpha x[n]$$

where $\alpha$ is the filter coefficient, which controls the amount of smoothing applied to the signal. A smaller $\alpha$ value results in less smoothing, while a larger $\alpha$ value results in more smoothing. EVM sets $\alpha$ as motion frequency.

And its transfer function in the Z domain is:

$$H(z) = \frac{Y(z)}{X(z)} = \frac{\alpha}{1 - (1 - \alpha)z^{-1}}$$

where $H(z)$ is the transfer function, $Y(z)$ is the output signal in the Z domain, and $X(z)$ is the input signal in the Z domain.

:::tip
通过对差分方程进行Z变换，可以得到系统的传递函数。

对 $y[n]$ 进行Z变换：
$$ \mathcal{Z}{y[n]} = Y(z) $$

对 $(1 - \alpha) y[n-1]$ 进行Z变换：
$$ \mathcal{Z}{(1 - \alpha) y[n-1]} = (1 - \alpha) Y(z) z^{-1} $$

对 $\alpha x[n]$ 进行Z变换：
$$ \mathcal{Z}{\alpha x[n]} = \alpha X(z) $$

将这些结果代入差分方程的Z变换中：

$$ Y(z) = (1 - \alpha) Y(z) z^{-1} + \alpha X(z) $$

将所有 $Y(z)$ 项移到方程的左边：

$$ Y(z) - (1 - \alpha) Y(z) z^{-1} = \alpha X(z) $$

提取 $Y(z)$：

$$ Y(z) \left[1 - (1 - \alpha) z^{-1}\right] = \alpha X(z) $$

解出传递函数 $H(z) = \frac{Y(z)}{X(z)}$：

$$ H(z) = \frac{Y(z)}{X(z)} = \frac{\alpha}{1 - (1 - \alpha) z^{-1}} $$
:::

## What is a first-order Butterworth lowpass filter?

Given a frequncy $f_c$ and a sampling rate $f_s$, the first-order Butterworth lowpass filter can be represented by the following difference equation:

$$y[n] = \frac{-b[1] y[n-1] + a[0] x[n] + a[1] x[n-1]}{b[0]}$$

where $a[0] = \frac{1}{1 + \sqrt{2} \pi f_c / f_s}$, $a[1] = a[0]$, $b[0] = 1$, $b[1] = \frac{1 - \sqrt{2} \pi f_c / f_s}{1 + \sqrt{2} \pi f_c / f_s}$.

And its transfer function in the Z domain is:

$$H(z) = \frac{Y(z)}{X(z)} = \frac{a[0] + a[1]z^{-1}}{b[0] + b[1]z^{-1}}$$

where $H(z)$ is the transfer function, $Y(z)$ is the output signal in the Z domain, and $X(z)$ is the input signal in the Z domain.

:::tip
对 $y[n]$ 进行Z变换：
$$ \mathcal{Z}{y[n]} = Y(z) $$
对 $-b[1] y[n-1]$ 进行Z变换：
$$ \mathcal{Z}{-b[1] y[n-1]} = -b[1] Y(z) z^{-1} $$
对 $a[0] x[n]$ 进行Z变换：
$$ \mathcal{Z}{a[0] x[n]} = a[0] X(z) $$
对 $a[1] x[n-1]$ 进行Z变换：
$$ \mathcal{Z}{a[1] x[n-1]} = a[1] X(z) z^{-1} $$
将这些结果代入差分方程的Z变换中：
$$ Y(z) = \frac{-b[1] Y(z) z^{-1} + a[0] X(z) + a[1] X(z) z^{-1}}{b[0]} $$
将所有 $Y(z)$ 项移到方程的左边：
$$ Y(z) \left[1 + b[1] z^{-1}\right] = a[0] X(z) + a[1] X(z) z^{-1} $$
提取 $Y(z)$：
$$ Y(z) = \frac{a[0] + a[1] z^{-1}}{b[0] + b[1] z^{-1}} X(z) $$
解出传递函数 $H(z) = \frac{Y(z)}{X(z)}$：
$$ H(z) = \frac{Y(z)}{X(z)} = \frac{a[0] + a[1] z^{-1}}{b[0] + b[1] z^{-1}} $$
:::

## Why the output of these filters are shifted?

The output of these filters is shifted because the filters are causal and have a delay in their response. The shift is due to the time it takes for the filter to process the input signal and produce the output signal.

![Butterworth VS IIR Filter](/butterworh_iir_filter.png)

:::tip
相位响应（Phase Response）是描述滤波器对输入信号的相位变化的影响。它表示输入信号的每个频率分量在通过滤波器后，其相位发生了多少变化。相位响应在信号处理和滤波器设计中非常重要，因为它影响信号的时间特性和波形。

对于一个线性时不变系统（LTI系统），其传递函数 $H(s)$ 或 $H(z)$ 可以表示为复数形式：

$$ H(s) = |H(s)| e^{j\theta(s)} $$

或

$$ H(z) = |H(z)| e^{j\theta(z)} $$

其中：

$|H(s)|$ 或 $|H(z)|$ 是幅度响应（Magnitude Response），表示滤波器对不同频率分量的增益。
$\theta(s)$ 或 $\theta(z)$ 是相位响应，表示滤波器对不同频率分量的相位变化。

相位失真（Phase Distortion）：如果滤波器的相位响应不是线性的，不同频率分量会经历不同的相位变化，导致信号波形的失真。这在音频处理和通信系统中尤其重要，因为相位失真会影响信号的保真度和清晰度。

群延迟（Group Delay）：群延迟是相位响应的导数，表示信号的不同频率分量通过滤波器时的时间延迟。理想情况下，群延迟应该是常数，这样所有频率分量都经历相同的时间延迟，保持信号的波形不变。
:::