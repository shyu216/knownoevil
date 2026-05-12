---
title: Camera, Lenses and Light Field
icon: note-sticky
---

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=90798049&bvid=BV1X7411F744&cid=178277138&p=19" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

非常简单的笔记。

视场角fov=2arctan（一般胶片宽度除以焦距），胶片默认以35mm为标准，焦距focal length就是镜头+胶片+光线形成的三角形的高。

曝光量exposure=时间x光强。由光圈f-stop（F数的数是直径的倒数），快门shutter，iso gain感光度增益来控制。

透镜：平行光过焦点，过透镜中心不折射，光路可逆。

高斯薄透镜定理，焦距倒数=物距倒数+相距倒数

懵圈circle of confusion，不在焦平面的物体发出的光会在成像平面形成一个圆。

带失焦模糊的光线追踪。

景深depth of field，清楚的范围，和光圈和焦距有关。

light field和lumigraph是一个东西，两个课题组同时发现的。一个物体任意位置向任意方向发出的所有光。一个点s+一个角度theta定义一条光线。两个点（u，v，s，t）也能定义一条光线。苍蝇复眼。先拍照，再聚焦。

全光函数P（theta角度1，phi角度2，lambda不同波长的光，timestamp不同时间点即电影，xyz不同位置即全息）即人眼看见的这个世界。

光场相机，原本相机记录的irradiance被拆开成小radiance了。
- irradiance，表面所有入射光总能量
- radiance，一个方向的入射光能量
- illuminance，人眼可见光版本的irradiance

问题，光场相机的分辨率=一张2d图分辨率x方向分辨率。

人眼感知的是spectral power distribution谱功率密度，光在不同波长的分布。颜色是感知。杆状细胞感知光强，锥型细胞感知颜色。不同人区别很大。同色异谱。

CIE颜色空间，luminance亮度，chromaticity色度xyz，x+y+z=1。