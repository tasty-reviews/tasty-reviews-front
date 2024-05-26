<template>
  <div class="signup-container">
    <form @submit.prevent="register" class="signup-form">
      <h2 style="margin-bottom: 15px;">회원가입</h2>
      <div class="form-group">
        <label for="email">이메일</label>
        <div class="email-group">
          <input class="signup-input" type="email" id="email" v-model="email" required placeholder="이메일을 입력하세요.">
          <button class="e-button" type="button" @click="sendVerificationCode">인증번호 전송</button>
        </div>
      </div>
      <div class="form-group">
        <label for="verification-code">인증번호</label>
        <div class="email-group">
          <input class="signup-input" type="text" id="verification-code" v-model="verificationCode" required placeholder="인증번호를 입력하세요.">
          <button class="e-button" type="button" @click="verifyCode">인증번호 확인</button>
        </div>
        <div class="email-group">
          <input class="signup-input" type="email" id="email" v-model="email" required placeholder="이메일을 입력하세요.">
          <button class="e-button" type="button" @click="sendVerificationCode">인증번호 전송</button>
        </div>
      </div>
      <div class="form-group">
        <label for="verification-code">인증번호</label>
        <div class="email-group">
          <input class="signup-input" type="text" id="verification-code" v-model="verificationCode" required placeholder="인증번호를 입력하세요.">
          <button class="e-button" type="button" @click="verifyCode">인증번호 확인</button>
        </div>
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input class="signup-input" type="password" id="password" v-model="password" required placeholder="비밀번호를 입력하세요."> 
      </div>
      <div class="form-group">
        <label for="confirm-password">비밀번호 확인</label>
        <input class="signup-input" type="password" id="confirm-password" v-model="confirmPassword" required placeholder="비밀번호를 다시 입력하세요."> 
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input class="signup-input" type="text" id="nickname" v-model="nickname" required placeholder="닉네임을 입력하세요."> 
      </div>
      <div class="form-group">
        <label for="age">나이</label>
        <input class="signup-input" type="text" id="age" v-model="age" required placeholder="나이를 입력하세요."> 
      </div>
      <div class="form-group">
        <label for="gender">성별</label>
        <div class="radio-group">
        <div class="radio-group">
          <label for="male" class="radio-label">
            <input class="signup-input" type="radio" id="male" value="MALE" v-model="gender" required>&ensp;남성
          </label>
          <label for="female" class="radio-label">
            <input class="signup-input" type="radio" id="female" value="FEMALE" v-model="gender" required>&ensp;여성
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
      gender: '',
      verificationCode: ''
    };
  },
  methods: {
    async register() {
      if (!this.isVerified) {
        alert('이메일 인증이 완료되지 않았습니다.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

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
        } else if(response.status == 409){
          const errorMessage = await response.text();
          alert(errorMessage);
          const errorMessage = await response.text();
          alert(errorMessage);
          console.error('회원가입에 실패했습니다.');
        }else if(response.status == 403){
          alert('비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    async sendVerificationCode() {
      try {
        const response = await fetch('http://localhost:8080/auth-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authCode: this.email }),
          withCredentials: true // CORS 문제 해결을 위해 withCredentials 설정 추가
        });

        if (response.ok) {
          alert('인증 번호를 전송하였습니다. 이메일을 확인하세요.');
        } else if(response.status === 409){
          console.error('인증 번호 전송에 실패했습니다.');
        } else {
          alert('인증 번호 전송에 실패했습니다.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    },
    async verifyCode() {
      try {

        const response = await fetch('http://localhost:8080/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authCode: this.verificationCode })
        });

        if (response.ok) {
          alert('이메일 인증이 완료되었습니다.');
        } else {
          const errorMessage = await response.text(); // 오류 메시지를 읽어옴
          alert('인증 번호가 일치하지 않습니다.');
          console.error('서버에서 반환한 오류 메시지:', errorMessage); // 오류 메시지를 콘솔에 출력
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
  width: 80%;
  max-width: 300px;
  width: 80%;
  max-width: 300px;
}
.signup-input {
  outline: none;
.signup-input {
  outline: none;
}
.signup-input:focus {
  border: 1px solid black;
  border: 1px solid black;
}
h2, label {
h2, label {
  display: block;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}
select {
  height: 30px;
  height: 30px;
}
.form-group {
  margin-bottom: 15px;
}
.email-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.email-group input {
  flex: 1;
}
.email-group button {
  width: 30%;
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.email-group button:hover {
  background-color: #0056b3;
}
.radio-group {
  display: flex;
  align-items: center;
}
.radio-group label {
  margin-right: 70px;
.email-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.email-group input {
  flex: 1;
}
.email-group button {
  width: 30%;
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.email-group button:hover {
  background-color: #0056b3;
}
.radio-group {
  display: flex;
  align-items: center;
}
.radio-group label {
  margin-right: 70px;
}
.radio-label {
  font-weight: normal;
  color: black;
  font-weight: normal;
  color: black;
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
