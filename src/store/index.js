// store/index.js

import { createStore } from 'vuex'; 
const store = createStore({
  state: {
    isLoggedIn: false // 로그인 상태 여부를 저장하는 변수
  },
  mutations: {
    // 로그인 상태를 변경하는 뮤테이션
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    }
  },
  actions: {
    // 로그인 상태를 변경하는 액션
    login({ commit }) {
      commit('setLoggedIn', true);
    },
    // 로그아웃 상태를 변경하는 액션
    logout({ commit }) {
      commit('setLoggedIn', false);
    }
  }
});

export default store;
