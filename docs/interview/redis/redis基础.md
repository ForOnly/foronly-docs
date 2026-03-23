---
title: Redis 基础
date: 2026-03-12
description: Redis 基础
outline: deep
layout: doc
---

# Redis 基础

## Redis 为什么这么快？

1. Redis 的读写操作是基于内存的，内存操作避免了磁盘扫描
2. Redis 执行命令时是单线程模式，避免了锁竞争和上下文切换的时间消耗
3. Redis 的数据结构不复杂，比较高效
4. Redis 是底层使用的是 IO 多路复用模型，非阻塞高并发
5. Redis 6.0 以后支持多线程模式，执行命令时使用单线程，网络层使用多线程

## Redis 淘汰策略是什么？

Redis 是基于内存的数据库。

当使用内存达到 maxmemory（最大内存） 限制时，就会触发内存淘汰机制（Eviction Policy），从而删除一部分 key，为新的写入腾出空间。

如果不配置淘汰策略，默认行为是：写入时报错（OOM），拒绝写操作。

## Redis 淘汰策略有哪些？

Redis 的淘汰策略有八种，可分为三大类：

1. 不淘汰：不删除任何 key，内存占满写入直接报错（OOM），使用缓存不可丢失场景
2. 对设置了过期时间的 key 进行淘汰：
   - volatile-random：随机删除一个设置了过期时间的 key
   - volatile-ttl：优先删除 TTL（剩余过期时间）最短的 key
   - volatile-lru：从设置了过期时间的 key 中，淘汰最久未使用的（淘汰当前“最后一次访问时间最早”的元素，即最久未使用）
   - volatile-lfu：从设置了过期时间的 key 中，淘汰使用频率最低的

3. 对所有 key 进行淘汰：
   - allkeys-random： 所有 key 中随机删除
   - allkeys-lru： 所有 key 中，淘汰最近最少使用
   - allkeys-lfu： 所有 key 中，淘汰使用频率最低

最常用的是：allkeys-lru： 所有 key 中，淘汰最近最少使用

## Redis 淘汰策略中 LRU 和 LFU 的区别？

LRU（Least Recently Used，最近最少使用）：适合短期热点数据场景，使用的是近似 LRU 算法（采样机制）

LFU（Least Frequently Used，使用次数最少）：适合长期热点场景
