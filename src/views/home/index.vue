<template>
  <div class="project-intro">
    <div class="container">
      <!-- 项目标题 -->
      <div class="header">
        <h1 class="title">🚀 Vue 3 + Vite 模板</h1>
        <p class="subtitle">开箱即用的现代化前端开发模板</p>
      </div>

      <!-- 特性介绍 -->
      <div class="features">
        <div class="feature-card">
          <div class="icon">⚡</div>
          <h3>闪电开发</h3>
          <p>Vite 提供闪电般的热重载和构建速度</p>
        </div>
        <div class="feature-card">
          <div class="icon">🎨</div>
          <h3>精美 UI</h3>
          <p>Element Plus 组件库，美观且功能强大</p>
        </div>
        <div class="feature-card">
          <div class="icon">🌍</div>
          <h3>国际化</h3>
          <p>内置中英文国际化支持</p>
        </div>
        <div class="feature-card">
          <div class="icon">🎨</div>
          <h3>主题切换</h3>
          <p>支持亮色/暗色主题切换</p>
        </div>
      </div>

      <!-- API 演示 -->
      <div class="api-demo">
        <h2>🔗 API 代理演示</h2>
        <div class="demo-card">
          <div class="demo-header">
            <span class="method">GET</span>
            <span class="url">/dev-api/yiyan</span>
          </div>
          <div class="demo-content">
            <p class="label">响应结果：</p>
            <div class="response" v-if="YiYan">
              <p class="quote">{{ YiYan }}</p>
            </div>
            <div class="loading" v-else>
              <el-icon class="is-loading"><Loading /></el-icon>
              加载中...
            </div>
          </div>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="tech-stack">
        <h2>🛠️ 技术栈</h2>
        <div class="tech-list">
          <div class="tech-item">Vue 3</div>
          <div class="tech-item">Vite</div>
          <div class="tech-item">Element Plus</div>
          <div class="tech-item">Pinia</div>
          <div class="tech-item">Sass</div>
          <div class="tech-item">Axios</div>
        </div>
      </div>

      <!-- 作者信息 -->
      <div class="author-info">
        <h2>👨💻 作者信息</h2>
        <div class="author-card">
          <div class="author-avatar">👋</div>
          <div class="author-details">
            <h3>fruge365</h3>
            <p>前端开发者 | Vue.js 爱好者</p>
            <div class="author-links">
              <a href="https://github.com/fruge365" target="_blank" class="link-btn github">
                <span class="icon">🐈</span>
                GitHub
              </a>
              <a href="https://fruge365.blog.csdn.net/" target="_blank" class="link-btn csdn">
                <span class="icon">📝</span>
                CSDN博客
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getHistoryApi } from '@/api/test';
import { ref, onMounted } from 'vue';
import { Loading } from '@element-plus/icons-vue';

const YiYan = ref('');

const getHistory = async () => {
  try {
    const res = await getHistoryApi();
    YiYan.value = res.data;
  } catch (error) {
    console.error('获取数据失败:', error);
    YiYan.value = '获取数据失败，请检查网络连接';
  }
};

onMounted(() => {
  getHistory();
});
</script>

<style lang="scss" scoped>
.project-intro {
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  padding: 40px 20px;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 60px;

    .title {
      font-size: 3rem;
      font-weight: 300;
      margin-bottom: 16px;
      color: var(--text-color);
    }

    .subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 60px;

    .feature-card {
      background: var(--card-bg);
      padding: 32px 24px;
      border-radius: 12px;
      text-align: center;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-4px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 1.25rem;
        margin-bottom: 12px;
        color: var(--text-color);
      }

      p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  .api-demo {
    margin-bottom: 60px;

    h2 {
      text-align: center;
      margin-bottom: 32px;
      color: var(--text-color);
    }

    .demo-card {
      background: var(--card-bg);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow);
      max-width: 600px;
      margin: 0 auto;

      .demo-header {
        background: #f8f9fa;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--border-color);

        .method {
          background: #67c23a;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .url {
          font-family: 'Courier New', monospace;
          color: var(--text-color);
        }
      }

      .demo-content {
        padding: 24px;

        .label {
          font-weight: 500;
          margin-bottom: 12px;
          color: var(--text-color);
        }

        .response {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid var(--primary-color);

          .quote {
            font-style: italic;
            color: var(--text-color);
            margin: 0;
            line-height: 1.6;
          }
        }

        .loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }
      }
    }
  }

  .tech-stack {
    margin-bottom: 60px;
    
    h2 {
      text-align: center;
      margin-bottom: 32px;
      color: var(--text-color);
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;

      .tech-item {
        background: var(--primary-color);
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .author-info {
    h2 {
      text-align: center;
      margin-bottom: 32px;
      color: var(--text-color);
    }

    .author-card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 40px;
      box-shadow: var(--shadow);
      max-width: 500px;
      margin: 0 auto;
      text-align: center;

      .author-avatar {
        font-size: 4rem;
        margin-bottom: 24px;
      }

      .author-details {
        h3 {
          font-size: 1.5rem;
          color: var(--text-color);
          margin-bottom: 8px;
        }

        p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .author-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;

          .link-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            color: white;

            .icon {
              font-size: 1.2rem;
            }

            &.github {
              background: #333;
              
              &:hover {
                background: #24292e;
                transform: translateY(-2px);
              }
            }

            &.csdn {
              background: #fc5531;
              
              &:hover {
                background: #e04a2b;
                transform: translateY(-2px);
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px 16px;

    .header .title {
      font-size: 2rem;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
}
</style>