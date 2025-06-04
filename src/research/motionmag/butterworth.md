---
title: Step-by-Step Derivation of IIR Butterworth Low-Pass Filter
icon: wrench
timeline: true
tag:
    - Signal Processing
---

- reference: `scipy.signal.butter`, `Mathnet.Filtering.Butterworth`
- reading: https://blog.csdn.net/zengxy3407/article/details/132035202

## How to design a Butterworth filter?

You can design 5 types of Butterworth filters, that are, high-pass, low-pass, band-pass, band-stop, and notch filters, with pass-band frequency $f_p$ and stop-band frequency $f_s$, pass-band ripple (maximum loss in the pass-band) $r_p$ and stop-band attenuation (minimum attenuation in the stop-band) $r_s$.

Given these parameters, you can then obtain the order of the filter $n$ and the critical frequency $w_c$.

Higher order filters have sharper cutoffs. Critical frequency is the frequency at which the gain of the filter drops to $1/\sqrt{2}$ (-3 dB).

## How to obtain the numerator and denominator coefficients of the transfer function?

(Note that $a$ and $b$ are different from major resources, where $a$ is the denominator and $b$ is the numerator.)

Let's assume $a$ is the numerator and $b$ is the denominator, the **transfer function** of the filter is given by:

$$
H(s) = \frac{Y(s)}{X(s)} = \frac{a(s)}{b(s)} = \frac{a_0 + a_1 s + a_2 s^2 + \ldots + a_n s^n}{b_0 + b_1 s + b_2 s^2 + \ldots + b_n s^n}
$$


where $s$ is the complex frequency variable.

### What is a transfer function?

A **transfer function** is a mathematical representation of the relationship between the input and output of a linear time-invariant (LTI) system in the frequency domain.

---

For example, the **differential equation** of a first-order low-pass Butterworth filter is given by:


$$ y[n] = \frac{-b[1] y[n-1] + a[0] x[n] + a[1] x[n-1]}{b[0]} $$

where $x[n]$ is the input signal, $y[n]$ is the output signal.

### What is a differential equation?

A **differential equation** is an equation that describes the relationship between the input and output of a system in the time domain.

---


The **poles** is the set of values of $s$ that make the denominator $b(s)$ equal to zero, and the **zeros** is the set of values of $s$ that make the numerator $a(s)$ equal to zero.

Given the order of the filter $n$, the poles can be calculated as follows:

$$
s_k = \left\{ w_c \cdot e^{\frac{i \pi (2k + n - 1)}{2n}}\mid k = 1, \ldots, n \right\}.
$$

The transfer function can then be expressed as:

$$
H(s) = \frac{\omega_c^n}{\prod_{k=0}^{n-1} (s - s_k)}
$$

The relationship between the analog signal and the digital signal can be established using the **bilinear transform**, which maps the analog frequency $s$ to the digital frequency $z$:

$$
s = \frac{2}{T} \cdot \frac{1 - z^{-1}}{1 + z^{-1}}
$$

where $T$ is the sampling period.

The bilinear transform introduces frequency **warping**. Prewarping is often applied to correct the cutoff frequency:
$$
\omega_c = \frac{2}{T} \tan\left(\frac{\omega_c T}{2}\right)
$$

The transfer function in the digital domain can then be expressed as:

$$
H(z) = H(s) \bigg|_{s = \frac{2}{T} \cdot \frac{1 - z^{-1}}{1 + z^{-1}}}
$$



### Example: First-Order Butterworth Filter

First compute analog Transfer Function:
$$
   H(s) = \frac{\omega_c}{s + \omega_c}
$$
Given bilinear Transform (with prewarping):
$$
   s = \frac{2}{T} \frac{1 - z^{-1}}{1 + z^{-1}}, \quad \omega_c = \frac{2}{T} \tan\left(\frac{\omega_c T}{2}\right)
$$
Then compute digital Transfer Function:
$$
   H(z) = \frac{\omega_c}{\frac{2}{T} \frac{1 - z^{-1}}{1 + z^{-1}} + \omega_c} = \frac{\omega_c \frac{T}{2} (1 + z^{-1})}{(1 - z^{-1}) + \omega_c \frac{T}{2} (1 + z^{-1})} = \frac{\tan\left(\frac{\omega_c T}{2}\right) (1 + z^{-1})}{(1 - z^{-1}) + \tan\left(\frac{\omega_c T}{2}\right) (1 + z^{-1})}
$$

**But** results do not match the `scipy.signal.butter`'s.