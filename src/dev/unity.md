---
title: Unity
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

### What is a texture?

A texture is a 2D image that can be applied to a 3D model or used in a shader. Normally it stores the RGB and alpha values of each pixel in floating point from 0 to 1.