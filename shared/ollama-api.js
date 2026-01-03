/**
 * Ollama API 封裝模組
 * 提供統一的 API 呼叫介面
 */

const OllamaAPI = {
    baseUrl: 'http://localhost:11434',

    /**
     * 取得所有可用的模型
     * @returns {Promise<Array>} 模型列表
     */
    async getModels() {
        try {
            const res = await fetch(`${this.baseUrl}/api/tags`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return data.models || [];
        } catch (error) {
            console.error('無法取得模型列表:', error);
            throw error;
        }
    },

    /**
     * 生成回應 (使用 /api/generate)
     * @param {string} model - 模型名稱
     * @param {string} prompt - 提示詞
     * @param {Object} options - 額外選項
     * @returns {Promise<Object>} API 回應
     */
    async generate(model, prompt, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    prompt,
                    stream: false,
                    ...options
                })
            });

            if (!response.ok) {
                throw new Error(`API 錯誤: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('生成回應失敗:', error);
            throw error;
        }
    },

    /**
     * 聊天對話 (使用 /api/chat)
     * @param {string} model - 模型名稱
     * @param {Array} messages - 訊息歷史 [{role: 'user'|'assistant', content: '...'}]
     * @param {Object} options - 額外選項
     * @returns {Promise<Object>} API 回應
     */
    async chat(model, messages, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    messages,
                    stream: false,
                    ...options
                })
            });

            if (!response.ok) {
                throw new Error(`API 錯誤: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('聊天對話失敗:', error);
            throw error;
        }
    },

    /**
     * 檢查 Ollama 服務是否運行中
     * @returns {Promise<boolean>} 是否連線成功
     */
    async checkHealth() {
        try {
            const res = await fetch(`${this.baseUrl}/api/tags`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });
            return res.ok;
        } catch {
            return false;
        }
    },

    /**
     * 設定 API 基礎 URL
     * @param {string} url - 新的基礎 URL
     */
    setBaseUrl(url) {
        this.baseUrl = url;
    }
};

// 匯出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OllamaAPI;
}
