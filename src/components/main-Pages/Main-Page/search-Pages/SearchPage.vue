<template>
    <div class="S-main-form">
        <button @click="changeComponent('Main')" class="image-button-wrapper">
            <img src="../../../../images/GoBackButton.png" alt="Search" class="image-button"/>
        </button>
        <input class="serch-box2" placeholder="&nbsp;&nbsp;지역이나 음식점을 검색하세요." @keyup.enter="search" autofocus/>
    </div>
    <div class="S-main-form">
        <h2 class="S-location"> &nbsp;&nbsp;지역 선택 </h2>
    </div>
    <div class="S-main-form select-region">
        <SelectRegion/>
    </div>
</template>

<script>
import SelectRegion from './SelectRegion.vue';
import { mapState} from 'vuex'; // Vuex에서 mutations를 사용하기 위해 import

export default {
    
    computed: {
        ...mapState(['enteredSearchWord']) // selectedSubRegion 상태를 컴포넌트의 computed 속성으로 매핑
    },
    components: {
            SelectRegion
        },

    methods: {
        changeComponent(componentName) {
            this.$router.push({ name: componentName });
        },
        search(event) {
             // 엔터를 눌렀을 때 검색어가 입력되었는지 확인
             const searchWord = event.target.value.trim(); // 입력된 검색어
            this.Enterthesearch(searchWord);
        },
        Enterthesearch(searchWord){
            this.$store.dispatch('doSearch',searchWord);
            this.$router.push({ name: "Main" });
        }
    }

    }
</script>

<style>
    .S-main-form {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding: 0;
        box-sizing: border-box;
    }
    .serch-box2{
        margin-top: 15px;
        width: 90%;
        height: 40px;
        font-size: 20px;
        display: flex;
        float: right;
        justify-content: center;
        border-radius: 8px; /* 모서리를 둥글게 만듦 */
        border: none; /* 기존의 테두리 제거 */
        background-color: white; /* 배경색을 흰색으로 설정 */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
        outline: none; /* 마우스 클릭 시 파란 테두리 제거 */
        padding-left: 10px; /* 왼쪽에 여백 추가 */
    }
    .image-button-wrapper{
        margin-right: 10px;
        width: 20px;    
        height: 20px;
        border: none; /* 기존의 테두리 제거 */
        background-color: white; /* 배경색을 흰색으로 설정 */
        cursor: pointer; /* 커서 변경 */
    }
    .image-button{
        margin-top: 10px;
        width: 20px;    
        height: 20px;
    }
    .S-location {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px; /* 텍스트의 폰트 사이즈를 조정하세요 */
        font-family: Arial, sans-serif;
        font-weight: 600;
    }
    .select-region {
        width: 100%; /* 부모 요소의 전체 너비 사용 */
        justify-content: space-between; /* 두 개의 SelectRegion 컴포넌트를 양 끝에 배치 */
    }
    .select-region > * {
        flex: 1; /* 두 개의 SelectRegion 컴포넌트가 동일한 너비를 차지하도록 설정 */
    }
</style>