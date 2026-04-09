---
title: Go 语言
icon: brands:golang
---


Go 语言（Golang）是 Google 在 2009 年捣鼓出来的，当时就想解决大规模服务器编程的头疼问题，特别是让并发编程不那么折磨人。现在它可是云原生时代的香饽饽，后端开发的得力助手。

比如说，这三个用 Go 实现的项目：1. **Kubernetes** - 开源容器编排系统，用于管理容器集群如抖音、Uber，自动化能力强、生态完善，不过复杂度高、学习曲线陡；2. **Docker** - 开源容器平台，部署便捷、环境一致，不过安全漏洞频发、资源占用大；3. **TiDB** - 开源分布式数据库，支持水平扩展、兼容MySQL协议，不过事务性能不如专用数据库。

你看架构师选 Go 的时候，心里肯定在想："这玩意儿编译快得飞起，部署就像扔个小石子儿一样简单，goroutine 就像一群轻量级的小蜜蜂，飞来飞去处理并发，channel 又像安全的小邮箱，让协程之间聊天不打架，自动垃圾回收更是懒癌福音，不用自己操心内存，语法简洁得像白开水，喝起来舒服，标准库丰富得像哆啦A梦的口袋，什么都有。虽然错误处理要一个一个检查，有点像唐僧念经，但为了性能和可维护性，值了！" 所以在云原生、微服务、容器编排这些领域，Go 简直是如鱼得水，高性能 Web 服务器、API 服务、网络工具、DevOps 工具，甚至部分区块链项目都爱用它。

和其他语言比起，C 是系统编程的老大哥，Rust 安全得很适合系统编程，Java 是企业级应用的主流，Python 在数据科学和脚本领域很厉害，但 Go 就是在并发和部署方面特别能打，成为云原生时代的主流选手。

不过学 Go 也有难点，错误处理要显式检查每个 error，代码有点啰嗦；垃圾回收可能会导致不确定的暂停时间，所以实时系统不太适用；泛型支持是后来才加的，生态还在发展；并发编程虽然简化了，但要掌握高级并发模式还是要下点功夫。

总的来说，Go 语言就像一把锋利的瑞士军刀，简洁、高效、可靠，特别适合构建高性能、可扩展的后端系统，在云原生时代简直是如虎添翼。

### 一个代码块

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello", "Dale", "!")
}
```

运行只需要 `go run hello.go`。

### 并发编程

包裹并行逻辑用`goroutine`。获取结果或者传递数据用`channel`，例如获取word count结果，有几个goroutine就`<-`几次。传递控制内容用`context`，例如设计锁，停止时机。

一个简单的逻辑大概长这样：


```go
package main

import (
	"context"
	"fmt"
	"strings"
	"time"
)

// 模拟单词统计任务
func wordCount(ctx context.Context, text string, resultChan chan<- int) {
	// 1. 监听 ctx 取消信号（控制退出）
	select {
	case <-ctx.Done():
		fmt.Println("任务被取消")
		return
	default:
	}

	// 2. 业务逻辑
	words := strings.Fields(text)
	count := len(words)

	// 3. 模拟耗时
	time.Sleep(100 * time.Millisecond)

	// 4. 结果通过 channel 发出去
	resultChan <- count
}

func main() {
	// 1. 创建 context：控制所有 goroutine 停止
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// 2. 创建 channel：接收多个 goroutine 结果
	resultChan := make(chan int)

	// 3. 要处理的文本
	texts := []string{
		"hello go world",
		"goroutine channel context",
		"go concurrency is awesome",
	}

	// 4. 启动 N 个 goroutine
	for i, t := range texts {
		go wordCount(ctx, t, resultChan)
		fmt.Printf("启动 goroutine %d\n", i+1)
	}

	// 5. 有 N 个 goroutine，就从 channel 收 N 次结果
	total := 0
	for i := 0; i < len(texts); i++ {
		count := <-resultChan
		total += count
		fmt.Printf("收到结果：%d，累计：%d\n", count, total)
	}

	fmt.Printf("最终总单词数：%d\n", total)
}
```