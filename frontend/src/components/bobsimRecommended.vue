<template>
  <div class="w3-sand w3-large">
    <div class="w3-container">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">ABOUT : THE BOBSIM!</span></h5>
        <roulette ref="slot-machine" :currentLocation="currentLocation"></roulette>
      </div>
    </div>

    <hr/>

    <div class="w3-container" style="padding-bottom:32px;">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">WHERE TO FIND US</span></h5>
        <div class="map_wrap">
          <div id="map" style="width:100%;height:350px;">
            <div class="hAddr" style="z-index:2">
              <span class="title">지도중심기준 행정동 주소정보</span>
              <span id="centerAddr"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import roulette from '@/components/util/roulette.vue'

export default {
  name: 'bobsimRecommended',
  data() {
    return {
      icons: [
        'fab fa-github',
        'fab fa-google-plus',
        'fab fa-linkedin',
      ],
      currentLocation: {
        x: "",
        y: ""
      },
      mapValue: {
        geoCoder: {}
      }
    }
  },
  methods: {
    // getlocation으로 접속 위치 가져오기
    getLocation: function (flag) {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            resolve({x: position.coords.longitude, y: position.coords.latitude});
          }, function (error) {
            reject({code: "fail", msg: error});
          }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
          });
        } else {
          reject({code: "fail", msg: "not supported"});
        }
      });
    },
    // 카카오 지도 세팅
    setMap() {
      this.getLocation().then(resolve => {
        Vue.set(this, "currentLocation", resolve);
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(resolve.y, resolve.x), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
          };

        // 지도를 표시할 div와 지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        map.setZoomable(false);
        map.setDraggable(false);
        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 주소-좌표 변환 객체를 생성합니다
        Vue.set(this.mapValue, "geoCoder", new kakao.maps.services.Geocoder());
        const marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
        const infowindow = new kakao.maps.InfoWindow({zindex: 1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        this.searchAddrFromCoords(map.getCenter(), this.displayCenterInfo);

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const $vue = this;

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          $vue.searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
              detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

              var content = '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                '</div>';

              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          });
        });
      });
    },
    searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      this.mapValue.geoCoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.mapValue.geoCoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    },
  },
  created() {
    // this.$http.getAuthToken().then(resolve => {
    //   console.log(resolve);
    // });
  },
  mounted() {
    this.setMap();
  },
  components: {
    roulette,
  },
}
</script>
