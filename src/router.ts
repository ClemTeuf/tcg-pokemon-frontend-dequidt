import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import HomePage from './pages/HomePage.vue'
import SignInPage from './pages/SignInPage.vue'
import SignUpPage from './pages/SignUpPage.vue'

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/sign-up',
  SIGNIN: '/sign-in',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.SIGNUP, component: SignUpPage },
  { path: ROUTES.SIGNIN, component: SignInPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return ROUTES.SIGNIN
  }

  if (
    (to.path === ROUTES.SIGNIN || to.path === ROUTES.SIGNUP) &&
    auth.isAuthenticated
  ) {
    return ROUTES.HOME
  }

  return true
})

export default router
