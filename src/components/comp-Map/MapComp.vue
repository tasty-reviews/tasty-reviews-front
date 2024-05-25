<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "MapComp",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      console.error("Kakao Maps API not loaded.");
    }
  },
  methods: {
    ...mapActions(['updateCurrentLocation']),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      this.map = new window.kakao.maps.Map(container, options);

      // 지도 이동 이벤트 핸들러 등록
      window.kakao.maps.event.addListener(this.map, 'dragend', this.handleMapMove);
      // 초기 행정구역 이름 출력
      this.getAddressFromCoords(this.map.getCenter());

      this.goToCurrentLocation();
    },
    handleMapMove() {
      // 지도를 움직일 때마다 호출되는 함수
      this.getAddressFromCoords(this.map.getCenter());
    },
    goToCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const newPos = new window.kakao.maps.LatLng(lat, lng);
            this.map.setCenter(newPos);
            this.createMarker(newPos);
            this.getAddressFromCoords(newPos);
          },
          (error) => {
            console.error("Geolocation is not supported by this browser.", error);
          }
        );
      } else {
        alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      }
    },
    createMarker(position) {
      new window.kakao.maps.Marker({
        map: this.map,
        position: position
      });
    },
    getAddressFromCoords(coords) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address_name; // 행정구역 이름
          console.log(address);
          this.updateCurrentLocation(address); // Vuex 액션 호출
        } else {
          console.error('Failed to get address:', status);
        }
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>