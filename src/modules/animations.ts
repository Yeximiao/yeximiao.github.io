// GSAP 动画模块（阶段二：按变体差异化）
// A 深空极简：轻量 hero 入场
// B 赛博霓虹：hero 辉光入场 + ScrollTrigger 全屏分段滚动动画
// C 暗色杂志：标题左滑 + 卡片克制 stagger
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let animationTl: gsap.core.Timeline | null = null;
let activeScrollTriggers: ScrollTrigger[] = [];

function getVariant(): 'a' | 'b' | 'c' {
  if (document.body.classList.contains('variant-b')) return 'b';
  if (document.body.classList.contains('variant-c')) return 'c';
  return 'a';
}

function cleanup(): void {
  animationTl?.kill();
  animationTl = null;
  activeScrollTriggers.forEach((t) => t.kill());
  activeScrollTriggers = [];
}

function runVariantAnimations(variant: 'a' | 'b' | 'c'): void {
  cleanup();

  if (variant === 'b') {
    runNeonAnimations();
  } else if (variant === 'c') {
    runMagazineAnimations();
  } else {
    runMinimalAnimations();
  }
}

// ---------- A 深空极简：轻量入场 ----------
function runMinimalAnimations(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.from('.main-title', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    clearProps: 'transform,opacity',
  })
    .from(
      '.subtitle-container',
      { opacity: 0, y: 12, duration: 0.5, clearProps: 'transform,opacity' },
      '-=0.35'
    )
    .from(
      '.scroll-down-arrow',
      { opacity: 0, duration: 0.4, clearProps: 'opacity' },
      '-=0.25'
    );

  animationTl = tl;
}

// ---------- B 赛博霓虹：hero 辉光 + 滚动分段 ----------
function runNeonAnimations(): void {
  // hero 入场：模糊缩放 + 霓虹浮现
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.main-title', {
    opacity: 0,
    scale: 0.85,
    filter: 'blur(20px)',
    duration: 1.2,
    clearProps: 'transform,opacity,filter',
  })
    .from(
      '.subtitle-container',
      { opacity: 0, y: 24, duration: 0.6, clearProps: 'transform,opacity' },
      '-=0.55'
    )
    .from(
      '.scroll-down-arrow',
      { opacity: 0, duration: 0.5, clearProps: 'opacity' },
      '-=0.3'
    );

  animationTl = tl;

  // 滚动触发：每个 full-section 的标题 + 卡片分段浮现
  document.querySelectorAll('.full-section').forEach((section) => {
    const header = section.querySelector('.section-header');
    if (header) {
      activeScrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 65%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              header,
              { opacity: 0, y: 70, filter: 'blur(8px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }
            );
          },
        })
      );
    }

    const contentBox = section.querySelector('.content-box');
    if (contentBox) {
      activeScrollTriggers.push(
        ScrollTrigger.create({
          trigger: contentBox,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              contentBox,
              { opacity: 0, y: 50, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
            );
          },
        })
      );
    }

    const cards = section.querySelectorAll('.gear-card, .page-card');
    if (cards.length > 0) {
      activeScrollTriggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out',
              }
            );
          },
        })
      );
    }
  });
}

// ---------- C 暗色杂志：左滑标题 + 克制 stagger ----------
function runMagazineAnimations(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.from('.main-title', {
    opacity: 0,
    x: -60,
    duration: 0.8,
    clearProps: 'transform,opacity',
  })
    .from(
      '.subtitle-container',
      { opacity: 0, y: 16, duration: 0.5, clearProps: 'transform,opacity' },
      '-=0.45'
    );

  animationTl = tl;

  // 卡片温和浮现
  const cards = document.querySelectorAll('.gear-card, .page-card');
  if (cards.length > 0) {
    activeScrollTriggers.push(
      ScrollTrigger.create({
        trigger: '.equipment-wrapper',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
          );
        },
      })
    );
  }
}

export function initAnimations(): void {
  runVariantAnimations(getVariant());

  // 变体切换时按新变体重跑入场动画
  window.addEventListener('variantchange', () => {
    runVariantAnimations(getVariant());
  });
}
