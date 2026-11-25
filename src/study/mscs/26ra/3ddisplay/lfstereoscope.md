---
title: "The Light Field Stereoscope"
icon: note-sticky
---

::: details Chinese Translation
# 光场立体镜：通过分解式近眼光场显示实现具有调焦线索的沉浸式计算机图形学

**原文标题：** *The Light Field Stereoscope: Immersive Computer Graphics via Factored Near-Eye Light Field Displays with Focus Cues*  
**作者：** Fu-Chung Huang、Kevin Chen、Gordon Wetzstein  
**机构：** Stanford University（斯坦福大学）

> **译注：** 本文按原论文结构翻译。重要学术术语首次出现时保留英文原名或缩写；公式、变量、文献作者与参考文献题名尽量沿用原文。图表根据原文内容作中文说明，未重新绘制原图。

## 摘要（Abstract）

近年来，虚拟现实（Virtual Reality，VR）重新成为一种备受关注的技术，并且借助低成本手机组件，已经能够以较低成本实现。尤其是高分辨率微显示器（micro displays）、低延迟方向追踪器（orientation trackers）以及现代图形处理器（GPU）的发展，使低成本沉浸式体验成为可能。进一步改善 VR 视觉舒适度仍面临的一个主要挑战，是所有立体显示器（stereoscopic displays）固有的辐辏—调节冲突（vergence-accommodation conflict）。准确再现所有深度线索（depth cues）对于视觉舒适度至关重要。

本文将成熟的立体显示原理与新兴的分解式光场技术（factored light field technology）相结合，提出首个同时支持高图像分辨率和调焦线索（focus cues）的可穿戴 VR 显示器。该系统向每只眼睛呈现一个光场（light field），相较于传统近眼显示器（near-eye displays），能够提供更自然的观看体验。由于眼盒（eye box）仅略大于瞳孔尺寸，秩一光场分解（rank-1 light field factorization）便足以生成正确或近似正确的调焦线索；系统不需要采用时间复用图像显示（time-multiplexed image display），也不需要眼动追踪（gaze tracking）。

本文分析了四维（4D）光场空间中的镜头畸变（lens distortions），并利用系统所支持的高维成像方式进行校正。实验还表明，与相关近眼显示器相比，该系统在分辨率和视网膜模糊（retinal blur）质量方面均有显著改善。最后，本文分析了此类显示器的衍射极限（diffraction limits）。

**分类：** I.3.7 [计算机图形学（Computer Graphics）]：三维图形与真实感——虚拟现实（Virtual Reality）  
**关键词：** 计算显示（computational displays）、调焦线索（focus cues）、光场（light fields）

## 1 引言（Introduction）

过去几年，虚拟现实获得了广泛关注。尽管许多新兴消费产品主要面向游戏和娱乐应用，近眼显示技术仍能为整个社会提供价值，可作为教育、协作工作、远程会议、科学可视化、遥控车辆、训练与仿真、基础视觉研究、恐惧症治疗以及外科训练等领域的新一代平台（例如 Hale and Stanney, 2014）。例如，沉浸式 VR 已被证明能够有效用于治疗创伤后应激障碍（post-traumatic stress disorder）；它也是现代微创手术系统（如达芬奇手术系统 da Vinci surgical system）的重要组成部分。

要实现这些应用，并使 VR 真正适用于日常和长期使用，创造视觉舒适的体验至关重要。当前一代 VR 显示器支持人类视觉的多种深度线索，包括运动视差（motion parallax）、双眼视差（binocular disparity）、双眼遮挡（binocular occlusions）和辐辏（vergence）。然而，包括头戴式显示器（Head-Mounted Displays，HMDs）在内的立体显示器通常不支持调焦线索。调焦线索与辐辏被人为地解耦：观察者在改变双眼辐辏角度的同时，却必须始终将眼睛聚焦在固定距离处，即显示屏或其虚像所在的距离。这就产生了辐辏—调节冲突（vergence-accommodation conflict）。

这种冲突可能导致视觉不适和疲劳、视疲劳（eyestrain）、复视（diplopic vision）、头痛、恶心、图像质量下降，甚至可能对儿童发育中的视觉系统造成病理性影响（Rushton and Riddell, 1999）。视觉科学领域的近期研究表明，调焦线索在深度感知中起着关键作用（例如 Marshall et al., 1996）。具体而言，正确或近似正确的调焦线索能够显著改善立体对应匹配（stereoscopic correspondence matching）；使三维形状感知更加真实（veridical）；并提高人们区分不同深度的能力（Held et al., 2012）。辐辏与调节线索在人脑中存在神经耦合，因此，支持全部深度线索的显示器有望改善长期使用时的视觉舒适度和表现。

我们的目标是提供一种实用、低成本且具有可穿戴形态的显示技术，使其能够支持调焦线索。受计算多层显示器（computational multilayer displays）以及压缩光场显示器（compressive light field displays）近期进展的启发（Seetzen et al., 2004；Lanman et al., 2010；Wetzstein et al., 2011, 2012），我们设计并实现了一种近眼立体光场显示器，称为 **Light Field Stereoscope（光场立体镜）**。

光场立体镜将传统立体显示器的设计思想（例如 Wheatstone, 1838）与现代分解式光场合成（factored light field synthesis）方法相结合。它并非呈现放大的二维图像，而是向观察者的左右眼分别呈现不同的四维光场。通过具有有限尺寸的瞳孔观察这些光场，可以产生正确或近似正确的视网膜模糊，并使眼睛能够在场景内部自由调焦。

本工作的一个重要认识是：分解式近眼光场显示器与其他类型的光场显示器，在优势和挑战方面存在显著差异。堆叠 LCD 所造成的亮度损失在沉浸式环境中并非特别关键，因为人类视觉系统能够快速适应相应的亮度水平。计算量增加也是可控的，因为 VR 显示器通常由个人计算机驱动，而非由可穿戴电子设备直接驱动。最后，单眼目标光场所需的眼盒尺寸远小于电视类显示器所需的视场范围。因此，仅使用两块堆叠 LCD 面板，并通过秩一光场分解，就能够在不进行时间复用的情况下实现较高图像质量。

本文的主要贡献如下：

- 提出 Light Field Stereoscope，作为一种近眼显示技术，支持全部双眼和单眼深度线索，包括调节（accommodation）和视网膜模糊（retinal blur）。
- 使用现成消费电子组件设计并实现显示系统原型，并通过高效的 GPU 光场分解实现实时驱动。
- 分析所提出技术的基本限制，并表明光场立体镜能够实现比现有近眼显示器更高的分辨率和更好的调焦线索。
- 展示利用光场相机（light field camera，例如 Lytro Illum）采集的立体光场，能够生成适用于此类显示器的实拍内容（live-action content）。

**图 1：** 光场立体镜是一种近眼显示器，通过立体图像合成提供正确或近似正确的调焦线索，从而实现沉浸式计算机图形学。与呈现传统二维图像不同，该显示器向每只眼睛呈现四维光场，使观察者能够在场景内部调焦。设备由两块堆叠的液晶显示器（Liquid Crystal Displays，LCDs）构成，并通过非负光场分解（nonnegative light field factorization）驱动。作者在 GPU 上实时执行分解计算。图中还展示了前后 LCD 的显示图案，包括双眼视图和逆镜头畸变处理结果。

**图 2：** 分解式近眼光场显示器示意图。两块堆叠的透明 LCD 以乘法方式调制均匀背光。通过一组透镜观察时，显示器除了提供传统 VR 显示器所具备的双眼视差，还能提供调焦线索。

**图 3：** 相关调焦支持显示技术的概览。对比多焦平面显示器（multi-focal-plane displays）、基于微透镜的近眼显示器（microlens-based near-eye displays）和分解式近眼光场显示器（factored near-eye light field displays）的分辨率、硬件复杂度、形态尺寸、亮度、计算成本、调节范围和视网膜模糊质量。论文指出，光场立体镜是首个能够在小型形态下同时提供高图像分辨率和调焦线索的设备；星号表示存在衍射限制。

### 2 相关工作（Related Work）

#### 头戴式显示器（Head-mounted Displays）

自 20 世纪 60 年代首次展示电子头戴式显示器以来（Sutherland, 1968），大量研究和商业开发工作一直致力于使该技术变得实用。Cakmakci and Rolland（2006）以及 Kress and Starner（2013）近期发表了关于头戴式显示器的综述。Oculus Rift 和 Google Glass 等开发者套件的出现，预示着消费级 HMD 将在不久的将来广泛普及。然而，这些设备在视觉舒适度方面仍有很大的改进空间；缓解大多数 HMD 固有的辐辏—调节冲突，就是其中一个重要方向。

#### 支持调焦线索的显示器（Displays Supporting Focus Cues）

已有多种显示技术能够支持调焦线索，但尚无一种被证明适合实际可穿戴显示设备。

例如，全息术（holography）有望合成物理上准确的波前（wavefronts），从而支持人类视觉的全部深度线索（Benton and Bove, 2006）。然而，全息技术对特征尺寸、算法计算量以及光源相干性（coherence）的要求极高，因此在可预见的未来，动态全息术并不适合 HMD。

体积显示器（volumetric displays）通过机械旋转结构（Favalora, 2005；Jones et al., 2007）或电子可切换漫射器（electronically switchable diffusers）（Sullivan, 2003），在一定程度上克服了上述限制，形成可发光的显示体积，用户能够在其中进行调节。然而，这类设备的形态尺寸通常不适合可穿戴应用。

与体积显示器密切相关的是多焦平面显示器（multi-focal-plane displays）。这类显示器可以利用分光镜（beam splitters）（Akeley et al., 2004）、可切换透镜（switchable lenses）（Liu et al., 2008；Love et al., 2009）或振动薄膜（vibrating membranes）（Schowengerdt and Seibel, 2006），通过少量以加法方式叠加的平面来近似连续体积。

在近眼显示应用中，需要为每只眼睛分别合成多平面体积，以提供正确的立体线索，并近似实现单眼调焦线索。在大部分可见深度范围内，仅依靠单眼线索区分不同深度的能力（即“轴向分辨率”，axial resolution）相对有限，因此只有少数平面的多焦平面显示器，其性能权衡与人类视觉系统的限制较为匹配。

MacKenzie et al.（2010）报告称，约五个焦平面、相邻平面间隔为 1 屈光度（diopter），足以支持从 25 cm 到光学无穷远（optical infinity）的调节。然而，即使是这样数量适中的深度平面，也要求显示器至少达到 300 Hz 刷新率，才能使每个深度平面以 60 Hz 更新（约为人类视觉的临界闪烁融合频率，critical flicker fusion）。遗憾的是，只有专用显示技术能够提供数百 Hz 的刷新率，而且目前尚未用于可穿戴显示器。时间复用图像呈现还可能导致可感知的闪烁，这通常是不理想的。

本文主张采用由堆叠 LCD 实现的近眼光场显示器。多焦平面显示器与多层 LCD 显示器的主要区别在于：前者的成像过程是加法式的，而后者是乘法式的。本文表明，这一细微差异使系统能够在更大的深度范围内支持正确或近似正确的调焦线索，或者减少所需的显示平面数量。

由于眼盒范围内观察到的视差相对较小，本文提出的技术不需要时间复用。这既减少了可感知闪烁，也使系统不再需要机械运动的光学元件，并显著放宽了显示器刷新率要求。需要注意的是，本文的光场显示方法一次性覆盖整个眼盒，因此不需要眼动追踪。相比之下，现有多焦平面显示器通常会将瞳孔限制在固定位置。

#### 支持调焦线索的光场显示器（Light Field Displays Supporting Focus Cues）

近期研究表明，光场显示器能够实现非常小型化的近眼显示设备（Lanman and Luebke, 2013），甚至可以用于光学透视显示模式（see-through display modes）（Hua and Javidi, 2014）。通过在靠近眼睛的小型屏幕上放置微透镜阵列（microlens array），近眼光场显示器可以合成看起来漂浮在设备外部的图像，使观察者能够在有限范围内进行调节。类似思想近期也被用于在显示器中校正观察者的视觉像差（visual aberrations），包括离焦（defocus）和高阶像差（higher-order aberrations）（Huang et al., 2014）。

然而，先前大多数工作所使用的微透镜（Lanman and Luebke, 2013；Hua and Javidi, 2014），在空间分辨率与支持的深度范围之间形成了直接权衡。近眼针光显示器（near-eye pinlight displays）也存在类似权衡（Maimone et al., 2014）。超多视点显示器（super-multi-view displays）（Takaki et al., 2011）能够克服这一权衡，但需要多块平铺屏幕，因此对大多数近眼显示器而言并不实用。

本文建立在分解式多层光场显示器的近期进展之上（Lanman et al., 2010；Wetzstein et al., 2011, 2012；Maimone et al., 2013），但首次将这一方法用于近眼 VR 显示器。Maimone et al.（2013）展示了一种电视类光场显示器，通过头部追踪、时间复用显示和特殊定向背光，支持立体视差、运动视差和调焦线索，但其系统并不适合可穿戴应用。

上述技术与近眼光场显示器之间的主要区别在于：后者通常只需要支持调焦线索，而不必支持其他深度线索，因为左右眼分别使用独立的微显示器。这极大简化了显示器设计。与本文最接近的工作是 Maimone and Fuchs（2013）提出的多层光学透视 AR 显示器。然而，透视 LCD 会降低峰值亮度，并在较远距离的真实物体上引入强烈衍射模糊，因此目前不适合户外 AR 应用。

作为面向 VR 应用的光场显示器与多焦平面显示器的混合方案，本文配置实现的图像分辨率远高于基于微透镜的近眼 VR 显示器，而且其刷新率可由商用屏幕轻松提供。在沉浸式 VR 应用中，峰值亮度降低并非特别关键，且本文系统不依赖眼动追踪。总体而言，分解式光场显示的优势似乎非常适合沉浸式 VR 应用。

### 3 支持调焦线索的 HMD 的要求（Requirements on Focus-Supporting HMDs）

本节简要概述文献中沉浸式近眼显示器的目标规格。Kress and Starner（2013）总结了其中一些参数。例如，消费级应用所需的眼盒尺寸，即瞳孔能够移动的区域（见图 4），约为 10 × 10 mm。

瞬时瞳孔直径平均约为 3–4 mm，但为整个眼盒显示光场，可以覆盖眼盒内不同的瞳孔位置以及一定范围的瞳孔直径。

人类视觉系统（Human Visual System，HVS）的视野（field of view）水平方向约为 190°，其中只有约 120° 用于双眼视觉；垂直方向约为 135°（Ruch and Fulton, 1960）。

人类视觉的“正常”或矫正后横向分辨率通常以 20/20 表示，对应的角分辨率为 1 角分（1 minute of arc）。HVS 的时间分辨率通常用临界闪烁融合阈值表示，可近似为 60 Hz，但具体取决于适应亮度（adaptation luminance）和空间频率（spatial frequency）（Kelly, 1979）。以此为参考，在不考虑头部运动的情况下，头戴式显示器的延迟要求至少应达到 17 ms。实际使用中的自我中心运动（egocentric motions）对显示刷新率和延迟提出了显著更高的要求；要实现真正沉浸式体验，需要超低延迟。

传统近眼显示器不支持调焦线索，因此文献中很难找到严格的规格要求。对于超多视点显示器，Takaki（2006）指出，每个二维瞳孔至少需要两条光场光线（或视图），才能触发调节。这似乎是一个非常乐观的下限；较新的研究表明，约 3 × 3 条光线进入瞳孔，才能实现合理的视网膜模糊近似（Huang et al., 2014）。

基于微透镜的近眼光场显示器（Lanman and Luebke, 2013）建立在与超多视点显示器相似的思想上，但其调节范围与空间分辨率直接相互制约（Zwicker et al., 2006）。因此，它们只能在高分辨率和宽调焦范围之间二选一，无法同时实现两者。多焦平面显示器（Akeley et al., 2004；Love et al., 2009）可以被理解为具有稀疏加法式深度层的“三维光场显示器”，这意味着生成合理的调焦线索可能并不需要完整的四维光场。

由于难以实现物理上完全准确的调焦，核心问题是：如果实用显示器只能近似正确的调焦线索，那么这种近似需要达到什么精度，才能创造合理且舒适的观看条件？

对于多焦平面显示器，预期其焦距范围应覆盖约 25 cm 至光学无穷远。文献报告，借助视网膜模糊和调节进行单眼深度辨别（monocular depth discriminability）的能力约为 ±0.25–0.3 屈光度（即 1 / 距离，单位为米）（MacKenzie et al., 2010）；调节主要由中等空间频率驱动，范围约为每度 4–10 个周期（cycles per degree，cpd）（Love et al., 2009）。这些数值为新兴显示技术提供了参考标准。

本文原型实现了 87° × 91° 的视场，调节范围约为 0.2 m 至 1.2 m（覆盖了调节深度线索发挥作用的大部分深度范围；Cutting and Vishton, 1995），端到端系统延迟约为 65 ms。尽管本文展示了高质量调焦线索，但其他系统参数，尤其是延迟和视场，仍需进一步改善，才能与商业解决方案竞争。更多实现细节见第 5 节。

**图 4：** 所提出近眼光场显示系统的技术示意图。两块具有衰减能力的空间光调制器（Spatial Light Modulators，SLMs，例如 LCD）安装在设备内部。级联的 SLM 以乘法方式调制背光（图中未显示）。通过放大透镜观察时，会形成 SLM 的虚像和放大像：其中一个接近光学无穷远，另一个靠近观察者。用于渲染计算机生成内容的视锥（viewing frusta）在垂直方向对称、在水平方向不对称，如图下方所示。

### 4 分解式光场合成（Factored Light Field Synthesis）

本节简要回顾采用简单放大透镜的分解式近眼显示器的成像过程。我们将透镜像差（lens aberrations）纳入成像模型，并推导使用双层秩一光场显示器进行光场合成的逆问题（inverse problem）公式。设备及其最重要的设计参数如图 4 所示。

#### 4.1 单个放大透镜（Single Magnifier）

考虑一个物体，其与焦距为 \(f\) 的透镜之间的距离为 \(d'\)。透镜将在距离 \(d\) 处形成实像或虚像。这两个距离之间的关系可以由高斯薄透镜公式（Gaussian thin lens formula）近似表示：

\[
\frac{1}{d'}+\frac{1}{d}=\frac{1}{f}
\quad\Longleftrightarrow\quad
d=\frac{1}{\frac{1}{f}-\frac{1}{d'}}.
\tag{1}
\]

对于近眼显示器，我们尤其关注微显示器位于靠近透镜位置的情况，即 \(d' \leq f\)。此时，显示器会在透镜同一侧形成虚像，并且图像被放大（见图 4）。放大率为：

\[
M=\frac{f}{f-d'}.
\tag{2}
\]

例如，一个物理宽度为 \(w'\) 的微显示器，其虚像将被感知为宽度 \(w=Mw'\)。由两个堆叠的衰减式微显示器 \(t_1\) 和 \(t_2\) 合成的二维“平面世界”（flatland）光场为：

\[
\bar{l}(y,\nu_y)=\prod_{k=1}^{2}t_k\left(\phi_k(y,\nu_y)\right)
\tag{3}
\]

\[
=\prod_{k=1}^{2}t_k\left(
\frac{1}{M}\left(
y+\frac{(\nu_y-y)(d_{lf}-d_k)}{d_{lf}+d_e}
\right)\right).
\]

其中，\(d_e\) 为眼距（eye relief），\(d_{lf}\) 为用户定义的透镜与光场原点之间的距离，\(d_k\) 为微显示器虚像与透镜之间的距离。本文采用双平面参数化方法（two-plane parametrization）表示光场（Levoy and Hanrahan, 1996）：\(y\) 表示光场平面上的坐标，\(\nu_y\) 表示瞳孔平面上的绝对坐标。映射函数 \(\phi:\mathbb{R}^2\rightarrow\mathbb{R}\) 用于计算光线 \((y,\nu_y)\) 与某一距离处平面的交点。

该公式不限制瞳孔直径；眼球可以在称为眼盒（eye box）的有限范围内自由转动，因此 \(\nu_y\in[-e/2,e/2]\)。在实际系统中，透镜直径和眼距可能会限制可观察到的发射光场部分。为简化表示，本文在符号表达中忽略这一限制。上述成像模型适用于透镜与微显示器中心对齐的情况，如图 4 上方所示的近眼光场显示器侧视图。

#### 4.2 立体放大透镜（Stereo Magnifier）

立体配置中的成像过程与公式（3）非常相似，但需要考虑瞳距（interpupillary distance，IPD），记为 \(d_{ipd}\)。因此，左右眼（L/R）的光场表达式略有不同：

\[
\bar{l}_{R/L}(x,\nu_x)=
\prod_{k=1}^{2}t_k\left(
\phi_k(x,\nu_x)\pm\frac{d_{ipd}}{2}
\right).
\tag{4}
\]

需要注意的是，眼睛的视野在水平方向上并不对称。对于具有宽视场的近眼显示器，这会产生不对称的观察视锥，如图 4 下方所示。

#### 4.3 镜头畸变（Lens Distortions）

在实际应用中，放大透镜会对任何显示器发出的图像或光场产生光学畸变。镜头畸变通常主要由径向项（radial term）决定（Brown, 2000），该项能够准确建模场曲率（field curvature），但对其他类型像差只能进行近似。

在商业 VR 显示器中，可以通过对图像坐标施加横向预畸变（lateral pre-distortion），部分补偿径向畸变。常见的解析形式为：

\[
x_d=x(1+k_1r^2+k_2r^4),
\]

其中 \(r^2=x^2+y^2\)，\(k_1,k_2\) 是与镜头相关的畸变系数。

然而在实际中，仅使用横向畸变无法准确描述全部畸变。例如，场曲率会使一个三维平面重新成像为曲面，从而影响调焦线索和感知到的图像模糊。光场显示器具有独特优势：它可以部分补偿这类高维畸变，其模型为：

\[
l_\phi(x,\nu_x)=
l(x+\phi_x(x,\nu_x),\nu_x+\phi_\nu(x,\nu_x)).
\tag{5}
\]

为了与传统近眼显示器以及计算机视觉文献中使用的径向畸变模型保持一致（例如 Zhang, 2000），本文将畸变函数建模为径向对称多项式：

\[
\phi(r)=ar^2+br^4.
\]

由此，横向畸变为：

\[
\phi_x(x,\nu_x)=\phi(r)\phi'(r)
\approx x(1+k_1r^2+k_2r^4),
\tag{6}
\]

其中 \(k_1=2a^2\)，\(k_2=6ab\)。相应的角度光场畸变为：

\[
\phi_\nu(x,\nu_x)=\tan^{-1}(\phi'(r))
=\tan^{-1}(2ar+4br^3).
\tag{7}
\]

系数 \(a\) 和 \(b\) 可以根据波长进行选择，从而同时考虑色差（chromatic lens aberrations）。本文通过在求解后续所述的分解问题之前，使用逆畸变函数 \(\phi_x^{-1}\) 和 \(\phi_\nu^{-1}\) 对目标光场进行预畸变，实现对上述像差的部分补偿（见图 6）。

**图 5：** 光场立体镜原型的不同视角。  
**图 6：** 未进行校正时，会出现明显的枕形畸变（pincushion distortion，左图），而且两块显示器上的十字图案无法正确对齐。采用适当的四维逆畸变校正后，可以修正这一问题（右图）。

#### 4.4 光场分解（Light Field Factorization）

将公式（3）和公式（4）结合并离散化，可以得到完整的四维成像模型：

\[
\bar{l}=\Phi_1t_1\circ\Phi_2t_2.
\tag{8}
\]

其中，\(\bar{l}\in\mathbb{R}^{L}\) 和 \(t_{1/2}\in\mathbb{R}^{N}\) 分别是目标光场和显示图案的向量化形式；\(\circ\) 表示 Hadamard 积（Hadamard product），也就是逐元素乘积。映射函数 \(\phi_k\) 被编码在矩阵 \(\Phi_k\in\mathbb{R}^{L\times N}\) 中。每个矩阵都是稀疏矩阵，并具有明确的结构：

\[
\Phi_k=
\begin{bmatrix}
(\Phi_k^{(1)})^T &
(\Phi_k^{(2)})^T &
\cdots &
(\Phi_k^{(V)})^T
\end{bmatrix}^{T}.
\]

将瞳孔平面上的光场位置离散为 \(V\ 个位置后，每个子矩阵 \((\Phi_k^{(j)})^T\) 描述显示器上的每个像素如何映射到光场的特定视图。

可以将目标函数写为：

\[
\min_{\{t_1,t_2\}}
\left\|
\beta\bar{l}-(\Phi_1t_1)\circ(\Phi_2t_2)
\right\|_2^2,
\quad
\text{s.t. }0\leq t_{1/2}\leq 1.
\tag{9}
\]

随后使用迭代方式求解，更新规则与近期分解式显示器研究中的方法类似（Lanman et al., 2010；Wetzstein et al., 2012；Hirsch et al., 2014；Heide et al., 2014）。显示器 1 的更新规则为：

\[
t_1\leftarrow t_1\circ
\frac{\Phi_1^T\left(\beta\bar{l}\circ(\Phi_2t_2)\right)}
{\Phi_1^T\left(\bar{l}\circ(\Phi_2t_2)\right)+\epsilon}.
\tag{10}
\]

显示器 2 的图案通过类似规则更新，只需交换下标。该过程遵循交替最小二乘（Alternating Least Squares，ALS）策略，即交替执行每次更新。

本文指出，对于所研究的秩一分解（rank-1 factorization）这一特定情况，公式（10）在数值上等价于近期分解式超分辨率显示器研究中使用的秩一残差更新（rank-1 residue update）（Heide et al., 2014）。已有研究已展示了在 GPU 上实时实现此类算法的可行性（Wetzstein et al., 2012；Heide et al., 2014）。

在不考虑时间复用显示系统的情况下，核心问题是：本文提出的显示器能否通过秩一光场分解提供足够的自由度，从而实现高质量光场合成？本文认为答案是肯定的，并将在后文给出实验验证。

**表 1：** 每帧执行 5 次 NMF 迭代的运行时间（单位：ms）。

| 模型 | 几何复杂度（顶点数 / 面数） | 单目绘制 | 单目求解 | 立体绘制 | 立体求解 | 立体 FPS |
|---|---:|---:|---:|---:|---:|---:|
| lion | 5K / 10K | 4.5 | 57.5 | 9 | 54.5 | 15.7 |
| hands | 10K / 20K | 7.5 | 55.0 | 14 | 49.5 | 15.7 |
| bench | 30K / 50K | 15.5 | 49.5 | 31 | 37.5 | 14.6 |
| armadillo | 25K / 50K | 15.5 | 50.5 | 29.5 | 41.0 | 14.2 |

### 5 实现与评估（Implementation and Assessment）

#### 硬件（Hardware）

作者使用不同液晶面板构建了多个原型，最终发现 Chimei Innolux N070ICG-LD1 面板成本较低且容易获得（例如可在 eBay 上购买）。不过，其分辨率限制为 1280 × 800 像素。所有原型使用的放大透镜均为可在 eBay 上购买的非球面透镜（aspheric lenses），焦距 \(f=5\) cm，直径为 2 英寸。

两块透镜相距 6.4 cm。LCD 的虚像分别位于 19 cm 和 123 cm 处（分别对应 5.26 D 和 0.81 D）；而物理面板与透镜的距离分别为 3.8 cm 和 4.8 cm。显示器外壳由 Adafruit 的 3D 打印可穿戴视频护目镜改造而来，并使用 Makerbot Replicator 2 制造。

软件运行在 Dell XPS 8700 工作站上，配置为 Intel i7 CPU、8 GB RAM 和 NVIDIA GTX 970 GPU。

#### 软件（Software）

所有软件均使用 C++、OpenGL 和 CUDA 实现。图像渲染由 OpenGL 完成，第 4 节所述的分解算法则使用 CUDA 实现。这使系统能够达到实时帧率。

例如，对于简单场景，系统以 640 × 800 像素分辨率和 5 × 5 视图渲染、分解并显示立体光场：在 NVIDIA GTX 970 上约为 20 fps，在 NVIDIA Quadro K6000 上约为 35 fps。表 1 列出了 NVIDIA GTX 970 在若干复杂场景下的性能。

分解过程在每一帧中只执行一次 NMF 迭代，并将其结果作为下一帧的初始估计。因此，静态物体会在多帧过程中逐步得到优化，而快速运动物体则会出现少量运动模糊（motion blur，见补充视频）。增加每帧 NMF 迭代次数可以减少分解引起的运动模糊，但会降低帧率。总体而言，延迟和运动模糊仍是可能抵消部分调焦线索优势的挑战。在未来的分解式近眼光场显示研究中，改善端到端延迟至关重要。

立体光场的渲染时间约为单目光场渲染时间的两倍。不过，立体模式下的求解时间略短于单目模式，这是因为离轴视锥（off-axis frustum）渲染使面板之间的重叠像素更少。资源绑定（resources-binding）具有固定开销：单目模式为 4 ms，立体模式为 8 ms。运行时间统计基于 5 次迭代，每次面板求解迭代耗时不到 10 ms。最后，作者观察到求解时间基本不受模型几何复杂度影响，实际上主要取决于面板分辨率。

#### 校准（Calibration）

作者测量了显示器的伽马曲线，得到 \(\gamma=2.4\)，并校准了显示器的黑电平（black levels）。黑电平在分解过程中得到考虑，而伽马校正则在显示分解图案之前完成。

面板之间的横向位移尽可能通过机械方式校正，轻微的未对齐则进一步通过软件修正。镜头畸变是一个问题（见图 6 左图），它不仅会导致图像变形，还会使两块堆叠面板上的图像无法正确对齐。作者通过交互式调整畸变参数，并按照第 4.3 节所述对光场进行逆畸变处理，来校正这些问题。

求解器会考虑后方显示面板上观察到的衍射模糊，并进行部分校正（更多细节见 Hirsch et al., 2014 的补充材料）。不过，由于衍射模糊，较远物体的图像质量下降是不可避免的。

#### 实验结果（Results）

图 7 展示了以单目模式捕获的多种结果；对应的立体结果见补充材料。作者还在图 8 和补充视频中评估了中间焦距下的结果。如前所述，距离前面板较远的物体会受到衍射模糊影响，无法完全清晰。此外，秩一约束在某些情况下可能限制位于物理显示面板虚像之间的三维物体的图像清晰度。

**图 7：** 使用光场立体镜原型拍摄的多种计算机生成场景。所有结果均由本文提出的秩一光场分解生成，最右列展示了分解后的面板图案。所有展示的光场中均能清晰观察到视网膜模糊。轻微的莫尔效应（moire effects）对人眼几乎不可见，但可通过专门针对该显示配置设计的漫射器进一步减轻。前面板的衍射模糊会限制后方物体的可见分辨率。

**图 8：** 原型设备在对焦于前面板、后面板以及两者之间的虚拟物体时拍摄的照片。所提出的秩一分解即使对不位于物理面板上的虚拟物体，也能提供高质量图像。

### 6 分析与评估（Analysis and Evaluation）

#### 6.1 视网膜模糊质量（Quality of Retinal Blur）

调焦线索包含两个不同特征：视网膜模糊（retinal blur）和调节（accommodation）。视网膜模糊会触发眼睛的调节反应，因此本文评估了不同近眼显示器所产生的视网膜模糊质量，结果如图 9 所示。

具体而言，作者评估了 Lanman and Luebke（2013）近期提出的基于微透镜的近眼光场显示器、加法式多焦平面显示器（additive multi-focal-plane displays）（例如 Akeley et al., 2004；Schowengerdt and Seibel, 2006；Liu et al., 2008；Love et al., 2009），以及本文提出的分解式乘法多层显示器（factored, multiplicative multi-layer display）。

所有这些近眼显示器都能够近似物理真实的视网膜模糊（图 9 中间偏左列）。在所有情况下，作者均使用 15 × 15 个视图和 8 mm 的眼盒尺寸来模拟光场。尽管瞬时瞳孔尺寸明显小于模拟眼盒，但选择这些参数有助于直观展示不同瞳孔尺寸下的效果。

除层间距外，所有模拟设备参数均与原型设备相同（见第 5 节）；层间距则采用早期原型的参数，即 8.37 D 和 1.54 D。作者认为，实验观察到的趋势可以推广到其他硬件配置，包括实际原型所采用的特定层间距。加法层使用 Wetzstein et al.（2011）提出的断层求解器（tomographic solver）进行优化，该求解器能够在 \(\ell_2\) 误差意义下提供最优解。

基于微透镜的近眼显示器可能提供足够高质量的视网膜模糊，但其固有的空间分辨率损失对于大多数应用而言似乎无法接受（图 9 中间列）。

当白色物体位于物理显示层上、背景为黑色时，所有多平面显示器都能够提供物理上准确的视网膜模糊（图 9 底行）。当物体位于物理层之间时，视网膜模糊只能近似实现。在这种情况下，加法层和乘法层所产生的视网膜模糊近似效果似乎相当（底行中间偏右列和最右列）。

然而，对于明亮背景前方的暗色物体，加法式显示器无法再现准确的视网膜模糊（顶行）。这是因为光线只能被发射，却无法被阻挡。因此，即使物理显示层上的暗色十字图案，也会因为背景光透过它而显得半透明；此时的视网膜模糊并不符合物理真实情况。乘法层在这种情况下能够产生更好的视网膜模糊。

**图 9：** 三种不同近眼显示器的视网膜模糊评估。作者将十字图案放置在距离观察者眼睛不同的位置，模拟不同显示类型的输出，并评估不同调节距离下的视网膜模糊。为便于理解，前后距离被设置为与模拟多层显示器的两个物理层重合。对于位于中间的十字图案，多层显示器需要进行某种插值。光场使用 15 × 15 个视图进行模拟，这使得基于积分成像（integral imaging）的近眼光场显示器出现明显分辨率损失（红框）。对于黑色背景上的白色十字，加法式和乘法式多层显示器能够实现近似相同质量的视网膜模糊（底行）。然而，对于白色背景上的黑色十字，加法层无法准确再现视网膜模糊，因为环境光会透过物体，使其呈现半透明效果（顶行）。当物体直接位于物理显示层上时，乘法层能够产生物理上准确的视网膜模糊（绿框）；其他位置则只能近似实现（橙框）。框的颜色表示质量等级。

#### 6.2 单眼遮挡（Monocular Occlusions）

上一小节针对单个物体评估了视网膜模糊。然而，大多数有趣的场景包含许多不同物体，它们可能会彼此部分遮挡。在这种情况下，单眼遮挡（monocular occlusion）在瞳孔范围内的再现质量，是决定视网膜模糊质量的关键因素。

作者在图 10 中评估了加法式和乘法式多平面显示器的这一特性。与图 9 中的实验类似，当明亮物体被暗色物体遮挡时，加法式显示器无法产生准确的视网膜模糊。由于光线无法被阻挡，暗色物体总是呈现半透明状态。

乘法式多平面显示器能够在瞳孔尺寸范围内准确再现遮挡，因此可以更好地近似复杂场景中的物理真实视网膜模糊。

**图 10：** 重建光场的左眼视图，展示了背景中的明亮物体与前景中的暗色物体。加法式多焦平面显示器无法准确再现这种情况下的单眼遮挡（上排），因为远处物体发出的明亮光线总会透过前景中的暗色物体。乘法层能够在整个眼盒范围内准确再现遮挡（下排），因此对复杂场景中的视网膜模糊提供了更好的近似。

#### 6.3 衍射极限（Diffraction Limits）

任何光学系统都受到衍射（diffraction）的基本限制。对于本文讨论的堆叠式显示架构，后方显示面板的虚像始终需要通过前方显示面板观察。因此，当像素密度足够高时，衍射预计会降低后方面板的图像质量，如图 11 所示。

当一个小孔径接近光波波长的尺寸时，就会发生衍射。根据孔径的尺寸和形状，单个像素可能产生类似艾里斑（Airy pattern）的角度衍射图案。可以利用艾里斑第一个极小值对应的衍射角 \(\theta\)，估算衍射极限下的光斑尺寸。该角度可近似表示为：

\[
M_1p\sin(\theta)=1.22\lambda,
\tag{11}
\]

其中，\(\lambda\) 为光的波长，\(p\) 为物理显示面板上的像素尺寸。衍射图案在自由空间传播至后方面板的虚像后，会形成尺寸为 \(s\) 的衍射光斑：

\[
s=2d\tan\left(
\sin^{-1}\left(\frac{1.22\lambda}{M_1p}\right)
\right)
=
\frac{2.44d\lambda}{M_1p}
\sqrt{1-\left(\frac{1.22\lambda}{M_1p}\right)^2}.
\tag{12}
\]

其中 \(d=d_2-d_1\) 是两层之间的距离。如果 \(s>M_2p\)，则后方面板的可观察分辨率不再由其像素密度决定，而是受到前方面板衍射的限制。

除了可能造成分辨率损失之外，衍射还会限制瞳孔尺寸为 \(e\) 时，最多能够进入瞳孔的不同角度采样数量 \(V_e\)：

\[
V_e=\frac{ed}{\max(s,M_2p)(d_e+d_1)}.
\tag{13}
\]

只要 \(s<M_2p\)，采样率就由几何约束决定。然而，衍射模糊增加会降低角度采样率，从而限制系统生成高质量调焦线索的能力。

图 12 分析了后方面板的空间分辨率衍射极限，以及观察者瞳孔范围内的角度采样率。作者模拟了一个一维显示器，参数为：波长 \(\lambda=555\) nm（明视觉函数 luminosity function 的峰值）、放大透镜焦距 \(f=5\) cm、眼距 \(d_e=1\) cm；前后面板的虚像分别位于 19 cm 和 123 cm 处（后者接近光学无穷远）。

随着前方面板分辨率提高，后方面板的衍射极限分辨率会迅速下降至不可接受的范围（图 12 左图）。为了保持高分辨率观看体验，应使用相对低分辨率的前方面板。

作者还绘制了直径为 3 mm 的瞳孔所能接收的角度光场采样数量（图 12 右图）。对于较低显示分辨率，角度采样率受几何约束限制，即后方面板虚像的特征尺寸；对于较高分辨率面板，角度采样率则转而受到衍射限制。

作者使用瑞利判据（Rayleigh criterion）两倍的保守距离，作为两条衍射光线在后方面板上相交时的最小间距。尽管一维角度采样率始终高于两个视图这一绝对最低要求（Takaki, 2006），但大多数情况下也高于近期研究采用的三个视图经验标准（Huang et al., 2014），同时在模拟条件下从未超过六个视图。

在该实验中，前后面板被设定为具有相同分辨率。模拟忽略了显示器可能存在的 RGB 子像素结构；对于某些方向，这些结构可能会略微降低预测上限，例如水平方向的衍射模糊可能比垂直方向更严重。

**图 11：** 衍射限制示意图。物理面板的像素尺寸 \(p\) 在两个虚像中似乎被放大，两个虚像之间相距 \(d\)。前方面板的衍射会产生尺寸为 \(s\) 的模糊光斑，从而降低感知分辨率。观察者瞳孔范围内的角度采样率由后方面板的衍射极限分辨率决定；为了支持调焦线索，至少需要有两个不同视图进入同一瞳孔。

**图 12：** 分辨率衍射极限（左）和角度采样率衍射极限（右）。前方面板分辨率越高，通过衍射在后方面板上产生的模糊就越大。假设观察者大部分时间会聚焦于后方面板的虚像（此处位于 1.23 m），那么只有使用较低像素密度的前方面板，才能实现高分辨率观看体验（左图）。对于固定的前方面板分辨率，右图绘制了进入 3 mm 宽瞳孔的最大光场视图数量。在约 175 dpi 之前，角度采样率受几何约束限制；分辨率更高时，角度采样率则受衍射限制。尽管如此，即使使用 500 dpi 面板，理论上仍能够实现调节。

#### 6.4 需要多少个显示平面？（How Many Display Planes are Necessary?）

加法式多平面显示器已经在最大 1 D 的层间距条件下得到充分评估（MacKenzie et al., 2010）。研究认为，要在相当大的深度范围内实现自然调节，需要约五个显示层，层间距在 0.6–1 D 之间（MacKenzie et al., 2010；Ryana et al., 2012）。

本文显示器原型仅使用两层，层间距达到 4.45 D，明显大于现有加法式显示器使用的任何层间距。作者认为，乘法式显示器改善了视网膜模糊质量，尤其能够更好地支持单眼（瞳孔内部，intra-pupillary）遮挡，因此在复杂场景中整体改善了视网膜模糊效果。

这种改善使系统能够在保持相近视网膜模糊近似质量的同时，使用更大的层间距。不过，对光场立体镜最优层间距进行详细评估和分析超出了本文范围，将留待未来工作完成。

### 7 讨论（Discussion）

本文提出了一种支持正确或近似正确调焦线索的近眼显示技术。其硬件设计结合了立体显示原理与分解式光场显示：使用两块堆叠的液晶面板，并通过非负秩一光场分解（nonnegative, rank-1 light field factorization）驱动。

光场立体镜是首个分解式或压缩式近眼显示器（factored or compressive near-eye display），与其他压缩式显示器相比具有相当独特的特征。

与电视类光场显示器不同，支持调焦的近眼显示器只需要覆盖非常小的观察区域：最多为瞳孔或眼盒的尺寸。由于基线（baseline）较小，各个光场视图非常相似，因此具有很强的可压缩性，足以使用秩一分解。

以往的分解式光场显示器（Lanman et al., 2010；Wetzstein et al., 2012；Maimone et al., 2014）需要通过高速显示面板进行时间复用，而光场立体镜可以使用普通显示面板，因为该方法不会影响显示器本身的刷新率。

本文证明，与先前提出的加法式多平面显示器相比，堆叠 LCD 所提供的乘法式成像能够更好地近似视网膜模糊线索和遮挡。最后，本文分析了所提出配置的基本分辨率限制，并展示了原型设备拍摄的实验结果。

#### 面向支持调焦显示器的电影级内容创作（Cinematic Content Creation for Focus-Supporting Displays）

作者认为，调焦线索是近眼显示器在消费市场取得成功的关键特征之一。目前大多数沉浸式 VR 显示器主要面向游戏应用，因此本文展示的大部分内容都是使用 OpenGL 实时生成，或通过光线追踪（ray tracing）离线生成的合成内容。

然而，随着近眼显示器日益普及，如何采集电影级内容将成为一个重要挑战。Jaunt VR 正在开发用于采集立体全景图像的平台，三星近期也宣布了 Project Beyond。然而，这些成像系统只能采集立体线索，并不包含本文及其他支持调焦的近眼显示器所提供的调焦线索。最终，采集立体光场全景（stereo light field panoramas）将成为不可避免的需求。

本文通过一个简单的立体光场相机配置，初步探索了面向支持调焦显示器的摄影内容采集。作者将 Lytro Illum 安装在手动平移台（manual translation stage）上（见图 13），通过移动相机依次记录两个光场，两次拍摄之间的基线对应约 6.4 cm 的瞳距。

Lytro Illum 的光圈为 f/2，焦距可在 9.5–77.8 mm 之间变化。作者使用最短焦距拍摄立体光场，对应的瞳孔／眼盒直径为 4.75 mm。图 14 展示了一个示例：采集得到的光场经过分解后，在本文近眼光场显示器原型上显示。

**图 13：** 立体光场相机。通过在平移台上移动光场相机，依次采集一对立体图像。  
**图 14：** 使用 Lytro Illum 拍摄并在光场立体镜上显示的立体光场，其前方和后方焦点结果。补充材料中还包含更多采集、分解和显示立体光场的结果。

#### 局限性（Limitations）

堆叠多块 LCD 面板会降低显示器的光通量（light throughput）。尽管这是所有基于 LCD 的多层显示器都面临的挑战，但使用该技术的沉浸式 VR 体验并不会因此明显下降。由于 VR 显示器覆盖了较大范围的视野，人类视觉系统能够快速适应相应的亮度条件。

总体而言，VR 显示器的峰值亮度并非关键因素；但对于 AR 应用，情况则完全不同，因为显示器亮度需要与明亮的背景照明直接竞争，例如户外环境。作者认为，光场立体镜最适合沉浸式 VR 应用。

作为一种计算显示器（computational display），光场立体镜由先进的非负分解算法驱动。作者使用 CUDA 实现了所提出的秩一分解，并展示了实时帧率。再次强调，VR 应用具有独特之处：显示器通常连接到工作站，而非由可穿戴设备直接驱动。因此，可以直接利用高性能 GPU 提供交互式体验。尽管如此，额外计算仍会增加端到端延迟，而这对于 VR 中的自我中心运动尤为关键。

目前，光场渲染是计算性能的瓶颈。每一帧都需要渲染 \(2\times5\times5\) 张图像，这些光场图像将作为分解算法的输入。随着渲染的光场视图数量增加（这通常是期望的），渲染时间会呈二次增长。作者预计，未来采用着色复用（shading reuse）的图形流水线（例如 Clarberg et al., 2014）能够显著加速光场渲染。

除了略微增加的延迟之外，光场立体镜的主要局限是衍射。正如第 6 节所讨论的，提高显示分辨率会增加后方面板上观察到的衍射模糊。理想情况下，光场立体镜应使用较低分辨率的前方面板（也可以采用灰度面板）和高分辨率的后方面板，以优化观看体验。

另一种方案是使用反射式微显示器（reflective micro displays），例如硅基液晶（Liquid Crystal on Silicon，LCoS）。如果像素填充率（pixel fill factor）能够接近 100%，就可以减轻衍射伪影（diffraction artifacts）。遗憾的是，作者并不知道目前有任何可用微显示器能够达到如此高的填充率。使用现成组件时，同时实现超高分辨率图像显示和高质量调焦线索可能较为困难。

尽管本文显示器设计克服了积分成像（integral imaging）中空间分辨率与角度分辨率之间固有的权衡，但系统现在受到衍射极限的约束。空间和角度超分辨率显示技术（spatial and angular super-resolution display techniques）或许能够解决这一问题，但超出了本文研究范围。

目前消费级显示器的像素间距通常为几十至数百微米。随着像素尺寸逐渐接近光波波长，全息显示技术（holographic display technologies）也可能成为支持调焦的近眼显示器的可行选择。然而，散斑（speckle）、相干照明（coherent illumination），以及高分辨率、宽视场、超小像素显示器所带来的“大数据”问题，都会构成新的挑战。

#### 未来工作（Future Work）

探索眼动追踪的可能性是一个有趣的未来研究方向。注视点光场渲染（foveated light field rendering）有望提高显示系统的帧率。此外，准确获知瞳距、瞳孔直径和瞳孔位置，可以实现自适应光场渲染，并放宽对眼盒尺寸的要求。

光场的秩与眼盒范围内观察到的视差量直接相关；眼动追踪能够缩小眼盒，并改善秩一光场分解的质量。

通过用户研究（user study）评估所提出显示器的有效性也非常重要。尽管作者使用单反相机（SLR camera）模拟真实瞳孔直径（约 4–5 mm），拍摄了许多不同场景，并展示了令人信服的视网膜模糊质量，但人眼是否能够实际产生相应的调节反应，仍需要通过实验验证。

商用自动验光仪（autorefractor）可能是验证调节反应最简单的工具。虽然使用这类设备在台式显示器上进行实验很容易，但本文设备的形态尺寸较小，无法使用作者现有的 Grand Seiko 自动验光仪进行评估：设备体积过大，而且光路无法匹配。作者认为，未来还需要开展其他类型的用户评估，才能全面评价所提出技术的有效性。

在内容采集方面，能够记录 360° 全景立体光场的光学—计算成像系统（opto-computational imaging systems）非常值得期待。最直接的方法是使用光场相机阵列，但也可能存在更优雅的方案，例如采用压缩光场摄影（compressive light field photography）（Marwah et al., 2013）。

### 8 结论（Conclusion）

光场立体镜是迈向高度沉浸且舒适的视觉体验的重要一步。除了内容、延迟、视场和分辨率之外，视觉舒适度可能也是决定新兴近眼显示器最终能否在消费市场取得成功的最重要因素之一。

沉浸式计算机图形学不仅具有娱乐价值，还能应用于教育、协作工作、远程会议、科学可视化、遥控车辆、训练与仿真以及外科训练，从而带来更广泛的社会效益。

尽管对于老年人，或虚拟场景中距离较远的物体，调焦线索带来的优势可能不那么明显，但许多应用都要求用户与触手可及范围内的物体进行交互。作者希望通过本文提出的技术，为改善视觉舒适度提供一种实用方案。

作者坚信，该技术是实现更沉浸、更舒适 VR 体验的重要进展。

## 致谢（Acknowledgements）

作者感谢 Marty Banks、Chia-Kai Liang 以及匿名审稿人提供的宝贵意见。Gordon Wetzstein 获得了 Terman Faculty Fellowship 的支持。

## 参考文献（References）

> 参考文献保留英文原始题名，以便检索和引用；作者、出版信息及卷期页码沿用原文。

- AKELEY, K., WATT, S. J., GIRSHICK, A. R., AND BANKS, M. S. 2004. A stereo display prototype with multiple focal distances. *ACM Trans. Graph. (SIGGRAPH)* 23, 804–813.
- BENTON, S., AND BOVE, V. 2006. *Holographic Imaging*. John Wiley and Sons.
- BROWN, D. 2000. Decentering distortion of lenses. *Photogrammetric Engineering* 32, 3, 444–462.
- CAKMAKCI, O., AND ROLLAND, J. 2006. Head-worn displays: a review. *Journal of Display Technology* 2, 3, 199–216.
- CLARBERG, P., TOTH, R., HASSELGREN, J., NILSSON, J., AND AKENINE-MOLLER, T. 2014. Amfs: Adaptive multi-frequency shading for future graphics processors. *ACM Trans. Graph.* 33, 4 (July), 141:1–141:12.
- CUTTING, J. E., AND VISHTON, P. M. 1995. Perceiving layout and knowing distances: The interaction, relative potency, and contextual use of different information about depth. In *Perception of Space and Motion*, 69–117.
- FAVALORA, G. E. 2005. Volumetric 3D displays and application infrastructure. *IEEE Computer* 38, 37–44.
- HALE, K., AND STANNEY, K. 2014. *Handbook of Virtual Environments*. CRC Press.
- HEIDE, F., LANMAN, D., REDDY, D., KAUTZ, J., PULLI, K., AND LUEBKE, D. 2014. Cascaded displays: Spatiotemporal superresolution using offset pixel layers. *ACM Trans. Graph. (SIGGRAPH)* 33, 4, 60:1–60:11.
- HELD, R., COOPER, E., AND BANKS, M. 2012. Blur and Disparity Are Complementary Cues to Depth. *Current Biology* 22, R163–R165.
- HIRSCH, M., WETZSTEIN, G., AND RASKAR, R. 2014. A Compressive Light Field Projection System. *ACM Trans. Graph. (Proc. SIGGRAPH)* 33, 4, 1–12.
- HOFFMAN, D. M., AND BANKS, M. S. 2010. Focus information is used to interpret binocular images. *Journal of Vision* 10, 5, 13.
- HUA, H., AND JAVIDI, B. 2014. A 3d integral imaging optical see-through head-mounted display. *OSA Opt. Exp.* 22, 11, 13484–13491.
- HUANG, F.-C., WETZSTEIN, G., BARSKY, B. A., AND RASKAR, R. 2014. Eyeglasses-free display: Towards correcting visual aberrations with computational light field displays. *ACM Trans. Graph. (SIGGRAPH)* 33, 4, 59:1–59:12.
- JONES, A., MCDOWALL, I., YAMADA, H., BOLAS, M., AND DEBEVEC, P. 2007. Rendering for an interactive 360° light field display. *ACM Trans. Graph. (SIGGRAPH)* 26, 40:1–40:10.
- KELLY, D. H. 1979. Motion and vision. II. Stabilized spatio-temporal threshold surface. *Journal of the Optical Society of America* 69, 1340–1349.
- KRESS, B., AND STARNER, T. 2013. A review of head-mounted displays (HMD) technologies and applications for consumer electronics. In *Proc. SPIE*, vol. 8720, 87200A–87200A–13.
- LANMAN, D., AND LUEBKE, D. 2013. Near-eye light field displays. *ACM Trans. Graph. (SIGGRAPH Asia)* 32, 6, 220:1–220:10.
- LANMAN, D., HIRSCH, M., KIM, Y., AND RASKAR, R. 2010. Content-adaptive parallax barriers: Optimizing dual-layer 3D displays using low-rank light field factorization. *ACM Trans. Graph. (SIGGRAPH Asia)* 29, 163:1–163:10.
- LEVOY, M., AND HANRAHAN, P. 1996. Light Field Rendering. In *ACM SIGGRAPH*, 31–42.
- LIU, S., CHENG, D., AND HUA, H. 2008. An optical see-through head mounted display with addressable focal planes. In *Proc. ISMAR*, 33–42.
- LOVE, G. D., HOFFMAN, D. M., HANDS, P. J., GAO, J., KIRBY, A. K., AND BANKS, M. S. 2009. High-speed switchable lens enables the development of a volumetric stereoscopic display. *OSA Optics Express* 17, 18, 15716–15725.
- MACKENZIE, K. J., HOFFMAN, D. M., AND WATT, S. J. 2010. Accommodation to multiple-focal-plane displays: Implications for improving stereoscopic displays and for accommodation control. *Journal of Vision* 10, 8.
- MAIMONE, A., AND FUCHS, H. 2013. Computational augmented reality eyeglasses. In *Proc. ISMAR*, 29–38.
- MAIMONE, A., WETZSTEIN, G., HIRSCH, M., LANMAN, D., RASKAR, R., AND FUCHS, H. 2013. Focus 3D: Compressive accommodation display. *ACM Trans. Graph.* 32, 5, 153:1–153:13.
- MAIMONE, A., LANMAN, D., RATHINAVEL, K., KELLER, K., LUEBKE, D., AND FUCHS, H. 2014. Pinlight displays: Wide field of view augmented reality eyeglasses using defocused point light sources. *ACM Trans. Graph. (SIGGRAPH)* 33, 4.
- MARSHALL, J. A., ARIELY, D., BURBECK, C. A., ARICLY, T. D., ROLLAND, J. P., AND MARTIN, K. E. 1996. Occlusion edge blur: A cue to relative visual depth. *OSA JOSAA* 13, 681–688.
- MARWAH, K., WETZSTEIN, G., BANDO, Y., AND RASKAR, R. 2013. Compressive Light Field Photography using Overcomplete Dictionaries and Optimized Projections. *ACM Trans. Graph. (Proc. SIGGRAPH)*.
- ROTHBAUM, B., HODGES, L., READY, D., GRAAP, K., AND ALARCON, R. 2001. Virtual reality exposure therapy for Vietnam veterans with posttraumatic stress disorder. *Ann Surg* 62, 8, 617–22.
- RUCH, T., AND FULTON, J. F. 1960. *Medical Physiology and Biophysics*. W. B. Saunders Company.
- RUSHTON, S. K., AND RIDDELL, P. M. 1999. Developing visual systems and exposure to virtual reality and stereo displays: some concerns and speculations about the demands on accommodation and vergence. *Applied Ergonomics* 30, 69–78.
- RYANA, L., MACKENZIEA, K., AND WATTA, S. 2012. Multiple-focal-planes 3D displays: A practical solution to the vergence-accommodation conflict? In *Proc. 3D Imaging (IC3D)*, 1–6.
- SCHOWENGERDT, B. T., AND SEIBEL, E. J. 2006. True 3-D scanned voxel displays using single or multiple light sources. *Journal of the Society for Information Display* 14, 2, 135–143.
- SEETZEN, H., HEIDRICH, W., STUERZLINGER, W., WARD, G., WHITEHEAD, L., TRENTACOSTE, M., GHOSH, A., AND VOROZCOVS, A. 2004. High dynamic range display systems. *ACM Trans. Graph. (SIGGRAPH)* 23, 3, 760–768.
- SULLIVAN, A. 2003. A solid-state multi-planar volumetric display. In *SID Digest*, vol. 32, 207–211.
- SUTHERLAND, I. 1968. A head-mounted three dimensional display. In *Proc. AFIPS Fall Joint Computer Conference*.
- TAKAKI, Y., TANAKA, K., AND NAKAMURA, J. 2011. Super multi-view display with a lower resolution flat-panel display. *Opt. Express* 19, 5, 4129–4139.
- TAKAKI, Y. 2006. High-Density Directional Display for Generating Natural Three-Dimensional Images. *Proc. IEEE* 94, 3.
- WATT, S., AKELEY, K., ERNST, M., AND BANKS, M. 2005. Focus cues affect perceived depth. *Journal of Vision* 5, 10, 834–862.
- WETZSTEIN, G., LANMAN, D., HEIDRICH, W., AND RASKAR, R. 2011. Layered 3D: Tomographic image synthesis for attenuation-based light field and high dynamic range displays. *ACM Trans. Graph. (SIGGRAPH)* 30, 1–11.
- WETZSTEIN, G., LANMAN, D., HIRSCH, M., AND RASKAR, R. 2012. Tensor Displays: Compressive Light Field Synthesis using Multilayer Displays with Directional Backlighting. *ACM Trans. Graph. (SIGGRAPH)* 31, 1–11.
- WHEATSTONE, C. 1838. Contributions to the physiology of vision. Part the first. On some remarkable, and hitherto unobserved, phenomena of binocular vision. *Philosophical Transactions of the Royal Society of London* 128, 371–394.
- ZHANG, Z. 2000. A flexible new technique for camera calibration. *IEEE Trans. PAMI* 22, 11, 1330–1334.
- ZWICKER, M., MATUSIK, W., DURAND, F., AND PFISTER, H. 2006. Antialiasing for automultiscopic 3D displays. In *EGSR*.

:::