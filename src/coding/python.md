---
title: Python 的基本使用
icon: mug-hot
---






## 变量传递

在 Python 中，**变量传递本质上是“对象引用的传递”**，但是否“引用传递”还是“复制”，取决于对象的类型和操作方式：

---

### 1. 赋值/参数传递：引用传递

- 赋值（`a = b`）或函数参数传递时，**变量只是指向同一个对象的引用**，不会复制对象本身。
- 修改对象内容会影响所有引用，但重新赋值不会影响原对象。

**示例：**
```python
a = [1, 2, 3]
b = a
b[0] = 100
print(a)  # [100, 2, 3]，a和b指向同一个list
```

---

### 2. 不可变对象（int, float, str, tuple）

- 这些类型的对象一旦创建就不能修改，赋值/传参时也是引用传递，但你无法通过引用修改原对象。

**示例：**
```python
a = 10
b = a
b = 20
print(a)  # 10，b重新指向新对象，不影响a
```

---

### 3. 可变对象（list, dict, set, 自定义class等）

- 赋值/传参时是引用传递，**通过引用可以修改原对象内容**。

**示例：**
```python
def foo(lst):
    lst.append(4)
lst = [1,2,3]
foo(lst)
print(lst)  # [1,2,3,4]
```

---

### 4. 显式复制（copy）

- `copy.copy(obj)`：浅拷贝，只复制最外层对象，内部元素还是引用。
- `copy.deepcopy(obj)`：深拷贝，递归复制所有内容，完全独立。

**示例：**
```python
import copy
a = [[1,2], [3,4]]
b = copy.copy(a)
b[0][0] = 100
print(a)  # [[100,2],[3,4]]，浅拷贝，内部元素还是引用

c = copy.deepcopy(a)
c[0][0] = 999
print(a)  # [[100,2],[3,4]]，深拷贝不影响a
```

---

### 5. 多进程/多线程


多进程（multiprocessing）下，每个进程都有独立的内存空间，所以 global 变量（如 global session_id、UDP_PORT、logging 配置等）在不同进程中不会自动同步或共享。

在主进程设置的 global 变量，子进程启动后会各自拷贝一份，互不影响。
如果你在主进程和子进程分别修改 global 变量，彼此看不到对方的更改。
如果需要多进程间共享参数，有以下方法：

用 multiprocessing.Queue、Pipe 传递数据。
用 multiprocessing.Manager() 创建共享 dict、list、Value、Namespace 等。
用 multiprocessing.shared_memory 共享大数组（Python 3.8+）。
启动子进程时，把参数作为参数传递（推荐）。

---



## 切片

- https://blog.csdn.net/do_you_ac_today/article/details/120205130