# AI 工具箱 - 本地 AI 應用平台

使用 Ollama 在本機運行 AI 模型的整合應用平台。完全離線、隱私安全。

![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 功能特色

- **AI 對話** - 與 AI 進行自然對話
- **寫作工作台** - 改寫、擴寫、風格轉換、SEO 優化、社群貼文等
- **程式碼審查** - 程式碼審查、測試生成、重構建議、程式碼解釋
- **知識庫** - 個人筆記管理與 AI 問答
- **圖像生成** - 整合 Stable Diffusion WebUI 生成圖像
- **使用教學** - 完整的安裝與使用指南

---

## 第一步：下載本專案

### 方法一：直接下載 ZIP（推薦新手）

1. 點擊本頁面上方綠色的 **Code** 按鈕
2. 選擇 **Download ZIP**
3. 下載完成後，解壓縮到你想要的位置（例如：`D:\ollama-app`）

### 方法二：使用 Git 下載

如果你已安裝 Git，可以用命令列下載：

```bash
git clone https://github.com/ChatGPT3a01/ollama-app.git
```

這會在目前資料夾建立一個 `ollama-app` 資料夾，裡面就是專案檔案。

---

## 第二步：安裝 Ollama

Ollama 是讓 AI 模型在你電腦上運行的程式。

### 2.1 下載 Ollama

1. 前往官網：https://ollama.com/download
2. 點擊 **Download for Windows**（或你的作業系統）
3. 下載完成後，執行安裝程式
4. 按照提示完成安裝

### 2.2 確認安裝成功

1. 按 `Win + R`（同時按住 Windows 鍵和 R 鍵）
2. 輸入 `cmd`，按 Enter，會開啟黑色的命令提示字元視窗
3. 輸入以下指令，按 Enter：

```bash
ollama --version
```

如果顯示版本號碼（例如 `ollama version 0.1.xx`），表示安裝成功！

---

## 第三步：下載 AI 模型

安裝好 Ollama 後，需要下載 AI 模型才能使用。

### 3.1 開啟命令提示字元

1. 按 `Win + R`
2. 輸入 `cmd`，按 Enter

### 3.2 下載模型

在黑色視窗輸入以下指令（複製貼上即可），然後按 Enter：

```bash
ollama pull gpt-oss:20b
```

> **說明：** 這會下載 gpt-oss 模型（約 12GB），需要一些時間，請耐心等待。
> 下載完成會顯示 `success`。

### 3.3 其他推薦模型（選擇性下載）

| 模型名稱 | 下載指令 | 大小 | 特色 |
|---------|---------|------|------|
| gpt-oss:20b | `ollama pull gpt-oss:20b` | 12GB | **推薦！** 綜合能力強 |
| llama3.2 | `ollama pull llama3.2` | 2GB | 速度快、輕量 |
| qwen2.5 | `ollama pull qwen2.5` | 4.4GB | 中文能力優秀 |
| mistral | `ollama pull mistral` | 4.1GB | 程式碼能力強 |
| deepseek-coder-v2 | `ollama pull deepseek-coder-v2` | 8.9GB | 專精程式碼 |

### 3.4 查看已下載的模型

```bash
ollama list
```

---

## 第四步：開啟應用程式

1. 到你下載專案的資料夾
2. 找到 `index.html` 檔案
3. 用瀏覽器開啟（雙擊，或右鍵選擇「用 Chrome/Edge 開啟」）
4. 點擊「開啟 AI 工具箱」即可開始使用！

> **注意：** 使用前請確保 Ollama 正在背景運行（安裝後會自動啟動）。

---

## 第五步：如何使用各功能

開啟應用後，左側有導航選單，點擊可切換不同功能。

### 5.1 AI 對話

與 AI 進行自然對話，就像跟朋友聊天一樣。

**使用方式：**
1. 點擊左側選單的「💬 AI 對話」
2. 在下方輸入框輸入你的問題
3. 點擊「發送」按鈕
4. 等待 AI 回覆

**範例問題：**
```
請用簡單的方式解釋什麼是人工智慧？
```
```
幫我寫一首關於春天的詩
```
```
台灣有哪些著名的觀光景點？
```

---

### 5.2 寫作工作台

讓 AI 幫你改寫、擴寫、潤飾文章。

**使用方式：**
1. 點擊左側選單的「✍️ 寫作工作台」
2. 選擇你要的功能（改寫、風格轉換、擴寫、摘要等）
3. 在文字框輸入你的原始文字
4. 點擊「處理文字」

**功能說明：**

| 功能 | 用途 | 範例輸入 |
|------|------|---------|
| 改寫 | 用不同方式表達相同意思 | `這個產品很好用` |
| 風格轉換 | 改變文章風格（正式/輕鬆/學術等） | `我覺得這個東西還不錯` |
| 擴寫 | 把短句擴充成長段落 | `AI 改變了世界` |
| 摘要 | 把長文縮短成重點 | （貼上一篇長文章） |
| 標題發想 | 幫文章想標題 | （貼上文章內容） |
| SEO 優化 | 優化網站內容提升搜尋排名 | （貼上網頁文案） |
| 標語口號 | 創作廣告標語 | `我們賣手搖飲料` |
| 社群貼文 | 撰寫社群媒體貼文 | `新品上市，珍珠奶茶買一送一` |

**範例：改寫功能**

輸入：
```
這家餐廳的食物很好吃，服務也很棒。
```

AI 輸出：
```
這間餐館的料理令人驚艷，服務品質更是無可挑剔。
```

---

### 5.3 程式碼審查

讓 AI 幫你檢查程式碼、找出問題、生成測試。

**使用方式：**
1. 點擊左側選單的「🔍 程式碼審查」
2. 選擇功能（審查程式碼、生成測試、重構建議、解釋程式碼）
3. 選擇程式語言（Python、JavaScript 等）
4. 貼上你的程式碼
5. 點擊「分析程式碼」

**功能說明：**

| 功能 | 用途 |
|------|------|
| 審查程式碼 | 找出程式碼中的問題和改進建議 |
| 生成測試 | 自動產生測試程式碼 |
| 重構建議 | 建議如何改善程式碼結構 |
| 解釋程式碼 | 用白話文解釋程式碼在做什麼 |

**範例：解釋程式碼**

輸入（Python）：
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

AI 輸出：
```
這是一個計算階乘的遞迴函數。
- 如果 n 小於等於 1，回傳 1（遞迴終止條件）
- 否則，回傳 n 乘以 (n-1) 的階乘
例如：factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
```

---

### 5.4 知識庫

建立個人筆記，讓 AI 根據你的筆記回答問題。

**使用方式：**

**新增筆記：**
1. 點擊「新增筆記」分頁
2. 輸入標題、內容、標籤
3. 點擊「新增筆記」

**查詢知識：**
1. 點擊「查詢知識」分頁
2. 輸入你的問題
3. AI 會根據你的筆記內容回答

**範例：**

先新增筆記：
```
標題：Python 虛擬環境
內容：使用 python -m venv myenv 建立虛擬環境，
      使用 myenv\Scripts\activate 啟動環境
標籤：python, 教學
```

然後查詢：
```
如何建立 Python 虛擬環境？
```

AI 會根據你的筆記回答！

---

### 5.5 圖像生成

用文字描述，讓 AI 生成圖像（需額外安裝 Stable Diffusion）。

**使用方式：**
1. 點擊左側選單的「🎨 圖像生成」
2. 確認上方顯示「SD 已連線」（綠燈）
3. 在「正向提示詞」輸入你想要的圖像描述（建議用英文）
4. 在「負向提示詞」輸入你不想要的元素
5. 調整設定（尺寸、步數等）
6. 點擊「生成圖像」

**提示詞範例：**

| 想要的圖像 | 正向提示詞 |
|-----------|-----------|
| 夕陽海景 | `beautiful sunset over ocean, golden hour, dramatic clouds, 8k, masterpiece` |
| 可愛貓咪 | `cute fluffy cat, big eyes, soft lighting, photorealistic, detailed fur` |
| 未來城市 | `futuristic city, cyberpunk, neon lights, flying cars, night scene, 4k` |
| 水彩風景 | `watercolor painting, spring garden, flowers, soft colors, artistic` |

**負向提示詞範例：**
```
blurry, low quality, distorted, ugly, bad anatomy, extra limbs
```

**設定建議：**
- **步數 (Steps)**：20-30（越高品質越好，但越慢）
- **CFG Scale**：7-9（越高越接近提示詞描述）
- **Seed**：-1 表示隨機，輸入固定數字可重現相同圖像

---

### 5.6 使用教學

應用程式內建教學頁面，包含：
- 安裝指南
- 模型下載
- 圖像生成設定
- 部署說明

點擊左側選單的「📖 使用教學」即可查看。

---

## 圖像生成功能設定（進階，選用）

如果想要使用 AI 圖像生成功能，需要額外安裝 Stable Diffusion。

### 系統需求

- NVIDIA 顯示卡（建議 RTX 3060 以上）
- 至少 8GB 顯示記憶體（VRAM）
- Python 3.10.6
- Git

### 步驟一：安裝 Git（如果還沒有）

1. 前往：https://git-scm.com/download/win
2. 下載並安裝

### 步驟二：安裝 Python 3.10.6

1. 前往：https://www.python.org/downloads/release/python-3106/
2. 下載 **Windows installer (64-bit)**
3. 安裝時**務必勾選** "Add Python to PATH"

### 步驟三：下載 Stable Diffusion WebUI

1. 按 `Win + R`，輸入 `cmd`，按 Enter
2. 切換到你想要安裝的位置，例如 D 槽：

```bash
D:
```

3. 下載 Stable Diffusion WebUI：

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

> **說明：** 這個指令會從 GitHub 下載整個 Stable Diffusion WebUI 專案到目前資料夾。

4. 進入剛下載的資料夾：

```bash
cd stable-diffusion-webui
```

> **說明：** `cd` 是 "change directory" 的意思，用來切換資料夾。

### 步驟四：下載 Stable Diffusion 模型

1. 前往 [Civitai](https://civitai.com/) 或 [Hugging Face](https://huggingface.co/)
2. 下載你喜歡的模型（`.safetensors` 檔案）
3. 將下載的檔案放入：
   ```
   stable-diffusion-webui/models/Stable-diffusion/
   ```

### 步驟五：啟動 Stable Diffusion（開啟 API 模式）

在 `stable-diffusion-webui` 資料夾中，執行：

```bash
webui-user.bat --api
```

> **說明：** `--api` 參數是讓本專案能夠呼叫 Stable Diffusion 生成圖像。

首次啟動會自動下載必要檔案，需要較長時間。

啟動成功後，瀏覽器會自動開啟 http://127.0.0.1:7860

---

## 檔案結構

```
ollama-app/
├── index.html              # 入口頁面（從這裡開始）
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

---

## 常見問題

### Q: 網頁顯示「Ollama 未連線」怎麼辦？

A: 請確認 Ollama 正在運行。可以在命令提示字元輸入 `ollama list` 測試。

### Q: 模型下載很慢怎麼辦？

A: 模型檔案較大，下載時間取決於網路速度，請耐心等待。

### Q: 可以同時下載多個模型嗎？

A: 建議一次下載一個，等完成後再下載下一個。

---

## 授權

MIT License
