<template>
    <div class="store-detail">
      <h2>{{ store.placeName }}</h2>
      <p>카테고리: {{ store.categoryName }}</p>
      <p>주소: {{ store.roadAddressname }}</p>
      <p>평점: ⭐️ {{ store.rating }}</p>
      <p v-if="store.reviews">리뷰 갯수: {{ store.reviews.length }}</p>
      <img :src="store.imageUrl" alt="가게 사진" @error="onImageError(store)">
    </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        store: {
          imageUrls: []
        }
      };
    },
    async created() {
      const storeId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/place/${storeId}`);
        this.store = response.data;
        this.store.imageUrls = this.store.imageUrls || ['path/to/default/image.jpg'];
        this.store.imageUrl = this.store.imageUrls[0];
      } catch (error) {
        console.error('가게 정보를 가져오는 도중 오류 발생:', error);
      }
    },
    methods: {
      onImageError(store) {
        if (store.imageUrls && store.imageUrls.length > 0) {
          const currentImageIndex = store.imageUrls.indexOf(store.imageUrl);
          if (currentImageIndex < store.imageUrls.length - 1) {
            store.imageUrl = store.imageUrls[currentImageIndex + 1];
          } else {
            store.imageUrl = 'path/to/default/image.jpg';
          }
        } else {
          store.imageUrl = 'path/to/default/image.jpg';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .store-detail {
    padding: 20px;
  }
  .store-detail img {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    margin-top: 10px;
    border-radius: 10px; /* 모서리를 둥글게 만듦 */
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }
  </style>
  