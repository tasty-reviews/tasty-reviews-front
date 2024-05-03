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
          <router-link to="/find-password" class="find-pass">비밀번호 찾기</router-link>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // axios import
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn']) // Vuex 스토어의 isLoggedIn 상태를 컴포넌트 내부에 매핑
    },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json' // JSON 형식으로 요청
          },
          withCredentials: true // CORS 문제 해결을 위해 withCredentials 설정 추가
        });

        if (response.status === 200) { // 로그인이 성공하면
          alert('로그인 성공');
          // Vuex 스토어의 isLoggedIn 상태를 변경
          this.$store.commit('setLoggedIn', true);
        // 서버에서 받은 JWT 토큰 저장
        let jwtToken = response.headers['authorization']; // access토큰 값
        // 쿠키에 jwtToken 저장
        document.cookie = `jwtToken=${jwtToken}; path=/`;

          this.$router.push("/"); // 메인 페이지로 이동
        } else {
          alert('로그인 실패');
          // 로그인 실패 후의 동작 추가
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
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

.find-pass{
  float: inline-end;
  display: block;
  font-family: 'Arial', sans-serif;
  margin: 10px;
  font-size: 12px; /* 작은 폰트 사이즈 */
  color: #666; /* 연한 회색 */
}
.find-pass:hover {
  text-decoration: underline; /* 마우스 오버 시 밑줄 표시 */
}
</style>
