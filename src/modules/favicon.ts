// 图标模块：favicon 备用源 + 图片加载失败降级 + 图标状态指示
const IMAGE_REPO_BASE = 'https://cdn.jsdelivr.net/gh/Yeximiao/image-repo@main/Yeximiao.github.io-web';

function updateIconStatus(text: string, className: string): void {
  const status = document.getElementById('icon-status');
  if (!status) return;
  status.textContent = text;
  status.className = `icon-status ${className}`;
  setTimeout(() => {
    status.style.opacity = '0';
  }, 1000);
}

function setupImageFallbacks(): void {
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      const src = img.src;
      const filename = src.split('/').pop()?.split('?')[0];
      if (!filename) return;

      img.src = `${IMAGE_REPO_BASE}/${filename}?t=${new Date().getTime()}`;

      img.onerror = () => {
        img.alt = filename;
        img.src = '';
        img.style.backgroundColor = document.body.classList.contains('light-mode') ? '#eee' : '#333';
        img.style.display = 'flex';
        img.style.justifyContent = 'center';
        img.style.alignItems = 'center';
        img.style.color = document.body.classList.contains('light-mode') ? '#333' : '#fff';
        img.style.fontWeight = 'bold';
        img.innerHTML = filename.split('.')[0];
      };
    });
  });
}

function setupFaviconFallback(): void {
  const favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) return;

  const localFavicon = 'images/favicon.ico';
  const backupFavicon = `${IMAGE_REPO_BASE}/favicon.ico`;

  const testFavicon = new Image();
  testFavicon.onerror = () => {
    (favicon as HTMLLinkElement).href = backupFavicon;
  };
  testFavicon.src = localFavicon;
}

export function initFavicon(): void {
  setupImageFallbacks();
  setupFaviconFallback();

  // 图标状态指示器：默认使用本地图标
  updateIconStatus('使用本地图标', 'local');
}
