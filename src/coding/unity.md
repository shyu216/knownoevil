---
title: Unity 的基本使用
icon: mug-hot
---

### How to add package?

Normally just add the package and it can be compiled to target platform. But some packages like `Emgu.CV` uses native runtime dependencies on windows, so may not work when building files for android.

If some package does not exist in `Unity Package Manager`, can use `NuGet` to install it, such as `Math.NET`.

### How to link something to a script?

Add this script into the `Inspector` of a game object, and then drag something into the script's field. Be careful that it may overwrite the statement in the script.

You may then create an instance of other `MonoBehaviour` scripts, and set such things to this instance. But the game logic will not be executed, because the instance is not attached to any game object in the scene.

### What is a MonoBehaviour?

Implement game logic, using `Awake()`, `Start()`, `Update()`, `FixedUpdate()`, `OnDestroy()`, etc.

### How to draw curve?

Use particle system to emit particles, and modify the emitter's position over time. And suggested to use custom estimating space.

### How to use GPU?

The compute shader. And pass the image by `RenderTexture` and other data by `ComputeBuffer`. Remember to double check the data type, and thread group size.

Better to `new` them in the `Start()` method, and `Release()` them in the `OnDestroy()` method. Frequently `new` in the `Update()` method may cause memory leak.

#### How to write a compute shader?

- [https://blog.csdn.net/dby73/article/details/103206805](https://blog.csdn.net/dby73/article/details/103206805)

GPU is single instruction multiple thread (SIMT) architecture, so the compute shader is written in a way that each thread can run independently. For example, use ternary operator `?:` to handle different cases, instead of using `if-else` statements.

It uses High Level Shading Language (HLSL) to write the shader code, it is c-like. There are some common functions:
- step(edge, x)：如果x >= edge，返回1，否则返回0。常用于阈值判断，避免if分支。
- lerp(a, b, t)：线性插值，在a和b之间按t比例混合，t=0时为a，t=1时为b。
- clamp(x, min, max)：将x限制在[min, max]区间内，超出则取边界值。

### What is a texture?

A texture is a 2D image that can be applied to a 3D model or used in a shader. Normally it stores the RGB and alpha values of each pixel in floating point from 0 to 1.



### How to use a DL model in Unity?

Use the `Sentis` package. Removed `Ops` and `IBackend` methods, use the functional API to create and edit models instead. It means you do not have many operations for tensor.

#### How to accelerate the model?

- use smaller input size, from 640 to 320, the speed decreases from 220ms to 170ms.
- use `Quantization` to reduce the model size, but failed
  - `YOLO` do not support quantization to `int8` for `onnx`, see [https://docs.unity3d.com/Packages/com.unity.sentis@2.1/manual/quantize-a-model.html](https://docs.unity3d.com/Packages/com.unity.sentis@2.1/manual/quantize-a-model.html)
  - `Sentis` supports quantization to `Uint8`, but the model only reduces memory usage, not speed, see [https://docs.unity3d.com/Packages/com.unity.sentis@2.1/manual/quantize-a-model.html](https://docs.unity3d.com/Packages/com.unity.sentis@2.1/manual/quantize-a-model.html)
  - `onnx`'s `quantize_static()` needs calibration data, see [https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html)
- use `GPU` to accelerate the model, but failed
  - `YOLO` says that `onnx` is better for `CPU`
  - `Oculus` says that `Sentis` does not support `NPU` of `Quest 3`, see [https://developers.meta.com/horizon/documentation/unity/unity-pca-sentis/](https://developers.meta.com/horizon/documentation/unity/unity-pca-sentis/)



### What is a Pose?

The position (x, y, z) and rotation (x, y, z, w) of an object in 3D space.