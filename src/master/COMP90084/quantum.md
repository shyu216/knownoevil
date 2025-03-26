---
title: 量子计算的复习笔记
icon: bookmark
category:
  - UniMelb
  - 24S2
tag:
  - Quantum Computing
  - Linear Algebra
  - Complex Numbers
---

### What is Observables？

(Page 125 of the textbook)

- Observables are represented by hermitian operators. The result of an observation is always an eigenvalue of the hermitian. 
- The expression $\langle \psi| \Omega |\psi \rangle$ represents the expected value of observing on $|\psi \rangle$. 
- Observables in general do not commute. This means that the order of observation matters. Moreover, if the commutator of two observables is not zero, there is an intrinsic limit to our capability of measuring their values simultaneously.

### What is Measurement?

(Page 129 of the textbook)

- The end state of the measurement of an observable is always one of its eigenvectors. 
- The probability for an initial state to collapse into an eigenvector of the observable is given by the length squared of the projection. 
- When we measure several observables, the order of measurements matters.

### What is Dynamics?

(Page 132 of the textbook)

- Quantum dynamics is given by unitary transformations. 
- Unitary transformations are invertible; thus, all closed system dynamics are reversible in time (as long as no measurement is involved). 
- The concrete dynamics is given by the Schr  ̈odinger equation, which determines the evolution of a quantum system whenever its hamiltonian is specified.

### What is density matrix?

A matrix that describes the state of a quantum system. It could be pure or mixed states. 

For example, the density matrix $\rho$ of a state $|\psi \rangle$ is as follows:

- Pure states: $\rho = |\psi \rangle \langle \psi|$
- Mixed states: $\rho = \sum_i p_i |\psi_i \rangle \langle \psi_i|$

The Trace of the density matrix is always 1.

### How to distinguish between pure and mixed states?

Single-qubit pure states are represented by points on the Bloch sphere, while mixed states
are represented by points inside the Bloch sphere.

Purity is a measure of the mixedness of a state. The purity of a state is 1 if and only if the state is pure.

- $Purity = Tr(\rho^2) = \begin{cases} 1 & \text{if pure} \\ <1 & \text{if mixed} \end{cases}$

Question: Given trace and determinant, how to determine the purity?

For example, if $Tr(\rho) = 1$ and $det(\rho) = 1/16$.
  
::: info
对于一个 $2 \times 2$ 的密度矩阵 $\rho$，其迹和行列式可以用来计算纯度。具体步骤如下：

设 $\rho$ 为 $2 \times 2$ 的密度矩阵，其特征值为 $\lambda_1$ 和 $\lambda_2$。
根据密度矩阵的性质，$\lambda_1 + \lambda_2 = Tr(\rho)$ 和 $\lambda_1 \cdot \lambda_2 = det(\rho)$。
纯度 $Tr(\rho^2) = \lambda_1^2 + \lambda_2^2$。
利用迹和行列式的关系，可以推导出：

$$Tr(\rho^2) = (\lambda_1 + \lambda_2)^2 - 2 \lambda_1 \lambda_2$$

将迹和行列式代入公式：

$$Tr(\rho^2) = (Tr(\rho))^2 - 2 \cdot det(\rho)$$

对于给定的 $Tr(\rho) = 1$ 和 $det(\rho) = 1/16$，计算纯度：

$$Tr(\rho^2) = 1^2 - 2 \cdot \frac{1}{16} = 1 - \frac{1}{8} = \frac{7}{8}$$

因此，纯度为 $\frac{7}{8}$。
:::

### What is trace?

The trace of a matrix is the **sum** of its diagonal elements.

### What is determinant?

The determinant of a matrix is a scalar value that can be computed from the **multiple** of its eigenvalues.

For example, the determinant $det$ of a 2x2 matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ is $ad - bc$.

### How to calculate the eigenvalues and eigenvectors of a matrix?

Given a matrix $A$, the eigenvalues $\lambda$ and eigenvectors $v$ satisfy the following equation:

$Av = \lambda v$

- Step 1: Calculate the characteristic equation of the matrix $A$: $det(A - \lambda I) = 0$
- Step 2: Solve the characteristic equation to get the eigenvalues $\lambda$
- Step 3: Substitute the eigenvalues back into the equation $Av = \lambda v$ to get the eigenvectors $v$

How to calculate the eigenvalues and eigenvectors given a matrix $A = \frac{1}{\sqrt{2}} \begin{bmatrix} 0 & 1+i \\ 1-i & 0 \end{bmatrix}$?

::: info
步骤 1: 计算矩阵 $A$ 的特征方程：$det(A - \lambda I) = 0$，得到 $\lambda^2 - 1 = 0$

步骤 2: 解特征方程得到特征值 $\lambda = \pm 1$

步骤 3: 将特征值代入方程 $Av = \lambda v$ 得到特征向量 $v =\begin{bmatrix} 1 \\ \frac{\sqrt{2}}{1+i}  \end{bmatrix},\begin{bmatrix} -1 \\ \frac{\sqrt{2}}{1+i} \end{bmatrix}$

对于 $\lambda_1 = 1$，我们有 $A v_1 = v_1$，即 $\frac{1}{\sqrt{2}}\begin{bmatrix} -\sqrt{2} & 1+i \\ 1-i & -\sqrt{2} \end{bmatrix} \begin{bmatrix} a \\ b \end{bmatrix} = 0$

展开并得到线性方程组：$\begin{cases} -\sqrt{2} \cdot a + (1+i) \cdot b = 0 \\ (1-i) \cdot a - \sqrt{2} \cdot b = 0 \end{cases}$

简化并解方程组：如果 $a=1$，则 $b = \frac{\sqrt{2}}{1+i}$
:::
Note: as $-1 = e^{i\pi}$, $^{4}\sqrt{-1} = e^{i\frac{\pi}{4}} = \sin(\frac{\pi}{4}) + i \cos(\frac{\pi}{4}) = \frac{1}{\sqrt{2}} + \frac{i}{\sqrt{2}}$.

### What is a state?

$|\psi \rangle = \alpha |0 \rangle + \beta |1 \rangle$

- Amplitude: $\alpha, \beta$, where amplitudes can be complex numbers
- probability: $|\alpha|^2, |\beta|^2$, where the square of the modulus can be the multiplication of the complex conjugate of the amplitude with itself (not simple multiplication!)

### What is dense coding?

Dense coding is a quantum communication protocol that allows two parties to communicate two classical bits by sending a single qubit.

After preparing the Bell pair, Bob (the reciever) will hold onto the second qubit, and Alice (the sender)
will apply the Z and/or X gates to the ﬁrst qubit according to the two classical bits she wants to send.

Then Alice transmits the ﬁrst qubit to Bob, who can then apply the CNOT gate between the ﬁrst and
the second qubit, and apply the Hadamard gate to the ﬁrst qubit to
recover the two classical bits.

With quantum entanglement, Alice can send two classical bits of information by send-
ing only one qubit. However, to fully decode the information, Bob  needs two qubits: the qubit sent by
Alice and the qubit that Bob holds.


### What is Quantum Key Distribution (QKD)?

To teleport the state of a qubit to another qubit.

BB84 is an early QKD protocol.

- Step 1: Alice prepares a random qubit `010011` and bases `ZXYXZY`, and sends the qubits to Bob.
- Step 2: Bob measures the qubits with random bases `ZYZYXZ`.
- Step 3: Alice and Bob share their bases publicly and discard the qubits measured in different bases.
- Step 4: Alice and Bob compare a subset of their qubits to check for eavesdropping.
- Step 5: Eeavesdropping can be detected if some qubits with the same bases have different values.

If there is a earvesdropper, the qubits will be different with $\frac{1}{4}$ probability. Namely they have $\frac{3}{4}$ probability to overlook the eavesdropper.

### What is Quantum Phase Estimation?

The goal is to find the eigenvalues of a unitary operator $U$, given state $|\psi \rangle$.

$$U|\psi \rangle = e^{i \varphi} |\psi \rangle$$

where $\varphi$ is the phase. So-called the phase estimation.

How?

::: info
使用一组量子比特 $a_0, a_1, \cdots, a_{t-1}$ 来估计相位 $\varphi$。具体来说，相位 $\varphi$ 可以表示为：

$$\varphi = 0.8 = \frac{a_0}{2^1} + \frac{a_1}{2^2} + \cdots + \frac{a_{t-1}}{2^t}$$

这意味着我们可以通过测量这些量子比特的状态来得到相位的二进制小数表示。每个量子比特 $a_i$ 对应于相位 $\varphi$ 的二进制表示中的一位，其中 $a_0$ 是最高有效位，$a_{t-1}$ 是最低有效位。

例如，如果我们有三个量子比特 $a_0, a_1, a_2$，并且测量结果为 $a_0 = 1, a_1 = 1, a_2 = 0$，那么相位 $\varphi$ 可以表示为：

$$\varphi = \frac{1}{2^1} + \frac{1}{2^2} + \frac{0}{2^3} = 0.75$$

通过这种方式，我们可以利用量子比特的测量结果来精确估计相位 $\varphi$。
:::

### What is Quantum Fourier Transform (QFT)?

To use a set of qubits to estimate the phase of a quantum state.

$$
\text{QFT}|\theta\rangle = \frac{1}{\sqrt{2^n}} \sum_{k=0}^{2^n-1} e^{2\pi i \theta k} |k\rangle
$$

::: info
每个变量的含义：

- $\text{QFT}$：量子傅里叶变换操作。
- $|\theta\rangle$：输入的量子态，通常表示为一个相位 $\theta$。
- $\frac{1}{\sqrt{2^n}}$：归一化因子，确保变换后的量子态的总概率为 1，其中 $n$ 是量子比特的数量。
- $\sum_{k=0}^{2^n-1}$：求和符号，表示对所有可能的基态 $|k\rangle$ 进行求和。
- $e^{2\pi i \theta k}$：复指数函数，表示相位因子，其中 $2\pi$ 是周期，$i$ 是虚数单位，$\theta$ 是输入态的相位，$k$ 是求和变量。
- $|k\rangle$：计算基态，表示量子态在标准基中的表示。

通过量子傅里叶变换，我们可以将输入的量子态 $|\theta\rangle$ 转换为一个新的量子态，该量子态是所有基态 $|k\rangle$ 的叠加，每个基态的系数由复指数函数 $e^{2\pi i \theta k}$ 确定。
:::

What is the relation between unitary operator $U$ and the number of qubits $m$?

::: info
在量子计算中，使用两个量子比特的例子来说明如何应用 Hadamard 门（忽略归一化因子）后所需的操作：

$$
|\psi\rangle|00\rangle + |\psi\rangle|01\rangle + |\psi\rangle|10\rangle + |\psi\rangle|11\rangle \rightarrow |\psi\rangle|00\rangle + U^1|\psi\rangle|01\rangle + U^2|\psi\rangle|10\rangle + U^3|\psi\rangle|11\rangle
$$

我们可以看到，操作 $U$ 的幂次与相应基态的二进制表示相同。例如，当估计寄存器处于状态 $|11\rangle$ 时，应用 $U^3$，因为 $11_2 = 3_{10}$。因此，所需的操作可以通过在第一个量子比特上控制应用 $U$，在第二个量子比特上控制应用 $U^2$ 来实现。

所以，问题中的操作是：在第 $m$ 个估计量子比特上控制应用 $U^{2^m}$。
:::

One more point of importance. Generally it is not possible to represent a given phase exactly using a
limited number of estimation qubits. Thus, there is typically a distribution of possible outcomes, which
induce an error in the estimation. We’ll see an example in the code below. The error decreases expo-
nentially with the number of estimation qubits, but the number of controlled-$U$ operations increases
exponentially. The math is such that these eﬀects basically cancel out and the cost of estimating a
phase with error $\varepsilon$ is proportional to $\frac{1}{\varepsilon}$.

### What is RSA public key encryption?

Alice creates a public encryption function that anyone can encrypt, but only she can decrypt.

$K = (n, p, q, e, d)$
- $n = pq$, where $p$ and $q$ are large prime numbers
- $e \in (1, \phi(n))$ is a random number
- $ed \equiv 1 \mod \phi(n)$, where $\phi(n)$ called Euler's totient function
- $\equiv$ 同余，在模下相等
- public: $(n, e)$, private: $(n, d)$
- 原理：如果 $ed \equiv 1 \mod \phi(n)$，则$x^{ed} \mod n = x$
- Bob: $E_k(x) = x^e \mod n$
- Alice: $D_k(y) = y^d \mod n$

::: info
费马小定理/欧拉定理: 如果x,n互质，则$x^{\phi(n)} \equiv 1 \mod n$

证明1: $\prod_{i=1}^{p-1} A_i \equiv \prod_{i=1}^{p-1} aA_i \mod p$, 当p是质数，a不是p的倍数时成立。因为两边的p-1个数里都有p-1种可能的余数，两边实际等价的

证明2: $a^{p-1} = (1 + a - 1)^{p-1}$，展开后，除了第一项，其他项都是$p$的倍数，所以等于1
:::


### What is Shor's algorithm?

Attempt to use period finding to factorize a number though quantum computing.

The classical part:

- Step 1: Choose a random number $a$ between 1 and $n-1$
- Step 2: Find the greatest common divisor of $a$ and $n$, if it is not 1, then we have found a factor
- Step 3: If the greatest common divisor is 1, then we find the period $r$ of $a^x \mod n$
  - Quantum part applies here
- Step 4: If $r$ is odd, go back to step 1
- Step 5: If $r$ is even, then $a^{r/2} \mod n$ is a non-trivial factor of $n$

The quantum part:

- Step 1: Prepare two registers, one for the input and one for the data processing
- Step 2: Apply Hadamard gates to the first register to create a superposition of all possible inputs
- Step 3: Apply a quantum operation that computes $a^x \mod n$ in superposition
- Step 4: Measure the second register to collapse the superposition
- Step 5: Use the quantum Fourier transform to estimate the period $r$


  