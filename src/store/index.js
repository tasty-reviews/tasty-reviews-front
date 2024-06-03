import { createStore } from 'vuex';
import Cookies from 'js-cookie';

const store = createStore({
  state: {
    isLoggedIn: false,
    selectedSubRegion: null,
    enteredSearchWord: null,
    currentLocation: null,
    stores: [],
    userId: null,
    nickname: null // 닉네임 상태 추가
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setSelectedSubRegion(state, subRegion) {
      state.selectedSubRegion = subRegion;
      state.enteredSearchWord = null;
    },
    setSearchWord(state, searchWord) {
      state.enteredSearchWord = searchWord;
    },
    setCurrentLocation(state, location) {
      state.currentLocation = location;
      state.enteredSearchWord = null;
      state.selectedSubRegion = null;
    },
    setStores(state, stores) {
      state.stores = stores;
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setNickname(state, nickname) {
      state.nickname = nickname; // 닉네임 설정
    }
  },
  actions: {
    login({ commit }, { id, nickname }) {
      commit('setLoggedIn', true);
      commit('setUserId', id);
      commit('setNickname', nickname); // 로그인 시 닉네임 설정
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setUserId', null);
      commit('setNickname', null); // 로그아웃 시 닉네임 제거
    },
    selectSubRegion({ commit }, subRegion) {
      commit('setSelectedSubRegion', subRegion);
    },
    doSearch({ commit }, searchWord) {
      commit('setSearchWord', searchWord);
    },
    updateCurrentLocation({ commit }, location) {
      commit('setCurrentLocation', location);
    },
    updateStores({ commit }, stores) {
      commit('setStores', stores);
    },
    updateNickname({ commit }, nickname) {
      commit('setNickname', nickname); // 닉네임 업데이트 액션
    },
    checkCookie({ commit }) {
      const refreshToken = Cookies.get('refresh');
      if (!refreshToken) {
        commit('setLoggedIn', false);
        commit('setUserId', null);
        commit('setNickname', null);
      }
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    nickname: state => state.nickname // 닉네임 가져오기
  }
});

export default store;
