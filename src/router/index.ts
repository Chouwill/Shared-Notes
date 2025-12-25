import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'IndexPage',
      component: () => import("@/page/IndexPage.vue"),
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: () => import("@/page/AboutPage.vue"),
    },
  ],
})

export default router
