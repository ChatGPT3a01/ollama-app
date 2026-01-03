@echo off
chcp 65001 >nul
echo ========================================
echo    AI 工具箱 - 啟動中...
echo ========================================
echo.

:: 檢查 Ollama 是否運行
echo [1/3] 檢查 Ollama 狀態...
ollama list >nul 2>&1
if %errorlevel% neq 0 (
    echo      ❌ Ollama 未運行，請先安裝並啟動 Ollama
    echo      下載網址：https://ollama.com/download
    pause
    exit /b 1
)
echo      ✓ Ollama 運行中

:: 檢查 Python 是否安裝
echo.
echo [2/3] 檢查 Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo      ❌ Python 未安裝
    echo      下載網址：https://www.python.org/downloads/
    pause
    exit /b 1
)
echo      ✓ Python 已安裝

:: 啟動伺服器
echo.
echo [3/3] 啟動本地伺服器...
echo.
echo ========================================
echo    伺服器已啟動！
echo    請在瀏覽器開啟：http://localhost:8080
echo
echo    按 Ctrl+C 可停止伺服器
echo ========================================
echo.

:: 自動開啟瀏覽器
start http://localhost:8080

:: 啟動 Python 伺服器
python -m http.server 8080
