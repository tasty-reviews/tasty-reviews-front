import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MainPage from '../components/main-Pages/Main-Page/MainPage'
import SearchPage from '../components/main-Pages/Main-Page/search-Pages/SearchPage'
import FavoritesPage from '../components/main-Pages/FavoritesPage'
import RankingPage from '../components/main-Pages/RankingPage'
import MyPage from '../components/main-Pages/My-Page/MyPage'
import FixingPage from '../components/main-Pages/My-Page/FixingPage'
import NicknameChangePage from '../components/main-Pages/My-Page/NicknameChangePage'; 
import PasswordChangePage from '../components/main-Pages/My-Page/PasswordChangePage'; 
import LogInPage from '../views/LogInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import FindPasswordPage from '@/views/FindPasswordPage.vue'
import StoreDetail from '../components/main-Pages/Main-Page/Store-Page/StoreDetail'

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
            leftMenu: MainPage, // MainPage를 leftMenu 영역에 렌더링
          }
        },
        {
          path: 'searchbox', // 부모 컴포넌트의 기본 경로
          name: 'SearchBox',
          components: {
            leftMenu: SearchPage // MainPage를 leftMenu 영역에 렌더링
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
        },
        {
          path: 'storedetail/:id',
          name: 'StoreDetail',
          components: {
            leftMenu: StoreDetail
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

export default router;
