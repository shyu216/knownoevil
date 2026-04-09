---
title: Java
icon: brands:java
---


Java 是 1995 年 Sun Microsystems 发布的，核心理念是 "一次编写，到处运行"（Write Once, Run Anywhere），为分布式计算时代设计的，现在可是企业级应用开发的老大哥。

比如说，这三个用 Java 实现的项目：1. **Spring Boot** - 开源微服务框架，用于构建企业应用如阿里巴巴、Netflix，开箱即用、生态强大，不过配置复杂、启动慢；2. **Elasticsearch** - 开源搜索引擎，用于日志分析如GitHub、Wiki，搜索性能强、分布式支持好，不过对内存依赖高、数据一致性弱；3. **Hadoop** - 开源大数据框架，用于处理海量数据如Yahoo、Spotify，分布式存储计算成熟，不过MR编程模型繁琐、延迟高。

架构师选 Java 的时候，心里肯定在想："这玩意儿跨平台能力超强，编译成字节码在 JVM 上跑，哪儿都能运行；纯面向对象设计，一切皆对象，代码结构清晰；自动垃圾回收不用操心内存；生态系统庞大，Spring、Hibernate 这些框架要啥有啥；多线程支持杠杠的，适合并发编程；强类型系统编译时就能抓错；内置安全机制，企业级应用杠杠的。虽然启动速度慢，内存占用大，语法冗长代码多，框架学习曲线陡，但架不住它稳啊！" 所以在企业级应用、大型系统、金融、电商、Web 开发、移动应用（Android）、大数据处理（Hadoop、Spark）、云计算、微服务架构这些地方，Java 简直是神一样的存在。

和 Java 相关的语言有 C#，同为企业级应用开发的主流选手；Go 适合高并发后端服务；Kotlin，Android 开发的现代替代语言，更简洁；Scala，基于 JVM 的函数式编程语言。但 Java 就是在稳定性、安全性和生态上特别能打，企业级应用开发选它准没错。

不过学 Java 也有难点，启动速度慢，相比其他语言启动时间较长；内存占用大，JVM 运行时需要较大内存；语法相对冗长，代码量较多，语法较为繁琐；框架学习曲线陡，生态系统庞大，需要学习多种框架。

总的来说，Java 就像一个稳重的老大哥，靠谱、稳当、生态丰富，虽然有时有点笨重，但在企业级应用开发领域，它就是定海神针，至今仍然发挥着不可替代的作用。

### 一个代码块

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello " + "Dale" + "!");
    }
}
```

运行只需要 `javac Main.java` 编译，然后 `java Main` 运行。

### 基本操作

[跟打代码](https://www.bilibili.com/video/BV1Ee411H7mT)

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args){
        System.out.println(10 + 3);
        System.out.println(10 - 3);
        System.out.println(10 * 3);
        System.out.println(10 / 3);
        System.out.println(10 % 3);
        System.out.println(10.0 / 3);
        System.out.println((double) 10 / 3); 

        int num = 10; // 32bit
        double num1 = 10.2; // 64
        double num2;
        num2 = 11.3;

        finial int num3 = 10;

        byte num4 = 100; // 8
        short num5 = 1000; // 16
        long num6 = 1000L; // 64

        float num7 = 12.6F; // 32

        char A = 'A';
        boolean isTrue = true; // > < = && || !

        System.out.println(isTrue ? "Is True" : "Not real");

        if (isTrue && true){
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

        for (int i=0; i<10; i++){
            System.out.println(i);
        } // while; do-while

        int[] arr = new int[]{1,2,3};
        System.out.println(Arrays,toString(arr));
        System.out.println(arr[1]);
        System.out.println(arr.length());

        String str = "abcdefg" + "-" + "hijklmn";
        System.out.println(str.length());
        System.out.println(str.indexOf('d'));
        System.out.println(str.replace('def', 'xyz'));
        System.out.println(String.join("~uvw~", str.split("-")));
    }
}
```


### 类

```java
public class Main {
    public static void main(String[] args){
        Animal ani = new Animal("dale", 18); // 实例
        System.out.println(ani.getName());
        ani.setName("marco");
        System.out.println(ani.getName());
    }
}

// 封装
private class Animal {
    // 属性及默认值
    private String name = "anoynomous";
    private int age = 10000;

    // 构造方法
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return this.name;
    }

    public String setName(String newName) {
        this.name = newName;
    }

    public void greet() {
        System.out.println("Hi");
    }
}

// 继承
class Dog extends Animal {
    private String color;
    public Dog(String name, int age, String color) {
        // 继承
        super(name, age);
        this.color = color;
    }

    // 多态1：重写
    @Override
    public void greet() {
        System.out.println("WooWooWoo");
    }

    // 多态2：重载
    public void greet(String owner) {
        System.out.println("WooWooWoo " + owner);
    }
}
```