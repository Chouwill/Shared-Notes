# Vue Shared Notes

一個參照 HackMD 設計的 Markdown 筆記分享平台，讓使用者能夠記錄生活或學習筆記，並與他人分享知識。

## 專案簡介

Vue Shared Notes 是一個功能完整的筆記管理與分享平台，提供類似 HackMD 的使用體驗。使用者可以透過 Markdown 語法撰寫筆記、上傳圖片、管理個人檔案，並與社群分享知識。

## 主要功能

### 使用者認證

- **登入系統**：Email 與密碼登入
- **註冊系統**：新使用者註冊功能
- **路由守衛**：保護需要登入的頁面

### 筆記編輯

- **Markdown 編輯器**：使用 Toast UI Editor 提供即時預覽
- **圖片上傳**：支援在編輯器中直接上傳圖片
- **筆記分類**：支援標籤（tags）和分類（category）
- **公開/私密設定**：可設定筆記是否公開分享

### 會員管理

- **個人檔案**：查看與編輯個人資料
- **頭像上傳**：支援上傳個人頭像
- **檔案更新**：即時更新個人資訊

### 筆記管理

- **收藏功能**：將喜愛的筆記加入收藏
- **釘選功能**：將重要筆記釘選至頂部
- **資料夾管理**：建立與管理筆記資料夾
- **筆記分類**：將筆記整理至不同資料夾

### 社群分享

- **公開筆記瀏覽**：查看其他使用者分享的公開筆記
- **筆記檢視**：支援訪客模式查看公開內容

## 技術棧

### 核心框架

- **Vue 3** - 漸進式 JavaScript 框架
- **Vite** - 現代化建置工具

### 路由與狀態管理

- **Vue Router** - 單頁應用路由
- **Pinia** - Vue 官方狀態管理
- **pinia-plugin-persistedstate** - Pinia 狀態持久化

### UI 框架與樣式

- **Tailwind CSS** - 工具優先的 CSS 框架
- **DaisyUI** - Tailwind CSS 元件庫
- **@tailwindcss/vite** - Tailwind CSS Vite 插件

### 編輯器

- **@toast-ui/editor** - Markdown 編輯器（WYSIWYG + Markdown 模式）

### 表單驗證

- **vee-validate** - Vue 表單驗證庫
- **@vee-validate/zod** - Zod 整合
- **zod** - 優先的 schema 驗證

### HTTP 請求

- **axios** - Promise 基礎的 HTTP 客戶端

### 工具庫

- **nanoid** - 輕量級唯一 ID 生成器
- **@iconify/vue** - 豐富的圖標庫
- **@internationalized/date** - 國際化日期處理
- **@radix-ui/colors** - 設計系統顏色

## 快速開始

### 環境需求

- Node.js: `^20.19.0 || >=22.12.0`

### 安裝依賴

```sh
npm install
```

### 開發模式

啟動開發伺服器：

```sh
npm run dev
```
