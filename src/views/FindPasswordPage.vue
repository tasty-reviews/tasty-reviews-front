<template>
    <div class="find-password-container">
      <div class="find-password-form">
        <h2>비밀번호 찾기</h2>
        <form @submit.prevent="findPassword">
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="email" required placeholder="가입한 이메일을 입력하세요.">
          </div>
          <button type="submit">비밀번호 재설정 링크 보내기</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '', // 사용자가 입력하는 이메일 주소
      };
    },
    methods: {
      findPassword() {
        // 비밀번호 찾기 로직 구현
        console.log('비밀번호 재설정 링크를 요청한 이메일:', this.email);
        // 여기에서 백엔드로 이메일 주소를 보내어 비밀번호 재설정 링크를 이메일로 보내는 요청을 처리할 수 있습니다.
      }
    }
  };
  </script>
  
  <style scoped>
  .find-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .find-password-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  h2, label {
    display: block;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  