<template>
    <div class="store-detail-container">
      <div class="header">
        <button @click="changeComponent('Main')" class="image-button-wrapper">
          <img src="../../../../images/GoBackButton.png" alt="Search" class="image-button"/>
        </button>
        <h1 class="page-title">가게 정보</h1>
      </div>
      <div class="divider"></div>
      <img class="store-img" :src="store.imageUrl" alt="가게 사진이 없습니다." @error="onImageError">
      <div class="divider"></div>
      <div class="store-detail">
        <div class="name-rating">
          <h2>{{ store.placeName }}</h2>
          <label class="rating">⭐️ {{ store.rating }}</label>
        </div>
        <div class="category-reviews">
          <label>카테고리: {{ store.categoryName }}</label>
          <label v-if="store.reviews">리뷰 갯수: {{ store.reviews.length }}</label>
        </div>
        <label>주소: {{ store.roadAddressname }}</label>
      </div>
      <div class="divider"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        store: {
          imageUrls: [],
          imageUrl: ''
        }
      };
    },
    async created() {
      const storeId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/place/${storeId}`);
        this.store = response.data;
  
        // 이미지 URL 가져오기
        const imageUrls = await this.getNaverImage(this.store.placeName + " 음식 사진");
        this.store.imageUrls = imageUrls;
        this.store.imageUrl = imageUrls.length > 0 ? imageUrls[0] : 'path/to/default/image.jpg';
      } catch (error) {
        console.error('가게 정보를 가져오는 도중 오류 발생:', error);
      }
    },
    methods: {
      async getNaverImage(query) {
        try {
          const response = await axios.get('http://localhost:8080/search/image', {
            params: {
              query: query
            }
          });
          // 성공적으로 데이터를 받아온 경우 처리
          console.log('네이버 이미지 검색 결과:', response.data);
          // 이미지의 링크 배열 반환
          const imageUrls = [];
          for (let i = 1; i <= 4; i++) {
            if (response.data[`image${i}`]) {
              imageUrls.push(response.data[`image${i}`].link);
            }
          }
          return imageUrls;
        } catch (error) {
          // 오류 발생 시 처리
          console.error('네이버 이미지 검색 도중 오류 발생:', error);
          return [];
        }
      },
      // 이미지 로드 실패 시 대체 이미지 로드
      onImageError() {
        if (this.store.imageUrls && this.store.imageUrls.length > 0) {
          const currentImageIndex = this.store.imageUrls.indexOf(this.store.imageUrl);
          if (currentImageIndex < this.store.imageUrls.length - 1) {
            this.store.imageUrl = this.store.imageUrls[currentImageIndex + 1];
          } else {
            this.store.imageUrl = 'path/to/default/image.jpg';
          }
        } else {
          this.store.imageUrl = 'path/to/default/image.jpg';
        }
      },
      changeComponent(componentName) {
        this.$router.push({ name: componentName });
      }
    }
  };
  </script>
  
  <style scoped>
  .store-detail-container {
    font-family: 'Arial', sans-serif;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  
  .image-button-wrapper {
    position: absolute;
    left: 0;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: white;
    cursor: pointer;
    margin-bottom: 30px;
  }
  
  .image-button {
    width: 30px;
    height: 30px;
  }
  
  /* 제목 스타일 */
  .page-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  /* 사진 스타일 */
  .store-img {
    width: 100%;
    height: 150px;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 10px; /* 모서리를 둥글게 만듦 */
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }
  
  .store-detail {
    padding: 10px;
  }
  
  .name-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .rating {
    font-size: 15px;
    color: gold;
  }
  
  .category-reviews {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .category-reviews label {
    margin: 0;
  }
  
  .divider {
    border-top: 1px solid rgb(172, 172, 172);
    margin-bottom: 10px;
    padding: 0;
    box-sizing: border-box;
  }
  </style>
  