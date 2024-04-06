import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LogInPage from '../views/LogInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import FindPasswordPage from '@/views/FindPasswordPage.vue'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogInPage
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpPage
    }
    ,
    {
      path: '/find-password',
      name: 'FindPassword',
      component: FindPasswordPage
    }
  ]
})

export default router
