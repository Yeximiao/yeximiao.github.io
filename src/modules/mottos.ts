// 座右铭加载 + 打字机效果模块
const DEFAULT_MOTTOS = ['你好我是夜袭喵！'];

let mottos: string[] = [];
let mottoIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

async function loadMottosFromFile(): Promise<string[]> {
  try {
    const response = await fetch('mottos.txt');
    if (!response.ok) {
      throw new Error('文件加载失败');
    }
    const text = await response.text();
    return text.split('\n').filter((line) => line.trim() !== '');
  } catch (error) {
    console.error('加载座右铭失败，使用默认数据:', error);
    return DEFAULT_MOTTOS;
  }
}

function typeMotto(): void {
  const subtitle = document.getElementById('typing-subtitle');
  if (!subtitle || mottos.length === 0) return;

  const currentMotto = mottos[mottoIndex];

  if (isDeleting) {
    subtitle.textContent = currentMotto.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    subtitle.textContent = currentMotto.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = charIndex === currentMotto.length ? 1500 : 100;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    mottoIndex = (mottoIndex + 1) % mottos.length;
    typingSpeed = 500;
  } else if (!isDeleting && charIndex === currentMotto.length) {
    typingSpeed = 2000;
    isDeleting = true;
  }

  setTimeout(typeMotto, typingSpeed);
}

export async function initMottos(): Promise<void> {
  mottos = await loadMottosFromFile();
  typeMotto();
}
