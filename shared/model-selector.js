/**
 * 模型選擇器組件
 * 自動載入可用模型並提供選擇功能
 */

class ModelSelector {
    /**
     * @param {HTMLSelectElement} selectElement - 下拉選單元素
     * @param {HTMLElement} statusElement - 狀態顯示元素 (可選)
     */
    constructor(selectElement, statusElement = null) {
        this.selectEl = selectElement;
        this.statusEl = statusElement;
        this.currentModel = '';
        this.onModelChange = null;
        this.init();
    }

    /**
     * 初始化選擇器
     */
    async init() {
        await this.loadModels();
        this.selectEl.addEventListener('change', (e) => {
            this.currentModel = e.target.value;
            if (this.onModelChange) {
                this.onModelChange(this.currentModel);
            }
        });
    }

    /**
     * 載入可用模型
     */
    async loadModels() {
        try {
            const res = await fetch('http://localhost:11434/api/tags');
            const data = await res.json();

            this.selectEl.innerHTML = '';

            if (data.models && data.models.length > 0) {
                data.models.forEach((model) => {
                    const option = document.createElement('option');
                    option.value = model.name;
                    const sizeGB = (model.size / 1e9).toFixed(1);
                    option.textContent = `${model.name} (${sizeGB} GB)`;
                    this.selectEl.appendChild(option);
                });

                this.currentModel = data.models[0].name;
                this.setStatus('success', `${data.models.length} 個模型可用`);
            } else {
                this.selectEl.innerHTML = '<option value="">無可用模型</option>';
                this.setStatus('error', '請先下載模型');
            }
        } catch (err) {
            this.selectEl.innerHTML = '<option value="">無法連接</option>';
            this.setStatus('error', '請確認 Ollama 已啟動');
        }
    }

    /**
     * 設定狀態訊息
     * @param {string} type - 'success' | 'error' | 'warning'
     * @param {string} message - 狀態訊息
     */
    setStatus(type, message) {
        if (!this.statusEl) return;

        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠'
        };

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12'
        };

        this.statusEl.textContent = `${icons[type] || ''} ${message}`;
        this.statusEl.style.color = colors[type] || '#666';
    }

    /**
     * 取得目前選擇的模型
     * @returns {string} 模型名稱
     */
    getModel() {
        return this.currentModel;
    }

    /**
     * 重新載入模型列表
     */
    async refresh() {
        await this.loadModels();
    }
}

// 匯出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModelSelector;
}
