<template>
  <v-app>
    <!-- Header with image -->
    <header class="bgimg w3-display-container w3-grayscale-min" id="home">
      <div class="w3-display-bottomleft w3-center w3-padding-large w3-hide-small">
        <span class="w3-tag">Copyright hyunparang. All rights reserved.</span>
      </div>
      <div class="w3-display-middle w3-center">
        <span class="w3-text-white" style="font-size:90px">THE<br>BOBSIM</span>
      </div>
      <div class="w3-display-bottomright w3-center w3-padding-large">
        <span class="w3-text-white">소곤소곤 프로젝트</span>
      </div>
    </header>


    <!-- Add a background color and large text to the whole page -->
    <div class="w3-sand w3-grayscale w3-large">

      <!-- About Container -->
      <!-- 1. 안내 -->
      <div class="w3-container" id="about">
        <div class="w3-content" style="max-width:700px">
          <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">ABOUT : THE BOBSIM!</span></h5>
          <p>한국인은 밥심으로 산다고 했습니다.</p>
          <p>바쁜 일상 속 무엇을 먹을지 고민하다 시간이 지체되거나,</p>
          <p>의견을 통일하지 못해 구내식당을 이용하는 당신에게 맞춤 메뉴를 추천합니다!</p>
          <div class="w3-panel w3-leftbar w3-light-grey">
            <p><i>"반주? 회식? 야식?" 원하는 시간별로, 식사별로 주변의 음식점과 메뉴를 확인하세요!</i></p>
          </div>
          <p><span class="w3-tag"><strong>회원이시라면</strong></span> : 자신만의 리스트 만들기; 리뷰와 평점으로 맞춤형 리스트 제공;</p>
          <!--          <p><span class="w3-tag"><strong>비회원이라도 : </strong></span> 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>-->
          <p><strong>비회원이라도</strong> : 원하는 지역의 식사별 맛집 추천 받기; 새로운 맛집 등록하기;</p>
        </div>
      </div>

      <hr/>

      <!-- Menu Container -->
      <div class="w3-container" id="recommended">
        <div class="w3-content" style="max-width:700px">

          <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE RECOMMENDED</span></h5>

          <div class="w3-row w3-center w3-card w3-padding">
            <a href="javascript:void(0)" onclick="openMenu(event, 'Breakfast');" id="tabLink01">
              <div class="w3-col s3 tabLink">아침</div>
            </a>
            <a href="javascript:void(0)" onclick="openMenu(event, 'Lunch');" id="tabLink02">
              <div class="w3-col s3 tabLink">점심</div>
            </a>
            <a href="javascript:void(0)" onclick="openMenu(event, 'Dinner');" id="tabLink03">
              <div class="w3-col s3 tabLink">저녁</div>
            </a>
            <a href="javascript:void(0)" onclick="openMenu(event, 'MidnightSnack');" id="tabLink04">
              <div class="w3-col s3 tabLink">야식</div>
            </a>
          </div>

          <div id="Eat" class="w3-container menu w3-padding-48 w3-card">
            <h5>Bread Basket</h5>
            <p class="w3-text-grey">Assortment of fresh baked fruit breads and muffins 5.50</p><br>

            <h5>Honey Almond Granola with Fruits</h5>
            <p class="w3-text-grey">Natural cereal of honey toasted oats, raisins, almonds and dates 7.00</p><br>

            <h5>Belgian Waffle</h5>
            <p class="w3-text-grey">Vanilla flavored batter with malted flour 7.50</p><br>

            <h5>Scrambled eggs</h5>
            <p class="w3-text-grey">Scrambled eggs, roasted red pepper and garlic, with green onions 7.50</p><br>

            <h5>Blueberry Pancakes</h5>
            <p class="w3-text-grey">With syrup, butter and lots of berries 8.50</p>
          </div>

          <div id="Drinks" class="w3-container menu w3-padding-48 w3-card">
            <h5>Coffee</h5>
            <p class="w3-text-grey">Regular coffee 2.50</p><br>

            <h5>Chocolato</h5>
            <p class="w3-text-grey">Chocolate espresso with milk 4.50</p><br>

            <h5>Corretto</h5>
            <p class="w3-text-grey">Whiskey and coffee 5.00</p><br>

            <h5>Iced tea</h5>
            <p class="w3-text-grey">Hot tea, except not hot 3.00</p><br>

            <h5>Soda</h5>
            <p class="w3-text-grey">Coke, Sprite, Fanta, etc. 2.50</p>
          </div>
        </div>
      </div>

      <hr/>

      <!-- 3. 등록 / 검증 -->
      <div class="w3-container" id="record">
        <div class="w3-content" style="max-width:700px">

          <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">WHERE TO FIND US</span></h5>

          <p>Find us at some address at some place.</p>
          <p><span class="w3-tag">FYI!</span> We offer full-service catering for any event, large or small. We
            understand your needs and we will cater the food to satisfy the biggerst criteria of them all, both look
            and taste.</p>
          <p><strong>Reserve</strong> a table, ask for today's special or just send us a message:</p>
          <v-custom-form></v-custom-form>
        </div>
      </div>

      <hr/>

      <!-- 2. 룰렛 -->
      <slot-machine ref="slot-machine" :currentLocation="currentLocation"></slot-machine>

      <hr/>

      <!-- 4. 리뷰 -->
      <!-- 3. 등록 / 검증 -->
      <div class="w3-container" id="where" style="padding-bottom:32px;">
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
      <!-- End page content -->
    </div>
  </v-app>
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

  .bgimg {
    background-position: center;
    background-size: cover;
    background-image: url("../../static/images/platter-2009590_1920.jpg");
    min-height: 20%;
  }

  .menu {
    display: none;
  }
</style>
<script>
  // Tabbed Menu
  function openMenu(evt, menuName) {
    let i, x, tabLinks;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < x.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" w3-dark-grey", "");
    }
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " w3-dark-grey";
  }

  // document.getElementById("myLink").click();

  const next = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window["mozRequestAnimationFrame"] ||
    window["msRequestAnimationFrame"] ||
    window["oRequestAnimationFrame"] ||
    function (cb) {
      window.setTimeout(cb, 1000 / 60)
    }

  const slotMachine = {
    template:
      "<div class='w3-container' id='recommend' style='padding-bottom:32px;'>" +
      "  <div class='w3-content text-center slot-machine' style='max-width:700px'>" +
      "    <div class='slot' v-for='slot in slots' ref='slots' @click='start'>" +
      "      <h2 style='color:#d1e3ff;'>{{ slot.title }}</h2>" +
      "      <div class='slot__window'>" +
      "        <div class='slot__wrap'>" +
      "          <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>" +
      "          <div class='slot__item slot__item--copy' >{{ slot.items[0] }}</div>" +
      "        </div> " +
      "      </div> " +
      "    </div> " +
      "  </div> " +
      "</div>",
    props: [
      "currentLocation",
    ],
    data: function () {
      return {
        loadData: {
          restaurantList: []
        },
        componentData: {
          currentLocation: {}
        },
        slots:
          [
            {
              title: "식사류",
              items:
                [
                  "한식",
                  "양식",
                  "중식",
                  "일식",
                  "패스트푸드",
                ]
            },
            {
              title: "음식점",
              items:
                [
                  "백반집", // 한식
                  "레스토랑", // 양식
                  "중국집", // 중식
                  "일식집", // 일식
                  "패스트푸드점", // 패스트푸드
                ]
            },
          ],
        opts: null,
        startedAt: null,
      }
    },
    watch: {
      // 접속 위치 동적으로 할당기받
      currentLocation: function (val) {
        if (this.componentData.currentLocation.x) {
          return;
        }
        Vue.set(this.componentData, "currentLocation", val);
        this.init();
      }
    },
    created() {
      // TODO
    },
    mounted() {
      // TODO
    },
    methods: {
      // 접속 위치로 근처 음식점 가져오기
      init: function () {
        let params = new URLSearchParams();

        params.append('x', this.componentData.currentLocation.x);
        params.append('y', this.componentData.currentLocation.y);

        this.$http.getRouletteData(params).then((response) => {
          Vue.set(this.loadData, "restaurantList", response.data);
        }).catch((err) => {
          console.log(err);
        });
      },
      start: function () {
        // 룰렛을 돌리고 있을 때 다시 돌리는 걸 방지
        if (this.opts) {
          return
        }

        let item = this.loadData.restaurantList;
        const randomNumber = item.length;
        const choice_origin = Math.floor(Math.random() * randomNumber);

        this.opts = this.slots.map((data, i) => {
          const slot = this.$refs.slots[i];
          const choice_view = Math.floor(Math.random() * data.items.length)

          if (i == 0) {
            Vue.set(data.items, choice_view, item[choice_origin].category);
          } else {
            Vue.set(data.items, choice_view, item[choice_origin].restaurantNm);
          }

          // console.log("choice", i, item[choice_origin].restaurantNm)

          const opts = {
            el: slot.querySelector('.slot__wrap'),
            finalPos: choice_view * 90,
            startOffset: 2000 + Math.random() * 500 + i * 500,
            height: data.items.length * 90,
            duration: 3000 + i * 700, // milliseconds
            isFinished: false,
          }
          return opts
        })

        next(this.animate)
      },
      animate: function (timestamp) {
        if (this.startedAt == null) {
          this.startedAt = timestamp
        }

        const timeDiff = timestamp - this.startedAt

        this.opts.forEach(opt => {
          if (opt.isFinished) {
            return
          }

          const timeRemaining = Math.max(opt.duration - timeDiff, 0)
          const power = 3
          const offset = (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) * opt.startOffset
          // negative, such that slots move from top to bottom
          const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height)

          opt.el.style.transform = "translateY(" + pos + "px)"

          if (timeDiff > opt.duration) {
            // console.log('finished', opt, pos, opt.finalPos)
            opt.isFinished = true
          }
        })

        if (this.opts.every(o => o.isFinished)) {
          this.opts = null
          this.startedAt = null
          // console.log('finished')
        } else {
          next(this.animate)
        }
      },
    }
  };

  const vCustomForm = {
    template:
      "  <v-form ref='form2'" +
      "    v-model='valid'" +
      "    lazy-validation>" +
      "    <v-text-field" +
      "      v-model='name'" +
      "      :counter='10'" +
      "      :rules='nameRules'" +
      "      label='Name'" +
      "      required" +
      "    ></v-text-field>" +
      "    <v-text-field" +
      "      v-model='email'" +
      "      :rules='emailRules'" +
      "      label='E-mail'" +
      "      required" +
      "    ></v-text-field>" +
      "    <v-btn" +
      "      :disabled='!valid'" +
      "      color='success'" +
      "      class='mr-4'" +
      "      @click='validate'" +
      "    >등록</v-btn>" +
      "  </v-form>",
    data: function () {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
        ],
        checkbox: false,
      }
    },
    created() {
      // TODO
    },
    mounted() {
      // TODO
    },
    methods: {
      validate() {
        this.$refs.form2.validate()
      },
      reset() {
        this.$refs.form2.reset()
      },
      resetValidation() {
        this.$refs.form2.resetValidation()
      },
    }
  };

  import $ from '../../static/js/jquery-3.4.1.min';

  import Vue from "vue";
  import router from "../router";
  import App from "../App";
  import Vuetify from '../../static/js/vuetify-v1.5.14.min';

  Vue.use(Vuetify);

  export default {
    name: 'roulette',
    data() {
      return {
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
      }
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
      slotMachine,
      vCustomForm
    },
  }
</script>
