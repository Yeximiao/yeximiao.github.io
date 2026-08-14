// 导航交互模块：侧边导航栏点击 + 工具页面卡片点击
import { setScrollingLock } from './scroll';

export function initNav(): void {
  // 侧边导航栏点击事件
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      const sectionId = item instanceof HTMLElement ? item.dataset.section : undefined;
      if (!sectionId) return;

      // 禁用滚动事件监听，避免冲突
      setScrollingLock(true);

      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth',
        });
      }

      // 1 秒后重新启用滚动检测
      setTimeout(() => {
        setScrollingLock(false);
      }, 1000);
    });
  });

  // 页面卡片点击事件（跳转工具页）
  document.querySelectorAll('.page-card').forEach((card) => {
    card.addEventListener('click', () => {
      const pageName = card instanceof HTMLElement ? card.dataset.page : undefined;
      if (pageName) {
        window.location.href = `pages/${pageName}.html`;
      }
    });
  });
}
