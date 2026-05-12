---
title: Visual Studio 的基本使用
icon: mug-hot
---

比如怎么在里面配置opengl环境。先在vs里面下载cpp在desktop的开发环境，它会下载msvc包，里面有cl.exe，能编译cpp文件。

然后下opengl规则的运行代码，例如glfw（窗口管理），glew（扩展加载），glm（数学）等等。然后把他们dll文件路径加到path，把h文件路径加到vs项目配置cpp的附加目录，把lib文件路径加到linker附加目录，以及在依赖项声明用得上的lib文件。现在就能运行了。

dll也可以直接复制到项目里面。

dll文件是window认识的二进制代码。lib类似h，告诉编译器哪个函数在哪个dll里面。