/* =====================================================
   momo 釣魚詐騙示範 — script.js
   逢甲大學資工學士後專班 · Web 程式設計課程作業
   ─────────────────────────────────────────────────
   ⚠️  本頁面為資安教育示範，不收集、不傳送任何資料。
       所有按鈕與表單送出，僅觸發教育說明彈窗。
   ─────────────────────────────────────────────────
   功能模組：
     1. startCountdown()   — 倒數計時器
     2. 表單輸入格式化      — 信用卡、有效期限、CVV、身份證
     3. Modal 開關          — 教育說明彈窗
     4. initHamburger()    — 手機版漢堡側滑選單
     5. initBackToTop()    — 回頂部按鈕
   ===================================================== */


/* =====================================================
   1. 倒數計時器
   ─────────────────────────────────────────────────────
   技術重點：
     - IIFE（立即呼叫函式）避免污染全域變數
     - setInterval() 每 1000ms 執行一次
     - padStart(2, '0') 補零，確保格式為 MM:SS
     - clearInterval() 在歸零時停止計時
   詐騙手法：製造時間壓力，迫使使用者在恐慌下快速輸入資料
   ===================================================== */
(function startCountdown() {
  const el = document.getElementById('timer');
  if (!el) return;

  let total = 9 * 60 + 59; // 初始值：09:59（單位：秒）

  const tick = setInterval(() => {
    total--;

    // 歸零：停止計時，保留 urgent 樣式
    if (total <= 0) {
      clearInterval(tick);
      el.textContent = '00:00';
      el.classList.add('urgent');
      return;
    }

    // 更新顯示文字（補零確保兩位數格式）
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;

    // 最後 60 秒：加 .urgent class → CSS 觸發跳動動畫 + 深紅色
    if (total <= 60) {
      el.classList.add('urgent');
    } else {
      el.classList.remove('urgent');
    }
  }, 1000);
})();


/* =====================================================
   2. 表單輸入格式化
   ─────────────────────────────────────────────────────
   技術重點：
     - 監聽 'input' 事件（每次按鍵後觸發）
     - 正則表達式 /\D/g 過濾所有非數字字元
     - replace() 搭配 regex 自動插入分隔符
   詐騙手法：自動格式化增加操作流暢感，降低使用者警覺性
   ===================================================== */

// 2-1 信用卡號：每 4 碼自動補空格，格式 xxxx xxxx xxxx xxxx
const cardInput = document.getElementById('card-number');
if (cardInput) {
  cardInput.addEventListener('input', () => {
    let val = cardInput.value.replace(/\D/g, '').slice(0, 16);
    cardInput.value = val.replace(/(.{4})/g, '$1 ').trim();
  });
}

// 2-2 有效期限：自動插入「 / 」，格式 MM / YY
const expiryInput = document.getElementById('card-expiry');
if (expiryInput) {
  expiryInput.addEventListener('input', () => {
    let val = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) val = val.slice(0, 2) + ' / ' + val.slice(2);
    expiryInput.value = val;
  });
}

// 2-3 CVV：只允許數字，最多 3 碼
const cvvInput = document.getElementById('card-cvv');
if (cvvInput) {
  cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
  });
}

// 2-4 身份證字號：自動轉大寫
const idInput = document.getElementById('id-number');
if (idInput) {
  idInput.addEventListener('input', () => {
    idInput.value = idInput.value.toUpperCase();
  });
}


/* =====================================================
   3. Modal 教育說明彈窗
   ─────────────────────────────────────────────────────
   技術重點：
     - classList.add('active') 切換 display: none → flex
     - CSS Animation 在 .active 狀態觸發（overlayFadeIn + modalSlideUp）
     - e.target === modal：確認點擊的是遮罩本身，而非彈窗內容
     - e.preventDefault()：阻止表單實際送出任何資料
   觸發時機：表單 submit、取消訂單、聯絡客服、線上客服
   ===================================================== */
const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function openModal() {
  if (modal) modal.classList.add('active');
}

function closeModal() {
  if (modal) modal.classList.remove('active');
}

// 關閉按鈕
if (modalClose) modalClose.addEventListener('click', closeModal);

// 點擊遮罩（背景）關閉彈窗
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// 表單送出 → 阻止預設行為 → 顯示教育彈窗
const form = document.getElementById('payment-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // 關鍵：阻止任何實際資料傳送
    openModal();
  });
}

// 各操作按鈕 → 顯示教育彈窗
const btnCancel  = document.getElementById('btn-cancel');
const btnService = document.getElementById('btn-service');
const btnChat    = document.getElementById('btn-chat');

if (btnCancel)  btnCancel.addEventListener('click', openModal);
if (btnService) btnService.addEventListener('click', openModal);
if (btnChat)    btnChat.addEventListener('click', openModal);


/* =====================================================
   4. 漢堡選單（手機版側滑 Nav）
   ─────────────────────────────────────────────────────
   技術重點：
     - IIFE 封裝，所有變數不外洩至全域
     - classList.add/remove('open') 觸發 CSS transition 滑入動畫
     - document.body.style.overflow = 'hidden'：
         開啟選單時鎖定背景捲動，防止 iOS 穿透滾動問題
     - aria-expanded / aria-hidden：更新無障礙屬性狀態
   關閉方式：① ✕按鈕  ② 遮罩  ③ ESC鍵  ④ 選單連結
   ===================================================== */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-nav-overlay');
  const closeBtn  = document.getElementById('mobile-nav-close');

  if (!hamburger || !mobileNav || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 鎖定背景捲動
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

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);  // ① ✕ 按鈕
  overlay.addEventListener('click', closeMenu);                 // ② 遮罩
  document.addEventListener('keydown', (e) => {                // ③ ESC
    if (e.key === 'Escape') closeMenu();
  });
  mobileNav.querySelectorAll('a').forEach(link => {            // ④ 選單連結
    link.addEventListener('click', closeMenu);
  });
})();


/* =====================================================
   5. Back to Top 回頂部按鈕
   ─────────────────────────────────────────────────────
   技術重點：
     - { passive: true }：宣告 scroll 為被動監聽器，
         不呼叫 preventDefault()，允許瀏覽器優化捲動效能，
         對 iOS Safari 尤其重要（避免捲動卡頓）
     - classList.add('visible')：觸發 CSS transition 淡入
     - scrollTo({ behavior: 'smooth' })：原生平滑捲動 API
   ===================================================== */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const SHOW_THRESHOLD = 300; // 捲動超過 300px 才顯示按鈕

  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_THRESHOLD) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true }); // passive: true 確保 iOS 捲動順暢

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
