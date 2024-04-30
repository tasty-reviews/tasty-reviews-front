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
        <label for="age">나이</label>
        <input type="text" id="age" v-model="age" required placeholder="나이를 입력하세요."> 
      </div>
      <div class="form-group">
        <label for="gender">성별</label>
        <div>
          <label for="male" class="radio-label">
            <input type="radio" id="male" value="MALE" v-model="gender" required>&ensp;남성
          </label>
        </div>
        <div>
          <label for="female" class="radio-label">
            <input type="radio" id="female" value="FEMALE" v-model="gender" required>&ensp;여성
          </label>
        </div>
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
    async register() {
      const createMemberDTO = {
        email: this.email,
        password: this.password,
        nickname: this.nickname,
        age: this.age,
        gender: this.gender
      };

      try {
        const response = await fetch('http://localhost:8080/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(createMemberDTO)
        });

        if (response.ok) {
          alert('회원가입이 완료되었습니다.');
          console.log('회원가입이 완료되었습니다.');
          window.history.back();

          // 회원가입 성공 시 추가 작업 수행
        } else {
          console.error('회원가입에 실패했습니다.');
          // 회원가입 실패 시 추가 작업 수행
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
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
select {
  height: 30px;  
}
.form-group {
  margin-bottom: 15px;
}
.form-group div {
  display: inline-block; /* 라디오 버튼을 한 줄에 표시 */
  margin-right: 100px; /* 각 라디오 버튼 사이의 간격 설정 */
}
.radio-label {
  font-weight: normal; /* 기본 폰트 굵기로 변경 */
  color: black; /* 텍스트 색상을 검정색으로 변경 */
  /* 추가적인 스타일을 필요에 따라 지정할 수 있습니다. */
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
