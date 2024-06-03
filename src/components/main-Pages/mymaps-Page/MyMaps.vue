<template>
  <div class="font">
    <div @click="createNewMap" class="new-map">
      <img src="@/assets/add-icon.png" alt="새 지도 만들기 아이콘" />
      <span>새 지도 만들기</span>
    </div>
    <div v-if="maps.length === 0" class="no-maps">
      <img src="@/assets/map.png" alt="지도 없음" class="no-maps-image" />
      <p>내 지도가 없습니다.<br />지도를 만들어보세요.</p>
    </div>
    <div v-else @click="myMapDetails">
      <div v-for="map in maps" :key="map.id" class="map-item">
        <img :src="getEncodedImageUrl(map.myMapImage)" alt="지도 이미지" class="map-image" />
        <div>
          <h2>{{ map.name }}</h2>
          <p>{{ map.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      maps: [],
    };
  },
  created() {
    this.fetchMaps();
  },
  methods: {
    async fetchMaps() {
      try {
        // 쿠키에서 JWT 토큰 가져오기
        const access = document.cookie
          .split('; ')
          .find(row => row.startsWith('access='))
          .split('=')[1];

        const response = await axios.get('http://localhost:8080/mymaps', {
          headers: {
            'access': access // JWT 토큰을 포함
          }
        });
        this.maps = response.data;
      } catch (error) {
        console.error("지도를 가져오는 중 오류가 발생했습니다:", error);
      }
    },
    createNewMap() {
      this.$router.push({ name: "AddMap" });
    },

    getEncodedImageUrl(fileName) {
      return `http://localhost:8080/api/reviews/image/${encodeURIComponent(fileName)}`;
    }
  },
};
</script>

<style scoped>
.font {
  font-family: 'Arial', sans-serif;
}
.new-map {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.new-map img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.new-map span {
  font-size: 1.2em;
  font-weight: bold;
}

.no-maps {
  text-align: center;
  margin-top: 50px;
}

.no-maps-image {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.map-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.map-item img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

h2 {
  font-size: 1.2em;
  margin: 0;
}

p {
  margin: 0;
  color: #666;
}
</style>
