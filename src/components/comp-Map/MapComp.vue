<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "MapComp",
  data() {
    return {
      map: null,
      marker: null,
      storeMarkers: [],
      isInitialLoad: true
    };
  },
  computed: {
    ...mapState(['stores'])
  },
  watch: {
    stores(newStores) {
      this.updateStoreMarkers(newStores);
      if (!this.isInitialLoad) {
        if (newStores.length > 0) {
          const firstStore = newStores[0];
          const newPos = new window.kakao.maps.LatLng(firstStore.y, firstStore.x);
          this.map.setCenter(newPos);
          this.getAddressFromCoords(newPos);
        }
        
      } else {
        this.isInitialLoad = false; // 첫 번째 변경 후 플래그를 false로 설정
      }
    }
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3
            };
            this.map = new window.kakao.maps.Map(container, options);
            this.createMarker(new window.kakao.maps.LatLng(lat, lng));
            window.kakao.maps.event.addListener(this.map, 'dragend', this.handleMapMove);
            this.getAddressFromCoords(this.map.getCenter());
          },
          (error) => {
            console.error("Geolocation error:", error);
            // 기본 좌표로 초기화
            this.initMapWithDefaultCenter();
          }
        );
      } else {
        console.error("Geolocation not supported.");
        // 기본 좌표로 초기화
        this.initMapWithDefaultCenter();
      }
    },
    initMapWithDefaultCenter() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      this.map = new window.kakao.maps.Map(container, options);
      window.kakao.maps.event.addListener(this.map, 'dragend', this.handleMapMove);
      this.getAddressFromCoords(this.map.getCenter());
      this.goToCurrentLocation();
    },
    handleMapMove() {
      this.getAddressFromCoords(this.map.getCenter());
      this.map.relayout();
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
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("사용자가 위치 정보 접근을 허용하지 않았습니다.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("위치 정보를 사용할 수 없습니다.");
                break;
              case error.TIMEOUT:
                alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
                break;
              default:
                alert("알 수 없는 오류가 발생했습니다.");
                break;
            }
            console.error("Geolocation error:", error);
          }
        );
      } else {
        alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      }
    },
    createMarker(position) {
      if (this.marker) {
        this.marker.setMap(null);
      }

      const imageSrc = require('../../images/CurrentLocationMarker2.gif');
      const imageSize = new window.kakao.maps.Size(34, 39);
      const imageOption = { offset: new window.kakao.maps.Point(17, 39) };
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      this.marker = new window.kakao.maps.Marker({
        map: this.map,
        position: position,
        image: markerImage
      });
    },
    updateStoreMarkers(stores) {
      this.storeMarkers.forEach(marker => marker.setMap(null));
      this.storeMarkers = [];

      stores.forEach(store => {
        const position = new window.kakao.maps.LatLng(store.y, store.x);
        const marker = new window.kakao.maps.Marker({
          map: this.map,
          position: position
        });
        this.storeMarkers.push(marker);
      });
    },
    getAddressFromCoords(coords) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address_name;
          this.updateCurrentLocation(address);
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