import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/router/home'
import test from '@/router/test'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...Home, ...(import.meta.env.VITE_NODE_ENV === 'development' ? test : [])]
})

// 路由守卫
/*router.beforeEach((to, from, next) => {
	if (to.name !== "Login" && !isAuthenticated) {
		next({ name: "Login" })
	} else {
		next()
	}
})*/
export default router
