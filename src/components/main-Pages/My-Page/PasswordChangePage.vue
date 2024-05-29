<template>
    <div class="password-change-container">
      <!-- 헤더 -->
      <div class="header">
        <button @click="changeComponent('Fixing')" class="image-button-wrapper">
          <img src="../../../images/GoBackButton.png" alt="Go Back" class="image-button"/>
        </button>
        <h1 class="page-title">비밀번호 변경</h1>
      </div>
      <div class="divider"></div>
  
      <!-- 현재 비밀번호 입력창 -->
      <div class="input-group">
        <label for="current-password">현재 비밀번호</label>
        <input type="password" id="current-password" v-model="currentPassword" placeholder="현재 비밀번호를 입력하세요" />
      </div>
  
      <!-- 새로운 비밀번호 입력창 -->
      <div class="input-group">
        <label for="new-password">새 비밀번호</label>
        <input type="password" id="new-password" v-model="newPassword" placeholder="새 비밀번호를 입력하세요" />
      </div>
  
      <!-- 변경하기 버튼 -->
      <button class="change-button" @click="changePassword">변경하기</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  //import { mapState } from 'vuex';
  export default {
    data() {
      return {
        currentPassword: '',
        newPassword: ''
      };
    },
    methods: {
      changeComponent(componentName) {
      this.$router.push({ name: componentName });
      },
      async changePassword() {
        //비밀번호가 입력되었는지 확인
        if (this.currentPassword.trim() === '' && this.newPassword.trim() === '') {
            alert('비밀번호를 입력하세요.');
            return;
        }

        try {
          // 서버에 닉네임 변경 요청
          const requestData = {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          };
  
          // 쿠키에서 JWT 토큰 가져오기
          const access = document.cookie
            .split('; ')
            .find(row => row.startsWith('access='))
            .split('=')[1];
  
          // JWT 토큰을 헤더에 포함하여 요청 보내기
          await axios.patch(`http://localhost:8080/mypage/setting/password`, requestData, {
            headers: {
              'Content-Type': 'application/json',
              'access': `${access}` // JWT 토큰을 포함
            }
          });
  
          alert('비밀번호가 성공적으로 변경되었습니다.');
          this.$router.push({ name: 'MyPage' });

        } catch (error) {
          console.error(error);
          alert('비밀번호 변경에 실패했습니다.\n비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Arial 폰트 적용 */
  body, .password-change-container, .page-title, .input-group, .change-button {
    font-family: 'Arial', sans-serif;
  }
  
  /* 전체 레이아웃 스타일 */
  .password-change-container {
    max-width: 800px;
    margin: 0 auto; /* 중앙 정렬 */
    padding-top: 50px;
    text-align: center; /* 텍스트 중앙 정렬 */
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
    width: 30px; /* 동일한 크기 */
    height: 30px; /* 동일한 크기 */
    border: none; /* 기존의 테두리 제거 */
    background-color: white; /* 배경색을 흰색으로 설정 */
    cursor: pointer; /* 커서 변경 */
    margin-bottom: 20px;
  }
  
  /* 제목 스타일 */
  .page-title {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 10px; /* 제목 아래 마진 추가 */
    }
  
  /* 입력 그룹 스타일 */
  .input-group {
    margin-bottom: 15px;
    text-align: left; /* 레이블과 입력창을 왼쪽 정렬 */
    margin: 0 auto; /* 중앙 정렬 */
    max-width: 300px; /* 입력 그룹의 최대 너비 설정 */
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .input-group input {
    margin-bottom: 15px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  /* 변경 버튼 스타일 */
  .change-button {
    display: block;
    width: 200px;
    margin: 30px auto 0; /* 버튼 중앙 정렬 및 마진 추가 */
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .divider {
    border-top: 1px solid rgb(172, 172, 172); /* 검은 가로줄 스타일 */
    margin-bottom: 15px;
    padding: 0;
    box-sizing: border-box;
  }
  </style>
  