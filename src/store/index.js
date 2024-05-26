import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false, // 로그인 상태 여부를 저장하는 변수
    selectedSubRegion: null, // 선택된 하위 지역을 저장하는 변수
    enteredSearchWord: null, // 검색창에서 검색한 단어
    currentLocation: null, // 현재 위치를 저장하는 변수
    stores: [] // 가게 정보를 저장하는 배열
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setSelectedSubRegion(state, subRegion) {
      state.selectedSubRegion = subRegion;
    },
    setSearchWord(state, searchWord) {
      state.enteredSearchWord = searchWord;
    },
    setCurrentLocation(state, location) {
      state.currentLocation = location;
    },
    // 가게 정보를 변경하는 뮤테이션
    setStores(state, stores) {
      state.stores = stores;
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
    // 가게 정보를 변경하는 액션
    updateStores({ commit }, stores) {
      commit('setStores', stores);
    }
  }
});

export default store;