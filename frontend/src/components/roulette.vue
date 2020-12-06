<template>
  <div class="contentFrame">
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
      <div id="map" style="width:100%;height:350px;"></div>
    </div>
  </div>
</template>
<script>
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
      "    <v-select" +
      "      v-model='select'" +
      "      :items='items'" +
      "      :rules='[v => !!v || 'Item is required']'" +
      "      label='Item'" +
      "      required" +
      "    ></v-select>" +
      "    <v-checkbox" +
      "      v-model='checkbox'" +
      "      :rules='[v => !!v || 'You must agree to continue!']'" +
      "      label='Do you agree?'" +
      "      required" +
      "    ></v-checkbox>" +
      "    <v-btn" +
      "      :disabled='!valid'" +
      "      color='success'" +
      "      class='mr-4'" +
      "      @click='validate'" +
      "    >" +
      "      Validate" +
      "    </v-btn>" +
      "    <v-btn" +
      "      color='error'" +
      "      class='mr-4'" +
      "      @click='reset'" +
      "    >" +
      "      Reset Form" +
      "    </v-btn>" +
      "    <v-btn" +
      "      color='warning'" +
      "      @click='resetValidation'" +
      "    >" +
      "      Reset Validation" +
      "    </v-btn>" +
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

  export default {
    name: 'roulette',
    data() {
      return {
        currentLocation: {
          x: "",
          y: ""
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

          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
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
        });
      },
    },
    created() {
      // TODO
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
