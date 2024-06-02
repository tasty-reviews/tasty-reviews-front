<template>
  <!-- 전체 페이지 레이아웃을 나타내는 div 요소 -->
  <div class="ex-layout">
    <!-- 글로벌 메뉴를 나타내는 div 요소 -->
    <div class="gnb">
      <button class="gnb-btn" @click="changeComponent('Main')">
        <img src="@/assets/home.png" class="icon"/>
        <span>메인</span>
      </button>
      <button class="gnb-btn" @click="changeComponent('Ranking')">
        <img src="@/assets/star.png" class="icon"/>
        <span>랭킹</span>
      </button>
      <button class="gnb-btn" @click="changeComponent('MyMaps')">
        <img src="@/assets/mymap.png" class="icon"/>
        <span>내지도</span>
      </button>
      <button class="gnb-btn" @click="isLoggedIn ? changeComponent('MyPage') : changeComponent('LogIn')">
        <img src="@/assets/user.png" class="icon"/>
        <span>마이</span>
      </button>
    </div>
    <!-- 왼쪽 메뉴를 나타내는 div 요소 -->
    <div class="lnb"><router-view name="leftMenu"></router-view></div>
    <MapComp ref="mapComp"/>
    <button class="current-location-btn" @click="goToCurrentLocation">현재 위치</button>
  </div>
</template>

<script>
// MapComp 컴포넌트를 가져옴
import MapComp from '../components/comp-Map/MapComp.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    MapComp
  },
  created() {
    this.startCookieCheck();
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  data() {
    return {
      // Add your data properties here if needed
    };
  },
  mounted() {
    // 페이지의 높이를 조정하는 함수 호출
    this.adjustHeight();
    // 창 크기 변경 이벤트에 대한 이벤트 리스너 추가
    window.addEventListener('resize', this.adjustHeight);
  },
  // Vue 인스턴스가 언마운트되기 전에 실행되는 함수
  beforeUnmount() {
    // 창 크기 변경 이벤트 리스너 제거
    window.removeEventListener('resize', this.adjustHeight);
  },
  methods: {
    ...mapActions(['checkCookie']),
    startCookieCheck() {
      this.checkCookie(); // 처음 로드 시 쿠키를 한 번 체크
      setInterval(() => {
        this.checkCookie(); // 주기적으로 쿠키 체크 (1분마다)
      }, 60000); 
    },
    // 페이지의 높이를 조정하는 함수
    adjustHeight() {
      const exLayout = document.querySelector('.ex-layout'); // ex-layout 클래스를 가진 요소 선택
      const windowHeight = window.innerHeight; // 창의 높이를 가져옴
      exLayout.style.height = `${windowHeight}px`; // 창의 높이를 요소의 높이로 설정
    },
    changeComponent(componentName) {
    this.$router.push({ name: componentName });
    },
    goToCurrentLocation() {
      if (this.$refs.mapComp) {
        this.$refs.mapComp.goToCurrentLocation();
        console.log("Navigating to current location");
      } else {
        console.error('MapComp is not available');
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ex-layout {
  display: flex;
  position: relative;
  height: 100vh;
}

.ex-layout .gnb {
  border-right: 1px solid rgb(172, 172, 172);
  float: left;
  width: 80px; /* 너비를 80px로 변경 */
  padding: 10px;
  background-color: white;
}

.gnb-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  width: 100%;
  height: 80px; /* 높이를 80px로 변경 */
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.gnb-btn:hover {
  background-color: #e9ecef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.gnb-btn span {
  margin-top: 5px;
  text-align: center;
}

.gnb-btn img.icon {
  width: 24px;
  height: 24px;
}

.ex-layout .lnb {
  overflow-y: auto;
  float: left;
  padding: 15px;
  width: 500px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgb(172, 172, 172);
}

.current-location-btn, .category-btn {
  position: absolute;
  top: 20px;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.category-btn {
  right: 120px;
}

.current-location-btn {
  right: 20px;
}

.category-menu {
  position: fixed;
  top: 60px;
  right: 10%;
  width: auto;
  max-width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 10000;
}

.category-item {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f8f9fa;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-item:hover {
  background-color: #e9ecef;
}
</style>
