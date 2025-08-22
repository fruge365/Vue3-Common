import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'

export const currentLocale = ref('zh-cn')
export const localeMap = {
  'zh-cn': zhCn,
  'en': en
}

export const messages = {
  'zh-cn': {
    welcome: {
      title: 'Vue 3 + Vite 模板',
      subtitle: '开箱即用的现代化前端开发模板',
      features: '功能特性',
      techStack: '技术栈',
      quickStart: '快速开始',
      demo: '互动演示',
      step1: '安装依赖',
      step2: '启动开发',
      step3: '开始编码',
      step3Desc: '开始你的开发之旅',
      feature1Title: '闪电开发',
      feature1Desc: 'Vite 提供闪电般的热重载和构建速度',
      feature2Title: '开箱即用',
      feature2Desc: '预配置了路由、状态管理和 UI 组件库',
      feature3Title: '国际化',
      feature3Desc: '内置中英文国际化支持',
      counterDemo: 'Pinia 状态管理',
      elementDemo: 'Element Plus 组件',
      currentCount: '当前计数',
      increment: '点击增加',
      pickDate: '选择日期',
      showMessage: '显示消息',
      messageSuccess: '操作成功！'
    }
  },
  'en': {
    welcome: {
      title: 'Vue 3 + Vite Template',
      subtitle: 'A modern frontend development template ready to use',
      features: 'Features',
      techStack: 'Tech Stack',
      quickStart: 'Quick Start',
      demo: 'Interactive Demo',
      step1: 'Install Dependencies',
      step2: 'Start Development',
      step3: 'Start Coding',
      step3Desc: 'Begin your development journey',
      feature1Title: 'Lightning Fast',
      feature1Desc: 'Vite provides lightning-fast HMR and build speed',
      feature2Title: 'Ready to Use',
      feature2Desc: 'Pre-configured with routing, state management and UI library',
      feature3Title: 'Internationalization',
      feature3Desc: 'Built-in Chinese and English i18n support',
      counterDemo: 'Pinia State Management',
      elementDemo: 'Element Plus Components',
      currentCount: 'Current Count',
      increment: 'Click to Increment',
      pickDate: 'Pick a date',
      showMessage: 'Show Message',
      messageSuccess: 'Operation successful!'
    }
  }
}

export const getCurrentLocale = () => localeMap[currentLocale.value]
export const t = (key) => {
  const keys = key.split('.')
  let value = messages[currentLocale.value]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}