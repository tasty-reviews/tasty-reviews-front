<template>
  <div class="store-detail-container">
    <!-- Header -->
    <div class="header">
      <button @click="goBack" class="image-button-wrapper">
        <img src="../../../../images/GoBackButton.png" alt="Search" class="image-button"/>
      </button>
      <h1 class="page-title">{{ store.placeName }}</h1>
    </div>
    
    <!-- Rating Stars -->
    <div class="rating-wrapper">
      <div class="rating-container">
        <div class="rating-stars">
          <img v-for="n in 5" :key="n" @click="setRating(n)" :src="n <= selectedRating ? '/Star.png' : '/HalfStar.png'" alt="별">
        </div>
      </div>
      <div class="rating-label">{{ selectedRating }}/5</div>
    </div>

    <!-- Review Input -->
    <div class="review-input">
      <textarea v-model="review.comment" placeholder="리뷰를 작성해주세요"></textarea>
      <label for="image-upload" class="image-upload-label">
        <img src="../../../../images/UploadImage.png" alt="이미지 첨부" class="image-upload-button"/>
      </label>
      <input id="image-upload" type="file" @change="handleImageUpload">
      <img v-if="review.image" :src="review.image" alt="첨부된 이미지">
    </div>
    
    <!-- Complete Button -->
    <button @click="submitReview" class="complete-button">완료</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      store: {
        placeName: '가게 이름', // 가게 이름은 예시로 제공됨
      },
      selectedRating: 0, // 선택된 별점
      review: {
        comment: '', // 리뷰 내용
        image: null, // 첨부된 이미지
        imageFile: null // 실제 업로드할 파일 객체
      }
    };
  },
  async created() {
    const storeId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:8080/place/${storeId}`);
      this.store = response.data;
    } catch (error) {
      console.error('가게 정보를 가져오는 도중 오류 발생:', error);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    setRating(rating) {
      this.selectedRating = rating;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.review.image = e.target.result;
          this.review.imageFile = file; // 이미지 파일 객체를 저장합니다.
        };
        reader.readAsDataURL(file);
      }
    },
    async submitReview() {
      // 쿠키에서 JWT 토큰 가져오기
      const access = document.cookie
        .split('; ')
        .find(row => row.startsWith('access='))
        .split('=')[1];

      const formData = new FormData();
      formData.append('rating', this.selectedRating);
      formData.append('comment', this.review.comment);
      if (this.review.imageFile) {
        formData.append('files', this.review.imageFile); // 이미지 파일을 추가합니다.
      } else {
        // 이미지가 없으면 빈 Blob 추가
        formData.append('files', new Blob());
      }

      try {
        const response = await axios.post(`http://localhost:8080/api/review/add/${this.store.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'access': access // JWT 토큰을 포함
          }
        });
        console.log('Review submitted successfully:', response.data);
        alert("리뷰 작성이 완료 됐습니다.");
        this.goBack(); // 리뷰 작성 후 이전 페이지로 이동
      } catch (error) {
        console.error('리뷰 제출 중 오류 발생:', error);
      }
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
  font-size: 30px; /* 크게 */
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 50px; /* 같은 간격으로 */
  margin-right: 50px; /* 같은 간격으로 */
}

.rating-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px; /* 일정한 간격 */
}

.rating-container img {
  width: 15%;
  height: 15%;
}

.rating-stars{
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-stars img {
  cursor: pointer;
}

.rating-label {
  font-size: 20px;
  margin-top: 20px; /* 일정한 간격 */
  margin-bottom: 10px; /* 일정한 간격 */
}

.review-input {
  margin-top: 20px; /* 일정한 간격 */
}

.review-input textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  resize: none;
  font-size: 20px;
}

.review-input input[type="file"] {
  display: none;
}

.image-upload-label {
  display: block;
  text-align: left; /* 왼쪽 정렬 */
  cursor: pointer;
}

.image-upload-button {
  width: 50px; /* 이미지 크기를 적절히 조정 */
  height: 50px; /* 이미지 크기를 적절히 조정 */
  margin-top: 10px;
}

.review-input img {
  max-width: 100%;
  margin-top: 10px;
}

.complete-button {
  width: 100%;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 30px; /* 일정한 간격 */
}
</style>
