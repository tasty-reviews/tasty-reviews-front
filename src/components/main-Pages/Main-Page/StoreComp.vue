<template>
      <!-- 가게 정보를 표시하는 각각의 요소 -->
      <div v-for="(store, index) in stores" :key="index" class="store-info">
        <div class="first-line"> 
          <!-- 가게 이름 -->
          <h3>{{ store.place_name }}</h3>
          <!-- 카테고리 -->
          <p class="category">{{ store.category }}</p>
           <!-- 별점 -->
          <p class="fl-right">⭐️ {{ store.rating }}</p>
        </div>
        <div class="second-line">
          <!-- 주소 -->
          <p> 주소: {{ store.address_name }}</p>
          <!-- 리뷰 갯수 -->
          <p class="fl-right">리뷰 갯수: {{ store.reviewCount }}</p>
        </div>
        <!-- 사진 -->
        <img :src="store.imageUrl" alt="가게 사진">
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        stores: [] // 받아온 가게 정보를 저장할 배열
      };
    },
    mounted() {
      // 컴포넌트가 마운트되면 가게 정보를 가져오는 메서드 호출
      this.getStores();
    },
    methods: {
      async getStores() {
        try {
          // 백엔드에서 가게 정보를 가져오는 HTTP 요청 보내기
          const response = await axios.get('http://localhost:8080/search?query=고깃집'); // 검색어는 필요에 따라 변경
          // 받은 응답을 컴포넌트의 데이터에 저장
          this.stores = response.data.documents;

          // 각 가게의 place_name을 사용하여 네이버 이미지 검색 API에 요청을 보내고 이미지 URL을 가져와 저장
          await Promise.all(this.stores.map(async (store) => {
            const imageUrl = await this.getNaverImage(store.place_name);
            store.imageUrl = imageUrl;
          }));
          // 받은 stores 배열을 로그에 출력
          console.log('Stores:', this.stores);

        } catch (error) {
          console.error('가게 정보를 가져오는 도중 오류 발생:', error);
        }
      },
      // 클라이언트에서 네이버 API를 호출하는 함수
      async getNaverImage(query) {
      try {
        const response = await axios.get('http://localhost:8080/search/image', {
          params: {
            query: query
          }
        });
        // 성공적으로 데이터를 받아온 경우 처리
        console.log('네이버 이미지 검색 결과:', response.data);
        // 첫 번째 이미지의 링크만 반환
        return response.data.link; 
      } catch (error) {
        // 오류 발생 시 처리
        console.error('네이버 이미지 검색 도중 오류 발생:', error);
        return null;
      }
    }
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
  