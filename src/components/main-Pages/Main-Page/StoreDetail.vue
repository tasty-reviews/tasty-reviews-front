<template>
  <div class="store-detail">
    <div class="header">
      <button @click="goBack" class="back-button">
        <img src="../../../../images/GoBackButton.png" alt="Go Back" class="back-icon"/>
      </button>
      <h1>장소 상세</h1>
    </div>
    <img :src="store.imageUrl" alt="가게 사진" class="store-image">
    <div class="store-info">
      <h2>{{ store.place_name }}</h2>
      <p>{{ store.address_name }}</p>
      <div class="rating">
        <span class="category">{{ store.category }}</span>
        <span>⭐️ {{ store.rating }}점 리뷰 {{ store.reviewCount }}</span>
      </div>
    </div>
    <div class="tab-menu">
      <button class="tab-button" :class="{ active: selectedTab === 'reviews' }" @click="selectedTab = 'reviews'">유저 리뷰 {{ store.reviews.length }}</button>
      <button class="tab-button" :class="{ active: selectedTab === 'details' }" @click="selectedTab = 'details'">상세 정보</button>
    </div>
    <div v-if="selectedTab === 'reviews'" class="reviews">
      <div v-for="(review, index) in store.reviews" :key="index" class="review">
        <div class="review-header">
          <span class="review-author">{{ review.author }}</span>
          <span class="review-rating">⭐️ {{ review.rating }}</span>
        </div>
        <p class="review-content">{{ review.content }}</p>
      </div>
    </div>
    <div v-if="selectedTab === 'details'" class="details">
      <!-- 상세 정보 내용 -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedTab: 'reviews' // 기본 탭 설정
    };
  },
  computed: {
    ...mapState(['stores']),
    store() {
      const storeId = this.$route.params.id;
      return this.stores.find(store => store.id === storeId) || {};
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    share() {
      // 공유 기능 구현
    }
  }
};
</script>

<style scoped>
.store-detail {
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.back-button{
  margin-right: 10px;
        width: 20px;    
        height: 20px;
        border: none; /* 기존의 테두리 제거 */
        background-color: white; /* 배경색을 흰색으로 설정 */
        cursor: pointer; /* 커서 변경 */
}

.back-icon{
  margin-top: 10px;
        width: 20px;    
        height: 20px;
}

.store-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.store-info {
  text-align: center;
  margin-top: 16px;
}

.store-info h2 {
  margin: 8px 0;
  font-size: 24px;
}

.store-info p {
  margin: 4px 0;
  color: gray;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}

.rating .category {
  margin-right: 8px;
  color: orange;
}

.tab-menu {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.tab-button {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.tab-button.active {
  border-bottom: 2px solid orange;
  font-weight: bold;
}

.reviews, .details {
  margin-top: 16px;
}

.review {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
}

.review-author {
  font-weight: bold;
}

.review-rating {
  color: gold;
}

.review-content {
  margin-top: 8px;
}
</style>
