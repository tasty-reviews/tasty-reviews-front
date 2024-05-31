<template>
  <div>
    <!-- 가게 정보를 표시하는 각각의 요소 -->
    <div v-for="(store, index) in stores" :key="index" class="store-info" @click="goToDetail(store.id)">
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
      <img v-if="!store.imageError" :src="store.imageUrl" @error="onImageError(store)" alt="가게 사진">
      <img v-else src="../../../../images/NoneImage.png" alt="가게 사진">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState(['currentLocation', 'enteredSearchWord', 'selectedSubRegion', 'stores' ]) 
  },
  mounted() {
    if (this.currentLocation) {
      if (!this.prevLocation || this.prevLocation !== this.currentLocation) {
        this.getStores();
      }
    }
  },
  watch: {
    currentLocation: {
      handler(newLocation) {
        this.isCurrentLocationChanged = true;
        this.prevLocation = newLocation;
        if (newLocation) {
          this.getStores();
        }
      },
      immediate: true 
    }
  },
  data() {
    return {
      isCurrentLocationChanged: false,
      prevLocation: null,
      maxRetryCount: 3 // 최대 재시도 횟수 설정
    };
  },
  methods: {
    ...mapActions(['updateStores']), 
    async getStores() {
      if (this.isCurrentLocationChanged) {
        try {
          const searchQuery = this.enteredSearchWord || this.selectedSubRegion || this.currentLocation+"맛집";
          if (!searchQuery) {
            console.error('Search query is not valid');
            return;
          }
          const response = await axios.get(`http://localhost:8080/search?q=${searchQuery}`);
          const stores = response.data.documents;

          await Promise.all(stores.map(async (store, index) => {
            await this.sleep(100 * index);
            const imageUrls = await this.getNaverImage(store.place_name+"음식 사진");
            store.imageUrls = imageUrls;
            store.imageUrl = imageUrls[0];
            store.imageError = false; // 이미지 요청 실패 상태 초기화
          }));

          this.updateStores(stores);

          console.log('Stores:', stores);
        } catch (error) {
          console.error('가게 정보를 가져오는 도중 오류 발생:', error);
        }
      }
    },
    async getNaverImage(query) {
      try {
        const response = await axios.get('http://localhost:8080/search/image', {
          params: {
            query: query
          }
        });
        const imageUrls = [];
        for (let i = 1; i <= 4; i++) {
          if (response.data[`image${i}`]) {
            imageUrls.push(response.data[`image${i}`].link);
          }
        }
        return imageUrls;
      } catch (error) {
        console.error('네이버 이미지 검색 도중 오류 발생:', error);
        return [];
      }
    },
    onImageError(store) {
      if (!store.imageError) {
        const currentImageIndex = store.imageUrls.indexOf(store.imageUrl);
        if (currentImageIndex < store.imageUrls.length - 1) {
          // 다음 이미지가 있는 경우에만 다음 이미지를 로드하도록 처리
          store.imageUrl = store.imageUrls[currentImageIndex + 1];
        } else {
          // 마지막 이미지일 때는 이미지 요청을 중지하고 에러 메시지를 출력
          console.error('모든 이미지 요청이 실패했습니다.');
          store.imageError = true; // 이미지 요청 실패 상태 플래그 설정
          store.imageUrl = ''; // 빈 이미지 URL로 설정하거나 기타 처리 수행
        }
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    goToDetail(storeId) {
      this.$router.push({ name: 'StoreDetail', params: { id: storeId } });
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
  height: 150px;
  border-radius: 8px;
  margin-top: 10px;
  border-radius: 10px; /* 모서리를 둥글게 만듦 */
  border: none; /* 기존의 테두리 제거 */
  background-color: white; /* 배경색을 흰색으로 설정 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}
.first-line {
  font-size: 11px;
  display: flex;
  align-items: center;
}
.category {
  color: gray;
}
.fl-right {
  margin-left: auto;
}
.second-line {
  font-size: 13px;
  display: flex;
  align-items: center;
}
</style>
