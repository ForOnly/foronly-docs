<template>
  <div class="vp-timeline">
    <div v-for="(item, index) in data" :key="index" class="vp-timeline-item">
      <!-- 左侧时间轴 -->
      <div class="vp-timeline-axis">
        <div class="vp-timeline-dot" :class="{ latest: index === 0 }" />
        <div class="vp-timeline-line" />
      </div>

      <!-- 内容 -->
      <div class="vp-timeline-card">
        <div class="meta">
          <span class="tag" :data-tag="item.tag" v-if="item.tag">{{
            item.tag
          }}</span>
          <span class="time">{{ item.time }}</span>
        </div>

        <div class="main">
          <h3 class="title">
            <a v-if="item.link" :href="item.link" target="_blank">
              {{ item.title }}
            </a>
            <span v-else>{{ item.title }}</span>
          </h3>

          <div v-if="item.content" class="desc" v-html="item.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TimelineData } from "../types/types";

defineProps<{
  data: TimelineData[];
}>();
</script>

<style scoped>
/* =========================
   Timeline Layout
========================= */
.vp-timeline {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vp-timeline-item {
  display: flex;
  gap: 16px;
}

/* =========================
   Axis（时间轴）
========================= */
.vp-timeline-axis {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vp-timeline-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--vp-c-brand-1),
    var(--vp-c-divider)
  );
  opacity: 0.4;
}

.vp-timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-bg);
  margin: 6px 0;
  transition: all 0.3s ease;
}

.vp-timeline-dot.latest {
  box-shadow: 0 0 0 6px var(--vp-c-brand-soft);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--vp-c-brand-soft);
  }
  70% {
    box-shadow: 0 0 0 8px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

/* =========================
   Card（卡片）
========================= */
.vp-timeline-card {
  flex: 1;
  padding: 18px 20px;
  border-radius: 16px;

  background: var(--vp-c-bg-soft);
  border: 1px solid transparent;

  position: relative;
  transition: all 0.25s ease;
}

/* subtle 边框（高级感关键） */
.vp-timeline-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(
    to bottom right,
    transparent,
    var(--vp-c-divider)
  );
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: xor;
  pointer-events: none;
}

.vp-timeline-card:hover {
  background: var(--vp-c-bg-alt);
  transform: translateY(-3px);
}

.dark .vp-timeline-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* =========================
   Meta（时间 + Tag）
========================= */
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 0.75rem;
}

.time {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.tag {
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;

  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* =========================
   Content（内容）
========================= */
.main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.title a {
  color: inherit;
  text-decoration: none;
}

.title a:hover {
  color: var(--vp-c-brand-1);
}

.desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* SHA code 优化 */
.desc :deep(code) {
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 6px;

  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
}

/* =========================
   Tag Color System
========================= */
.tag[data-tag="FEAT"] {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}

.tag[data-tag="FIX"] {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}

.tag[data-tag="DOCS"] {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}

/* =========================
   Responsive
========================= */
@media (max-width: 640px) {
  .vp-timeline-item {
    gap: 12px;
  }
}
</style>
