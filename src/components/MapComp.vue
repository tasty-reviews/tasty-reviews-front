<template>
    <div id="map" class="map-container"></div>
  </template>
  
  <script>
  export default {
    props: ['keyword'], // 부모 컴포넌트로부터 전달받은 검색어
    data() {
      return {
        map: null, // 지도 객체
      };
    },
    mounted() {
        if(window.kakao && window.kakao.maps){
            this.initMap();
        } else {
            this.loadScript();
        }
    },
    watch: {
      keyword(newVal) {
        // 검색어가 변경될 때마다 검색을 실행
        if (newVal) {
          this.searchMap(newVal);
        }
      }
    },
    methods: {
        loadScript(){
            const script = document.createElement("script");
            script.src ="http://dapi.kakao.com/v2/maps/sdk.js?appkey=25b9c992de80da4abec2d551e2d7761e&autoload=false"; // &autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
            script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행될 준비가 되어 있다면 지도가 실행되도록 구현
            document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
        }
    },
      initMap() {
        // 지도를 초기화하는 메서드
        const mapContainer = document.getElementById('map'), // 지도를 표시할 요소
              mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
              };
        // 지도를 생성합니다
        this.map = new window.kakao.maps.Map(mapContainer, mapOption);
      },
      searchMap(keyword) {
        // 검색어를 기반으로 장소를 검색하는 메서드
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // 검색 성공 시, 결과로 받은 장소를 지도에 마커로 표시
            const bounds = new window.kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
              this.displayMarker(data[i]);
              bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }
            this.map.setBounds(bounds);
          }
        });
      },
      displayMarker(place) {
        // 검색된 장소 위치에 마커를 생성하는 메서드
        const marker = new window.kakao.maps.Marker({
          map: this.map,
          position: new window.kakao.maps.LatLng(place.y, place.x)
        });
        window.kako.maps.event.addListener(marker, 'click', ()=>{
            alert(place.place.name);
        })
      }
    };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 400px; 
  }
  </style>
  