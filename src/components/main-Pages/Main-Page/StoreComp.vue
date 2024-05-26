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
    <img :src="store.imageUrl" @error="onImageError(store)" alt="가게 사진">
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      isCurrentLocationChanged: false // currentLocation이 변경되었는지 여부를 나타내는 변수
    };
  },
  computed: {
    ...mapState(['currentLocation', 'enteredSearchWord', 'selectedSubRegion', 'stores' ]) // Vuex 상태를 컴포넌트의 computed 속성으로 매핑
  },
  mounted() {
    // 컴포넌트가 마운트되면 가게 정보를 가져오는 메서드 호출
    if (this.currentLocation) {
      this.getStores();
    }
  },
  watch: {
    currentLocation: {
      handler(newLocation) {
        // currentLocation이 변경될 때 isCurrentLocationChanged를 true로 설정
        this.isCurrentLocationChanged = true;
        if (newLocation) {
          this.getStores();
        }
      },
      immediate: true // 컴포넌트가 마운트될 때 즉시 감시를 시작
    }
  },
  methods: {
    ...mapActions(['updateStores']), // Vuex 액션을 컴포넌트의 메서드로 매핑
    async getStores() {
      if (this.isCurrentLocationChanged) {
        try {
          // 선택된 하위 지역에 해당하는 검색어 가져오기
          const searchQuery = this.enteredSearchWord || this.selectedSubRegion || this.currentLocation+"맛집";
          if (!searchQuery) {
            console.error('Search query is not valid');
            return;
          }
          // 백엔드에서 가게 정보를 가져오는 HTTP 요청 보내기
          const response = await axios.get(`http://localhost:8080/search?q=${searchQuery}`);
          // 받은 응답을 Vuex 스토어에 저장
          const stores = response.data.documents;

          // 각 가게의 place_name을 사용하여 네이버 이미지 검색 API에 요청을 보내고 이미지 URL을 가져와 저장
          await Promise.all(stores.map(async (store, index) => {
            // 각 요청 사이에 100ms 지연 시간 추가
            await this.sleep(100 * index);
            const imageUrls = await this.getNaverImage(store.place_name+"음식 사진");
            store.imageUrls = imageUrls;
            store.imageUrl = imageUrls[0]; // 첫 번째 이미지를 기본으로 설정
          }));

          // Vuex 스토어에 stores 배열 업데이트
          this.updateStores(stores);

          // 받은 stores 배열을 로그에 출력
          console.log('Stores:', stores);
        } catch (error) {
          console.error('가게 정보를 가져오는 도중 오류 발생:', error);
        }
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
    onImageError(store) {
      const currentImageIndex = store.imageUrls.indexOf(store.imageUrl);
      if (currentImageIndex < store.imageUrls.length - 1) {
        store.imageUrl = store.imageUrls[currentImageIndex + 1];
      } else {
        store.imageUrl = 'path/to/default/image.jpg';
      }
    },
    // 지연 시간을 추가하는 함수
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
