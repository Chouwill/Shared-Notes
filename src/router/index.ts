import EditorLayout from '@/components/Layout/EditorLayout.vue'
import MainLayout from '@/components/Layout/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
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
          component: () => import('@/page/NoteSpace.vue'),
        },
      ],
    },
    {
      path: '/noteEditor',
      component: EditorLayout,
      children: [
        {
          path: 'edit',
          component: () => import('@/page/NoteEditor.vue'),
        },
      ],
    },
  ],
})

export default router
