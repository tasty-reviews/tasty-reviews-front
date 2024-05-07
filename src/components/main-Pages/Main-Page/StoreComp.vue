<template>
      <!-- 가게 정보를 표시하는 각각의 요소 -->
      <div v-for="(store, index) in stores" :key="index" class="store-info">
        <div class="first-line"> 
          <!-- 가게 이름 -->
          <h3>{{ store.name }}</h3>
          <!-- 카테고리 -->
          <p class="category">{{ store.category }}</p>
           <!-- 별점 -->
          <p class="fl-right">⭐️ {{ store.rating }}</p>
        </div>
        <div class="second-line">
          <!-- 주소 -->
          <p> 주소: {{ store.address }}</p>
          <!-- 리뷰 갯수 -->
          <p class="fl-right">리뷰 갯수: {{ store.reviewCount }}</p>
        </div>
        <!-- 사진 -->
        <img :src="store.imageUrl" alt="가게 사진">
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stores: [
          {
            name: '가게 이름1',
            category: '카테고리1',
            address: '주소1',
            rating: 4.5,
            reviewCount: 20,
            imageUrl: 'url1'
          },
          {
            name: '가게 이름2',
            category: '카테고리2',
            address: '주소2',
            rating: 3.8,
            reviewCount: 15,
            imageUrl: 'url2'
          },
          // 추가적인 가게 정보를 배열에 추가할 수 있습니다.
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* 공통 스타일 */
  .store-info {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-size: 15px; /* 텍스트의 폰트 사이즈를 조정하세요 */
    font-family: Arial, sans-serif;
    border-radius: 8px; /* 모서리를 둥글게 만듦 */
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }
  /* 가게 이름 스타일 */
  .store-info h3 {
    font-size: 20px;
  }
  /* 사진 스타일 */
  .store-info img {
    width: 100%;
    height:150px;
    border-radius: 8px;
    margin-top: 10px;
    border-radius: 10px; /* 모서리를 둥글게 만듦 */
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }
  .first-line {
    font-size:11px;
    display: flex;
    align-items: center;
  }
  .category {
    color: gray;
  }
  .fl-right{
    margin-left: auto;
  }
  .second-line{
    font-size:13px;
    display: flex;
    align-items: center;
  }
  </style>
  