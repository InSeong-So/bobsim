<template>
  <div class="w3-sand w3-large">
    <div class="w3-container" id="recommended">
      <div class="w3-content" style="max-width:900px">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE RECOMMENDED</span></h5>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  원하시는 식사 시간이 있나요?
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type01"
                    ref="type01"
                    label="아침"
                    color="red"
                    value="red"
                    hide-details
                    @change="setOptions('type01')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type02"
                    ref="type02"
                    label="점심"
                    color="red darken-3"
                    value="red darken-3"
                    hide-details
                    @change="setOptions('type02')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type03"
                    ref="type03"
                    label="저녁"
                    color="indigo"
                    value="indigo"
                    hide-details
                    @change="setOptions('type03')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type04"
                    ref="type04"
                    label="브런치"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    @change="setOptions('type04')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type05"
                    ref="type05"
                    label="디저트"
                    color="orange"
                    value="orange"
                    hide-details
                    @change="setOptions('type05')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-switch
                    v-model="restaurantListOption.type06"
                    ref="type06"
                    label="야식/술"
                    color="orange darken-3"
                    value="orange darken-3"
                    hide-details
                    @change="setOptions('type06')"
                    style="display: flex;justify-content: center;"
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:900px">
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  추가 옵션이 필요하신가요?
                </v-flex>
                <v-flex xs12>

                  <div class="mt-3">
                    <div class="d-flex justify-between align-center mb-3">
                      <v-btn @click="panel = [true, true, true]">전체보기</v-btn>
                      <v-btn @click="panel = [false, false, false]">접기</v-btn>
                    </div>

                    <v-expansion-panel
                      v-model="panel"
                      expand
                    >
                      <v-expansion-panel-content
                        v-for="(item, idx) in items"
                        :key="idx"
                      >
                        <template v-slot:actions>
                          <v-icon color="primary">$vuetify.icons.expand</v-icon>
                        </template>
                        <template v-slot:actions>
                          <v-icon color="primary">$vuetify.icons.expand</v-icon>
                        </template>
                        <template v-slot:header>
                          <div>{{ item.header }}</div>
                          <div>
                            <v-chip close>Example Chip</v-chip>
                          </div>
                          <div>
                            <v-chip>Example Chip</v-chip>
                          </div>
                          <div>
                            <v-chip>Example Chip</v-chip>
                          </div>
                          <div>
                            <v-chip>Example Chip</v-chip>
                          </div>
                        </template>
                        <v-card>
                          <v-card-text class="grey lighten-3">
                            <v-layout row wrap>
                              <template v-for="itemLv2 in item.check">
                                <v-flex xs3>
                                  <v-checkbox
                                    v-model="itemLv2.value"
                                    :label="itemLv2.label"
                                    :color="itemLv2.attribute"
                                    :value="itemLv2.value"
                                    hide-details
                                    style="display: flex;justify-content: center;"
                                  ></v-checkbox>
                                </v-flex>
                              </template>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <hr/>

    <div class="w3-container" id="record">
      <div class="w3-content" style="max-width:900px; min-height:600px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">SHARE OR RECORD YOUR RESTAURANT</span></h5>

        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <roulette ref="slot-machine" :currentLocation="currentLocation"
                          @getPickRestaurantNm="getPickRestaurantNm"></roulette>
              </v-flex>
              <v-flex xs6>
                <v-form>
                  <v-container>
                    <v-layout row wrap>

                      <v-flex sm12>
                        <v-text-field
                          v-model="restaurantNm"
                          label="맛집 이름"
                          placeholder=" "
                          readonly
                        ></v-text-field>
                      </v-flex>

                      <v-flex sm12>
                        <v-text-field
                          v-model="restaurantAddress"
                          label="맛집 위치"
                          placeholder=" "
                          readonly
                        ></v-text-field>
                      </v-flex>

                      <v-flex sm12>
                        <v-btn
                          block
                          flat
                          @click="findWay"
                          outline color="indigo"
                        >
                          <v-icon left>exit_to_app</v-icon>
                          음식점까지 길찾기
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

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
                  <v-btn dark flat @click="directionsDialog = false">닫기</v-btn>
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
                </v-card-actions>
              </v-list>
              <v-list two-line>
                <v-flex xs12 sm12 text-xs-center>
                  <div>
                    <v-btn large color="primary">Primary</v-btn>
                  </div>
                </v-flex>
                <!--                <v-list-tile @click="">-->
                <!--                  <v-list-tile-action>-->
                <!--                    <v-icon color="indigo">phone</v-icon>-->
                <!--                  </v-list-tile-action>-->

                <!--                  <v-list-tile-content>-->
                <!--                    <v-list-tile-title>(650) 555-1234</v-list-tile-title>-->
                <!--                    <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>-->
                <!--                  </v-list-tile-content>-->

                <!--                  <v-list-tile-action>-->
                <!--                    <v-icon>chat</v-icon>-->
                <!--                  </v-list-tile-action>-->
                <!--                </v-list-tile>-->

                <!--                <v-divider inset></v-divider>-->

                <!--                <v-list-tile @click="">-->
                <!--                  <v-list-tile-action>-->
                <!--                    <v-icon color="indigo">mail</v-icon>-->
                <!--                  </v-list-tile-action>-->

                <!--                  <v-list-tile-content>-->
                <!--                    <v-list-tile-title>aliconnors@example.com</v-list-tile-title>-->
                <!--                    <v-list-tile-sub-title>Personal</v-list-tile-sub-title>-->
                <!--                  </v-list-tile-content>-->
                <!--                </v-list-tile>-->

                <!--                <v-divider inset></v-divider>-->

                <!--                <v-list-tile @click="">-->
                <!--                  <v-list-tile-action>-->
                <!--                    <v-icon color="indigo">location_on</v-icon>-->
                <!--                  </v-list-tile-action>-->

                <!--                  <v-list-tile-content>-->
                <!--                    <v-list-tile-title>1400 Main Street</v-list-tile-title>-->
                <!--                    <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>-->
                <!--                  </v-list-tile-content>-->
                <!--                </v-list-tile>-->

                <!--                <v-divider inset></v-divider>-->

                <!--                <v-layout>-->
                <!--                  <v-flex sm12>-->
                <!--                    <v-card>-->
                <!--                      <v-card-title primary-title>-->
                <!--                        test-->
                <!--                      </v-card-title>-->
                <!--                      <v-card-text>-->
                <!--                        <toast-editor></toast-editor>-->
                <!--                      </v-card-text>-->
                <!--                    </v-card>-->
                <!--                  </v-flex>-->
                <!--                </v-layout>-->

              </v-list>
            </v-layout>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <loading-component :progressDialog="progressDialog"></loading-component>

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
// ref = https://apis.map.kakao.com/web/guide/

import roulette from '@/components/util/roulette.vue'
import toastEditor from '@/components/util/toastEditor'
import VSubheader from "../../static/js/vuetify-v1.5.14.min";

export default {
  name: 'bobsimRecommended',
  components: {
    VSubheader,
    roulette,
    toastEditor
  },
  data() {
    return {
      restaurantListOption: {
        type01: false,  // 아침
        type02: true,   // 점심
        type03: true,   // 저녁
        type04: false,  // 브런치
        type05: false,  // 디저트
        type06: false,  // 야식/술
        type07: [],
        type08: [],
        type09: [],
        type10: [],
      },
      panel: [false, false, false],
      items: [
        {
          header: "거리",
          key: "type07",
          check: [
            {
              label: "1km 이내",
              attribute: "primary",
              value: false
            },
            {
              label: "5km 이내",
              attribute: "error",
              value: false
            },
            {
              label: "10km 이내",
              attribute: "success",
              value: false
            },
            {
              label: "직접입력",
              attribute: "info",
              value: false
            },
          ],
        },
        {
          header: "가격",
          key: "type08",
          check: [
            {
              label: "8천원 이내",
              attribute: "primary",
              value: false
            },
            {
              label: "1만원 이내",
              attribute: "error",
              value: false
            },
            {
              label: "2만원 이내",
              attribute: "success",
              value: false
            },
            {
              label: "직접입력",
              attribute: "info",
              value: false
            },
          ],
        },
        {
          header: "식단",
          key: "type09",
          check: [
            {
              label: "간편식",
              attribute: "primary",
              value: false
            },
            {
              label: "다이어트",
              attribute: "error",
              value: false
            },
            {
              label: "채식",
              attribute: "success",
              value: false
            },
            {
              label: "전체",
              attribute: "info",
              value: false
            },
          ],
        },
      ],
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
      progressDialog: false
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

        // const content =
        //   '<div class="layout justify-center">' +
        //   '  <div class="flex sm12">' +
        //   '    <nav class="v-toolbar theme--dark indigo" data-booted="true"' +
        //   '        style="margin-top: 0px; padding-right: 0px; padding-left: 0px; transform: translateY(0px);">' +
        //   '        <div class="v-toolbar__content" style="height: 64px;"><button type="button"' +
        //   '                class="v-toolbar__side-icon v-btn v-btn--icon theme--dark">' +
        //   '                <div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">menu</i>' +
        //   '                </div>' +
        //   '            </button>' +
        //   '            <div class="v-toolbar__title">Discover</div>' +
        //   '            <div class="spacer"></div> <button type="button" class="v-btn v-btn--icon theme--dark">' +
        //   '                <div class="v-btn__content"><i aria-hidden="true" class="v-icon material-icons theme--dark">search</i>' +
        //   '                </div>' +
        //   '            </button>' +
        //   '        </div>' +
        //   '    </nav>' +
        //   '    <div class="v-card v-sheet theme--light">' +
        //   '        <div class="container fluid grid-list-md">' +
        //   '            <div class="layout row wrap">' +
        //   '                <div class="flex ">' +
        //   '                    <div class="v-card v-sheet theme--light">' +
        //   '                        <div class="v-responsive v-image" style="height: 200px;">' +
        //   '                            <div class="v-responsive__sizer" style="padding-bottom: 75%;"></div>' +
        //   '                            <div class="v-image__image v-image__image--cover"' +
        //   '                                style="background-position: center center;">' +
        //   '                            </div>' +
        //   '                            <div class="v-responsive__content">' +
        //   '                                <div class="container fill-height fluid pa-2">' +
        //   '                                    <div class="layout fill-height">' +
        //   '                                        <div class="flex  align-end flexbox"><span' +
        //   '                                                class="headline white--text">Pre-fab homes</span></div>' +
        //   '                                    </div>' +
        //   '                                </div>' +
        //   '                            </div>' +
        //   '                        </div>' +
        //   '                        <div class="v-card__actions">' +
        //   '                            <div class="spacer"></div> <button type="button" class="v-btn v-btn--icon theme--light">' +
        //   '                                <div class="v-btn__content"><i aria-hidden="true"' +
        //   '                                        class="v-icon material-icons theme--light">favorite</i></div>' +
        //   '                            </button> <button type="button" class="v-btn v-btn--icon theme--light">' +
        //   '                                <div class="v-btn__content"><i aria-hidden="true"' +
        //   '                                        class="v-icon material-icons theme--light">bookmark</i></div>' +
        //   '                            </button> <button type="button" class="v-btn v-btn--icon theme--light">' +
        //   '                                <div class="v-btn__content"><i aria-hidden="true"' +
        //   '                                        class="v-icon material-icons theme--light">share</i></div>' +
        //   '                            </button>' +
        //   '                        </div>' +
        //   '                    </div>' +
        //   '                </div>' +
        //   '            </div>' +
        //   '        </div>' +
        //   '    </div>' +
        //   '  </div>' +
        //   '</div>';

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
    getPickRestaurantNm(restaurantData) {
      Vue.set(this, "restaurantNm", restaurantData.restaurantNm);
      Vue.set(this, "restaurantAddress", restaurantData.address);
    },
    getDirections() {
      Vue.set(this, "directionsDialog", true);
      this.setMap();
    },
    findWay() {
      window.open("https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212")
    },
    setOptions() {
    }
  },
  created() {
    // TODO
  },
  mounted() {
    console.log(this.$store.getters.getLocation);
    Vue.set(this, "currentLocation", this.$store.getters.getLocation);
    // TODO
  },
}
</script>
