<template>
    <div class="nickname-change-container">
      <!-- 제목 -->
      <div class="header">
        <button @click="changeComponent('Fixing')" class="image-button-wrapper">
          <img src="../../../images/GoBackButton.png" alt="Go Back" class="image-button"/>
        </button>
        <h1 class="page-title">닉네임 변경</h1>
      </div>
      <div class="divider"></div>
  
      <!-- 현재 닉네임 -->
      <div class="current-nickname">
        <label>현재 닉네임: {{ nickname }}</label>
      </div>
      <div class="divider"></div>
  
      <!-- 수정할 닉네임 입력 -->
      <div class="nickname-edit">
        <label for="new-nickname">수정할 닉네임</label>
        <input type="text" id="new-nickname" v-model="newNickname" placeholder="새 닉네임을 입력하세요"/>
      </div>
      <div class="divider"></div>
  
      <!-- 적용 버튼 -->
      <button class="apply-button" @click="applyNicknameChange">적용</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['userId', 'nickname']) // Vuex 스토어의 userId와 nickname 상태를 컴포넌트에 매핑
    },
    data() {
      return {
        newNickname: ''
      };
    },
    methods: {
      changeComponent(componentName) {
        this.$router.push({ name: componentName });
      },
      async applyNicknameChange() {
        // 새 닉네임이 입력되었는지 확인
        if (this.newNickname.trim() === '') {
          alert('새 닉네임을 입력하세요.');
          return;
        }
  
        try {
          // 서버에 닉네임 변경 요청
          const userId = this.userId;
          const requestData = {
            nickName: this.newNickname
          };
  
          // 쿠키에서 JWT 토큰 가져오기
          const access = document.cookie
            .split('; ')
            .find(row => row.startsWith('access='))
            .split('=')[1];
  
          // JWT 토큰을 헤더에 포함하여 요청 보내기
          await axios.patch(`http://localhost:8080/mypage/${userId}/setting/nickname`, requestData, {
            headers: {
              'Content-Type': 'application/json',
              'access': `${access}` // JWT 토큰을 포함
            }
          });
  
          alert('닉네임이 성공적으로 변경되었습니다.');
          this.$router.push({ name: 'MyPage' });
          
          // Vuex 스토어의 nickname 상태를 업데이트
          this.$store.dispatch('updateNickname', this.newNickname);
  
          // 입력 필드 초기화
          this.newNickname = '';
        } catch (error) {
          console.error(error);
          alert('닉네임 변경에 실패했습니다.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Arial 폰트 적용 */
  body, .nickname-change-container, .page-title, .current-nickname, .nickname-edit, .apply-button {
    font-family: 'Arial', sans-serif;
  }
  
  /* 헤더 스타일 */
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
  }
  
  .image-button-wrapper {
    position: absolute;
    left: 0;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    cursor: pointer; /* 커서 변경 */
    margin-bottom: 20px;
  }
  
  /* 변경 버튼 스타일 */
  .change-button {
    display: block;
    width: 200px;
    margin: 10px auto; /* 버튼 중앙 정렬 및 마진 추가 */
    padding: 10px 20px;
    background-color: #eeeeee;
    color: #313131;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  /* 전체 레이아웃 스타일 */
  .nickname-change-container {
    max-width: 800px;
    margin: 0 auto; /* 중앙 정렬 */
    padding-top: 50px;
    text-align: center; /* 텍스트 중앙 정렬 */
  }
  
  /* 제목 스타일 */
  .page-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px; /* 제목 아래 마진 추가 */
  }
  
  /* 현재 닉네임 스타일 */
  .current-nickname {
    font-size: 18px;
    margin-bottom: 20px; /* 닉네임 아래 마진 추가 */
  }
  
  /* 닉네임 수정 스타일 */
  .nickname-edit {
    margin-bottom: 20px; /* 수정할 닉네임 아래 마진 추가 */
  }
  
  .nickname-edit label {
    font-size: 16px;
    display: block;
    margin-bottom: 5px;
  }
  
  .nickname-edit input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  /* 적용 버튼 스타일 */
  .apply-button {
    display: block;
    width: 200px;
    margin: 0 auto; /* 버튼 중앙 정렬 */
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .apply-button:hover {
    background-color: #45a049;
  }
  
  .divider {
    border-top: 1px solid rgb(172, 172, 172); /* 검은 가로줄 스타일 */
    margin-bottom: 15px;
    padding: 0;
    box-sizing: border-box;
  }
  </style>
  