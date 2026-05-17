/* =====================================================
   momo 釣魚詐騙示範 — script.js
   逢甲大學 Web 程式設計課程作業 · 資安教育示範
   不收集、不傳送任何資料
   ===================================================== */

// ── 倒數計時器 ──
(function startCountdown() {
  const el = document.getElementById('timer');
  if (!el) return;

  let total = 9 * 60 + 59; // 09:59

  const tick = setInterval(() => {
    total--;

    if (total <= 0) {
      clearInterval(tick);
      el.textContent = '00:00';
      el.classList.add('urgent');
      return;
    }

    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;

    // 最後 60 秒：加上 urgent class 觸發跳動動畫
    if (total <= 60) {
      el.classList.add('urgent');
    } else {
      el.classList.remove('urgent');
    }
  }, 1000);
})();


// ── 信用卡號碼自動格式化 (加空格) ──
const cardInput = document.getElementById('card-number');
if (cardInput) {
  cardInput.addEventListener('input', () => {
    let val = cardInput.value.replace(/\D/g, '').slice(0, 16);
    cardInput.value = val.replace(/(.{4})/g, '$1 ').trim();
  });
}

// ── 有效期限格式化 (MM / YY) ──
const expiryInput = document.getElementById('card-expiry');
if (expiryInput) {
  expiryInput.addEventListener('input', () => {
    let val = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) val = val.slice(0, 2) + ' / ' + val.slice(2);
    expiryInput.value = val;
  });
}

// ── CVV 限數字 ──
const cvvInput = document.getElementById('card-cvv');
if (cvvInput) {
  cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
  });
}

// ── 身份證字號轉大寫 ──
const idInput = document.getElementById('id-number');
if (idInput) {
  idInput.addEventListener('input', () => {
    idInput.value = idInput.value.toUpperCase();
  });
}


// ── Modal 開關 ──
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function openModal() {
  if (modal) modal.classList.add('active');
}
function closeModal() {
  if (modal) modal.classList.remove('active');
}

if (modalClose) modalClose.addEventListener('click', closeModal);

// 點擊遮罩關閉
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// ── 表單送出 → 顯示教育彈窗 ──
const form = document.getElementById('payment-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // 阻止任何實際送出
    openModal();
  });
}

// ── 取消訂單按鈕 → 顯示教育彈窗 ──
const btnCancel = document.getElementById('btn-cancel');
if (btnCancel) btnCancel.addEventListener('click', openModal);

// ── 聯絡客服 → 顯示教育彈窗 ──
const btnService = document.getElementById('btn-service');
if (btnService) btnService.addEventListener('click', openModal);

// ── 線上客服 → 顯示教育彈窗 ──
const btnChat = document.getElementById('btn-chat');
if (btnChat) btnChat.addEventListener('click', openModal);


// ── 漢堡選單開關 ──
(function initHamburger() {
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobile-nav');
  const overlay      = document.getElementById('mobile-nav-overlay');
  const closeBtn     = document.getElementById('mobile-nav-close');

  if (!hamburger || !mobileNav || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 防止背景捲動
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  // 關閉按鈕
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // 點擊遮罩關閉
  overlay.addEventListener('click', closeMenu);

  // ESC 鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 點選選單內連結自動關閉
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();


// ── Back to Top ──
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  // 捲動超過 300px 才顯示按鈕
  const SHOW_THRESHOLD = 300;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_THRESHOLD) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true }); // passive: true 確保 iOS 捲動順暢不卡頓

  // 點擊平滑捲回頂部
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
