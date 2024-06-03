<template>

  <div class="rankings-page">
    <h1>맛집 랭킹</h1>
    <select v-model="selectedType" @change="fetchRankings">
      <option value="VIEW_COUNT">조회수 순</option>
      <option value="REVIEW_COUNT">리뷰 순</option>
    </select>
    <div v-for="(store, index) in rankings" :key="index" class="store-info">
      <div class="first-line">
        <h3>{{ store.placeName }}</h3>
        <p class="category">{{ store.category }}</p>
        <p class="fl-right">⭐️ {{ store.avgRating }}</p>
      </div>
      <div class="second-line">
        <p>주소: {{ store.roadAddressName }}</p>
        <p class="fl-right">리뷰 갯수: {{ store.reviewCount }}</p>

      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store';
import axios from 'axios';


export default {
  data() {
    return {
      selectedType: 'VIEW_COUNT',
      rankings: []
    };
  },
  methods: {
    async fetchRankings() {
      try {
        const response = await axios.get('http://localhost:8080/rankings', {
          params: {
            type: this.selectedType
          }
        });
        const rankings = response.data;

        this.rankings = rankings;
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    },
    onImageError(restaurant) {
      if (!restaurant.imageError) {
        const currentImageIndex = restaurant.imageUrls.indexOf(restaurant.imageUrl);
        if (currentImageIndex < restaurant.imageUrls.length - 1) {
          restaurant.imageUrl = restaurant.imageUrls[currentImageIndex + 1];
        } else {
          console.error('All image requests failed.');
          restaurant.imageError = true;
          restaurant.imageUrl = '';
        }
      }
    },
      goToDetail(storeId) {
        this.$router.push({ name: 'StoreDetail', params: { id: storeId } });
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));

      }
    },
    mounted() {
        this.fetchRankings();

      }
  }

  
  </script>
 
<style scoped>
.rankings-page {
  padding: 10px;
}

.rankings-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.rankings-page select {
  margin-bottom: 20px;
}

.store-info {
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-size: 15px;
  font-family: Arial, sans-serif;
  border-radius: 8px;
  border: none;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
}

.store-info h3 {
  font-size: 20px;
}

.store-info img {
  width: 100%;
  height: 150px;
  border-radius: 8px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
}

.first-line {
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
