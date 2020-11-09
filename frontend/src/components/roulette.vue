<template>
  <div class="contentFrame">
    <div class="jumbotron mt-3 mb-3">
      <h1 class="display-4">한국인은 밥심!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
        featured content or information.</p>
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
    data: function () {
      return {
        slots: [{
          title: "구분",
          items: [
            "today",
            "next week",
            "last year",
            "tomorrow",
            "yesterday",
          ]
        }, {
          title: "종류",
          items: [
            "at home",
            "at work",
            "at school",
            "at the gym",
            "at the park",
            "at the beach",
            "at the sidewalk",
            "at the city",
          ]
        }, {
          title: "메뉴",
          items: [
            "cycling",
            "walking",
            "swimming",
            "flying",
          ]
        }],
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
      start: function () {
        if (this.opts) {
          return
        }

        this.opts = this.slots.map((data, i) => {
          const slot = this.$refs.slots[i]
          const choice = Math.floor(Math.random() * data.items.length)
          console.log("choice", i, data.items[choice])

          const opts = {
            el: slot.querySelector('.slot__wrap'),
            finalPos: choice * 90,
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
            console.log('finished', opt, pos, opt.finalPost)
            opt.isFinished = true
          }
        })

        if (this.opts.every(o => o.isFinished)) {
          this.opts = null
          this.startedAt = null
          console.log('finished')
        } else {
          next(this.animate)
        }
      }
    }
  }

  // import $ from '../../static/js/jquery-3.4.1.min';

  import Vue from "vue";
  import router from "../router";
  import App from "../App";

  export default {
    name: 'roulette',
    components: {
      slotMachine
    },
    createdBefore() {
      // this.$http.get('http://localhost:8226/users').then((response) => {
      //   console.log(response);
      // });
    },
    data() {
      return {}
    }
    , methods: {}
  }
</script>
