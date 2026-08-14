// 喵の窝 - 入口模块
import './style.css';
import './variants.css';

import { createStars } from './modules/stars';
import { initMottos } from './modules/mottos';
import { initScroll } from './modules/scroll';
import { initNav } from './modules/nav';
import { initBackgroundMode } from './modules/backgroundMode';
import { initClock } from './modules/clock';
import { initFavicon } from './modules/favicon';
import { initAnimations } from './modules/animations';
import { initPrototype } from './prototype';

async function initPage(): Promise<void> {
  // 原型切换器（阶段二，定稿后移除）
  initPrototype();

  // 星空背景
  createStars();

  // 座右铭打字机
  await initMottos();

  // 滚动行为（导航激活、分隔线、浮动按钮、回顶）
  initScroll();

  // 导航与页面卡片
  initNav();

  // 背景欣赏模式
  initBackgroundMode();

  // 北京时间与运行时长
  initClock();

  // 图标与图片降级
  initFavicon();

  // GSAP 动画
  initAnimations();
}

document.addEventListener('DOMContentLoaded', () => {
  void initPage();
});
