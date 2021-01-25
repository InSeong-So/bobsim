<template>
  <div class="w3-sand w3-large">
    <div class="w3-container">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">ABOUT : THE BOBSIM!</span></h5>
        <p>한국인은 밥심으로 산다고 했습니다.</p>
        <p>바쁜 일상 속 무엇을 먹을지 고민하다 시간이 지체되거나,</p>
        <p>의견을 통일하지 못해 구내식당을 이용하는 당신에게 맞춤 메뉴를 추천합니다!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><strong>"어떤 가게를 가지?!"</strong></p>
          <p><i>"디저트? 저녁? 회식?" 원하는 시간별로, 식사별로 주변의 음식점과 메뉴를 확인하세요!</i></p>
        </div>
        <p><span class="w3-tag"><strong>회원이시라면</strong></span> : 자신만의 리스트 만들기; 리뷰와 평점으로 맞춤형 리스트 제공;</p>
        <!--        <p><span class="w3-tag"><strong>비회원이라도 : </strong></span> 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>-->
        <p><strong>비회원이라도</strong> : 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>
      </div>
    </div>

    <hr/>

    <div class="w3-container" id="recommended">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE RECOMMENDED</span></h5>
        <div class="w3-row w3-center w3-card w3-padding">
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('아침')">아침</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('점심')">점심</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('저녁')">저녁</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('디저트')">디저트</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('야식')">야식</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedClick('술')">술</v-btn>
          </div>
        </div>

        <v-dialog v-model="dialog" persistent>
          <v-card>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>
              <roulette ref="slot-machine" :currentLocation="currentLocation"></roulette>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <hr/>

    <div class="w3-container" id="record">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">SHARE OR RECORD YOUR RESTAURANT</span></h5>
        <p>자신만의 맛집을 등록하거나, 공유하세요!</p>
        <p><span class="w3-tag">잠깐!</span> 밥심에서는 개인정보를 필요로 하지 않습니다.</p>
        <p>순수한 맛집 리스트, 맛있는 식사 코스 등을 등록하고 공유할 수 있습니다.</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>자신만의 리스트를 만들고 평점과 리뷰를 작성한 뒤 친구들과 공유하세요!</strong></i></p>
        </div>
      </div>
    </div>

    <hr/>

    <div class="w3-container" id="plan">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">PLANNING YOUR MEAL</span></h5>
        <p>직장 동료, 학원 동기, 친구들과의 식사표를 만들어보세요!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>이력을 남기거나, 정해진 기간의 식사표를 확인하고 최적의 맛집으로 안내해드립니다!</strong></i></p>
        </div>
      </div>
    </div>

    <hr/>

    <div class="w3-container" id="diet">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">TO DIET!</span></h5>
        <p>운동량이 부족해서 살이 찌거나, 건강이 나빠진다면?</p>
        <p>밥심이 추천하는 다이어트 식단표를 참고하세요!</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i><strong>칼로리와 영양소를 챙겨줍니다!</strong></i></p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import roulette from '@/components/util/roulette.vue'

export default {
  name: 'bobsimHome',
  data() {
    return {
      dialog: false,
      currentLocation: {
        x: "",
        y: ""
      },
      mapValue: {
        geoCoder: {}
      },
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
    recommendedClick: function () {
      Vue.set(this, 'dialog', true);
    }
  },
  created() {
    // this.$http.getAuthToken().then(resolve => {
    //   console.log(resolve);
    // });
  },
  mounted() {
    // this.setMap();
  },
  components: {
    roulette,
  },
}
</script>
