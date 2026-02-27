---
title: Java 底层基础面经
date: 2026-02-27
description: Java 底层基础面经
outline: deep
layout: doc
---

# Java 底层基础面经

## Java 是值传递还是引用传递

`Java 只有值传递`，不存在引用传递。
基本类型传递的是值的副本，引用类型传递的是引用地址的副本。
方法内部可以修改对象属性，是因为多个引用指向同一个堆对象，但如果在方法内部重新赋值引用，不会影响外部变量。
本质上，Java 参数传递始终是值传递。

## Java 的四种引用类型，区别与场景？

在 Java 中（JDK1.2 之后），对象引用分为四种：

- 强引用（Strong Reference）
- 软引用（Soft Reference）
- 弱引用（Weak Reference）
- 虚引用（Phantom Reference）

它们的主要区别在于：GC（垃圾回收）发生时对象的存活程度不同。

| 引用类型 | GC 时是否回收              | 是否影响 GC | 典型应用场景             |
| -------- | -------------------------- | ----------- | ------------------------ |
| 强引用   | 不会被回收（只要有强引用） | 会阻止回收  | 普通对象                 |
| 软引用   | 内存不足时回收             | 不强制阻止  | 缓存                     |
| 弱引用   | 只要 GC 就回收             | 不阻止      | ThreadLocal、WeakHashMap |
| 虚引用   | 随时可能被回收             | 不影响      | 监控对象回收             |

## HashCode

### HashCode 为什么使用 31 作为乘数？

31 是一个质数，可以减少哈希冲突；
同时 31 = 2^5 - 1，可以通过位运算 (i << 5) - i 优化；
在实践中分布效果良好；
并且在溢出情况下仍然能保持均匀性；
是性能和分布的平衡选择。

### HashCode 和 HashMap 有什么关系？

hashCode() 影响：

- HashMap 桶分布
- 冲突率
- 链表长度
- 红黑树转换概率（JDK 8）

HashCode 设计不好：

- 会导致大量碰撞
- HashMap 退化为链表
- 性能从 O(1) 变成 O(n)

### 为什么说质数能减少冲突？

因为质数的特性是：它只能被 1 和自己整除
这保证了质数存在的规律很少，不容易和输入数据产生公共因子，数值扩散更随机

## HashMap

### HashMap 的底层原理，在 jdk7 和 jdk8 中的区别？

HashMap 底层是数组加链表实现的哈希表结构。

JDK7 采用数组 + 链表，JDK8 引入红黑树优化，当链表长度大于等于 8 且容量大于等于 64 时转为红黑树，提高查询效率。

JDK7 使用头插法，扩容时可能形成环形链表；

JDK8 使用尾插法并优化了扩容过程，通过判断 (hash & oldCap) 决定元素是否移动。

HashMap 不是线程安全的，并发场景应使用 ConcurrentHashMap。

### HashMap 的扰动函数？

HashMap 的扰动函数是 h ^ (h >>> 16)，
它的作用是将 hashCode 的高 16 位混入低 16 位，
因为 HashMap 使用 (n - 1) & hash 只取低位来定位桶（只使用 hash 的低位来决定桶位置），
如果低位分布不好会导致冲突严重，
扰动函数可以提高低位的随机性，从而减少碰撞。

扰动函数的作用：

1. 让高位参与运算
2. 减少低位质量差导致的冲突
3. 提高桶分布均匀性
4. 在不增加成本的情况下提升性能
5. 而且只做一次位运算，开销极低。

### HashMap 的数据结构？

HashMap 底层是数组 + 链表 + 红黑树。
数组用于快速定位桶，
链表用于解决哈希冲突，
当冲突过多时转换为红黑树以提高查询效率。
JDK 8 之后引入红黑树，将最坏时间复杂度从 O(n) 优化为 O(log n)。

### HashMap 的插入流程？

1. 计算 hash（含扰动函数）
2. 定位桶
3. 如果为空 → 直接放入
4. 如果冲突：
   - 链表遍历
   - key 相等 → 替换
   - 不等 → 插入尾部（JDK 8 尾插法）
5. 判断是否树化
6. 判断是否需要扩容

### HashMap 为什么树化阈值是 8？

树化阈值设为 8 是基于工程测试得出的结果。
在默认负载因子下，链表长度达到 8 的概率极低，
但一旦达到，链表查找性能会明显下降，
此时转换为红黑树可以将时间复杂度从 O(n) 降为 O(log n)。
同时为了避免小容量下过早树化，
还要求数组长度 ≥ 64，否则优先扩容。

### HashMap 为什么数组长度小于 64 不树化？

当容量较小时，冲突多半是因为：数组太小
解决方式应该是：扩容
而不是结构升级为红黑树
而且树结构：

- 占用内存更大
- 节点结构更复杂
- 维护成本更高

树化太早会浪费内存。
所以设计上优先扩容。

### HashMap 负载因子 0.75 为什么是最优？

负载因子 0.75 是时间复杂度和空间利用率的折中结果。

### HashMap 为什么是线程不安全的？

HashMap 是线程不安全的，因为**它在并发环境下没有任何同步控制机制**。在多线程同时读写时，可能会导致：

1. 数据覆盖（数据丢失）
2. 链表形成环（JDK7 扩容时）
3. size 统计错误
4. 数据不一致
5. 读取到脏数据

底层原理分析：

1. put 操作不是原子操作，缺乏 CAS 或 synchronized 保护
2. 扩容 resize 时可能死循环（JDK7），在 JDK7 中：

   - HashMap 使用头插法
   - 扩容时会重新计算 index
   - 多线程同时扩容可能导致链表反转
   - 最终形成环形链表
   - get() 时 CPU 100%

   JDK8 已解决这个问题：

   - 使用尾插法
   - 不会产生环
   - 但依然线程不安全（只是不会死循环）

总结：HashMap 没有使用任何并发保护的措施如：

- volatile
- synchronized
- CAS
- Lock

因此：

- 线程之间不可见
- 不保证有序性
- 不保证原子性

完全不符合 JMM 并发安全三要素，所以 HashMap 是线程不安全的

> **面试总结版回答：**
> HashMap 线程不安全的根本原因是其内部操作没有任何同步控制机制。多线程并发 put 时可能发生数据覆盖、size 不准确以及 JDK7 扩容时的死循环问题。JDK8 虽然解决了死循环问题，但仍然不能保证并发安全。在并发场景下应该使用 ConcurrentHashMap。

## ConcurrentHashMap

### ConcurrentHashMap 核心定位(ConcurrentHashMap 的理解)

ConcurrentHashMap 是一个线程安全的高并发 Hash 容器。
核心目标：

- 保证线程安全
- 提高并发性能
- 尽量减少锁粒度

> **面试总结版回答：**
> ConcurrentHashMap 是线程安全的高并发容器。JDK7 采用分段锁实现，JDK8 改为 CAS + synchronized 的桶级锁实现。它通过无锁读、细粒度锁和分段计数提高并发性能，同时不允许 null 来避免并发歧义。扩容支持多线程协助迁移，并在链表长度达到 8 时进行树化优化。

### ConcurrentHashMap 如何保证操作的线程安全？

JDK1.7 采用 Segment 分段锁，每个 Segment 继承 ReentrantLock，实现锁分离。

JDK1.8 取消 Segment，采用 CAS + synchronized + volatile 实现线程安全。
读操作无锁，写操作在空桶时使用 CAS，在冲突时锁定当前桶节点。
扩容时采用多线程协助迁移，提高并发性能。

### ConcurrentHashMap 在 Jdk7 和 Jdk8 的实现区别？

JDK7 的 ConcurrentHashMap 采用 Segment 分段锁机制，将数据分成多个段，每段使用 ReentrantLock 控制并发，默认最大并发度为 16。

JDK8 去掉了 Segment，改为 Node 数组 + CAS + synchronized 的桶级锁实现，锁粒度更细，并支持红黑树优化，同时采用类似 LongAdder 的分段计数方式，整体并发性能更高，结构也更加简洁。

### ConcurrentHashMap 在 JDK7 中的扩容机制？

JDK7 中 ConcurrentHashMap 的结构，

```text
ConcurrentHashMap
 ├── Segment[] segments
        ├── HashEntry[] table
```

每个 Segment 其实就是一个小型 HashMap（数组+链表）

> **面试总结版回答：**
> JDK7 的 ConcurrentHashMap 扩容是基于 Segment 的局部扩容机制，当某个 Segment 内元素超过负载因子阈值时，在持有该 Segment 锁的情况下，将内部数组扩容为原来的 2 倍并重新迁移数据。Segment 数量在初始化后固定，不会变化。

### ConcurrentHashMap 在 JDK8 中的扩容机制？

JDK8 中 ConcurrentHashMap 的结构：

```text
ConcurrentHashMap
 ├── Node<K,V>[] table
         ├── Node（链表）
         └── TreeBin（红黑树）
```

不再有 Segment,而是数组 + 链表 + 红黑树，链表长度达到 8 时进行树化
JDK8 的扩容核心是：`创建新数组 + 多线程协助迁移 + ForwardingNode 标记`

扩容流程（核心步骤）：

1. 创建新数组
2. 设置扩容标识：通过一个关键变量：sizeCtl
   - 正数：表示扩容阈值
   - 负数：表示正在扩容
   - -(1 + 扩容线程数)：表示有多少线程在协助扩容
     这点是 JDK8 的核心设计之一
3. 多线程协助迁移（重点），当一个线程触发扩容后：
   - 它不会独自完成扩容
   - 其他执行 put 的线程发现正在扩容
   - 会主动参与数据迁移
     这就是：help transfer 机制
4. 数据迁移规则
   迁移时：

   - 每个桶的数据会被重新分布
   - 由于容量翻倍

   节点只可能：

   - 留在原位置
   - 或移动到 原位置 + oldCapacity

   这是位运算优化的结果

5. ForwardingNode 标记，迁移完成的桶会被设置为：ForwardingNode。
   作用：

   - 表示该桶已经迁移
   - 指向新数组
   - 读写线程遇到它会跳转到新表

   这保证了：扩容期间仍然可以安全访问

JDK8 的扩容是：`无全局锁 + 桶级别迁移 + 多线程协作`

> **面试总结版回答：**
> JDK8 的 ConcurrentHashMap 扩容是全局扩容机制，采用容量翻倍策略，并通过 CAS 控制扩容状态，利用多线程协助迁移数据，使用 ForwardingNode 作为迁移标记，保证扩容期间读写操作仍然安全。这种设计相比 JDK7 的 Segment 局部扩容，提升了并发性能和扩容效率。

## ThreadLocal 的底层原理，内存泄漏的原因和解决方案？

`ThreadLocal 用于实现线程隔离`，每个线程内部维护一个 ThreadLocalMap，数据实际存储在线程对象中。ThreadLocalMap 的 key 是 ThreadLocal 的弱引用，value 是强引用。

当 ThreadLocal 被回收但线程未结束时，key 会变为 null，而 value 仍然被强引用，可能导致内存泄漏。

解决方案是在使用完毕后在 finally 块中调用 remove()，避免在线程池环境中遗留数据。

ThreadLocal 适用于保存线程上下文、数据库连接和事务信息等场景。

## 为什么 ThreadLocalMap 不使用 HashMap？

1. HashMap 是线程不安全的
2. 对 ThreadLocal 的引用需要是弱引用，HashMap 是强引用，如果使用 WeakHashMap 则性能成本会更大
3. ThreadLocalMap 是轻量级的，小容器，而 HashMap 是重量级的通用容器，性能成本很大且结构复杂，操作繁琐
4. ThreadLocalMap 不用 HashMap 的核心原因是：它不是一个通用容器，而是一个高度特化的线程私有存储结构。
