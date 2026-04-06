import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //En caso de que haya mas de una vista se pueden agregar de esta forma.
    //utilizando "router-vue" para para App.vue que busca los children
    //pero en mi caso use una sola vista principal con modals.
    //{
    //  path: '/',
    //  name: 'home',
    //  component: () => import('../views/HomeView.vue'),
    //},
  ],
})

export default router
