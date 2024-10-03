import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => {
        return { UsersCounter: 0 }
    },
    actions: {
        UsersIncrement() {
            this.UsersCounter++
        }
    },
    persist: {
        enabled: true,  // 启用持久化
        strategies: [
            {
                key: 'users-store',  // 存储的 key
                storage: localStorage,  // 使用 localStorage（或 sessionStorage）
            }
        ]
    }
})