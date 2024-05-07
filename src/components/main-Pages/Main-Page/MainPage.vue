<template>
    <div class="main-form">
        <input class="serch" placeholder="&nbsp;&nbsp;지역이나 음식점을 검색하세요.">
    </div>
    <div class="main-form">
        <span class="location">부산 남구 대연동</span>
        <button class="btn">지역 선택 ></button>
    </div>
    <div class="main-form">
        <span class="text">내 주위 맛집</span>
    </div>
        <div class="divider"></div>
    <div class="main-form">
        <StoreComp/>
    </div>

    
</template>
    
<script>
import StoreComp from './StoreComp.vue';

export default {
        components: {
            StoreComp
        }

    }
</script>

<style>
    .main-form {
        margin-bottom: 15px;
        padding: 0;
        box-sizing: border-box;
    }
    .serch{
        width: 90%;
        height: 40px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        border-radius: 8px; /* 모서리를 둥글게 만듦 */
        border: none; /* 기존의 테두리 제거 */
        background-color: white; /* 배경색을 흰색으로 설정 */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
        outline: none; /* 마우스 클릭 시 파란 테두리 제거 */
    }
    .location {
        font-size: 20px; /* 텍스트의 폰트 사이즈를 조정하세요 */
        font-family: Arial, sans-serif;
        font-weight: 600;
    }
    .text {
        font-size: 15px; /* 텍스트의 폰트 사이즈를 조정하세요 */
        font-family: Arial, sans-serif;
    }
    .btn{
        font-size: 15px;
        float: right;
    }
    .divider {
        border-top: 1px solid rgb(172, 172, 172); /* 검은 가로줄 스타일 */
        margin-bottom: 15px;
        padding: 0;
        box-sizing: border-box;
    }
</style>