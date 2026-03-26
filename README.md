# RBQ生图扩展 (SillyTavern-RBQ-Draw)

这是专为 [SillyTavern](https://github.com/SillyTavern/SillyTavern) 打造的高级图像生成扩展。深度集成了 NovelAI V4.5 官方生成节点（同时也支持 ComfyUI 等后台），在聊天界面内部带来官方原生级别的动态生图体验。

## ✨ 核心特性

- **NovelAI V4.5 终极适配**：无缝支持 V4.5 的特殊参数（Variety+、SMEA/DYN 限制、Decrisper 等）。
- **Vibe Transfer (氛围转移)**：完美对齐官方接口！
  - 支持上传多达 6 张 Vibe 或 1 张 Precise Reference（精确参考）。
  - **自动免查杀提取**：上传原图点生成时，插件会自动在后台无感排队调用 `/encode-vibe` 端点提取特征。
  - **免算力生图**：支持直接从本地点击「提取」或「下载」缓存 `.naiv4vibe` (Msgpack Tensor) 文件，再次生成时**实现 0 附加算力消耗**！
- **原生级沉浸式 UI**：
  - 弃用粗暴的全屏遮罩，采用和官方网页版一致的行内沉浸式加载动画。
  - 清晰的 `正在请求集群分配运算资源...` 状态播报，精确反映 API 各个阶段。
  - 内置基于 JSZip 的纯前端解压策略，无视系统网关或 CDN 限制，完美规避图裂、黑图、问号图。
- **独立参数隔断面板**：将 NAI 的宽高预设和专属参数（CFG/Steps/Seed）与其它的 SD/ComfyUI 引擎进行严格隔离，互不干扰！

## 📦 安装与配置

本插件为私有部署架构构建：

1. **安装插件**
   通过 SillyTavern 的「扩展 -> 安装扩展」面板，直接填入本 GitHub 私有仓库的拉取地址（需确保服务器具有部署环境的 Token）。或者将本目录克隆至 `/plugins/` 目录。
   
   ```bash
   cd SillyTavern/plugins
   git clone https://github.com/TTWParty/SillyTavern-RBQ-Draw.git
   ```

2. **配置连接参数**
   - 唤出左侧抽屉，点开底部的 **RBQ生图扩展 配置面板**（纸飞机图标）。
   - 选择 **NAI** 作为当前模式。
   - 填入你自己的转发 URL（如 `https://gnai.xxx.com/ai/generate-image`）以及对应的 Token。
   - 保存设置后，在聊天区直接通过扩展输入框提取提示词进行出图体验！

## 🛠️ 关于算力消耗 (Cost Tracking)

针对 NAI 模式的算力消耗机制，扩展已作直观 UI 明示：
- 【氛围转移 Vibe】首次调用 `/encode-vibe` 提取特征：**2 Anlas/张**
- 【氛围转移 Vibe】特征使用 / 使用本地 `.naiv4vibe` 文件进行 Vibe 生图：**0 Anlas (免提纯算力)**
- 【精准参考 Precise】上传原文件充当 Role/Style Reference 生图：打包进入主流程，固定 **每图 5 Anlas**。

---

*Powered by TTWParty.*
