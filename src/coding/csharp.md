---
title: C# 的基本使用
icon: mug-hot
---

### What is `yield` in C#?

- `yield return` allows you to return elements from a collection one at a time, enabling lazy evaluation and efficient memory usage.
- When you use `yield return` in an iterator method, it returns an `IEnumerator` object.
- You can iterate through the elements using the `MoveNext()` method to advance to the next item and the `Current` property to access the current element.

### What is the visibility in C#?

- **public**: Accessible from any other code in the same assembly or another assembly that references it.
- **private**: Accessible only within the containing class or struct.
- **protected**: Accessible within its class and its child classes.

### What is the inheritance of C#?

- **abstract**: Empty, must be implemented by derived classes.
- **virtual**: Have content, can be overridden in derived classes.

