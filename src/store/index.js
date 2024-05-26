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
    // 로그인 상태를 변경하는 뮤테이션
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    // 선택된 하위 지역을 변경하는 뮤테이션
    setSelectedSubRegion(state, subRegion) {
      state.selectedSubRegion = subRegion;
    },
    // 검색한 단어를 변경하는 뮤테이션
    setSearchWord(state, searchWord) {
      state.enteredSearchWord = searchWord;
    },
    // 현재 위치를 변경하는 뮤테이션
    setCurrentLocation(state, location) {
      state.currentLocation = location;
    },
    // 가게 정보를 변경하는 뮤테이션
    setStores(state, stores) {
      state.stores = stores;
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
    },
    // 선택된 하위 지역을 변경하는 액션
    selectSubRegion({ commit }, subRegion) {
      commit('setSelectedSubRegion', subRegion);
    },
    // 입력된 검색어를 변경하는 액션
    doSearch({ commit }, searchWord) {
      commit('setSearchWord', searchWord);
    },
    // 현재 위치를 변경하는 액션
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