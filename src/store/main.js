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
                storage: localStorage,  // 使用 localStorage（或 sessionStorage）
            }
        ]
    }
})