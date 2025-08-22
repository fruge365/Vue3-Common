<div align="center">

# 🚀 Vue 3 + Vite 模板

**开箱即用的 Vue3 项目模板**

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD859?style=flat-square&logo=pinia)](https://pinia.vuejs.org/)

</div>

---

## 📋 快速开始

<details>
<summary>📥 安装依赖</summary>

```bash
yarn
```
</details>

<details>
<summary>🏃‍♂️ 运行开发服务器</summary>

```bash
yarn dev
```
</details>

<details>
<summary>📦 构建生产版本</summary>

```bash
yarn build
```
</details>

---

## 🛠️ 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| **Vue 3** | `^3.4.37` | 渐进式 JavaScript 框架 |
| **Vite** | `^5.4.1` | 下一代前端构建工具 |
| **Pinia** | `^2.2.2` | Vue 状态管理库 |
| **Element Plus** | `^2.10.7` | Vue 3 组件库 |
| **JavaScript** | `ES6+` | 编程语言 |

---

## 📚 相关文档

| 资源 | 链接 | 描述 |
|------|------|------|
| 🎨 Element Plus | [element-plus.org](https://element-plus.org/zh-CN/) | Vue 3 组件库官方文档 |
| ⚡ Vite | [cn.vitejs.dev](https://cn.vitejs.dev/guide/) | 下一代前端构建工具 |
| 🎭 Remix Icon | [remixicon.com](https://remixicon.com/) | 开源图标库 |

---

## ✨ 功能特性

<table>
<tr>
<td width="50%">

### 🔥 核心功能
- ✅ Pinia 状态持久化
- ✅ 响应式设计 (1920*1080)
- ✅ Element Plus 组件集成
- ✅ 国际化支持 (中/英)

</td>
<td width="50%">

### ⚡ 开发体验
- ✅ Vite 热重载
- ✅ 开箱即用配置
- ✅ Sass 样式预处理
- ✅ 路由懒加载

</td>
</tr>
</table>

---

## 🌍 国际化使用

> 📍 **配置文件位置**: `src/utils/locale.js` | 支持语言: 中文 / English

<details>
<summary><strong>📝 在组件中使用</strong></summary>

```javascript
import { t } from '@/utils/locale'

// 在模板中使用
{{ t('home.title') }}
```
</details>

<details>
<summary><strong>➕ 添加新的翻译文本</strong></summary>

在 `src/utils/locale.js` 的 `messages` 对象中添加：
```javascript
export const messages = {
  'zh-cn': {
    common: {
      save: '保存',
      cancel: '取消'
    }
  },
  'en': {
    common: {
      save: 'Save',
      cancel: 'Cancel'
    }
  }
}
```
</details>

<details>
<summary><strong>🔄 语言切换</strong></summary>

通过修改 `currentLocale.value` 来切换语言，Element Plus 组件会自动适配。
</details>

---

## 📦 Pinia 状态管理使用

> 🔋 **自动持久化**: 集成 `pinia-plugin-persistedstate`，状态自动保存到 localStorage

<details>
<summary><strong>🏠 创建 Store</strong></summary>

在 `src/store/` 目录下创建 store 文件：

```javascript
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return { counter: 0 }
  },
  actions: {
    increment() {
      this.counter++
    }
  },
  persist: {
    enabled: true,  // 启用持久化
    strategies: [
      {
        key: 'main-store',  // 存储的 key
        storage: localStorage,  // 使用 localStorage
      }
    ]
  }
})
```
</details>

<details>
<summary><strong>🛠️ 在组件中使用</strong></summary>

```javascript
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
const { increment } = mainStore

// 访问状态
console.log(mainStore.counter)

// 调用 action
increment()
```
</details>

---

## 🎨 全局颜色变量

项目使用 CSS 变量实现主题切换功能，支持亮色/暗色主题。

### 颜色变量定义

配置文件位于 `src/assets/sass/theme.scss`：

```scss
:root {
  --primary-color: #409EFF;
  --bg-color: #fafafa;
  --text-color: #2c3e50;
  --text-secondary: #7f8c8d;
  --card-bg: #ffffff;
  --border-color: #e4e7ed;
  --shadow: 0 8px 32px rgba(0,0,0,0.1);
}

:root.dark {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --text-secondary: #b0b0b0;
  --card-bg: #2d2d2d;
  --border-color: #404040;
  --shadow: 0 8px 32px rgba(0,0,0,0.3);
}
```

### 使用方法

在样式中直接使用变量：
```scss
.my-component {
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
```

---

## 🔗 API 代理配置

项目支持开发环境 API 代理，配置灵活且易于维护。

### 环境变量配置

在 `.env.development` 中设置：
```bash
VITE_APP_BASE_API='/dev-api'
```

### 代理规则

`vite.config.js` 中的代理配置：
```javascript
proxy: {
  [env.VITE_APP_BASE_API]: {
    target: 'https://api.vvhan.com/api',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
  }
}
```

### 使用示例

```javascript
// 请求会被代理到 https://api.vvhan.com/api/yiyan
axios.get('/dev-api/yiyan')
```

---

<div align="center">

**✨ 快乐编码！如果这个模板对你有帮助，请给个 Star ⭐**

</div>
