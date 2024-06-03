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
    <div class="tab-menu">
      <button @click="setActiveTab('details')" :class="{ active: activeTab === 'details' }">상세 정보</button>
      <button @click="setActiveTab('reviews')" :class="{ active: activeTab === 'reviews' }">
        유저리뷰 {{ store.reviewCount ? store.reviewCount : 0 }}
      </button>
    </div>
    <div class="reviews-content" v-if="activeTab === 'reviews'">
      <button class="write-review-button" @click="isLoggedIn ? goToWriting(store.placeId) : changeComponent('LogIn')">리뷰 작성하기</button>
      <div class="reviews" ref="reviewList">
        <div v-for="review in reviews" :key="review.id" class="review">
          <div class="review-header">
            <div class="rating-stars">
              <span v-for="star in review.rating" :key="star" class="star filled">⭐️</span>
              <span class="rating-number">{{ review.rating }}</span>
            </div>
            <div class="review-date">{{ review.createdDate }}</div>
          </div>
          <p class="review-nickname">작성자: {{ review.nickname }}</p>
          <p class="review-comment">{{ review.comment }}</p>
          <img v-if="review.images && review.images.length > 0" :src="getEncodedImageUrl(review.images[0].storedFileName)" alt="리뷰 이미지" class="review-image">
          <button @click="deleteReview(review.id)">삭제</button>
        </div>
      </div>
    </div>
    <div class="content" v-if="activeTab === 'details'">
      <div class="store-detail">
        <div class="margin_bottom"><label>{{ secondCategory }}</label></div>
        <div class="name-rating">
          <h3>{{ store.placeName }}</h3>
          <label class="rating">⭐️ {{ store.avgRating }}</label>
        </div>
        <div class="category-reviews">
          <label>{{ store.roadAddressname }}</label>
          <label>리뷰: {{ store.reviewCount ? store.reviewCount : 0 }} 개</label>
        </div>
        <div><label>전화번호: {{ store.phone }}</label></div>
        <div><label><a :href="store.placeUrl" class="kakao-map-link" target="_blank">카카오맵에서 확인하기</a></label></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      store: {
        imageUrls: [],
        imageUrl: '',
        place_url: '' 
      },
      reviews: [],
      activeTab: 'details' 
    };
  },
  computed: {
    ...mapState(['isLoggedIn']), // Vuex 스토어의 isLoggedIn 상태를 컴포넌트 내부에 매핑
    secondCategory() {
      if (this.store.categoryName) {
        const categories = this.store.categoryName.split(' > ');
        return categories[1] || '';  // 두 번째 요소를 반환, 없으면 빈 문자열 반환
      }
      return '';
    }
  },
  async created() {
    const storeId = this.$route.params.id;
    await this.fetchStore(storeId);
    await this.fetchReviews(storeId);
  },
  methods: {
    async fetchStore(storeId) {
      try {
        const response = await axios.get(`http://localhost:8080/place/${storeId}`);
        this.store = response.data;
        
        const imageUrls = await this.getNaverImage(this.store.placeName + " 음식 사진");
        this.store.imageUrls = imageUrls;
        this.store.imageUrl = imageUrls.length > 0 ? imageUrls[0] : 'path/to/default/image.jpg';
      } catch (error) {
        console.error('가게 정보를 가져오는 도중 오류 발생:', error);
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
    async fetchReviews(storeId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/${storeId}`);
        this.reviews = response.data;
      } catch (error) {
        console.error('리뷰 정보를 가져오는 도중 오류 발생:', error);
      }
    },
    async deleteReview(reviewId) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
        await this.fetchReviews(this.store.id);
        await this.fetchStore(this.store.id);  // 리뷰 삭제 후 가게 정보 업데이트
      } catch (error) {
        console.error('리뷰 삭제 도중 오류 발생:', error);
      }
    },
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
    },
    goToWriting(storeId) {
      console.log(storeId);
      this.$router.push({ name: 'WritingReview', params: { id: storeId } });
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab === 'reviews') {
        this.fetchReviews(this.store.id);
      }
    },
    getEncodedImageUrl(fileName) {
      return `http://localhost:8080/api/reviews/image/${encodeURIComponent(fileName)}`;
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

.page-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}

.store-img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: none;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
}

.store-detail {
  padding: 5px;
}
.store-detail div {
  margin-bottom: 15px;
}

.store-detail label {
  font-size: 15px;
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
  margin-top: 5px;
  margin-bottom: 5px;
}

.margin {
  margin-top: 5px;
  margin-bottom: 5px;
}

.margin_bottom {
  margin-bottom: 5px;
}

.divider {
  border-top: 1px solid rgb(172, 172, 172);
  margin-bottom: 10px;
  padding: 0;
  box-sizing: border-box;
}

/* Styles for the tab menu */
.tab-menu {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
}

.tab-menu button {
  flex: 1;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 16px;
}

.tab-menu button.active {
  border-bottom: 2px solid orange; /* Color for active tab underline */
  font-weight: bold;
  color: orange; /* Text color for active tab */
}

.kakao-map-link {
  color: rgb(0, 0, 184); /* Blue text color for the link */
  text-decoration: underline; /* Underline for the link */
}

.content {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
}

.reviews-content {
  padding-top: 10px;
}

.reviews {
  max-height: 69vh; /* 최대 높이를 창의 높이의 80%로 설정 */
  overflow-y: auto; /* 스크롤이 필요한 경우만 스크롤 표시 */
  padding: 5px; /* 추가된 패딩 */
  box-sizing: border-box; /* 패딩 포함 박스 크기 계산 */
}


.reviews::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge에서 스크롤바 숨김 */
}

.reviews::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* 리뷰 항목 스타일 */
.review {
  padding: 10px; /* 패딩 추가 */
  margin-top: 15px;
  margin-bottom: 15px; /* 각 리뷰 사이에 여백 추가 */
  border-radius: 8px;
  border: none;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 리뷰 항목 헤더 스타일 */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* 별점과 별점 숫자 스타일 */
.rating-stars {
  display: flex;
  align-items: center;
}

.star {
  color: #ccc; /* 기본 별 색상 */
  font-size: 20px;
}

.star.filled {
  color: gold; /* 채워진 별 색상 */
}

.rating-number {
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
}

/* 리뷰 날짜 스타일 */
.review-date {
  color: #999;
  font-size: 12px;
  text-align: right;
}

/* 리뷰 댓글 스타일 */
.review-comment {
  margin-bottom: 10px;
}

/* 리뷰 이미지 스타일 */
.review-image {
  width: 100%;
  height: auto; /* 비율 유지하며 높이 자동 조절 */
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 5px;
}

.write-review-button {
  width: 100%;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
}

</style>