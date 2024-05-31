<template>
  <div class="ex-layout">
    <div class="gnb">

      <button class="gnb-btn" @click="changeComponent('Main')">
        <img src="@/assets/home.png" class="icon"/>
        <span>메인</span>
      </button>
      <button class="gnb-btn" @click="changeComponent('Ranking')">
        <img src="@/assets/star.png" class="icon"/>
        <span>랭킹</span>
      </button>
      <button class="gnb-btn" @click="changeComponent('Favorites')">
        <img src="@/assets/mymap.png" class="icon"/>
        <span>내지도</span>
      </button>
      <button class="gnb-btn" @click="isLoggedIn ? changeComponent('MyPage') : changeComponent('LogIn')">
        <img src="@/assets/user.png" class="icon"/>
        <span>마이</span>
      </button>

      <button class="gnb-btn" @click="changeComponent('Main')">메인</button>
      <button class="gnb-btn" @click="changeComponent('Ranking')">랭킹</button>
      <button class="gnb-btn" @click="changeComponent('MyMaps')">내지도</button>
      <button class="gnb-btn" @click="isLoggedIn ? changeComponent('MyPage') : changeComponent('LogIn')">마이페이지</button>
      <!-- <button class="gnb-btn" @click="changeComponent('LogIn')">로그인</button> -->
      <!-- 로그인 유무에 따라 마이페이지 버튼에서 동작하도록 할 예정 -->

    </div>
    <div class="lnb"><router-view name="leftMenu"></router-view></div>
    <MapComp ref="mapComp"/>
    <button class="current-location-btn" @click="goToCurrentLocation">현재 위치</button>
  </div>
</template>

<script>
import MapComp from '../components/comp-Map/MapComp.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  components: {
    MapComp
  },

  name: 'HomePage',
  data(){
    };
  },


  // Vue 인스턴스가 마운트되었을 때 실행되는 함수

  mounted() {
    this.adjustHeight();
    window.addEventListener('resize', this.adjustHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustHeight);
  },
  methods: {
    adjustHeight() {
      const exLayout = document.querySelector('.ex-layout');
      const windowHeight = window.innerHeight;
      exLayout.style.height = `${windowHeight}px`;
    },
    changeComponent(componentName) {
      this.$router.push({ name: componentName });
    },
    goToCurrentLocation(){
      if (this.$refs.mapComp){
        this.$refs.mapComp.goToCurrentLocation();
        console.log("Navigating to current location");
      } else {
        console.error('MapComp is not available');
      } 
    }
  }

  }
}
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
.gnb-btn {
  border: 1px solid rgb(172, 172, 172);
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 20px;
}
 /*카테고리메뉴버튼*/
.current-location-btn {
position: absolute;
top: 20px; /* 상단에서 일정 거리에 위치 */
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
</style>
