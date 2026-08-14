// 背景欣赏模式模块（设置按钮 + 背景切换 + ESC 退出）
let backgroundModeActive = false;
let settingsVisible = false;

export function isSettingsVisible(): boolean {
  return settingsVisible;
}

export function toggleBackgroundMode(): void {
  backgroundModeActive = !backgroundModeActive;
  const backgroundToggle = document.getElementById('background-toggle');
  const backgroundHint = document.getElementById('background-hint');

  // 修改：保留左上角小标题，隐藏侧边导航栏和其他内容
  const elementsToHide = [
    document.querySelector('.content-box'),
    ...document.querySelectorAll('.divider-container'),
    ...document.querySelectorAll('.section-header'),
    document.querySelector('.equipment-wrapper'),
    document.querySelector('.tools-wrapper'),
    document.getElementById('floating-buttons'),
    document.querySelector('.site-footer-inline'),
    document.getElementById('sideNav'),
  ].filter((el) => el !== null);

  if (backgroundModeActive) {
    if (backgroundToggle) backgroundToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    if (backgroundHint) backgroundHint.classList.add('visible');
    elementsToHide.forEach((el) => el.classList.add('background-mode-hidden'));

    setTimeout(() => {
      if (backgroundHint) backgroundHint.classList.remove('visible');
    }, 1000);
  } else {
    if (backgroundToggle) backgroundToggle.innerHTML = '<i class="fas fa-eye"></i>';
    if (backgroundHint) backgroundHint.classList.remove('visible');
    elementsToHide.forEach((el) => el.classList.remove('background-mode-hidden'));
  }

  // 触发一次滚动刷新（不直接 import scroll 以避免循环依赖）
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
}

export function closeSettings(): void {
  settingsVisible = false;
  const backgroundToggle = document.getElementById('background-toggle');
  const settingsBtn = document.getElementById('settings-btn');

  if (backgroundToggle) backgroundToggle.classList.remove('visible');
  if (settingsBtn) settingsBtn.classList.remove('settings-btn');

  if (backgroundModeActive) {
    toggleBackgroundMode();
  }
}

export function initBackgroundMode(): void {
  const backgroundToggle = document.getElementById('background-toggle');
  const settingsBtn = document.getElementById('settings-btn');

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      settingsVisible = !settingsVisible;

      if (settingsVisible) {
        if (backgroundToggle) backgroundToggle.classList.add('visible');
        settingsBtn.classList.add('settings-btn');
      } else {
        if (backgroundToggle) backgroundToggle.classList.remove('visible');
        settingsBtn.classList.remove('settings-btn');
      }
    });
  }

  if (backgroundToggle) {
    backgroundToggle.addEventListener('click', toggleBackgroundMode);
  }

  // ESC 键退出背景欣赏模式
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backgroundModeActive) {
      toggleBackgroundMode();
    }
  });
}
