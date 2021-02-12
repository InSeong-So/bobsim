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

    <div class="w3-container">
      <div class="w3-content" style="max-width:700px">
        <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">등록하기</span></h5>
        <v-layout row>
          <v-flex sm12>
            <v-card>
              <v-toolbar color="#ffd147" dark>
                <v-toolbar-title>찾기</v-toolbar-title>

                <v-text-field
                  hide-details
                  light
                  solo
                  placeholder="검색할 키워드를 입력해주세요."
                  v-model="keyword"
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-btn icon @click="searchToKeyword">
                  <v-icon>search</v-icon>
                </v-btn>

              </v-toolbar>

              <v-list two-line>
                <template v-for="(item, index) in items">
                  <v-list-tile
                    :key="item.title"
                    avatar
                    ripple
                    @click="toggle(index)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.place_name }}</v-list-tile-title>
                      <v-list-tile-sub-title class="text--primary">{{ item.road_address_name }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title>{{ item.phone }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ item.distance }}</v-list-tile-action-text>
                      <v-icon
                        v-if="selected.indexOf(index) < 0"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>

                      <v-icon
                        v-else
                        color="yellow darken-2"
                      >
                        star
                      </v-icon>
                    </v-list-tile-action>

                  </v-list-tile>
                  <v-divider
                    v-if="index + 1 < items.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
              <div class="text-xs-center">
                <v-pagination
                  v-model="page"
                  :length="5"
                ></v-pagination>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </div>

    <hr/>

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

  </div>
</template>
<script>
export default {
  name: 'bobsimMypage',
  data() {
    return {
      keyword: "",
      selected: [2],
      items: [],
      page: 1
    }
  },
  methods: {
    searchToKeyword() {
      let params = new URLSearchParams();

      // console.log(this.$store.getters.getLocation);

      params.append('keyword', this.keyword);
      params.append('x', this.$store.getters.getLocation.x);
      params.append('y', this.$store.getters.getLocation.y);

      this.$http.getKakaoMapToKeyword(params).then((response) => {
        Vue.set(this, 'allItems', response.data);
        Vue.set(this, 'items', response.data);
      });
    },
    toggle(index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  },
  created() {
  },
  mounted() {
  },
  components: {},
  watch: {
    page: function (newPage) {
      console.log(newPage);
    }
  }
}
</script>
<style>
.v-input__slot {
  transform: scale(.85)
}
</style>
