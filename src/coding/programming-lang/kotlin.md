---
title: Kotlin
icon: mug-hot
---


Kotlin 是 2011 年 JetBrains 搞出来的，当时就想改进 Java，提供更现代、更简洁的语法，现在可是 Google 官方推荐的 Android 开发语言，简称 "Java 亲儿子"。

比如说，这三个用 Kotlin 实现的项目：1. **Jetpack Compose** - 开源Android UI框架，用于现代Android开发，声明式UI、代码简洁，不过学习成本高、与旧代码兼容复杂；2. **Ktor** - 开源异步Web框架，用于构建后端服务，轻量级、协程支持好，不过生态系统不如Spring成熟；3. **IntelliJ IDEA** - 闭源IDE（社区版开源），智能提示强大、体验流畅，不过收费昂贵、社区版功能受限。

架构师选 Kotlin 的时候，心里肯定在想："这玩意儿空安全机制太香了，编译时就防止空指针异常，再也不怕 NPE 这个老妖怪；协程支持原生就能做异步编程，写起来跟玩似的；扩展函数能给现有类添加新功能，不用继承那么麻烦；数据类自动生成 equals、hashCode、toString，代码少写一堆；和 Java 100% 互操作，之前的 Java 代码直接能用；语法现代简洁，看起来赏心悦目；类型推断智能得很，不用写那么多类型声明。虽然编译时间比 Java 慢，生态系统不如 Java 庞大，第三方库相对较少，市场份额还在增长，协程概念要花时间理解，但架不住它香啊！" 所以在 Android 开发、后端开发、前端开发（Kotlin/JS）、跨平台移动开发（Kotlin Multiplatform）、数据科学这些地方，Kotlin 简直是如鱼得水。

和 Kotlin 相关的语言有 Java，它的基础，两者高度兼容；Scala，同样是 JVM 平台的现代编程语言；Groovy，JVM 平台的动态编程语言；Swift，iOS 开发的官方语言，和 Kotlin 语法有相似之处。但 Kotlin 就是在现代化语法和 Java 兼容性上特别能打，特别是 Android 开发，Google 官方推荐，地位杠杠的。

不过学 Kotlin 也有难点，编译时间较长，相比 Java 速度较慢；生态系统不如 Java 庞大，第三方库相对较少；市场份额仍在增长中，尚未完全取代 Java 的地位；协程理解需要一定时间掌握，概念有点抽象。

总的来说，Kotlin 就像 Java 的进化版，青出于蓝而胜于蓝，空安全机制和协程支持让代码更加安全、简洁和高效，是 Android 开发的官方语言，后端开发也越来越火，简直是现代编程语言的后起之秀。

### 一个代码块

```kotlin
fun main() {
    println("Hello ${"Dale"}!")
}
```

运行只需要 `kotlinc -script hello.kts`，或者先编译 `kotlinc hello.kt -include-runtime -hello.jar` 然后 `java -jar hello.jar`。
