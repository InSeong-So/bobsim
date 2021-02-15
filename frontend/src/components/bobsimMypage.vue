<template>
  <div class="w3-sand w3-large">

    <v-speed-dial
      v-model="fab"
      fab
      fixed
      left
      bottom
      large
      color="primary"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          large
        >
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <div class="w3-container">
      <div class="w3-content" style="max-width:1180px; min-height: 600px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">주간 식사표</span></h5>
        <weekly-planner></weekly-planner>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:1180px; min-height: 810px;">
        <h5 class="w3-center w3-padding-64"><span class="w3-tag w3-wide">맛집 등록하기</span></h5>
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="black"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider color="white"></v-tabs-slider>

            <v-tab href="#tab-1">
              자동으로 등록하기
              <v-icon>location_on</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              수동으로 등록하기
              <v-icon>edit</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :key="1" value="tab-1">
              <v-card flat>
                <v-container fluid>
                  <v-toolbar color="#ffc107" dark>
                    <v-toolbar-title>찾기</v-toolbar-title>

                    <v-text-field
                      hide-details
                      light
                      solo
                      placeholder="검색할 키워드를 입력해주세요."
                      v-model="keyword"
                      @keyup.enter="searchToKeyword"
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
                          <v-list-tile-sub-title class="text--primary">{{
                              item.road_address_name
                            }}
                          </v-list-tile-sub-title>
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
                  <div class="text-xs-center" v-if="pageLength > 0">
                    <v-pagination
                      v-model="page"
                      :length="pageLength"
                    ></v-pagination>
                  </div>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item :key="2" value="tab-2">
              <v-card flat>
                <v-form>
                  <v-container fluid>
                    <v-layout row align-center wrap>
                      <v-flex sm4>
                        <v-subheader>카테고리</v-subheader>
                      </v-flex>
                      <v-flex sm8>
                        <v-select
                          v-model="addCategory"
                          :items="items2"
                          :menu-props="{offsetY: true }"
                          clearable
                          single-line
                          attach
                          chips
                          multiple
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex sm4>
                        <v-subheader>상호명</v-subheader>
                      </v-flex>
                      <v-flex sm8>
                        <v-text-field
                          v-model="addRestaurantNm"
                          single-line
                          clearable
                          box
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex sm4>
                        <v-subheader>주소</v-subheader>
                      </v-flex>
                      <v-flex sm8>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="addAddress"
                              clearable
                              single-line
                              box
                              append-icon="location_searching"
                              @click:append="setAddress"
                            ></v-text-field>
                          </template>
                          <span>Programmatic tooltip</span>
                        </v-tooltip>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex sm4>
                        <v-subheader>평점</v-subheader>
                      </v-flex>
                      <v-flex sm8 align-center>
                        <v-layout column align-center>
                          <v-rating
                            v-model="addRating"
                            background-color="orange lighten-3"
                            color="orange"
                            medium
                          ></v-rating>
                        </v-layout>
                      </v-flex>
                    </v-layout>

                    <div class="text-xs-right">
                      <v-btn round color="primary" dark>등록하기</v-btn>
                    </div>

                  </v-container>
                </v-form>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>

    <hr/>

    <div class="w3-container">
      <div class="w3-content" style="max-width:1180px; min-height: 600px;">
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide">방문일지</span></h5>
        <visit-record></visit-record>
      </div>
    </div>

    <hr/>

  </div>

</template>
<script>
import weeklyPlanner from '@/components/util/weeklyPlanner.vue'
import visitRecord from '@/components/util/visitRecord.vue'

export default {
  name: 'bobsimMypage',
  data() {
    return {
      tab: "선택",
      items2: ['한식', '중식', '일식', '양식', '디저트'],
      addCategory: [],
      addRestaurantNm: "",
      addAddress: "",
      currentAddress: {},
      addRating: 3,
      keyword: "",
      selected: [2],
      allItems: [],
      items: [],
      page: 1,
      pageLength: 0,
      bottomNav: 'recent',
      //
      fab: false,
      //
      tab1: {},
      tab2: {}
    }
  },
  methods: {
    searchToKeyword() {
      let params = new URLSearchParams();
      params.append('keyword', this.keyword);
      params.append('x', this.$store.getters.getLocation.x);
      params.append('y', this.$store.getters.getLocation.y);

      if (!this.keyword) {
        Vue.set(this, 'items', []);
        Vue.set(this, 'allItems', []);
        Vue.set(this, 'pageLength', 0);
        return;
      }

      this.$http.getKakaoMapToKeyword(params).then((response) => {

        const allItems = response.data;
        const itemCnt = allItems.length;

        if (itemCnt % 5 == 0) {
          Vue.set(this, 'pageLength', itemCnt / 5);
        } else {
          Vue.set(this, 'pageLength', (itemCnt / 5) + 1);
        }

        Vue.set(this, 'allItems', allItems);

        this.listPaging(1);
      });
    },
    listPaging(page) {
      if (this.allItems.length < 1) return;

      Vue.set(this, 'items', []);

      let allItems = this.allItems;
      let temp = [];

      for (let i = (page - 1) * 5; i <= (page * 5) - 1; i++) {
        temp.push(allItems[i]);
      }

      Vue.set(this, 'items', temp);
    },
    toggle(index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    },
    toggleMarker() {
      this.marker = !this.marker
    },
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
    setAddress() {
      if (!confirm("현재 위치를 가져오시겠습니까?")) return;

      if (this.currentAddress.newAddress || this.currentAddress.oldAddress) {
        Vue.set(this, "addAddress", this.currentAddress.newAddress);
        return;
      }

      this.getLocation().then(result => {
        let params = new URLSearchParams();
        params.append('x', result.x);
        params.append('y', result.y);

        this.$http.getCurrentAddress(params).then(response => {
          Vue.set(this, "currentAddress", response.data);
          Vue.set(this, "addAddress", this.currentAddress.newAddress);
        }).catch(err => {
          alert("현재 위치를 불러오는 도중 에러가 발생했습니다.");
        });
      });

    }
  },
  created() {
  },
  mounted() {
  },
  components: {
    weeklyPlanner,
    visitRecord
  },
  watch: {
    page: function (newPage) {
      this.listPaging(newPage);
    }
  }
}
</script>
<style>
.v-input__slot {
  transform: scale(.85)
}

a:hover {
  text-decoration: none;
  background-color: black;
  color: white;
}

#app > div.application--wrap > div.w3-sand.w3-large > div > div > div > div.v-window > div > div:nth-child(2) > div > div > div.layout.row.align-center.wrap > div.flex.sm8 > div > div.v-menu__content.theme--light.menuable__content__active {
  left: 7.4% !important;
}
</style>
