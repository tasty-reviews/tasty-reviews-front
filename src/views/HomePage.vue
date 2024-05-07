<template>
  <!-- 전체 페이지 레이아웃을 나타내는 div 요소 -->
  <div class="ex-layout">
    <!-- 글로벌 메뉴를 나타내는 div 요소 -->
    <div class="gnb">
      <button class="gnb-btn" @click="changeComponent('Main')">메인</button>
      <button class="gnb-btn" @click="changeComponent('Ranking')">랭킹</button>
      <button class="gnb-btn" @click="changeComponent('Favorites')">즐겨찾기</button>
      <button class="gnb-btn" @click="changeComponent('MyPage')">마이페이지</button>
      <button class="gnb-btn" @click="changeComponent('LogIn')">로그인</button> 
      <!-- 로그인 유무에 따라 마이페이지 버튼에서 동작하도록 할 예정 -->
    </div>
    <!-- 왼쪽 메뉴를 나타내는 div 요소 -->
    <div class="lnb"><router-view name="leftMenu"></router-view></div>
    <MapComp ref="mapComp"/>
    <button class="current-location-btn" @click="goToCurrentLocation">현재 위치</button>
    <button class="category-btn" @click="toggleCategories">카테고리</button>
    <div v-if="isDropdownOpen" class="category-menu">
      <button v-for="category in categories" :key="category" class="category-item" @click="toggleCategories">
        {{ category }}
      </button>
  </div>
  </div>
</template>

<script>
// MapComp 컴포넌트를 가져옴
import MapComp from '../components/comp-Map/MapComp.vue';

export default {
  components: {
    MapComp
  },
  name: 'HomePage',
  data(){
    return {
      isDropdownOpen: false,  // 드롭다운 메뉴 상태
      categories: ['한식', '중식', '일식', '양식', '분식', '패스트푸드'],
      //카테고리 맛집 음식종류들
    };
  },
  // Vue 인스턴스가 마운트되었을 때 실행되는 함수
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
    if (this.$refs.mapComp){
      this.$refs.mapComp.goToCurrentLocation(); // 'mapComp'는 MapComp 컴포넌트의 ref
  }else {
    console.error('MapComp is not available');
  } 
  },
  toggleCategories() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  goToCategory(category) {
    this.$router.push({ name: category }); // 라우터를 이용해 해당 카테고리 페이지로 이동
    this.isDropdownOpen = false; // 카테고리 선택 후 드롭다운 닫기
    }
}
}
</script>

<style>
/* 모든 요소의 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 전체 페이지 레이아웃의 스타일 설정 */
.ex-layout {
  
  display: flex; /* 요소들을 수평으로 정렬하기 위해 flexbox 사용 */
  height: 100vh; /* 화면 전체 높이를 사용하도록 설정 */
}
.ex-layout .gnb {
  border-right: 1px solid rgb(172, 172, 172);
  float: left;
  width: 80px;
  padding: 10px;
  background-color: white;
}
/* 왼쪽 메뉴의 스타일 설정 */
.ex-layout .lnb {
  overflow: scroll;
  float: left;
  padding: 15px;
  width: 500px;
  background-color: white;
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
.current-location-btn, .category-btn {
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
  right: 120px; /* 화면의 왼쪽 상단에 위치 */
}

.current-location-btn {
  right: 20px; /* 카테고리 버튼 바로 오른쪽에 위치 */
}

/* 드롭다운 메뉴 스타일 */
.category-menu {
  position: absolute;
  top: 60px; /* 카테고리 버튼 바로 아래에 위치 */
  right: 120px; /* 카테고리 버튼의 왼쪽 정렬을 따름 */
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.category-item {
  padding: 5px;
  cursor: pointer;
}

.category-item:hover {
  background-color: #f7f7f7;
}
</style>
