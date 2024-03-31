<template>
  <!-- 전체 페이지 레이아웃을 나타내는 div 요소 -->
  <div class="ex-layout">
    <!-- 글로벌 메뉴를 나타내는 div 요소 -->
    <div class="gnb"><!-- 버튼 1 -->
      <button class="gnb-btn">Button 1</button>
      <!-- 버튼 2 -->
      <button class="gnb-btn">Button 2</button>
      <!-- 버튼 3 -->
      <button class="gnb-btn">Button 3</button>
      <!-- 버튼 4 -->
      <button class="gnb-btn">Button 4</button>
      <!-- 버튼 5 -->
      <button class="gnb-btn">Button 5</button>
      <!-- 버튼 6 -->
      <button class="gnb-btn"> 로그인 </button>
    </div>
    <!-- 왼쪽 메뉴를 나타내는 div 요소 -->
    <div class="lnb">Left menu</div>
    <!-- MapComp 컴포넌트를 표시하는 요소 -->
    <MapComp/>
  </div>
</template>

<script>
// MapComp 컴포넌트를 가져옴
import MapComp from './components/MapComp.vue';
export default {
  components: {MapComp}, // 컴포넌트 등록

  name: 'ExampleLayout',
  // Vue 인스턴스가 마운트되었을 때 실행되는 함수
  mounted() {
    this.adjustHeight(); // 페이지의 높이를 조정하는 함수 호출
    window.addEventListener('resize', this.adjustHeight); // 창 크기 변경 이벤트에 대한 이벤트 리스너 추가
  },
  // Vue 인스턴스가 언마운트되기 전에 실행되는 함수
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustHeight); // 창 크기 변경 이벤트 리스너 제거
  },
  methods: {
    // 페이지의 높이를 조정하는 함수
    adjustHeight() {
      const exLayout = document.querySelector('.ex-layout'); // ex-layout 클래스를 가진 요소 선택
      const windowHeight = window.innerHeight; // 창의 높이를 가져옴
      exLayout.style.height = `${windowHeight}px`; // 창의 높이를 요소의 높이로 설정S
      
      // gnb, lnb 요소의 높이를 창의 높이로 설정
      const gnb = exLayout.querySelector('.gnb');
      const lnb = exLayout.querySelector('.lnb');
      gnb.style.height = `${windowHeight}px`;
      lnb.style.height = `${windowHeight}px`;
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
/* 글로벌 메뉴의 스타일 설정 */
.ex-layout .gnb {
  float: left;
  width: 80px;
  padding: 10px;
  background-color: skyblue;
}
/* 왼쪽 메뉴의 스타일 설정 */
.ex-layout .lnb {
  float: left;
  padding: 15px;
  width: 500px;
  background-color: orange;
}
.gnb-btn {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none; 
  background-color: white;
  margin-bottom: 20px;
}
</style>
