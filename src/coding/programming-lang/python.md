---
title: Python
icon: brands:python
---


Python 是 1991 年出生的老大哥，Guido van Rossum 设计的，核心理念就是代码要好看，"人生苦短，我用 Python"简直是至理名言，说出了无数开发者的心声。它是动态类型的解释型语言，不用声明变量类型，也不用编译，直接就能跑，开发效率高得像坐火箭。

比如说，这三个用 Python 实现的项目：1. **TensorFlow** - 开源机器学习框架，用于AI模型训练如Google搜索，生态完善、社区活跃，不过版本兼容差、静态图不够灵活；2. **Django** - 开源Web框架，用于构建网站如Instagram、Pinterest，功能齐全、文档完善，不过过于笨重、不适合微服务；3. **PyCharm** - 闭源IDE（社区版开源），智能提示强大、调试友好，不过收费贵、内存占用大。

架构师选 Python 的时候，心里肯定乐开了花："这玩意儿语法简洁得像诗，写起来行云流水，PyPI 的包多到能绕地球三圈，数据分析、Web开发、AI什么都能做，就像编程界的瑞士军刀，要啥有啥。支持面向对象、函数式和过程式编程，灵活得像变形金刚，还能和 C/C++/Java 这些语言无缝集成，简直是胶水语言中的战斗机。虽然速度有点慢，像乌龟爬，GIL 又像个小捣蛋鬼，限制多线程，缩进敏感得像豌豆公主，一点不对就报错，移动端支持弱得像纸糊的，打包分发麻烦得要命，但架不住它好用啊！" 所以在数据科学、人工智能、Web开发这些领域，Python 简直是霸主级别的存在。

和 Python 差不多的语言有 JavaScript、Ruby、Go 和 Lua 这些，都以开发效率高、语法简洁为特点，但 Python 就是在生态和应用场景上更胜一筹，成为全球最受欢迎的编程语言之一。

总的来说，Python 就像一个万能的百宝箱，里面装着各种宝贝，虽然有些小缺点，但不妨碍它在编程世界里闪闪发光，成为无数开发者的心头好。

### 一个代码块

```py
def main():
    print("Hello", "Dale", "!")

if __name__ == "__main__":
    main()
```

运行只需要 `python hello.py`。



### 变量传递

在 Python 中，**变量传递本质上是“对象引用的传递”**，但是否“引用传递”还是“复制”，取决于对象的类型和操作方式：

#### 1. 赋值/参数传递：引用传递

- 赋值（`a = b`）或函数参数传递时，**变量只是指向同一个对象的引用**，不会复制对象本身。
- 修改对象内容会影响所有引用，但重新赋值不会影响原对象。

**示例：**
```python
a = [1, 2, 3]
b = a
b[0] = 100
print(a)  # [100, 2, 3]，a和b指向同一个list
```

#### 2. 不可变对象（int, float, str, tuple）

- 这些类型的对象一旦创建就不能修改，赋值/传参时也是引用传递，但你无法通过引用修改原对象。

**示例：**
```python
a = 10
b = a
b = 20
print(a)  # 10，b重新指向新对象，不影响a
```

#### 3. 可变对象（list, dict, set, 自定义class等）

- 赋值/传参时是引用传递，**通过引用可以修改原对象内容**。

**示例：**
```python
def foo(lst):
    lst.append(4)
lst = [1,2,3]
foo(lst)
print(lst)  # [1,2,3,4]
```

#### 4. 显式复制（copy）

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

#### 5. 多进程/多线程


多进程（multiprocessing）下，每个进程都有独立的内存空间，所以 global 变量（如 global session_id、UDP_PORT、logging 配置等）在不同进程中不会自动同步或共享。

在主进程设置的 global 变量，子进程启动后会各自拷贝一份，互不影响。
如果你在主进程和子进程分别修改 global 变量，彼此看不到对方的更改。
如果需要多进程间共享参数，有以下方法：

用 multiprocessing.Queue、Pipe 传递数据。
用 multiprocessing.Manager() 创建共享 dict、list、Value、Namespace 等。
用 multiprocessing.shared_memory 共享大数组（Python 3.8+）。
启动子进程时，把参数作为参数传递（推荐）。



### 切片

[参考](https://blog.csdn.net/do_you_ac_today/article/details/120205130)

`[start,end,step]`，start和end的负是从后往前数，step的负也是从后往前，数字是步长。