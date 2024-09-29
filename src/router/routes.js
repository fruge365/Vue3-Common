// 导出 routes
const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: '/home',
        name: "home",
        component: () => import("@/views/home.vue")
    }
]
export default routes