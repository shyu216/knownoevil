---
title: "Split-Lohmann Multifocal Displays"
icon: note-sticky
---

2023

https://imagesci.ece.cmu.edu/files/paper/2023/Split_Lohmann_SIG23.pdf

As we gaze at the world around us, parts of it come into focus and
defocus.

一种单目显示，让光落的焦点不一样实现聚焦失焦效果。两只眼睛就两套系统。

如果把图片进行傅里叶变换，可以用大量不同frequency的光格栅（条纹图）来离散拟合。phase就是这些frequency的偏移量，有边缘特征。

但这篇文章的phase是利用lohmann透镜phase和焦距特点实现的变焦变化，和cv里面的无关。

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/9lbg8qOCjUM" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

图2里面有lohmann lens，通过两个$x^3$曲面的透镜，实现焦距的调整。把这组镜片分开，中间会有一片区域能够分成不同的光路（这里用slm调制），从而条件每个像素发出的光，最后射出系统的焦点。注意这里只是用x做公式推导，实际透镜的y方向也是有变焦效果的。



现在split lohmann两个透镜是同向的，所以画面翻转了。不过这样的系统更简单，这些透镜都不用动，让slm来实现立体显示就行了，图9。

屈光度是焦距的倒数，表示透镜有多强，焦距有多短。这里论文定了50个焦面，设定好了所以slm更高效。

slm元器件像一个镜子，但是每个地方的光走得光程不一样（lohmann透镜里面的偏移量delta），最后到的焦点也不一样，公式6。

这类“平移变焦透镜”全是$x^3$，双片反向平移叠加后，波前产生与位移量delta线性相关的二次相位项，从而实现连续变焦。因为焦点是椭球面的性质，而椭球面是$x^2$的。

另一类变焦是我们熟悉的移轴变焦。