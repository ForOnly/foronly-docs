---
title: MySQL 基础
date: 2026-03-12
description: MySQL 基础
outline: deep
layout: doc
---

# MySql 基础

## MySql 基础

### MySQL 常见存储引擎有哪些？

MySQL 常见的存储引擎有 InnoDB、MyISAM、MEMORY，常用的是 InnoDB 和 MyISAM。

MySQL 5.0 之后默认是用 InnoDB。

### MySQL 中 InnoDB 和 MyISAM 的区别？

1. InnoDB：

   - 支持外键
   - 支持行锁
   - 支持事务机制
   - 支持 MVCC 机制
   - 支持崩溃恢复（Redo Log / Undo Log）

2. MyISAM：

   - 只支持表级锁
   - 不支持事务
   - 不支持外键

### 为什么 InnoDB 支持事务？

InnoDB 之所以支持事务，是因为它通过 `Redo Log`、`Undo Log`、`MVCC` 和`锁机制` 共同实现了事务的 ACID 特性。

Redo Log 保证事务的持久性

Undo Log 用于事务回滚并支持 MVCC

MVCC 实现多版本并发控制，提高读写并发能力

锁机制 保证事务隔离性

其中 MVCC 通过在每行数据中维护隐藏字段（trx_id、roll_ptr）以及 Undo Log 形成多版本链，从而实现一致性读。

### Redo Log、Undo Log、Binlog 三者到底有什么区别？

Redo Log 和 Undo Log 属于 InnoDB 存储引擎层。在 MySQL 的 InnoDB 存储引擎中，Redo Log 和 Undo Log 是实现事务机制的重要日志。

`Redo Log（重做日志）主要用于保证事务的持久性（Durability）`：InnoDB 采用 WAL（Write-Ahead Logging）机制，当数据被修改时，会先将修改记录写入 redo log，然后再将数据页写入磁盘。由于 redo log 是顺序写磁盘，因此效率很高。如果数据库发生崩溃，可以通过 redo log 重新执行已经提交但尚未写入磁盘的数据修改，从而实现崩溃恢复。

`Undo Log（回滚日志）主要用于事务回滚和 MVCC`：当事务修改数据时，InnoDB 会先记录数据修改前的旧值到 undo log 中。如果事务需要回滚，就可以通过 undo log 恢复到修改之前的状态。另外，Undo Log 还用于实现 MVCC，多版本并发控制。每一行记录都会通过 roll_pointer 指向对应的 undo log，从而形成版本链，使得不同事务可以读取到不同版本的数据。

Binlog 属于 MySQL Server 层。Binlog 主要用于 MySQL 层的数据复制和恢复。

## 回表

当使用**二级索引（非聚簇索引）查询数据时，MySQL 先通过索引找到对应的主键值，然后再根据主键去聚簇索引（主键索引）**中查找完整的行数据，这个再次查找的过程就叫“回表”。
