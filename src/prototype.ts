// 原型切换器（阶段二专用，定稿后移除）
// 基于 UI skill 方法论：同一页面通过 ?variant= 切换 3 个激进不同的 UI 变体。
// 底部浮动切换条 + 键盘 ←/→ 切换，URL 参数保持可分享、刷新稳定。
export interface PrototypeVariant {
  key: string;
  name: string;
}

const VARIANTS: PrototypeVariant[] = [
  { key: 'a', name: '深空极简' },
  { key: 'b', name: '赛博霓虹' },
  { key: 'c', name: '暗色杂志' },
];

let currentIndex = 0;

function getVariantFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const raw = (params.get('variant') ?? 'a').toLowerCase();
  const found = VARIANTS.findIndex((v) => v.key === raw);
  return found >= 0 ? VARIANTS[found].key : 'a';
}

function applyVariant(key: string): void {
  document.body.classList.remove(...VARIANTS.map((v) => `variant-${v.key}`));
  document.body.classList.add(`variant-${key}`);
  currentIndex = VARIANTS.findIndex((v) => v.key === key);
  updateUrl(key);
  updateLabel();
  // 通知动画模块按新变体重置入场动画
  window.dispatchEvent(new Event('variantchange'));
}

function updateUrl(key: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('variant', key);
  history.replaceState(null, '', url.toString());
}

function updateLabel(): void {
  const label = document.getElementById('ps-label');
  if (!label) return;
  const v = VARIANTS[currentIndex];
  label.textContent = `${v.key.toUpperCase()} — ${v.name}`;
}

function cycle(delta: number): void {
  const next = (currentIndex + delta + VARIANTS.length) % VARIANTS.length;
  applyVariant(VARIANTS[next].key);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  );
}

export function initPrototype(): void {
  const initial = getVariantFromUrl();
  currentIndex = VARIANTS.findIndex((v) => v.key === initial);
  document.body.classList.add(`variant-${initial}`);

  // 底部浮动切换条
  const bar = document.createElement('div');
  bar.className = 'prototype-switcher';
  bar.innerHTML = `
    <button class="ps-btn" id="ps-prev" type="button" aria-label="上一个变体">
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="ps-label" id="ps-label"></span>
    <button class="ps-btn" id="ps-next" type="button" aria-label="下一个变体">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  document.body.appendChild(bar);

  const prevBtn = document.getElementById('ps-prev');
  const nextBtn = document.getElementById('ps-next');
  prevBtn?.addEventListener('click', () => cycle(-1));
  nextBtn?.addEventListener('click', () => cycle(1));

  // 键盘 ←/→ 切换（输入框聚焦时不拦截）
  document.addEventListener('keydown', (e) => {
    if (isEditableTarget(e.target)) return;
    if (e.key === 'ArrowLeft') {
      cycle(-1);
    } else if (e.key === 'ArrowRight') {
      cycle(1);
    }
  });

  updateLabel();
}
