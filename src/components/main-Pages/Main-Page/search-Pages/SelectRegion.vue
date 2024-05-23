<template>
    <div class="region-list">
      <div class="region-container">
        <ul class="region-ul">
          <li v-for="(region, index) in regions" :key="index" :class="{ selected: selectedRegion === region }" 
          @click="selectRegion(region)">
            {{ region }}
          </li>
        </ul>
      </div>
      <div class="region-container">
        <div class="sub-region-list" v-if="selectedRegion">
          <ul class="region-ul">
            <li v-for="(subRegion, index) in getSubRegions(selectedRegion)" :key="index" 
            :class="{ selected: selectedSubRegion === subRegion }" @click="selectSubRegion(subRegion)">{{ subRegion }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapState} from 'vuex'; // Vuex에서 mutations를 사용하기 위해 import

  export default {
    data() {
      return {
        regions: ['서울', '인천', '경기', '제주', '부산', '울산', '경남', '대구', '경북', '강원', '대전', '충남', '충북', '세종', '광주', '전남', '전북'],
        subRegions: {
            서울: ['서울전체', '은평구', '강동구', '강남구', '광진구', '동대문구', '동작구', '관악구', '마포구', '서대문구', '서초구', '성동구', '성북구', '강북구', '도봉구', '노원구', '송파구', '양천구', '강서구', '구로구', '금천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
            인천: ['인천전체', '중구', '계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '강화군', '연수구', '옹진군'],
            경기: ['경기전체', '수원시', '성남시', '안양시', '안산시', '용인시', '파주시', '부천시', '광명시', '평택시', '동두천시', '안성시', '시흥시', '김포시', '하남시', '오산시', '구리시', '남양주시', '의정부시', '고양시', '과천시', '양주시', '포천시', '의왕시', '군포시', '이천시', '여주시', '화성시', '광주시', '양평군', '가평군', '연천군'],
            제주: ['제주전체', '제주시', '서귀포시'],
            부산: ['부산전체', '강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
            울산: ['울산전체', '남구', '동구', '북구', '중구', '울주군'],
            경남: ['경남전체', '창원시', '김해시', '진주시', '양산시', '거제시', '통영시', '사천시', '밀양시', '함안군', '거창군', '합천군', '남해군', '하동군', '함양군', '산청군', '의령군', '고성군', '창녕군'],
            대구: ['대구전체', '수성구', '중구', '동구', '서구', '남구', '북구', '달서구', '달성군'],
            경북: ['경북전체', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
            강원: ['강원전체', '춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
            대전: ['대전전체', '동구', '중구', '서구', '유성구', '대덕구'],
            충남: ['충남전체', '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
            충북: ['충북전체', '청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
            세종: ['세종전체'],
            광주: ['광주전체', '동구', '서구', '남구', '북구', '광산구'],
            전남: ['전남전체', '목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
            전북: ['전북전체', '전주시', '익산시', '군산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군']
        },
      selectedRegion: '서울' ,// '서울' 항목이 선택된 상태로 초기화
      selectedSubRegion: null // 선택된 하위 지역 초기화

    };
  },
  computed: {
    ...mapState(['selectedSubRegion']) // selectedSubRegion 상태를 컴포넌트의 computed 속성으로 매핑
  },
  methods: {
    selectRegion(region) {
      this.selectedRegion = region;
      this.selectedSubRegion = null; // 선택된 지역이 바뀔 때 선택된 하위 지역 초기화
    },
    selectSubRegion(subRegion) {
      this.selectedSubRegion = subRegion;

      if (subRegion.endsWith("전체")) {
        this.$store.dispatch('selectSubRegion', this.selectedRegion);
        this.$store.dispatch('doSearch',null);
      } else {
        this.$store.dispatch('selectSubRegion', this.selectedRegion + subRegion);
        this.$store.dispatch('doSearch',null);
      }

      this.$router.push({ name: "Main" });
    },
    getSubRegions(region) {
      return this.subRegions[region] || [];
    },
  }
};
</script>

<style>
    .region-list {
      display: flex;
      font-family: Arial, sans-serif;
      max-height: 75vh;
      border: 1px solid #ececec;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: rgba(212, 218, 230, 0.412);
    }
    
    .region-container {
      overflow-y: auto; /* 세로 스크롤 생성 */
      flex-grow: 1; /* 남은 공간 차지 */
    }
    
    .region-container::-webkit-scrollbar,
    .sub-region-list-container::-webkit-scrollbar {
        display: none; /* 스크롤바 숨기기 */
    }
    .region-ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .region-ul li {
      padding: 17px;
      cursor: pointer;
      text-align: center;
      color: gray;
    }
    
    .region-ul li.selected {
      background-color: white;
      color: black;
    }
    
    </style>