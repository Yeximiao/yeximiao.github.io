// 北京时间 + 网站运行时长模块
const START_TIME = new Date('2024-12-14T13:00:00');

function updateTime(): void {
  const now = new Date();
  const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

  const year = beijingTime.getUTCFullYear();
  const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(beijingTime.getUTCDate()).padStart(2, '0');
  const hours = String(beijingTime.getUTCHours()).padStart(2, '0');
  const minutes = String(beijingTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(beijingTime.getUTCSeconds()).padStart(2, '0');

  const timeElement = document.getElementById('beijing-time');
  if (timeElement) {
    timeElement.innerHTML = `
            <span>${year}-${month}-${day} ${hours}:${minutes}:${seconds} (UTC+8)</span>
        `;
  }

  const diff = now.getTime() - START_TIME.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

  const uptimeElement = document.getElementById('uptime');
  if (uptimeElement) {
    uptimeElement.textContent = `${days}天 ${hoursDiff}小时 ${minutesDiff}分 ${secondsDiff}秒`;
  }
}

export function initClock(): void {
  updateTime();
  setInterval(updateTime, 1000);
}
