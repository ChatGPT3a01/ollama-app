/**
 * AI 工具箱應用主程式
 */

// 全域狀態
let currentModel = '';
let chatHistory = [];
let notes = [];
let queryCount = 0;
let currentWritingTool = 'rewrite';
let currentCodeTool = 'review';
let imageGallery = [];

// Stable Diffusion API 設定
const SD_API = 'http://127.0.0.1:7860';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initModelSelector();
    initNavigation();
    initChatModule();
    initWritingModule();
    initCodeModule();
    initKnowledgeModule();
    initImageModule();
    initTutorialModule();
    loadStoredData();
});

// ==================== 模型選擇器 ====================
function initModelSelector() {
    const modelSelect = document.getElementById('modelSelect');
    const modelStatus = document.getElementById('modelStatus');

    const selector = new ModelSelector(modelSelect, modelStatus);
    selector.onModelChange = (model) => {
        currentModel = model;
    };

    // 初始模型
    setTimeout(() => {
        currentModel = selector.getModel();
    }, 1000);
}

// ==================== 導航切換 ====================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const modules = document.querySelectorAll('.module');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const moduleName = item.dataset.module;

            // 更新導航狀態
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 切換模組
            modules.forEach(mod => mod.classList.remove('active'));
            document.getElementById(`${moduleName}-module`).classList.add('active');
        });
    });
}

// ==================== 對話模組 ====================
function initChatModule() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');
    const clearBtn = document.getElementById('clearChat');
    const messagesContainer = document.getElementById('chatMessages');

    // 發送訊息
    sendBtn.addEventListener('click', sendChatMessage);

    // Enter 發送 (Shift+Enter 換行)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // 清除對話
    clearBtn.addEventListener('click', () => {
        if (confirm('確定要清除所有對話嗎？')) {
            chatHistory = [];
            messagesContainer.innerHTML = '';
            Utils.showSuccess('對話已清除');
        }
    });
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const message = input.value.trim();

    if (!message) return;
    if (!currentModel) {
        Utils.showError('請先選擇模型');
        return;
    }

    // 顯示用戶訊息
    appendMessage('user', message);
    input.value = '';

    // 顯示載入中
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant';
    loadingDiv.innerHTML = '<div class="message-content loading">思考中</div>';
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const response = await OllamaAPI.generate(currentModel, message);
        loadingDiv.remove();

        const aiResponse = response.response || '抱歉，無法取得回應。';
        appendMessage('assistant', aiResponse);

        // 儲存對話歷史
        chatHistory.push({ role: 'user', content: message });
        chatHistory.push({ role: 'assistant', content: aiResponse });
    } catch (error) {
        loadingDiv.remove();
        Utils.showError('發送失敗：' + error.message);
    }
}

function appendMessage(role, content) {
    const messagesContainer = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.innerHTML = `<div class="message-content">${Utils.formatMessageContent(content)}</div>`;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ==================== 寫作模組 ====================
function initWritingModule() {
    const toolBtns = document.querySelectorAll('.writing-container .tool-btn');
    const processBtn = document.getElementById('processWriting');
    const styleSelector = document.getElementById('styleSelector');

    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWritingTool = btn.dataset.tool;

            // 風格選擇器只在「風格轉換」時顯示
            styleSelector.style.display = currentWritingTool === 'style' ? 'flex' : 'none';
        });
    });

    processBtn.addEventListener('click', processWriting);
}

async function processWriting() {
    const input = document.getElementById('writingInput').value.trim();
    const resultArea = document.getElementById('writingResult');
    const style = document.getElementById('styleSelect').value;

    if (!input) {
        Utils.showError('請輸入文字內容');
        return;
    }
    if (!currentModel) {
        Utils.showError('請先選擇模型');
        return;
    }

    const prompts = {
        rewrite: `請將以下文字改寫成 5 個不同的版本，每個版本用不同的表達方式：\n\n${input}`,
        style: `請將以下文字轉換成「${getStyleName(style)}」的風格：\n\n${input}`,
        expand: `請將以下文字擴寫成 2-3 倍的長度，加入更多細節和說明：\n\n${input}`,
        summary: `請將以下文字濃縮成 100 字以內的摘要：\n\n${input}`,
        title: `請根據以下內容，生成 10 個有創意的標題：\n\n${input}`,
        seo: `請針對以下內容提供 SEO 優化建議，包含關鍵字、Meta 描述和標題建議：\n\n${input}`,
        slogan: `請根據以下內容，創作 10 個朗朗上口的標語或口號：\n\n${input}`,
        social: `請將以下內容改寫成適合不同社群平台的貼文格式（Facebook、Instagram、Twitter、LinkedIn 各一個）：\n\n${input}`
    };

    resultArea.innerHTML = '<div class="loading">處理中</div>';
    resultArea.classList.add('loading');

    try {
        const response = await OllamaAPI.generate(currentModel, prompts[currentWritingTool] + '\n\n請用繁體中文回答。');
        resultArea.classList.remove('loading');
        resultArea.innerHTML = Utils.formatMessageContent(response.response || '無法取得結果');
    } catch (error) {
        resultArea.classList.remove('loading');
        resultArea.innerHTML = '';
        Utils.showError('處理失敗：' + error.message);
    }
}

function getStyleName(style) {
    const styles = {
        formal: '正式專業',
        casual: '輕鬆口語',
        sales: '銷售說服',
        academic: '學術嚴謹',
        friendly: '親切友善',
        humor: '幽默風趣'
    };
    return styles[style] || style;
}

// ==================== 程式碼審查模組 ====================
function initCodeModule() {
    const toolBtns = document.querySelectorAll('.code-container .tool-btn');
    const processBtn = document.getElementById('processCode');

    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCodeTool = btn.dataset.tool;
        });
    });

    processBtn.addEventListener('click', processCode);
}

async function processCode() {
    const code = document.getElementById('codeInput').value.trim();
    const language = document.getElementById('langSelect').value;
    const resultArea = document.getElementById('codeResult');

    if (!code) {
        Utils.showError('請輸入程式碼');
        return;
    }
    if (!currentModel) {
        Utils.showError('請先選擇模型');
        return;
    }

    const prompts = {
        review: `請審查以下 ${language} 程式碼，檢查：
1. 潛在的 Bug
2. 效能問題
3. 安全性問題
4. 程式碼風格

程式碼：
\`\`\`${language}
${code}
\`\`\``,
        test: `請為以下 ${language} 程式碼生成單元測試範例：
\`\`\`${language}
${code}
\`\`\``,
        refactor: `請提供以下 ${language} 程式碼的重構建議，包含：
1. 結構改善
2. 命名優化
3. 設計模式建議

程式碼：
\`\`\`${language}
${code}
\`\`\``,
        explain: `請詳細解釋以下 ${language} 程式碼的功能和邏輯：
\`\`\`${language}
${code}
\`\`\``
    };

    resultArea.innerHTML = '<div class="loading">分析中</div>';
    resultArea.classList.add('loading');

    try {
        const response = await OllamaAPI.generate(currentModel, prompts[currentCodeTool] + '\n\n請用繁體中文回答。');
        resultArea.classList.remove('loading');
        resultArea.innerHTML = Utils.formatMessageContent(response.response || '無法取得結果');
    } catch (error) {
        resultArea.classList.remove('loading');
        resultArea.innerHTML = '';
        Utils.showError('分析失敗：' + error.message);
    }
}

// ==================== 知識庫模組 ====================
function initKnowledgeModule() {
    // 頁籤切換
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // 查詢知識
    document.getElementById('queryKnowledge').addEventListener('click', queryKnowledge);

    // 新增筆記
    document.getElementById('addNote').addEventListener('click', addNote);

    // 清除全部
    document.getElementById('clearAllNotes').addEventListener('click', () => {
        if (confirm('確定要清除所有筆記嗎？此操作無法復原！')) {
            notes = [];
            saveNotes();
            renderNotes();
            Utils.showSuccess('所有筆記已清除');
        }
    });

    // 搜尋筆記
    document.getElementById('searchNotes').addEventListener('input', (e) => {
        renderNotes(e.target.value);
    });
}

async function queryKnowledge() {
    const query = document.getElementById('queryInput').value.trim();
    const resultArea = document.getElementById('queryResult');

    if (!query) {
        Utils.showError('請輸入問題');
        return;
    }
    if (!currentModel) {
        Utils.showError('請先選擇模型');
        return;
    }

    // 找相關筆記
    const relevantNotes = findRelevantNotes(query, 3);

    let context = '';
    if (relevantNotes.length > 0) {
        context = '根據以下知識庫內容：\n\n';
        relevantNotes.forEach((note, i) => {
            context += `【筆記 ${i + 1}】${note.title}\n${note.content}\n\n`;
        });
    }

    const prompt = context + `問題：${query}\n\n請根據上述知識庫內容回答問題。如果知識庫中沒有相關資訊，請說明並提供你所知道的資訊。請用繁體中文回答。`;

    resultArea.innerHTML = '<div class="loading">查詢中</div>';
    resultArea.classList.add('loading');

    try {
        const response = await OllamaAPI.generate(currentModel, prompt);
        resultArea.classList.remove('loading');

        let result = '';
        if (relevantNotes.length > 0) {
            result += '<div style="color: var(--text-light); margin-bottom: 15px; font-size: 13px;">📚 參考了 ' + relevantNotes.length + ' 篇筆記</div>';
        }
        result += Utils.formatMessageContent(response.response || '無法取得回答');
        resultArea.innerHTML = result;

        // 更新查詢計數
        queryCount++;
        document.getElementById('queryCount').textContent = queryCount;
        Utils.saveToStorage('ai_query_count', queryCount);
    } catch (error) {
        resultArea.classList.remove('loading');
        resultArea.innerHTML = '';
        Utils.showError('查詢失敗：' + error.message);
    }
}

function findRelevantNotes(query, limit = 3) {
    const queryWords = query.toLowerCase().split(/\s+/);

    const scored = notes.map(note => {
        let score = 0;
        const text = (note.title + ' ' + note.content + ' ' + note.tags.join(' ')).toLowerCase();

        queryWords.forEach(word => {
            if (text.includes(word)) score++;
        });

        return { note, score };
    });

    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.note);
}

function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const tagsInput = document.getElementById('noteTags').value.trim();

    if (!title || !content) {
        Utils.showError('請填寫標題和內容');
        return;
    }

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

    const note = {
        id: Utils.generateId(),
        title,
        content,
        tags,
        createdAt: new Date().toISOString()
    };

    notes.push(note);
    saveNotes();
    renderNotes();

    // 清空表單
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTags').value = '';

    Utils.showSuccess('筆記已新增');
}

function deleteNote(id) {
    if (confirm('確定要刪除這篇筆記嗎？')) {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        renderNotes();
        Utils.showSuccess('筆記已刪除');
    }
}

function renderNotes(filter = '') {
    const container = document.getElementById('notesList');
    const countEl = document.getElementById('noteCount');

    let filteredNotes = notes;
    if (filter) {
        const filterLower = filter.toLowerCase();
        filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(filterLower) ||
            note.content.toLowerCase().includes(filterLower) ||
            note.tags.some(tag => tag.toLowerCase().includes(filterLower))
        );
    }

    if (filteredNotes.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 40px;">沒有筆記</div>';
    } else {
        container.innerHTML = filteredNotes.map(note => `
            <div class="note-item" data-id="${note.id}">
                <button class="delete-btn" onclick="deleteNote('${note.id}')">✕</button>
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div class="note-tags">
                    ${note.tags.map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    countEl.textContent = notes.length;
}

function saveNotes() {
    Utils.saveToStorage('ai_knowledge_notes', notes);
}

function loadStoredData() {
    notes = Utils.loadFromStorage('ai_knowledge_notes', []);
    queryCount = Utils.loadFromStorage('ai_query_count', 0);

    renderNotes();
    document.getElementById('queryCount').textContent = queryCount;
}

// 全域函數供 HTML 呼叫
window.deleteNote = deleteNote;

// ==================== 圖像生成模組 ====================
function initImageModule() {
    // 檢查 SD 連線狀態
    checkSDStatus();
    setInterval(checkSDStatus, 30000);

    // 生成按鈕
    document.getElementById('generateImage').addEventListener('click', generateImage);

    // 清空圖庫
    document.getElementById('clearGallery').addEventListener('click', () => {
        if (confirm('確定要清空圖庫嗎？')) {
            imageGallery = [];
            Utils.saveToStorage('ai_image_gallery', imageGallery);
            renderGallery();
            Utils.showSuccess('圖庫已清空');
        }
    });

    // 載入圖庫
    imageGallery = Utils.loadFromStorage('ai_image_gallery', []);
    renderGallery();
}

async function checkSDStatus() {
    const dot = document.getElementById('sdStatusDot');
    const text = document.getElementById('sdStatusText');

    try {
        const response = await fetch(`${SD_API}/sdapi/v1/options`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
            dot.classList.add('online');
            const data = await response.json();
            const modelName = data.sd_model_checkpoint || '未知模型';
            text.textContent = `SD 已連線 (${modelName.split('.')[0]})`;
        } else {
            dot.classList.remove('online');
            text.textContent = 'SD WebUI 未連線';
        }
    } catch (e) {
        dot.classList.remove('online');
        text.textContent = 'SD WebUI 未連線 - 請啟動 AUTOMATIC1111';
    }
}

async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value.trim();
    const negativePrompt = document.getElementById('negativePrompt').value.trim();
    const size = document.getElementById('imageSize').value.split('x');
    const steps = parseInt(document.getElementById('imageSteps').value) || 20;
    const cfg = parseFloat(document.getElementById('imageCfg').value) || 7;
    const seed = parseInt(document.getElementById('imageSeed').value) || -1;

    if (!prompt) {
        Utils.showError('請輸入提示詞');
        return;
    }

    const resultArea = document.getElementById('imageResult');
    const generateBtn = document.getElementById('generateImage');

    // 顯示生成中狀態
    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    resultArea.innerHTML = `
        <div class="generating">
            <div class="spinner"></div>
            <p>AI 正在繪製圖像，請稍候...</p>
        </div>
    `;

    try {
        const response = await fetch(`${SD_API}/sdapi/v1/txt2img`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                negative_prompt: negativePrompt || 'blurry, low quality, distorted, ugly',
                width: parseInt(size[0]),
                height: parseInt(size[1]),
                steps: steps,
                cfg_scale: cfg,
                seed: seed,
                sampler_name: 'DPM++ 2M Karras'
            })
        });

        if (!response.ok) {
            throw new Error(`API 錯誤: ${response.status}`);
        }

        const data = await response.json();

        if (data.images && data.images.length > 0) {
            const imageBase64 = data.images[0];
            const imageUrl = `data:image/png;base64,${imageBase64}`;

            // 顯示結果
            resultArea.innerHTML = `
                <div class="generated-image">
                    <img src="${imageUrl}" alt="Generated Image" onclick="openImageModal(this.src)">
                    <div class="image-actions">
                        <button class="btn btn-sm btn-primary" onclick="downloadImage('${imageUrl}')">下載</button>
                        <button class="btn btn-sm btn-secondary" onclick="saveToGallery('${imageUrl}', '${prompt.replace(/'/g, "\\'")}')">存入圖庫</button>
                    </div>
                </div>
            `;

            // 取得實際 seed
            const info = JSON.parse(data.info || '{}');
            if (info.seed) {
                document.getElementById('imageSeed').value = info.seed;
            }
        } else {
            throw new Error('未收到圖像資料');
        }
    } catch (error) {
        resultArea.innerHTML = `
            <div class="image-error">
                <p>生成失敗：${error.message}</p>
                <p>請確認 AUTOMATIC1111 WebUI 已啟動並開啟 API 模式</p>
            </div>
        `;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '生成圖像';
    }
}

function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ai-image-${Date.now()}.png`;
    link.click();
    Utils.showSuccess('圖像已下載');
}

function saveToGallery(imageUrl, prompt) {
    const item = {
        id: Utils.generateId(),
        image: imageUrl,
        prompt: prompt,
        createdAt: new Date().toISOString()
    };

    imageGallery.unshift(item);
    if (imageGallery.length > 20) {
        imageGallery = imageGallery.slice(0, 20); // 最多保留 20 張
    }

    Utils.saveToStorage('ai_image_gallery', imageGallery);
    renderGallery();
    Utils.showSuccess('已存入圖庫');
}

function renderGallery() {
    const container = document.getElementById('galleryGrid');

    if (imageGallery.length === 0) {
        container.innerHTML = '<div class="gallery-empty">圖庫是空的</div>';
        return;
    }

    container.innerHTML = imageGallery.map(item => `
        <div class="gallery-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.prompt}" onclick="openImageModal('${item.image}')">
            <button class="delete-gallery-btn" onclick="deleteFromGallery('${item.id}')">✕</button>
        </div>
    `).join('');
}

function deleteFromGallery(id) {
    imageGallery = imageGallery.filter(item => item.id !== id);
    Utils.saveToStorage('ai_image_gallery', imageGallery);
    renderGallery();
}

function openImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${src}" alt="Full size image">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

// 全域函數供 HTML 呼叫
window.downloadImage = downloadImage;
window.saveToGallery = saveToGallery;
window.deleteFromGallery = deleteFromGallery;
window.openImageModal = openImageModal;

// ==================== 使用教學模組 ====================
function initTutorialModule() {
    const navBtns = document.querySelectorAll('.tutorial-nav-btn');
    const sections = document.querySelectorAll('.tutorial-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;

            // 更新按鈕狀態
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 顯示對應區塊
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 複製指令功能
    document.querySelectorAll('.tutorial-section .code-block').forEach(block => {
        block.style.cursor = 'pointer';
        block.title = '點擊複製';
        block.addEventListener('click', () => {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                Utils.showSuccess('已複製到剪貼簿');
            }).catch(() => {
                Utils.showError('複製失敗');
            });
        });
    });
}
