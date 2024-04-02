<template>
    <div class="signup-container">
      <form @submit.prevent="register" class="signup-form">
        <h2 style="margin-bottom: 15px;">회원가입</h2>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" required placeholder="이메일을 입력하세요.">
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" required placeholder="비밀번호를 입력하세요."> 
        </div>
        <div class="form-group">
          <label for="confirm-password">비밀번호 확인</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required placeholder="비밀번호를 다시 입력하세요."> 
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="nickname" required placeholder="닉네임을 입력하세요."> 
        </div>
        <div class="form-group">
          <label for="age">나이대</label>
          <select id="age" v-model="age" required>
            <option value="">선택하세요</option>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <!-- 추가적인 옵션을 필요에 따라 추가하세요 -->
          </select>
        </div>
        <div class="form-group">
          <label for="gender">성별</label>
          <select id="gender" v-model="gender" required>
            <option value="">선택하세요</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <!-- 추가적인 옵션을 필요에 따라 추가하세요 -->
          </select>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        age: '',
        gender: ''
      };
    },
    methods: {
      register() {
        // 여기에 회원가입 로직을 구현하세요.
        // 입력된 정보는 this.email, this.password 등에 저장됩니다.
        console.log('이메일:', this.email);
        console.log('비밀번호:', this.password);
        console.log('비밀번호 확인:', this.confirmPassword);
        console.log('닉네임:', this.nickname);
        console.log('나이대:', this.age);
        console.log('성별:', this.gender);
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .signup-form {
  width: 80%; /* 전체 가로 사이즈의 80% */
  max-width: 300px; /* 최대 너비 설정 */
  }

  h2,label {
  display: block;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  }
  
  select{
    height: 30px;  
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
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
  