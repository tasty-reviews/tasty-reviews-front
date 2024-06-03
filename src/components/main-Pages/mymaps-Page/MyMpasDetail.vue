<template>
    <div class="container">
      <header class="header">
        <button @click="goBack" class="header-button">
          <img src="@/assets/go-back-icon.png" alt="뒤로 가기" class="header-icon" />
        </button>
        <h1 class="header-title">가게 정보</h1>
        <button @click="share" class="header-button">
          <img src="@/assets/share-icon.png" alt="공유하기" class="header-icon" />
        </button>
      </header>
  
      <section class="review-section">
        <div class="review-image">
          <img src="@/assets/sample-image.png" alt="리뷰 이미지" />
        </div>
        <div class="review-details">
          <div class="review-rating">
            <span class="rating">⭐ 0점</span>
          </div>
          <div class="review-comment">
            <p>리뷰 내용이 여기에 표시됩니다. 예시 텍스트입니다.</p>
          </div>
        </div>
      </section>
  
      <section class="comments-section">
        <h2>댓글 0</h2>
        <div class="no-comments">
          아직 등록된 댓글이 없습니다.
        </div>
      </section>
  
      <section class="places-section">
        <div class="place-item" v-for="place in places" :key="place.id">
          <div class="place-details">
            <h3>{{ place.name }}</h3>
            <p>{{ place.address }}</p>
          </div>
          <button class="write-review-button" @click="writeReview(place.id)">리뷰 작성하기</button>
        </div>
      </section>
  
      <footer class="footer">
        <button @click="addPlace" class="add-place-button">장소 추가하기</button>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        places: [
          {
            id: 1,
            name: '돈소우 부산대본점',
            address: '부산 금정구 장전동 419-21',
          },
          // 다른 장소 데이터 추가 가능
        ],
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      share() {
        // 공유 기능 구현
        alert('공유 기능을 구현하세요.');
      },
      writeReview(placeId) {
        // 리뷰 작성 페이지로 이동
        this.$router.push({ name: 'WriteReview', params: { id: placeId } });
      },
      addPlace() {
        // 장소 추가 페이지로 이동
        this.$router.push({ name: 'AddPlace' });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    font-family: 'Arial', sans-serif;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .header-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .header-icon {
    width: 24px;
    height: 24px;
  }
  
  .header-title {
    font-size: 20px;
    font-weight: bold;
  }
  
  .review-section {
    margin-top: 20px;
  }
  
  .review-image img {
    width: 100%;
    border-radius: 8px;
  }
  
  .review-details {
    margin-top: 10px;
  }
  
  .review-rating .rating {
    font-size: 16px;
    color: #ffcc00;
  }
  
  .review-comment p {
    font-size: 14px;
    color: #333;
  }
  
  .comments-section {
    margin-top: 20px;
  }
  
  .comments-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .no-comments {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
    color: #666;
  }
  
  .places-section {
    margin-top: 20px;
  }
  
  .place-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .place-details h3 {
    font-size: 16px;
    margin: 0;
  }
  
  .place-details p {
    font-size: 14px;
    color: #666;
    margin: 5px 0 0;
  }
  
  .write-review-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .footer {
    margin-top: 20px;
    text-align: center;
  }
  
  .add-place-button {
    background-color: #000;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 20px;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  