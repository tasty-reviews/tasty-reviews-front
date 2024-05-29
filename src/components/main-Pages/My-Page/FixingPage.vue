<template>
    <div class="fixing-container">
      <!-- 제목과 뒤로가기 버튼을 포함한 헤더 -->
      <div class="header">
        <button @click="changeComponent('MyPage')" class="image-button-wrapper">
          <img src="../../../images/GoBackButton.png" alt="Go Back" class="image-button"/>
        </button>
        <h1 class="page-title">내 정보 수정</h1>
      </div>
      <div class="divider"></div>
  
      <!-- 닉네임 변경 버튼 -->
      <button class="change-button" @click="changeComponent('NickChange')">닉네임 변경</button>
  
      <!-- 비밀번호 변경 버튼 -->
      <button class="change-button" @click="changeComponent('PassChange')">비밀번호 변경</button>
  
      <!-- 회원 탈퇴 버튼 -->
      <button class="delete-button" @click="deleteMember">회원 탈퇴</button>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['userId']) // Vuex 스토어에서 userId 가져오기
    },
    methods: {
      changeComponent(componentName) {
        this.$router.push({ name: componentName });
      },
      async deleteMember() {
        if (confirm('정말로 회원탈퇴 하시겠습니까?')) {
          try {
            // 쿠키에서 JWT 토큰 가져오기
            const access = document.cookie
                .split('; ')
                .find(row => row.startsWith('access='))
                .split('=')[1];

            const response = await fetch(`http://localhost:8080/mypage/${this.userId}/setting/delete`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'access': `${access}` // JWT 토큰을 포함
              },
              credentials: 'include' // 필요한 경우, 세션을 유지하기 위해 추가합니다.
            });
  
            if (response.ok) {
              alert('회원탈퇴가 완료되었습니다');
              this.$store.dispatch('logout'); // 로그아웃 액션 호출
              this.$router.push({ name: 'Main' }); // 회원탈퇴 후 홈 페이지로 리디렉션
            } else {
              const errorMessage = await response.text();
              alert('회원탈퇴에 실패했습니다: ' + errorMessage);
              console.error('회원탈퇴에 실패했습니다:', errorMessage);
            }
          } catch (error) {
            console.error('오류 발생:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Arial 폰트 적용 */
  body, .fixing-container, .page-title, .change-button, .delete-button {
    font-family: 'Arial', sans-serif;
  }
  
  /* 전체 레이아웃 스타일 */
  .fixing-container {
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
  
  /* 회원 탈퇴 버튼 스타일 */
  .delete-button {
    display: block;
    width: 200px;
    margin: 30px auto 0; /* 버튼 중앙 정렬 및 마진 추가 */
    padding: 10px 20px;
    background-color: #ff6b6b;
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
  