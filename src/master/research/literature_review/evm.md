---
title: Eulerian Video Magnification for Revealing Subtle Changes in the World
shortTitle: EVM
icon: note-sticky
timeline: true
tag:
    - Image Processing
    - Computer Vision
    - Motion Magnification
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