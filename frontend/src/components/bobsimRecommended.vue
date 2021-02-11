<template>
  <div class="w3-sand w3-large">
    <div class="w3-container" id="recommended">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE RECOMMENDED</span></h5>
        <div class="w3-row w3-center w3-card w3-padding">
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="v_clickTest(false)">아침</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedSet('점심')">점심</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedSet('저녁')">저녁</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedSet('디저트')">디저트</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedSet('야식')">야식</v-btn>
          </div>
          <div class="w3-col s2 tabLink">
            <v-btn color="primary" dark @click="recommendedSet('술')">술</v-btn>
          </div>
        </div>
      </div>
    </div>

    <hr/>

<!--    <div class="w3-container" id="test2222">-->
<!--      <div class="w3-content" style="max-width:700px">-->
<!--        <div class="layout justify-center">-->
<!--          <div class="flex sm12">-->
<!--            <nav class="v-toolbar theme&#45;&#45;dark indigo" data-booted="true"-->
<!--                 style="margin-top: 0px; padding-right: 0px; padding-left: 0px; transform: translateY(0px);">-->
<!--              <div class="v-toolbar__content" style="height: 64px;">-->
<!--                <button type="button" class="v-toolbar__side-icon v-btn v-btn&#45;&#45;icon theme&#45;&#45;dark">-->
<!--                  <div class="v-btn__content">-->
<!--                    <i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;dark">menu</i>-->
<!--                  </div>-->
<!--                </button>-->
<!--                <div class="v-toolbar__title">Discover</div>-->
<!--                <div class="spacer"></div>-->
<!--                <button type="button" class="v-btn v-btn&#45;&#45;icon theme&#45;&#45;dark">-->
<!--                  <div class="v-btn__content">-->
<!--                    <i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;dark">search</i>-->
<!--                  </div>-->
<!--                </button>-->
<!--              </div>-->
<!--            </nav>-->
<!--            <div class="v-card v-sheet theme&#45;&#45;light">-->
<!--              <div class="container fluid grid-list-md">-->
<!--                <div class="layout row wrap">-->
<!--                  <div class="flex xs12">-->
<!--                    <div class="v-card v-sheet theme&#45;&#45;light">-->
<!--                      <div class="v-responsive v-image" style="height: 200px;">-->
<!--                        <div class="v-responsive__sizer" style="padding-bottom: 75%;"></div>-->
<!--                        <div class="v-image__image v-image__image&#45;&#45;cover"-->
<!--                             style="background-position: center center;">-->
<!--                        </div>-->
<!--                        <div class="v-responsive__content">-->
<!--                          <div class="container fill-height fluid pa-2">-->
<!--                            <div class="layout fill-height">-->
<!--                              <div class="flex xs12 align-end flexbox">-->
<!--                                <span class="headline white&#45;&#45;text">Pre-fab homes</span>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div class="v-card__actions">-->
<!--                        <div class="spacer"></div>-->
<!--                        <button type="button" class="v-btn v-btn&#45;&#45;icon theme&#45;&#45;light">-->
<!--                          <div class="v-btn__content">-->
<!--                            <i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;light">favorite</i>-->
<!--                          </div>-->
<!--                        </button>-->
<!--                        <button type="button" class="v-btn v-btn&#45;&#45;icon theme&#45;&#45;light">-->
<!--                          <div class="v-btn__content">-->
<!--                            <i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;light">bookmark</i>-->
<!--                          </div>-->
<!--                        </button>-->
<!--                        <button type="button" class="v-btn v-btn&#45;&#45;icon theme&#45;&#45;light">-->
<!--                          <div class="v-btn__content">-->
<!--                            <i aria-hidden="true" class="v-icon material-icons theme&#45;&#45;light">share</i>-->
<!--                          </div>-->
<!--                        </button>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <hr/>

    <div class="w3-container" id="record">
      <div class="w3-content" style="max-width:900px; min-height:600px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">SHARE OR RECORD YOUR RESTAURANT</span></h5>
        <div class="w3-row ">
          <div class="w3-col s6">
            <roulette ref="slot-machine" :currentLocation="currentLocation"
                      @getPickRestaurantNm="getPickRestaurantNm"></roulette>
          </div>
          <div class="w3-col s6">
            <v-form>
              <v-container>
                <v-layout row wrap>

                  <v-flex xs12 sm12>
                    <v-text-field
                      v-model="restaurantNm"
                      label="음식점"
                      box
                      readonly
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm12>
                    <v-text-field
                      v-model="restaurantAddress"
                      label="주소"
                      box
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-btn
                    block
                    flat
                    @click="getDirections"
                    outline color="indigo"
                  >
                    <v-icon left>exit_to_app</v-icon>
                    음식점까지 길찾기
                  </v-btn>
                  <v-btn
                    :disabled="progressDialog"
                    :loading="progressDialog"
                    class="white--text"
                    color="purple darken-2"
                    @click="v_clickTest(true)"
                  >
                    Start loading
                  </v-btn>
                  <!--                  <v-btn-->
                  <!--                    :disabled="progressDialog"-->
                  <!--                    :loading="progressDialog"-->
                  <!--                    class="white&#45;&#45;text"-->
                  <!--                    color="purple darken-2"-->
                  <!--                    @click="progressDialog = true"-->
                  <!--                  >-->
                  <!--                    Start loading-->
                  <!--                  </v-btn>-->
                </v-layout>
              </v-container>
            </v-form>
          </div>
        </div>

        <v-dialog v-model="directionsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-layout column fill-height>
              <v-toolbar dark color="#343a40">
                <v-btn icon dark @click="directionsDialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>음식점까지 길찾기</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark flat @click="directionsDialog = false">저장</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                <v-spacer></v-spacer>
                <v-card-actions height="430">
                  <div class="map_wrap">
                    <div id="map" style="width:100%;height:100%;">
                      <div class="hAddr" style="z-index:2">
                        <span class="title">지도중심기준 행정동 주소정보</span>
                        <span id="centerAddr"></span>
                      </div>
                    </div>
                  </div>
                  <!--                <v-card-actions>-->
                  <!--                  <v-spacer></v-spacer>-->
                  <!--                  <v-btn icon>-->
                  <!--                    <v-icon>favorite</v-icon>-->
                  <!--                  </v-btn>-->
                  <!--                  <v-btn icon>-->
                  <!--                    <v-icon>bookmark</v-icon>-->
                  <!--                  </v-btn>-->
                  <!--                  <v-btn icon>-->
                  <!--                    <v-icon>share</v-icon>-->
                  <!--                  </v-btn>-->
                  <!--                </v-card-actions>-->
                </v-card-actions>
              </v-list>
              <v-list two-line>
                <v-list-tile @click="">
                  <v-list-tile-action>
                    <v-icon color="indigo">phone</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                    <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>chat</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile @click="">
                  <v-list-tile-action></v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                    <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon>chat</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile @click="">
                  <v-list-tile-action>
                    <v-icon color="indigo">mail</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                    <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="">
                  <v-list-tile-action></v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                    <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile @click="">
                  <v-list-tile-action>
                    <v-icon color="indigo">location_on</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>1400 Main Street</v-list-tile-title>
                    <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-layout>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>
<style>
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}

.title {
  font-weight: bold;
  display: block;
}

.hAddr {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 2px;
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
}

#centerAddr {
  display: block;
  margin-top: 2px;
  font-weight: normal;
}

.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
<script>
import roulette from '@/components/util/roulette.vue'

export default {
  name: 'bobsimRecommended',
  // props: {
  //   progressDialog: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      progressDialog: false,
      restaurantNm: "",
      restaurantAddress: "",
      directionsDialog: false,
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
      let params = new URLSearchParams();

      params.append('address', this.restaurantAddress);

      this.$http.getKakaoMapToAddress(params).then((response) => {
        // Vue.set(this, "destinationLocation", response.data);
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(response.data.y, response.data.x), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
          };

        // 지도를 표시할 div와 지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        map.setZoomable(false);
        map.setDraggable(false);
        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커가 표시될 위치입니다
        const markerPosition = new kakao.maps.LatLng(response.data.y, response.data.x);

        // 마커를 생성합니다
        const currentMarker = new kakao.maps.Marker({
          map: map,
          position: markerPosition
        });

        const content =
          '<div class="layout justify-center">' +
          '  <div class="flex sm12">' +
          '    <nav class="v-toolbar theme--dark indigo" data-booted="true"' +
          '        style="margin-top: 0px; padding-right: 0px; padding-left: 0px; transform: translateY(0px);">' +
          '        <div class="v-toolbar__content" style="height: 64px;"><button type="button"' +
          '                class="v-toolbar__side-icon v-btn v-btn--icon theme--dark">' +
          '                <div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">menu</i>' +
          '                </div>' +
          '            </button>' +
          '            <div class="v-toolbar__title">Discover</div>' +
          '            <div class="spacer"></div> <button type="button" class="v-btn v-btn--icon theme--dark">' +
          '                <div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">search</i>' +
          '                </div>' +
          '            </button>' +
          '        </div>' +
          '    </nav>' +
          '    <div class="v-card v-sheet theme--light">' +
          '        <div class="container fluid grid-list-md">' +
          '            <div class="layout row wrap">' +
          '                <div class="flex xs12">' +
          '                    <div class="v-card v-sheet theme--light">' +
          '                        <div class="v-responsive v-image" style="height: 200px;">' +
          '                            <div class="v-responsive__sizer" style="padding-bottom: 75%;"></div>' +
          '                            <div class="v-image__image v-image__image--cover"' +
          '                                style="background-position: center center;">' +
          '                            </div>' +
          '                            <div class="v-responsive__content">' +
          '                                <div class="container fill-height fluid pa-2">' +
          '                                    <div class="layout fill-height">' +
          '                                        <div class="flex xs12 align-end flexbox"><span' +
          '                                                class="headline white--text">Pre-fab homes</span></div>' +
          '                                    </div>' +
          '                                </div>' +
          '                            </div>' +
          '                        </div>' +
          '                        <div class="v-card__actions">' +
          '                            <div class="spacer"></div> <button type="button" class="v-btn v-btn--icon theme--light">' +
          '                                <div class="v-btn__content"><i aria-hidden="true"' +
          '                                        class="v-icon material-icons theme--light">favorite</i></div>' +
          '                            </button> <button type="button" class="v-btn v-btn--icon theme--light">' +
          '                                <div class="v-btn__content"><i aria-hidden="true"' +
          '                                        class="v-icon material-icons theme--light">bookmark</i></div>' +
          '                            </button> <button type="button" class="v-btn v-btn--icon theme--light">' +
          '                                <div class="v-btn__content"><i aria-hidden="true"' +
          '                                        class="v-icon material-icons theme--light">share</i></div>' +
          '                            </button>' +
          '                        </div>' +
          '                    </div>' +
          '                </div>' +
          '            </div>' +
          '        </div>' +
          '    </div>' +
          '  </div>' +
          '</div>';

        // 마커가 지도 위에 표시되도록 설정합니다
        currentMarker.setMap(map);

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: currentMarker.getPosition()
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(currentMarker, 'click', function () {
          customOverlay.setMap(map);
        });

        // 주소-좌표 변환 객체를 생성합니다
        Vue.set(this.mapValue, "geoCoder", new kakao.maps.services.Geocoder());

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        this.searchAddrFromCoords(map.getCenter(), this.displayCenterInfo);

        const $vue = this;
      }).catch((err) => {
        console.log(err);
      });
    },
    searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      this.mapValue.geoCoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },
    displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const infoDiv = document.getElementById('centerAddr');

        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    },
    recommendedSet(time) {
      switch (time) {

      }
    },
    getPickRestaurantNm(restaurantData) {
      Vue.set(this, "restaurantNm", restaurantData.restaurantNm);
      Vue.set(this, "restaurantAddress", restaurantData.address);
    },
    getDirections() {
      Vue.set(this, "directionsDialog", true);
      this.setMap();
    },
    v_clickTest(flag) {
      Vue.set(this, 'progressDialog', flag);
    }
  },
  created() {
    // this.$http.getAuthToken().then(resolve => {
    //   console.log(resolve);
    // });
  },
  mounted() {
    Vue.set(this, "currentLocation", this.$store.getters.getLocation);
  },
  components: {
    roulette,
  },
}
</script>
