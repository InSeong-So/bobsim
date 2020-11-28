<template>
  <div class="contentFrame">
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
    <slot-machine ref="slot-machine"></slot-machine>
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
    beforeCreate() {
      // 로딩 이미지 추가할 것, axios interceptor
      this.$http.get('http://localhost:3000/rouletteInit').then((response) => {
        Vue.set(this.loadData, "restaurantList", response.data);
      });
    },
    mounted() {
      this.init();
    },
    data: function () {
      return {
        loadData: {
          restaurantList: []
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
            // {
            //   title: "메뉴",
            //   items:
            //     [
            //       "제육볶음", // 한식
            //       "피자", // 양식
            //       "짜장면", // 중식
            //       "초밥", // 일식
            //       "햄버거", // 패스트푸드
            //     ]
            // }
          ],
        opts: null,
        startedAt: null,
      }
    },

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

    methods: {
      init: function () {
        // POST 세팅
        this.$http.defaults.headers.post['Content-Type'] = 'application/json';
      },
      start: function () {

        // 룰렛을 돌리고 있을 때 다시 돌리는 걸 방지
        if (this.opts) {
          return
        }

        const item = this.loadData.restaurantList;
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
      }
    }
  }

  import $ from '../../static/js/jquery-3.4.1.min';

  import Vue from "vue";
  import router from "../router";
  import App from "../App";

  export default {
    name: 'roulette',
    components: {
      slotMachine
    },
    data() {
      return {}
    }
    , methods: {
      getLocation: function () {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {mmmm
              // console.log(position.coords.latitude + ' ' + position.coords.longitude);
              resolve({x: position.coords.longitude, y: position.coords.latitude});
            }, function (error) {
              reject({x: "", y: ""});
              // console.error(error);
            }, {
              enableHighAccuracy: false,
              maximumAge: 0,
              timeout: Infinity
            });
          } else {
            console.log("not supported");
            reject({x: "", y: ""});
          }
        });
      }

    }
    , created() {

      this.getLocation().then((resolve, reject) => {
        let params = new URLSearchParams();
        params.append('x', resolve.x);
        params.append('y', resolve.y);
        this.$http.post('http://localhost:3000/getAddress', params).then((response) => {
        }).catch((err) => {

        });
      });

    }
  }
</script>
