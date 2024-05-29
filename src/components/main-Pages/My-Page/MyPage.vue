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

    <!-- 나의 리뷰 목록 -->
    <div class="review-list" v-if="user && user.reviews">
      <div class="divider"></div>
      <h2 class="section-title">나의 리뷰 목록</h2>
      <div class="divider"></div>

      <!-- 리뷰 항목들 -->
      <div v-for="review in user.reviews" :key="review.store.name" class="review-item">
        <div class="review-header">
          <div>
            <div class="store-name">{{ review.store.name }}</div>
            <div class="rating">별점: {{ review.rating }}</div>
          </div>
          <button class="delete-button" @click="deleteReview(review)">삭제</button>
        </div>
        <div class="review-content">{{ review.content }}</div>
        <div class="review-photo" v-if="review.photo">
          <img :src="review.photo" alt="리뷰 사진" />
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
      user: null
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
        }
      }
    }
  },
  created() {
    if (this.userId) {
      this.fetchUserData(this.userId);
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
    deleteReview(review) {
      this.user.reviews = this.user.reviews.filter(r => r !== review);
    },
    changeComponent(componentName) {
      this.$router.push({ name: componentName });
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

/* 리뷰 아이템 스타일 */
.review-item {
  margin-top: 20px;
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
}

/* 리뷰 내용 스타일 */
.review-content {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

/* 리뷰 사진 스타일 */
.review-photo img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.divider {
  border-top: 1px solid rgb(172, 172, 172); /* 검은 가로줄 스타일 */
  margin-bottom: 15px;
  padding: 0;
  box-sizing: border-box;
}
</style>
