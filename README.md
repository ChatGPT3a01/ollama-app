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

**Windows 操作步驟：**
1. 按 `Win + R`，輸入 `cmd`，按 Enter
2. 在命令提示字元視窗輸入下載指令
3. 等待下載完成

**推薦模型：**

```bash
# 推薦首選（200億參數，綜合能力強）
ollama pull gpt-oss:20b

# 其他推薦模型
ollama pull llama3.2      # Meta 最新模型，速度快
ollama pull qwen2.5       # 阿里巴巴模型，中文能力優秀
ollama pull mistral       # Mistral AI，程式碼能力強
ollama pull deepseek-coder-v2  # 專精程式碼
```

**查看已安裝的模型：**
```bash
ollama list
```

### 3. 開啟應用

用瀏覽器開啟 `index.html` 即可開始使用。

## 圖像生成設定（選用）

如需使用圖像生成功能，需安裝 AUTOMATIC1111 Stable Diffusion WebUI：

### 系統需求
- NVIDIA 顯示卡（建議 RTX 3060 以上）
- 至少 8GB VRAM
- Python 3.10.6
- Git

### 安裝步驟

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui
```

### 下載 Stable Diffusion 模型

推薦模型下載網站：
- [Civitai](https://civitai.com/) - 最大的模型社群
- [Hugging Face](https://huggingface.co/) - AI 模型平台

下載 `.safetensors` 檔案後，放入 `models/Stable-diffusion/` 資料夾。

### 啟動 WebUI（開啟 API 模式）

```bash
# Windows
webui-user.bat --api

# macOS / Linux
./webui.sh --api
```

啟動後訪問 http://127.0.0.1:7860 確認運作正常。

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

## 授權

MIT License
