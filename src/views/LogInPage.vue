<template>
  <div class="login-container">
    <div class="login-form">
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="text" id="email" v-model="email" required placeholder="이메일을 입력하세요.">
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" required placeholder="비밀번호를 입력하세요."> 
        </div>
        <div class="form-group">
          <router-link to="/signup" class="sign-up">회원가입</router-link>
          <label class="find-pass" @click="goToFindPassword">비밀번호 찾기</label>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    goToFindPassword() {
      // 비밀번호 찾기 페이지로 이동하는 함수
      console.log('비밀번호 찾기 페이지로 이동');
    },
    login() {
      // 여기에 로그인 로직을 구현하세요.
      // 사용자 이름과 비밀번호는 this.username 및 this.password에 저장됩니다.
      console.log('이메일 :', this.email);
      console.log('비밀번호 :', this.password);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

h2,label {
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

.sign-up {
  float: inline-start;
  display: block;
  font-family: 'Arial', sans-serif;
  margin: 10px;
  font-size: 12px; /* 작은 폰트 사이즈 */
  color: #666; /* 연한 회색 */
}

label.find-pass{
  float: inline-end;
  display: block;
  font-family: 'Arial', sans-serif;
  margin: 10px;
  font-size: 12px; /* 작은 폰트 사이즈 */
  color: #666; /* 연한 회색 */
}
</style>
