import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainPage from '../components/main-Pages//Main-Page/MainPage'
import FavoritesPage from '../components/main-Pages/FavoritesPage'
import RankingPage from '../components/main-Pages/RankingPage'
import MyPage from '../components/main-Pages/MyPage'
import LogInPage from '../views/LogInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import FindPasswordPage from '@/views/FindPasswordPage.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: '', // 부모 컴포넌트의 기본 경로
          name: 'Main',
          components: {
            leftMenu: MainPage // MainPage를 leftMenu 영역에 렌더링
          }
        },
        {
          path: 'ranking',
          name: 'Ranking',
          components: {
            leftMenu: RankingPage // RankingPage를 leftMenu 영역에 렌더링
          }
        },
        {
          path: 'favorites',
          name: 'Favorites',
          components: {
            leftMenu: FavoritesPage // FavoritesPage를 leftMenu 영역에 렌더링
          }
        },
        {
          path: 'mypage',
          name: 'MyPage',
          components: {
            leftMenu: MyPage // MyPage를 leftMenu 영역에 렌더링
          }
        }
      ] },
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

