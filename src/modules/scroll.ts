// 滚动行为模块：滚动监听、分隔线进度、导航激活、回顶/下滑控制
import { closeSettings, isSettingsVisible } from './backgroundMode';

let isScrolling = false;
let canScroll = true;
let lastScrollY = 0;

export function setScrollingLock(locked: boolean): void {
  isScrolling = locked;
}

export function scrollToSection(sectionId: string): void {
  if (isScrolling) return;
  isScrolling = true;

  const section = document.getElementById(sectionId);
  if (!section) {
    isScrolling = false;
    return;
  }

  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth',
  });

  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

function updateDividerProgress(): void {
  const scrollPosition = window.scrollY;

  // 更新第一个分隔线（个人简介页）
  const profileSection = document.getElementById('profile');
  const dividerProgress = document.getElementById('divider-progress');

  if (profileSection && dividerProgress) {
    const profileOffset = profileSection.offsetTop;
    const profileHeight = profileSection.offsetHeight;
    const dividerContainers = document.querySelectorAll('.divider-container');

    if (dividerContainers.length > 0) {
      const dividerContainer = dividerContainers[0] as HTMLElement;
      const dividerOffset = profileOffset + dividerContainer.offsetTop;

      if (scrollPosition >= profileOffset && scrollPosition <= profileOffset + profileHeight) {
        const progressStart = profileOffset;
        const progressEnd = dividerOffset + dividerContainer.offsetHeight;
        const progressRange = progressEnd - progressStart;

        if (scrollPosition > progressStart && scrollPosition < progressEnd) {
          const progress = (scrollPosition - progressStart) / progressRange;
          dividerProgress.style.width = `${Math.min(100, progress * 100)}%`;
        } else if (scrollPosition >= progressEnd) {
          dividerProgress.style.width = '100%';
        } else {
          dividerProgress.style.width = '0%';
        }
      }
    }
  }

  // 更新第二个分隔线（我的装备页）
  const equipmentSection = document.getElementById('equipment');
  const dividerProgress2 = document.getElementById('divider-progress-2');

  if (equipmentSection && dividerProgress2) {
    const equipmentOffset = equipmentSection.offsetTop;
    const equipmentHeight = equipmentSection.offsetHeight;
    const dividerContainers = document.querySelectorAll('.divider-container');

    if (dividerContainers.length > 1) {
      const dividerContainer2 = dividerContainers[1] as HTMLElement;
      const dividerOffset2 = equipmentOffset + dividerContainer2.offsetTop;

      if (scrollPosition >= equipmentOffset && scrollPosition <= equipmentOffset + equipmentHeight) {
        const progressStart = equipmentOffset;
        const progressEnd = dividerOffset2 + dividerContainer2.offsetHeight;
        const progressRange = progressEnd - progressStart;

        if (scrollPosition > progressStart && scrollPosition < progressEnd) {
          const progress = (scrollPosition - progressStart) / progressRange;
          dividerProgress2.style.width = `${Math.min(100, progress * 100)}%`;
        } else if (scrollPosition >= progressEnd) {
          dividerProgress2.style.width = '100%';
        } else {
          dividerProgress2.style.width = '0%';
        }
      }
    }
  }
}

function updateSideNavActive(): void {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  const homeSection = document.getElementById('home');
  const profileSection = document.getElementById('profile');
  const equipmentSection = document.getElementById('equipment');
  const toolsSection = document.getElementById('tools');

  let currentSection = 'home';

  if (homeSection && scrollPosition < homeSection.offsetHeight) {
    currentSection = 'home';
  } else if (
    profileSection &&
    scrollPosition >= profileSection.offsetTop &&
    scrollPosition < profileSection.offsetTop + profileSection.offsetHeight
  ) {
    currentSection = 'profile';
  } else if (
    equipmentSection &&
    scrollPosition >= equipmentSection.offsetTop &&
    scrollPosition < equipmentSection.offsetTop + equipmentSection.offsetHeight
  ) {
    currentSection = 'equipment';
  } else if (toolsSection && scrollPosition >= toolsSection.offsetTop) {
    currentSection = 'tools';
  }

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.remove('active');
    if (item instanceof HTMLElement && item.dataset.section === currentSection) {
      item.classList.add('active');
    }
  });
}

export function handleScroll(): void {
  const logoSmall = document.querySelector('.logo-small');
  const scrollPosition = window.scrollY;
  const floatingButtons = document.getElementById('floating-buttons');
  const backgroundToggle = document.getElementById('background-toggle');
  const sideNav = document.getElementById('sideNav');

  const scrollYDelta = scrollPosition - lastScrollY;
  lastScrollY = scrollPosition;

  if (scrollPosition === 0) {
    canScroll = true;
    if (isSettingsVisible()) {
      closeSettings();
    }
  }

  // Logo 显示控制
  if (scrollPosition > 50) {
    logoSmall?.classList.add('visible');
  } else {
    logoSmall?.classList.remove('visible');
  }

  // 浮动按钮在非首页时始终显示
  const homeSection = document.getElementById('home');
  const homeHeight = homeSection ? homeSection.offsetHeight : 0;

  if (scrollPosition > homeHeight * 0.3) {
    floatingButtons?.classList.add('visible');
  } else {
    floatingButtons?.classList.remove('visible');
  }

  // 侧边导航栏在非首页时显示
  if (scrollPosition > homeHeight * 0.5) {
    sideNav?.classList.add('visible');
  } else {
    sideNav?.classList.remove('visible');
  }

  // 更新侧边导航栏激活状态
  updateSideNavActive();

  // 背景欣赏按钮控制
  const profileSection = document.getElementById('profile');
  if (profileSection) {
    const profileOffset = profileSection.offsetTop;
    const windowHeight = window.innerHeight;

    if (isSettingsVisible() && scrollPosition > profileOffset - windowHeight * 0.5) {
      backgroundToggle?.classList.add('visible');
    } else {
      backgroundToggle?.classList.remove('visible');
    }
  }

  // 更新分隔线进度
  updateDividerProgress();

  // 在个人简介页顶部向上滚动时，回到首页
  if (profileSection) {
    const profileTopThreshold = profileSection.offsetTop + 30;
    if (scrollPosition < profileTopThreshold && scrollYDelta < 0 && scrollPosition > homeHeight) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

export function initScroll(): void {
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Logo 点击回到顶部
  const logoSmall = document.querySelector('.logo-small');
  if (logoSmall) {
    logoSmall.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 首页下滑箭头
  const scrollDown = document.getElementById('scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      if (canScroll) {
        canScroll = false;
        scrollToSection('profile');
        setTimeout(() => {
          canScroll = true;
        }, 1500);
      }
    });
  }

  // 鼠标滚轮事件（首页向下滚动跳转）
  window.addEventListener(
    'wheel',
    (e) => {
      if (window.scrollY === 0 && e.deltaY > 0 && canScroll) {
        canScroll = false;
        scrollToSection('profile');
        setTimeout(() => {
          canScroll = true;
        }, 1500);
      }
    },
    { passive: true }
  );

  // 返回顶部按钮
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
