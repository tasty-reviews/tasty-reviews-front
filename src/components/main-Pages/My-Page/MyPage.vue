<template>
  <div class="mypage-container">
    <!-- 제목 -->
    <h1 class="page-title">마이 페이지</h1>
    <div class="divider"></div>

    <!-- 사용자 정보 -->
    <div class="user-info" v-if="user">
      <div class="nickname-edit">
        <label class="nickname">{{ user.nickname }}</label>
        <div class="button-group">
          <button class="edit-button" @click="changeComponent('Fixing')">수정하기</button>
        </div>
      </div>
      <div class="email-logout">
        <div class="email">{{ user.email }}</div>
        <button class="logout-button" @click="logout">로그아웃</button>
      </div>
    </div>
    <div class="divider"></div>
    <h2 class="section-title">나의 리뷰 목록</h2>
    <div class="divider"></div>
    <!-- 나의 리뷰 목록 -->
    <div class="review-list-container">
      <div class="review-list" v-if="reviews && reviews.length">
        <!-- 리뷰 항목들 -->
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <div>
              <div class="store-name">{{ review.restaurantName }}</div>
              <div class="rating">별점: {{ review.rating }}</div>
            </div>
            <div class="button-group">
              <button class="edit-button" @click="editReview(review.placeId,review.id)">수정</button>
              <button class="delete-button" @click="deleteReview(review.id)">삭제</button>
            </div>
          </div>
          <div class="review-content">{{ review.comment }}</div>
          <div class="review-photo" v-if="review.images && review.images.length">
            <img :src="getEncodedImageUrl(review.images[0].storedFileName)" alt="리뷰 이미지" class="review-image">
          </div>
        </div>
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
      user: null,
      reviews: [], // 리뷰 데이터를 저장할 배열
      editingReview: null, // 수정 중인 리뷰 데이터를 저장할 객체
      editModalVisible: false, // 수정 모달의 가시성을 조절하는 변수
    };
  },
  computed: {
    ...mapState(['userId']) // Vuex 스토어의 userId 상태를 컴포넌트에 매핑
  },
  watch: {
    userId: {
      immediate: true,
      handler(newUserId) {
        if (newUserId) {
          this.fetchUserData(newUserId);
          this.fetchUserReviews(newUserId); // 리뷰 데이터를 가져오는 메서드 호출
        }
      }
    }
  },
  created() {
    if (this.userId) {
      this.fetchUserData(this.userId);
      this.fetchUserReviews(this.userId); // 리뷰 데이터를 가져오는 메서드 호출
    }
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const access = document.cookie
          .split('; ')
          .find(row => row.startsWith('access='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/mypage/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'access': `${access}` // JWT 토큰을 포함
          },
          withCredentials: true // CORS 문제 해결을 위해 withCredentials 설정 추가
        });

        if (response.status === 200) {
          this.user = response.data;
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    async fetchUserReviews() {
      try {
        const access = document.cookie
          .split('; ')
          .find(row => row.startsWith('access='))
          .split('=')[1];
        const response = await axios.get(`http://localhost:8080/api/members/reviews`, {
          headers: {
            'Content-Type': 'application/json',
            'access': `${access}` // JWT 토큰을 포함
          },
          withCredentials: true // CORS 문제 해결을 위해 withCredentials 설정 추가
        });

        if (response.status === 200) {
          this.reviews = response.data;
        } else {
          console.error('Failed to fetch user reviews');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    deleteReview(reviewId) {
      try {
        const access = document.cookie
          .split('; ')
          .find(row => row.startsWith('access='))
          .split('=')[1];
      axios.delete(`http://localhost:8080/api/reviews/${reviewId}`, {
          headers: {
            'Content-Type': 'application/json',
            'access': `${access}` // JWT 토큰을 포함
          },
          withCredentials: true // CORS 문제 해결을 위해 withCredentials 설정 추가
        })
        .then(response => {
          if (response.status === 204) {
            // 삭제 요청이 성공하면 리뷰 목록에서 해당 리뷰를 제거합니다.
            this.reviews = this.reviews.filter(r => r.id !== reviewId);
            console.log('리뷰가 삭제되었습니다.');
          } else {
            console.error('Failed to delete review');
          }
        })
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    async editReview(storeId, reviewId) {
      console.log(storeId,reviewId);
      try {
        // storeId와 reviewId를 이용하여 리뷰 수정 페이지로 이동합니다.
        this.$router.push({ name: 'EditReview', params: { storeId: storeId, reviewId: reviewId } });
      } catch (error) {
        console.error('리뷰 수정 페이지로 이동 중 오류가 발생했습니다:', error);
      }
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:8080/logout', {}, {
          withCredentials: true // 쿠키를 포함하기 위해 withCredentials 설정
        });

        if (response.status === 200) {
          // 로그아웃 성공, 홈 페이지로 리디렉션
          this.$router.push({ name: 'Main' });
          alert('로그아웃 되었습니다.');
        } else {
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    changeComponent(componentName) {
      this.$router.push({ name: componentName });
    },
    // 이미지 URL 인코딩
    getEncodedImageUrl(fileName) {
      return `http://localhost:8080/api/reviews/image/${encodeURIComponent(fileName)}`;
    }
  }
};
</script>

<style scoped>
/* Arial 폰트 적용 */
body, .mypage-container, .page-title, .nickname, .edit-button, .email, .section-title, .review-item {
  font-family: 'Arial', sans-serif;
}

/* 전체 레이아웃 스타일 */
.mypage-container {
  max-width: 800px;
  padding-top: 10px;
}

/* 제목 스타일 */
.page-title {
  font-size: 25px;
  font-weight: bold;
  text-align: center; /* 중앙 정렬 추가 */
  margin-bottom: 20px; /* 제목 아래 마진 추가 */
}

/* 사용자 정보 섹션 스타일 */
.user-info {
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

/* 닉네임과 수정하기 버튼이 같은 줄에 위치하도록 설정 */
.nickname-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 이메일과 로그아웃 버튼이 같은 줄에 위치하도록 설정 */
.email-logout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 부모 요소의 전체 너비 사용 */
}

/* 닉네임 스타일 */
.nickname {
  font-size: 18px;
  font-weight: bold;
}

/* 이메일 스타일 */
.email {
  font-size: 16px;
  color: #666;
}

/* 수정하기 버튼과 로그아웃 버튼이 같은 줄에 위치하도록 설정 */
.button-group {
  display: flex;
  gap: 10px;
}

/* 수정하기 버튼 스타일 */
.edit-button, .logout-button {
  padding: 5px 10px;
  background-color: #eeeeee;
  color: #313131;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
.edit-button{
  margin-bottom: 10px;
}

/* 로그아웃 버튼 스타일 */
.logout-button {
  margin-left: auto; /* 로그아웃 버튼을 오른쪽으로 정렬 */
}

/* 섹션 제목 스타일 */
.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px; /* 섹션 제목 아래 마진 추가 */
}

/* 리뷰 목록 컨테이너 스타일 */
.review-list-container {
  max-height: 75vh; /* 최대 높이를 창의 높이의 80%로 설정 */
  overflow-y: auto; /* 스크롤이 필요한 경우만 스크롤 표시 */
  padding: 5px; /* 추가된 패딩 */
  box-sizing: border-box; /* 패딩 포함 박스 크기 계산 */
}

.review-list-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge에서 스크롤바 숨김 */
}

/* 리뷰 아이템 스타일 */
.review-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 리뷰 헤더 스타일 */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

/* 가게 이름 스타일 */
.store-name {
  font-size: 16px;
  font-weight: bold;
}

/* 별점 스타일 */
.rating {
  font-size: 14px;
  color: #f39c12;
  margin-top: 5px; /* 가게 이름 아래 마진 추가 */
}

/* 삭제 버튼 스타일 */
.delete-button {
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-start; /* 삭제 버튼을 상단에 정렬 */
}

/* 리뷰 내용 스타일 */
.review-content {

font-size: 14px;
margin-bottom: 10px; /* 리뷰 내용 아래 마진 추가 */
}

/* 리뷰 사진 스타일 */
.review-photo {
text-align: center; /* 사진을 가운데 정렬 */
}

.review-photo img {
max-width: 100%;
height: auto;
border-radius: 8px;
}

/* 구분선 스타일 */
.divider {
margin: 20px 0;
border-top: 1px solid #ddd;
}

/* 수정 버튼 스타일 */
.edit-button {
  padding: 5px 10px;
  background-color: #80bfff; /* 수정 버튼 색상 지정 */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-start; /* 수정 버튼을 상단에 정렬 */
}
</style>
