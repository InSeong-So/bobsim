<template>
  <div class="row">
    <div class='slot col-12' v-for='slot in slots' ref='slots' @click='start'>
      <h2 style='color:grey;'>{{ slot.title }}</h2>
      <div class='slot__window'>
        <div class='slot__wrap'>
          <div class='slot__item' v-for='opt in slot.items'>{{ opt }}</div>
          <div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>
        </div>
      </div>
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

export default {
  name: "roulette",
  props: [
    "currentLocation",
  ],
  data: function () {
    return {
      pickData: {
        category: "",
        restaurantNm: ""
      },
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
          Vue.set(this.pickData, "category", item[choice_origin].category);
        } else {
          Vue.set(data.items, choice_view, item[choice_origin].restaurantNm);
          Vue.set(this.pickData, "restaurantNm", item[choice_origin].restaurantNm);
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
          this.$emit("getPickRestaurantNm", this.pickData.restaurantNm);
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
}

</script>
