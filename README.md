# AI 工具箱 - 本地 AI 應用平台

使用 Ollama 在本機運行 AI 模型的整合應用平台。完全離線、隱私安全。

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 功能特色

- **AI 對話** - 與 AI 進行自然對話
- **寫作工作台** - 改寫、擴寫、風格轉換、SEO 優化、社群貼文等
- **程式碼審查** - 程式碼審查、測試生成、重構建議、程式碼解釋
- **知識庫** - 個人筆記管理與 AI 問答
- **圖像生成** - 整合 Stable Diffusion WebUI 生成圖像
- **使用教學** - 完整的安裝與使用指南

## 快速開始

### 1. 安裝 Ollama

前往 [ollama.com](https://ollama.com/download) 下載並安裝。

### 2. 下載 AI 模型

```bash
# 推薦模型
ollama pull llama3.2      # Meta 最新模型
ollama pull qwen2.5       # 阿里巴巴模型，中文能力優秀
ollama pull mistral       # 程式碼能力強
```

### 3. 開啟應用

用瀏覽器開啟 `index.html` 即可開始使用。

## 圖像生成設定（選用）

如需使用圖像生成功能，需安裝 AUTOMATIC1111 Stable Diffusion WebUI：

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# 啟動時需開啟 API 模式
# Windows
webui-user.bat --api

# macOS / Linux
./webui.sh --api
```

下載模型放入 `models/Stable-diffusion/` 資料夾。

推薦模型下載網站：
- [Civitai](https://civitai.com/) - 最大的模型社群
- [Hugging Face](https://huggingface.co/) - AI 模型平台

## 檔案結構

```
ollama/
├── index.html              # 入口頁面
├── app/                    # 整合應用
│   ├── index.html          # 應用主頁
│   ├── app.js              # 應用邏輯
│   └── app.css             # 應用樣式
└── shared/                 # 共用模組
    ├── ollama-api.js       # Ollama API 封裝
    ├── model-selector.js   # 模型選擇器
    ├── shared-styles.css   # 共用樣式
    └── utils.js            # 工具函數
```

## 系統需求

- 現代瀏覽器（Chrome、Firefox、Edge、Safari）
- [Ollama](https://ollama.com) 已安裝並運行
- 至少一個已下載的模型

### 圖像生成額外需求

- NVIDIA 顯示卡（建議 RTX 3060 以上）
- 至少 8GB VRAM
- Python 3.10.6
- Git

## 授權

MIT License
