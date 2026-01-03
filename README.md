# AI 工具箱 - 本地 AI 應用平台

使用 Ollama 在本機運行 AI 模型的整合應用平台。完全離線、隱私安全。

![License](https://img.shields.io/badge/授權-僅限課程學員-red.svg)

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

⚠️ **重要：請使用本地伺服器開啟，不要直接雙擊 HTML 檔案！**

直接開啟 HTML 檔案會因為瀏覽器安全限制導致無法連線 Ollama。

### 4.1 確認 Ollama 正在運行

1. 按 `Win + R`，輸入 `cmd`，按 Enter
2. 輸入以下指令確認 Ollama 運行中：

```bash
ollama list
```

如果有顯示模型列表，表示 Ollama 正在運行。

### 4.2 啟動本地伺服器

在同一個命令提示字元視窗，輸入：

```bash
cd D:\ollama-app
```

> **說明：** 請改成你實際下載專案的資料夾路徑

然後啟動伺服器：

```bash
python -m http.server 8080
```

你會看到類似這樣的訊息：
```
Serving HTTP on :: port 8080 (http://[::]:8080/) ...
```

> ⚠️ **保持這個視窗開著，不要關閉！關閉就無法使用了。**

### 4.3 開啟瀏覽器

在瀏覽器網址列輸入：

```
http://localhost:8080
```

### 4.4 開始使用

看到首頁後，點擊「開啟 AI 工具箱」即可開始使用！

如果顯示「Ollama 已連線」（綠燈），表示一切正常。

---

### 啟動步驟總結

| 步驟 | 指令 | 說明 |
|------|------|------|
| 1 | `ollama list` | 確認 Ollama 運行中 |
| 2 | `cd D:\ollama-app` | 切換到專案資料夾 |
| 3 | `python -m http.server 8080` | 啟動本地伺服器 |
| 4 | 瀏覽器開啟 `http://localhost:8080` | 開始使用 |

---

### 每次使用都要這樣嗎？

是的，每次使用都需要：
1. 確認 Ollama 在背景運行（通常安裝後會自動啟動）
2. 啟動本地伺服器（`python -m http.server 8080`）
3. 用瀏覽器開啟 `http://localhost:8080`

> **提示：** 專案已內建 `start.bat` 批次檔，雙擊即可一鍵啟動！

---

### 🚀 一鍵啟動（推薦）

專案資料夾內有 `start.bat` 檔案，雙擊即可：
1. 自動檢查 Ollama 是否運行
2. 自動檢查 Python 是否安裝
3. 自動啟動本地伺服器
4. 自動開啟瀏覽器

**使用方式：**
1. 到專案資料夾
2. 雙擊 `start.bat`
3. 等待瀏覽器自動開啟
4. 完成！

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

用文字描述，讓 AI 生成圖像。

⚠️ **此功能需要額外安裝 Stable Diffusion，請先完成以下安裝步驟！**

---

#### 📦 安裝 Stable Diffusion（第一次使用需安裝）

**系統需求：**
- NVIDIA 顯示卡（建議 RTX 3060 以上）
- 至少 8GB 顯示記憶體（VRAM）
- 約 10GB 硬碟空間

**Step 1：安裝 Git**

1. 前往：https://git-scm.com/download/win
2. 下載並安裝（一直按下一步即可）

**Step 2：安裝 Python 3.10.6**

1. 前往：https://www.python.org/downloads/release/python-3106/
2. 往下滑，點擊 **Windows installer (64-bit)** 下載
3. 執行安裝程式
4. ⚠️ **重要：務必勾選 "Add Python to PATH"**
5. 點擊 Install Now

**Step 3：下載 Stable Diffusion WebUI Forge**

> ⚠️ **重要：請使用 Forge 版本！** 原版 AUTOMATIC1111 的倉庫已有相依性問題，Forge 版本更穩定且功能更多。

1. 按 `Win + R`，輸入 `cmd`，按 Enter
2. 輸入以下指令切換到 D 槽（或你想安裝的位置）：

```bash
D:
```

3. 輸入以下指令下載 Stable Diffusion Forge：

```bash
git clone https://github.com/lllyasviel/stable-diffusion-webui-forge.git
```

> 📝 這會在 D 槽建立一個 `stable-diffusion-webui-forge` 資料夾

4. 進入資料夾：

```bash
cd stable-diffusion-webui-forge
```

**Step 4：下載圖像生成模型**

Stable Diffusion 需要模型檔案才能生成圖像。

1. 前往模型下載網站：
   - [Civitai](https://civitai.com/) - 最大的模型社群（推薦）
   - [Hugging Face](https://huggingface.co/) - AI 模型平台

2. 搜尋並下載你喜歡的模型（選擇 `.safetensors` 格式）

3. 把下載的模型檔案放到這個資料夾：
   ```
   D:\stable-diffusion-webui-forge\models\Stable-diffusion\
   ```

**Step 5：啟動 Stable Diffusion Forge**

1. 用檔案總管開啟 `D:\stable-diffusion-webui-forge` 資料夾
2. 找到 `webui-user.bat` 檔案
3. **右鍵** → **編輯**（用記事本開啟）
4. 找到 `set COMMANDLINE_ARGS=` 這一行
5. 改成：
   ```
   set COMMANDLINE_ARGS=--api
   ```
6. 儲存並關閉
7. 雙擊 `webui-user.bat` 啟動

> ⏳ 第一次啟動會自動下載必要檔案，可能需要 10-30 分鐘，請耐心等待！

8. 看到以下訊息表示啟動成功：
   ```
   Running on local URL: http://127.0.0.1:7860
   ```

9. 瀏覽器會自動開啟 Stable Diffusion 介面

---

#### 🎨 使用圖像生成功能

安裝完成後，就可以使用圖像生成功能了！

**使用方式：**
1. 確認 Stable Diffusion 正在運行（上面 Step 5）
2. 開啟 AI 工具箱
3. 點擊左側選單的「🎨 圖像生成」
4. 確認上方顯示「SD 已連線」（綠燈）
5. 在「正向提示詞」輸入你想要的圖像描述（建議用英文）
6. 在「負向提示詞」輸入你不想要的元素
7. 點擊「生成圖像」

**提示詞範例：**

| 想要的圖像 | 正向提示詞 |
|-----------|-----------|
| 夕陽海景 | `beautiful sunset over ocean, golden hour, dramatic clouds, 8k, masterpiece` |
| 可愛貓咪 | `cute fluffy cat, big eyes, soft lighting, photorealistic, detailed fur` |
| 未來城市 | `futuristic city, cyberpunk, neon lights, flying cars, night scene, 4k` |
| 水彩風景 | `watercolor painting, spring garden, flowers, soft colors, artistic` |

**負向提示詞範例（不想要的元素）：**
```
blurry, low quality, distorted, ugly, bad anatomy, extra limbs
```

**設定說明：**

| 設定 | 建議值 | 說明 |
|------|--------|------|
| 步數 (Steps) | 20-30 | 越高品質越好，但越慢 |
| CFG Scale | 7-9 | 越高越接近你的描述 |
| Seed | -1 | -1 表示隨機，固定數字可重現相同圖像 |

---

#### ❓ 圖像生成常見問題

**Q: 顯示「SD WebUI 未連線」怎麼辦？**

A: 請確認：
1. 已執行 `webui-user.bat` 啟動 Stable Diffusion
2. 等待啟動完成（看到 `Running on local URL: http://127.0.0.1:7860`）
3. 重新整理 AI 工具箱頁面

**Q: 第一次啟動很久正常嗎？**

A: 正常！第一次啟動會自動下載約 4GB 的必要檔案，請耐心等待。

**Q: 沒有 NVIDIA 顯卡可以用嗎？**

A: 可以但會很慢。需要修改設定使用 CPU 運算，生成一張圖可能要 10 分鐘以上。

---

### 5.6 使用教學

應用程式內建教學頁面，包含：
- 安裝指南
- 模型下載
- 圖像生成設定
- 部署說明

點擊左側選單的「📖 使用教學」即可查看。

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

## 授權聲明

© 2026 阿亮老師 版權所有

本專案僅供「阿亮老師課程學員」學習使用。

⚠️ **禁止事項：**

- 禁止修改本專案內容
- 禁止轉傳或散布
- 禁止商業使用
- 禁止未經授權之任何形式使用

如有任何授權需求，請聯繫作者。
