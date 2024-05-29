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
import MyPage from '../components/main-Pages/My-Page/MyPage'
import FixingPage from '../components/main-Pages/My-Page/FixingPage'
import NicknameChangePage from '../components/main-Pages/My-Page/NicknameChangePage'; 
import PasswordChangePage from '../components/main-Pages/My-Page/PasswordChangePage'; 
import LogInPage from '../views/LogInPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import FindPasswordPage from '@/views/FindPasswordPage.vue'
import StoreDetail from '../components/main-Pages/Main-Page/Store-Page/StoreDetail'
import StoreDetail from '../components/main-Pages/Main-Page/Store-Page/StoreDetail'

const routes = [
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
        path: '/store/:id', // 부모 컴포넌트의 기본 경로
        name: 'StoreDetail',
        components: {
          leftMenu: StoreDetail // MainPage를 leftMenu 영역에 렌더링
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
        },
        meta: { requiresAuth: true } // 인증이 필요한 경로
      },
      {
        path: 'fixing',
        name: 'Fixing',
        components: {
          leftMenu: FixingPage // FixingPage를 leftMenu 영역에 렌더링
        },
        meta: { requiresAuth: true } // 인증이 필요한 경로
      },
      {
        path: 'nick-change', // 새로운 닉네임 변경 경로 추가
        name: 'NickChange',
        components: {
          leftMenu: NicknameChangePage
        },
        meta: { requiresAuth: true } // 인증이 필요한 경로
      },
      {
        path: 'pass-change',
        name: 'PassChange',
        components: {
          leftMenu: PasswordChangePage
        },
        meta: { requiresAuth: true } // 인증이 필요한 경로
      }
    ] 
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
  },
  {
    path: '/find-password',
    name: 'FindPassword',
    component: FindPasswordPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // 인증이 필요한 페이지인지 확인
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 쿠키 문자열을 가져옴
    const cookieString = document.cookie;

    // 쿠키 문자열이 비어있는지 확인
    if (cookieString) {
      // 쿠키 문자열을 세미콜론과 공백을 기준으로 분할하여 배열로 변환
      const cookies = cookieString.split('; ');

      // 'refresh='로 시작하는 쿠키를 찾아서 해당 쿠키의 값을 가져옴
      const refreshCookie = cookies.find(cookie => cookie.startsWith('refresh='));

      // 'refresh='로 시작하는 쿠키가 존재하는지 확인
      if (refreshCookie) {
        // 등호('=')를 기준으로 쿠키를 분할하여 값을 가져옴
        const refreshValue = refreshCookie.split('=')[1];

        // refreshValue를 사용하여 추가적인 작업 수행
        console.log('Refresh token:', refreshValue);

        // refresh 토큰이 있는 경우 페이지로 이동
        next();
      } else {
        // 'refresh='로 시작하는 쿠키가 없는 경우 로그인 페이지로 리디렉션
        next({ name: 'LogIn' });
      }
    } else {
      // 쿠키 문자열이 없는 경우 로그인 페이지로 리디렉션
      next({ name: 'LogIn' });
    }
  } else {
    // 인증이 필요 없는 페이지는 그대로 진행
    next();
  }
});

export default router;
export default router;
