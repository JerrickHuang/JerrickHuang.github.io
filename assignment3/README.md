# 逢甲大學 Web 程式設計｜作業三
# Feng Chia University — Web Programming Assignment 3

> **課程 Course：** Web 程式設計 Web Programming  
> **學校 School：** 逢甲大學資訊工程學系學士後專班  
> **學生 Student：** Jerrick Huang  
> **GitHub Pages：** [https://jerrickhuang.github.io/assignment3/](https://jerrickhuang.github.io/assignment3/)

---

## 作業說明 Assignment Description

### 中文

本作業以 **momo 購物網** 為仿製對象，復刻其視覺風格，製作一個「**訂單異常通知頁面**」，模擬現實中常見的購物平台釣魚詐騙手法。

目的是透過實際建構一個高度仿真的詐騙網頁，讓使用者在實際操作後透過教育彈窗了解詐騙識別方式，達到**資安意識教育**的效果。

> ⚠️ 本頁面為純教育示範用途，**不收集、不傳送任何個人資料**。  
> 所有表單送出後僅顯示教育說明彈窗，無任何後端串接。

### English

This assignment replicates the visual style of **momo Shopping** (a major Taiwanese e-commerce platform) to build a simulated **"Order Anomaly Notification Page"** — mimicking a real-world phishing scam targeting online shoppers.

The goal is to raise **cybersecurity awareness** by letting users interact with a realistic-looking phishing page, then revealing the deception through an educational popup.

> ⚠️ This page is for educational purposes only. **No personal data is collected or transmitted.**  
> All form submissions trigger an educational warning modal only — no backend is involved.

---

## 詐騙情境說明 Phishing Scenario

| 詐騙手法 Tactic | 本作業對應實作 Implementation |
|---|---|
| 冒充知名購物平台 Brand impersonation | 仿製 momo 購物網視覺與 Logo |
| 製造緊迫感 Urgency creation | 倒數計時器（09:59 開始倒數）、紅色警示橫幅脈動動畫 |
| 誘導輸入金融資料 Financial data phishing | 信用卡號、CVV、有效期限、身份證字號輸入表單 |
| 偽造訂單資訊 Fake order details | 模擬訂單編號、商品明細、金額、付款異常狀態 |
| 假冒進度時間軸 Fake progress timeline | 訂單進度 Timeline，製造「已處理中」假象 |

---

## 頁面功能 Page Features

### 可操作功能 Interactive Features

- **搜尋列**：可輸入文字，點擊搜尋按鈕不跳轉
- **漢堡選單**（手機版）：點擊 ☰ 開啟側滑選單，支援遮罩關閉 / ESC 關閉
- **倒數計時器**：從 09:59 開始，最後 60 秒數字跳動變深紅
- **信用卡號輸入**：自動格式化為 `xxxx xxxx xxxx xxxx`
- **有效期限輸入**：自動格式化為 `MM / YY`
- **CVV 輸入**：自動過濾非數字字元
- **身份證字號輸入**：自動轉換大寫
- **表單送出**：觸發教育說明彈窗，不傳送任何資料
- **取消訂單 / 聯絡客服 按鈕**：同樣觸發教育說明彈窗
- **Back to Top 按鈕**：捲動超過 300px 顯示，點擊平滑回頂

### 教育彈窗 Educational Modal

送出表單或點擊任何操作按鈕後，頁面會顯示教育說明彈窗，內容包含：
- 說明此為釣魚詐騙示範頁面
- 列舉四種真實詐騙手法
- 確認本頁面不收集任何資料

---

## 技術實作 Technical Implementation

### 使用技術 Tech Stack

| 技術 | 說明 |
|---|---|
| HTML5 | 語意化標籤結構（`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`） |
| CSS3 | Flexbox + Grid 排版、CSS Animation、CSS Custom Properties |
| JavaScript (ES6+) | DOM 操作、表單格式化、計時器、事件監聽 |
| 無框架 No Framework | 純原生實作，不使用任何 CSS / JS 框架或函式庫 |

### CSS 排版技術 Layout Techniques

- **Flexbox**：Header（Logo + 搜尋列 + 購物車）、Alert Banner、按鈕組、Footer 底欄
- **CSS Grid**：主內容兩欄（主欄 + 右側欄）、收件人資訊六格、Footer 四欄

### RWD 響應式設計 Responsive Design

- 斷點：`768px`（手機 / 桌機 兩段式）
- 手機版變更：
  - 桌機水平 Nav → 漢堡側滑選單
  - 兩欄 Grid → 單欄（右側欄移到下方）
  - 搜尋按鈕文字 → 放大鏡圖示
  - 表單並排欄位 → 垂直堆疊
  - 操作按鈕 → 全寬垂直排列
- 支援平台：iOS Safari、Android Chrome

### CSS Animation 動畫效果

| 動畫 | 元件 | 效果 |
|---|---|---|
| `bannerPulse` | 警示橫幅 | 背景顏色脈動（2秒循環） |
| `iconShake` | ⚠️ 圖示 | 左右搖擺（3秒循環） |
| `timerPulse` | 倒數計時器 | 最後60秒數字跳動放大 |
| `overlayFadeIn` | Modal 遮罩 | 淡入（0.22秒） |
| `modalSlideUp` | Modal 卡片 | 由下往上滑入 + 彈跳（0.28秒） |
| hover / active | 所有按鈕 | 上移、下壓、陰影變化 |

---

## 檔案結構 File Structure

```
assignment3/
├── index.html    # 頁面結構（HTML5 語意化標籤）
├── style.css     # 樣式（Flexbox / Grid / RWD / Animation）
├── script.js     # 互動邏輯（表單格式化、計時器、Modal、漢堡選單、Back to Top）
└── README.md     # 本說明文件
```

---

## 頁面區塊結構 Page Layout Structure

```
┌─────────────────────────────────┐
│  Utility Bar（快速連結 / 登入）   │
├─────────────────────────────────┤
│  Header（Logo + 搜尋 + 購物車）  │
├─────────────────────────────────┤
│  Main Navigation（分類導覽列）   │
├─────────────────────────────────┤
│  Alert Banner（警示 + 倒數計時） │
├─────────────────┬───────────────┤
│                 │  訂單進度      │
│  訂單明細表格    │  Timeline      │
│  收件人資訊      ├───────────────┤
│  付款資料表單    │  客服專線      │
│  操作按鈕組      ├───────────────┤
│                 │  安全認證      │
├─────────────────┴───────────────┤
│  Member Service Bar（會員入口）  │
├─────────────────────────────────┤
│  Footer（四欄連結）              │
├─────────────────────────────────┤
│  Copyright Bar                  │
└─────────────────────────────────┘
         ↗ Back to Top（固定右下角）
```

---

## 資安教育重點 Cybersecurity Education Notes

本作業示範以下真實詐騙識別方法：

1. **確認網址**：真實 momo 網址為 `momoshop.com.tw`，詐騙網址通常使用相似但不同的網域
2. **官方不會要求輸入 CVV**：任何要求輸入完整信用卡資料的「退款」流程都是詐騙
3. **緊迫感是詐騙手法**：倒數計時、「立即處理」等語句是製造恐慌的常見手段
4. **遇到可疑通知**：直接撥打官方客服電話查詢，不要點擊簡訊或 Email 中的連結

---

## 授權聲明 License

本專案為逢甲大學課程作業，僅供學術與資安教育用途。  
This project is an academic assignment for educational and cybersecurity awareness purposes only.

頁面視覺風格參考 momo 購物網公開頁面，不涉及任何商業用途。  
Visual design references the publicly accessible momo shopping website for educational demonstration only.
