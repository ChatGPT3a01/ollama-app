/**
 * 工具函數模組
 * 提供常用的輔助函數
 */

const Utils = {
    /**
     * 格式化訊息內容 (處理 Markdown 基礎語法)
     * @param {string} content - 原始內容
     * @returns {string} 格式化後的 HTML
     */
    formatMessageContent(content) {
        if (!content) return '';

        return content
            // 程式碼區塊
            .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
            // 行內程式碼
            .replace(/`([^`]+)`/g, '<code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;">$1</code>')
            // 粗體
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // 斜體
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            // 換行
            .replace(/\n/g, '<br>');
    },

    /**
     * 顯示錯誤訊息
     * @param {string} message - 錯誤訊息
     * @param {number} duration - 顯示時間 (毫秒)
     */
    showError(message, duration = 5000) {
        this.showToast(message, 'error', duration);
    },

    /**
     * 顯示成功訊息
     * @param {string} message - 成功訊息
     * @param {number} duration - 顯示時間 (毫秒)
     */
    showSuccess(message, duration = 3000) {
        this.showToast(message, 'success', duration);
    },

    /**
     * 顯示 Toast 通知
     * @param {string} message - 訊息內容
     * @param {string} type - 類型 ('success' | 'error' | 'warning' | 'info')
     * @param {number} duration - 顯示時間 (毫秒)
     */
    showToast(message, type = 'info', duration = 3000) {
        // 移除現有的 toast
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `<span>${icons[type]}</span> ${message}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            font-family: "Microsoft JhengHei", sans-serif;
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * 複製文字到剪貼簿
     * @param {string} text - 要複製的文字
     * @returns {Promise<boolean>} 是否成功
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showSuccess('已複製到剪貼簿');
            return true;
        } catch (err) {
            this.showError('複製失敗');
            return false;
        }
    },

    /**
     * 防抖函數
     * @param {Function} func - 要執行的函數
     * @param {number} wait - 等待時間 (毫秒)
     * @returns {Function} 防抖後的函數
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 節流函數
     * @param {Function} func - 要執行的函數
     * @param {number} limit - 限制時間 (毫秒)
     * @returns {Function} 節流後的函數
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 格式化檔案大小
     * @param {number} bytes - 位元組數
     * @returns {string} 格式化後的大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },

    /**
     * 格式化日期時間
     * @param {Date|string|number} date - 日期
     * @returns {string} 格式化後的日期時間
     */
    formatDateTime(date) {
        const d = new Date(date);
        return d.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * 產生唯一 ID
     * @returns {string} 唯一識別碼
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * 儲存到 localStorage
     * @param {string} key - 鍵名
     * @param {any} value - 值
     */
    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('儲存失敗:', e);
        }
    },

    /**
     * 從 localStorage 讀取
     * @param {string} key - 鍵名
     * @param {any} defaultValue - 預設值
     * @returns {any} 讀取的值
     */
    loadFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('讀取失敗:', e);
            return defaultValue;
        }
    }
};

// 加入 fadeOut 動畫 CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// 匯出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
