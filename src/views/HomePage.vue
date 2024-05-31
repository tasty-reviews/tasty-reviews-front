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
    <!-- <button class="category-btn" @click="toggleCategories">카테고리</button> -->
    <div v-if="isDropdownOpen" class="category-menu">
      <button v-for="category in categories" :key="category" class="category-item" @click="goToCategory(category)">{{ category }}
      </button>
    </div>
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
    return {
      isDropdownOpen: false,
      categories: ['한식', '중식', '일식', '양식', '분식', '패스트푸드'],
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
    },

    toggleCategories() {
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log("Dropdown Status: ", this.isDropdownOpen);
    },
    goToCategory(category) {
      this.$router.push({ name: category });
      this.isDropdownOpen = false;
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
