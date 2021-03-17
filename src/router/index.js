import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'

const routes = [
  {
    path: '/',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/ChatRoom/:id',
    name: 'ChatRoom',
    component: () => import('../views/ChatRoom.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(() => {
//   if(!getCookie('user')){
//     router.push({name:'Login'});
//   }
// })

export default router
