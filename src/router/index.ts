import MainLayout from '@/components/Layout/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: () => import('@/page/IndexPage.vue'),
        },
        {
          path: 'about',
          name: 'AboutPage',
          component: () => import('@/page/AboutPage.vue'),
        },
        {
          path: 'teaching',
          name: 'TeachingPage',
          component: () => import('@/page/Teaching.vue'),
        },
        {
          path: 'noteSpace',
          name: 'NoteSpace',
          meta: { requiresAuth: true },
          component: () => import('@/page/NoteSpace.vue'),
        },
        {
          path: 'noteProfile/:id?',
          name: 'NoteProfile',
          meta: { requiresAuth: true },
          component: () => import('@/page/NoteProfile.vue'),
        },
        {
          path: 'noteViewer/:id',
          name: 'noteViewer',
          component: () => import('@/page/NotesViewer.vue'),
        },
        {
          path: 'visiteNotes/:id',
          name: 'visiteNotes',
          component: () => import('@/page/VisitorsViewer.vue'),
        },
        {
          path: 'manage',
          name: 'ManagePage',
          // meta: { requiresAuth: true },
          component: () => import('@/page/ManagePage.vue'),
        },
      ],
    },
    {
      path: '/noteEditor',
      component: MainLayout,
      children: [
        {
          path: 'edit',
          component: () => import('@/page/NoteEditor.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 如果這頁需要登入
  if (to.meta.requiresAuth) {
    if (!authStore.userToken) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
