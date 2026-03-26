import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import DeckCreatePage from './components/layout/decks/DeckCreatePage.vue'
import DeckDetailPage from './components/layout/decks/DeckDetailPage.vue'
import DeckEditPage from './components/layout/decks/DeckEditPage.vue'
import HomePage from './pages/HomePage.vue'
import SignInPage from './pages/SignInPage.vue'
import SignUpPage from './pages/SignUpPage.vue'

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/sign-up',
  SIGNIN: '/sign-in',
  DECK_CREATE: '/decks/create',
  DECK_DETAIL: '/decks/:id',
  DECK_EDIT: '/decks/:id/edit',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.SIGNUP, component: SignUpPage },
  { path: ROUTES.SIGNIN, component: SignInPage },
  {
    path: ROUTES.DECK_CREATE,
    component: DeckCreatePage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.DECK_DETAIL,
    component: DeckDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.DECK_EDIT,
    component: DeckEditPage,
    meta: { requiresAuth: true },
  },
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
