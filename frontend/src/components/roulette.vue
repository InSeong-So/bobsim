<template>
  <v-app>
    <div class="contentFrame">
      <!-- Header with image -->
      <header class="bgimg w3-display-container w3-grayscale-min" id="home">
        <div class="w3-display-bottomleft w3-center w3-padding-large w3-hide-small">
          <span class="w3-tag">Open from 6am to 5pm</span>
        </div>
        <div class="w3-display-middle w3-center">
          <span class="w3-text-white" style="font-size:90px">the<br>Cafe</span>
        </div>
        <div class="w3-display-bottomright w3-center w3-padding-large">
          <span class="w3-text-white">15 Adr street, 5015</span>
        </div>
      </header>


      <!-- Add a background color and large text to the whole page -->
      <div class="w3-sand w3-grayscale w3-large">

        <!-- About Container -->
        <div class="w3-container" id="about">
          <div class="w3-content" style="max-width:700px">
            <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">ABOUT THE CAFE</span></h5>
            <p>The Cafe was founded in blabla by Mr. Smith in lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>In addition to our full espresso and brew bar menu, we serve fresh made-to-order breakfast and lunch
              sandwiches, as well as a selection of sides and salads and other good stuff.</p>
            <div class="w3-panel w3-leftbar w3-light-grey">
              <p><i>"Use products from nature for what it's worth - but never too early, nor too late." Fresh is the new
                sweet.</i></p>
              <p>Chef, Coffeeist and Owner: Liam Brown</p>
            </div>
            <img src="/w3images/coffeeshop.jpg" style="width:100%;max-width:1000px" class="w3-margin-top">
            <p><strong>Opening hours:</strong> everyday from 6am to 5pm.</p>
            <p><strong>Address:</strong> 15 Adr street, 5015, NY</p>
          </div>
        </div>

        <!-- Menu Container -->
        <div class="w3-container" id="menu">
          <div class="w3-content" style="max-width:700px">

            <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">THE MENU</span></h5>

            <div class="w3-row w3-center w3-card w3-padding">
              <a href="javascript:void(0)" onclick="openMenu(event, 'Eat');" id="myLink">
                <div class="w3-col s6 tablink">Eat</div>
              </a>
              <a href="javascript:void(0)" onclick="openMenu(event, 'Drinks');">
                <div class="w3-col s6 tablink">Drink</div>
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
            <img src="/w3images/coffeehouse2.jpg" style="width:100%;max-width:1000px;margin-top:32px;">
          </div>
        </div>

        <!-- Contact/Area Container -->
        <div class="w3-container" id="where" style="padding-bottom:32px;">
          <div class="w3-content" style="max-width:700px">
            <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">WHERE TO FIND US</span></h5>
            <p>Find us at some address at some place.</p>
            <img src="/w3images/map.jpg" class="w3-image" style="width:100%">
            <p><span class="w3-tag">FYI!</span> We offer full-service catering for any event, large or small. We
              understand your needs and we will cater the food to satisfy the biggerst criteria of them all, both look
              and taste.</p>
            <p><strong>Reserve</strong> a table, ask for today's special or just send us a message:</p>
            <form action="/action_page.php" target="_blank">
              <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name">
              </p>
              <p><input class="w3-input w3-padding-16 w3-border" type="number" placeholder="How many people" required
                        name="People"></p>
              <p><input class="w3-input w3-padding-16 w3-border" type="datetime-local" placeholder="Date and time"
                        required name="date" value="2020-11-16T20:00"></p>
              <p><input class="w3-input w3-padding-16 w3-border" type="text"
                        placeholder="Message \ Special requirements" required name="Message"></p>
              <p>
                <button class="w3-button w3-black" type="submit">SEND MESSAGE</button>
              </p>
            </form>
          </div>
        </div>

        <!-- End page content -->
      </div>


      <!-- 1. 안내 -->
      <div class="jumbotron mt-3 mb-3">
        <h1 class="display-4">한국인은 밥심!</h1>
        <p class="lead">한국인은 밥심으로 산다고 했습니다.</p>
        <p class="lead">영양의 균형과 건강한 하루를 위해 밥은 선택이 아닌 필수입니다!</p>
        <hr class="my-4">
        <div class="row vertical-divider">
          <div class="col-6 btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="alcohol" id="alcohol1"> 반주
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="alcohol" id="alcohol2"> 회식
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="alcohol" id="alcohol3"> 혼술
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="alcohol" id="alcohol4" checked> 해당없음
            </label>
          </div>
          <div class="col-6 btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-info active">
              <input type="radio" name="mealTime" id="mealTime1"> 아침
            </label>
            <label class="btn btn-info">
              <input type="radio" name="mealTime" id="mealTime2" checked> 점심
            </label>
            <label class="btn btn-info">
              <input type="radio" name="mealTime" id="mealTime3"> 저녁
            </label>
            <label class="btn btn-info">
              <input type="radio" name="mealTime" id="mealTime4"> 간식(야식)
            </label>
          </div>
        </div>
      </div>
      <!-- 2. 룰렛 -->
      <slot-machine ref="slot-machine" :currentLocation="currentLocation"></slot-machine>
      <!-- 3. 등록 / 검증 -->
      <div class="jumbotron mt-3 mb-3">
        <v-custom-form></v-custom-form>
      </div>
      <!-- 4. 리뷰 -->
      <div class="jumbotron mt-3 mb-3">
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

  .bgimg {
    background-position: center;
    background-size: cover;
    background-image: url("../../static/images/platter-2009590_1920.jpg");
    min-height: 75%;
  }

  .menu {
    display: none;
  }
</style>
<script>
  // Tabbed Menu
  function openMenu(evt, menuName) {
    let i, x, tablinks;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-dark-grey", "");
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
      "<div class='border border-light p-3 mb-4 text-center slot-machine'>" +
      "  <div class='slot' v-for='slot in slots' ref='slots' @click='start'>" +
      "    <h2 style='color:#d1e3ff;'>{{ slot.title }}</h2>" +
      "    <div class='slot__window'>" +
      "      <div class='slot__wrap'>" +
      "        <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>" +
      "        <div class='slot__item slot__item--copy' >{{ slot.items[0] }}</div>" +
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
