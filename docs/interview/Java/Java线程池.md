---
title: Java 线程池(ThreadPoolExecutor)
date: 2026-02-27
description: Java 线程池(ThreadPoolExecutor)
outline: deep
layout: doc
---

# Java 线程池(ThreadPoolExecutor)

ThreadPoolExecutor 有七大核心参数：corePoolSize、maximumPoolSize、keepAliveTime、unit、workQueue、threadFactory 和 handler。

任务执行流程是：先创建核心线程，再入队列，队列满则创建非核心线程，超过最大线程数后执行拒绝策略。

默认有四种拒绝策略：AbortPolicy、CallerRunsPolicy、DiscardPolicy、DiscardOldestPolicy。

实际开发中不推荐使用 Executors 创建线程池，应手动指定参数，防止 OOM。

## 线程池 ThreadPoolExecutor 七大参数、拒绝策略？

ThreadPoolExecutor 是 Java 中最核心的线程池实现类：

ThreadPoolExecutor

构造方法：

```java[java]
public ThreadPoolExecutor(
    int corePoolSize, // 核心线程数
    int maximumPoolSize, // 最大线程数（workQueue 是有界队列时才会生效）
    long keepAliveTime, // 非核心线程空闲存活时间
    TimeUnit unit, // keepAliveTime
    BlockingQueue<Runnable> workQueue, // 工作队列
    ThreadFactory threadFactory, // 线程工厂
    RejectedExecutionHandler handler // 拒绝策略
    )
```

七大参数详解:

1. corePoolSize（核心线程数）

   - 线程池中长期存活的线程数量
   - 即使空闲也不会被销毁（默认）

   可以调用：`allowCoreThreadTimeOut(true)`让核心线程也超时销毁。

2. maximumPoolSize（最大线程数）

   - 线程池允许创建的最大线程数量
   - 当队列满了才会创建非核心线程

3. keepAliveTime（存活时间）

   - 非核心线程空闲多久会被销毁

4. unit（时间单位）

   - keepAliveTime 的单位

5. workQueue（任务队列）

   - 用于存放等待执行的任务。
   - 常见实现：
     - ArrayBlockingQueue（有界队列）
     - LinkedBlockingQueue（默认几乎无界）
     - SynchronousQueue（不存储任务，直接交给线程）
     - DelayQueue

   👉 面试重点：不同队列类型会影响线程池行为。

6. threadFactory（线程工厂）

   - 用于创建线程
   - 可以自定义线程名称
   - 可以设置为守护线程

   一般使用：`Executors.defaultThreadFactory()`

7. handler（拒绝策略）
   当：`任务队列满 + 线程数达到 maximumPoolSize`触发拒绝策略。

四种内置拒绝策略:

1. AbortPolicy（默认）

   - 直接抛出异常
   - 抛出 RejectedExecutionException

2. CallerRunsPolicy

   - 由提交任务的线程自己执行
   - 优点：
     - 降低任务提交速度
     - 起到削峰作用

3. DiscardPolicy

   - 直接丢弃任务
   - 不抛异常
   - 风险：
     - 数据丢失

4. DiscardOldestPolicy
   - 丢弃队列中最老的任务
   - 然后尝试重新提交

## 如何动态修改线程池参数？

ThreadPoolExecutor 支持在运行时动态修改部分核心参数，例如核心线程数、最大线程数、存活时间和拒绝策略，但不支持直接修改工作队列类型。直接使用对应的 set 方法修改即可

## 线程池执行流程

提交任务时：

```text
1. 当前线程数 < corePoolSize → 创建核心线程
2. 否则放入队列
3. 队列满 → 线程数 < maximumPoolSize → 创建非核心线程
4. 线程数已达最大 → 执行拒绝策略
```

## 为什么不推荐使用 Executors 创建线程池？

因为：

- FixedThreadPool 和 SingleThreadExecutor 使用无界队列（LinkedBlockingQueue）可能导致 OOM.
- CachedThreadPool 最大线程数是 Integer.MAX_VALUE 可能创建大量线程.

👉 官方建议：直接使用 ThreadPoolExecutor 显式指定参数。

## 线程池如何优雅关闭？

优雅关闭线程池，指的是：不再接收新任务，但要把已经提交的任务执行完，再退出。

> **标准回答**
>
> 线程池优雅关闭应使用 shutdown() 方法，停止接收新任务，同时继续执行已提交任务，并配合 awaitTermination() 等待线程池结束。
>
> 如果超过等待时间仍未结束，可以调用 shutdownNow() 强制关闭。
>
> shutdownNow 会尝试通过中断机制停止正在执行的任务，因此任务代码应正确响应中断。
>
> 优雅关闭的核心目标是保证任务完整执行，避免数据丢失。

## Java 官方提供了哪几种线程池？分别有什么特点？

Executors 提供的 4 种常见线程池：

1. newFixedThreadPool

   - `使用无界队列 LinkedBlockingQueue`
   - `线程数固定`
   - 不会创建超过 corePoolSize 的线程
   - 适合任务稳定、并发量可控的场景

2. newCachedThreadPool

   - 没有核心线程
   - 最大线程数无限
   - 使用 SynchronousQueue（不存任务）
   - `来一个任务创建一个线程`
   - 空闲 60 秒销毁
   - 高并发可能创建大量线程导致 OOM
   - 适合短生命周期、高并发、小任务的场景

3. newSingleThreadExecutor

   - `永远只有一个线程`
   - `任务串行执行`
   - 保证顺序
   - 适合需要顺序执行的任务的场景

4. newScheduledThreadPool
   - 支持延迟任务
   - 支持周期任务
   - 类似增强版 Timer
   - 适合定时任务的场景

> **总结：**
>
> Java 官方通过 Executors 提供了 FixedThreadPool、CachedThreadPool、SingleThreadExecutor 和 ScheduledThreadPool 等线程池，本质都是对 ThreadPoolExecutor 或 ScheduledThreadPoolExecutor 的封装。
>
> Fixed 使用无界队列，线程数固定；Cached 使用 SynchronousQueue，线程数可无限扩展；Single 是单线程串行执行；Scheduled 支持定时任务。
>
> 由于部分线程池使用无界队列或无限线程数，存在 OOM 风险，因此生产环境推荐直接使用 ThreadPoolExecutor 自定义参数。

## 线程池任务提交机制中 execute 和 submit 有什么区别？

1. execute

   - 无返回值
   - 直接抛出异常
   - Runnable 任务类型
   - 不可获取结果

2. submit
   - 有返回值
   - 异常被 Future 捕获
   - Runnable 或 Callable 任务类型
   - 可以获取结果

> execute() 和 submit() 都是线程池提交任务的方法。
>
> 第一，execute() 没有返回值，而 submit() 会返回一个 Future 对象，可以用于获取任务执行结果。
>
> 第二，execute() 提交任务发生异常时会直接抛出，而 submit() 的异常会被封装在 Future 中，只有在调用 get() 时才会抛出。
>
> 第三，execute() 只能提交 Runnable 任务，而 submit() 可以提交 Runnable 和 Callable。
>
> 第四，从底层实现来看，submit() 内部会将任务封装成 FutureTask，然后再调用 execute() 方法执行。
