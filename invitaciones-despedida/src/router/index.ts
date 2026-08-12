import Home from "@/pages/home/Home.vue";
import Principal from "@/pages/principal/Principal.vue";
import Info from "@/pages/info/Info.vue";
import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/principal/:name?',
      name: 'principal',
      component: Principal
    },
    {
      path: '/info/:name?',
      name: 'info',
      component: Info
    },
    {
      path: '/:patchMatch(.*)',
      redirect: '/'
    }
  ]
})