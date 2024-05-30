<template>
    <div class="rankings-page">
      <h1>맛집 랭킹</h1>
      <select v-model="selectedType" @change="fetchRankings">
        <option value="VIEW_COUNT">조회수 순</option>
        <option value="REVIEW_COUNT">리뷰 순</option>
      </select>
      <div v-for="(restaurant, index) in rankings" :key="index" class="store-info">
        <div class="first-line">
          <h3>{{ restaurant.placeName }}</h3>
          <p class="category">{{ restaurant.category }}</p>
          <p class="fl-right">⭐️ {{ restaurant.rating }}</p>
        </div>
        <div class="second-line">
          <p>주소: {{ restaurant.roadAddressName }}</p>
          <p class="fl-right">리뷰 갯수: {{ restaurant.reviewCount }}</p>
        </div>
        <img :src="restaurant.imageUrl" alt="가게 사진">
      </div>
    </div>
  </template>
  
  <script>
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
          const response = await axios.get('http://localhost:8080/rankings?', {
            params: {
              type: this.selectedType
            }
          });
          this.rankings = response.data;
        } catch (error) {
          console.error('Error fetching rankings:', error);
        }
      }
    },
    mounted() {
      this.fetchRankings();
    }
  };
  </script>
  
  <style scoped>
  .rankings-page {
    padding: 20px;
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
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    font-size: 15px;
    font-family: Arial, sans-serif;
  }
  
  .store-info h3 {
    font-size: 20px;
  }

  .store-info img {
  width: 100%;
  height: 150px;
  border-radius: 8px;
  margin-top: 10px;
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
  