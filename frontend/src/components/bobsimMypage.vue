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
                          <v-list-tile-action-text>{{ item.distanceFormat }}</v-list-tile-action-text>
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
                  <v-container>
                    <v-layout row align-center wrap>
                      <v-flex xs6>
                        <v-subheader>카테고리</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-select
                          v-model="addCategory"
                          :items="items2"
                          :menu-props="{offsetY: true }"
                          clearable
                          single-line
                          hide-details
                          attach
                          chips
                          multiple
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs6>
                        <v-subheader>상호명</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          v-model="addRestaurantNm"
                          single-line
                          clearable
                          hide-details
                          box
                          placeholder="음식점"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs6>
                        <v-subheader>주소</v-subheader>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          ref="addAddress"
                          v-model="addAddress"
                          clearable
                          single-line
                          box
                          hide-details
                          readonly
                          placeholder="주소찾기"
                          @click:append="setAddress"
                          append-icon="place"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          ref="addDetailAddress"
                          v-model="addDetailAddress"
                          clearable
                          single-line
                          box
                          hide-details
                          placeholder="상세주소"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs6>
                        <v-subheader>평점</v-subheader>
                      </v-flex>
                      <v-flex xs6 align-center>
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


    <v-dialog
      v-model="daumApiDialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card height="100%">
        <v-card-text>
          <v-flex sm12 id="wrap"
                  style="display:none;border:1px solid;width:100%;height:510px;margin:5px 0;position:relative;">
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      addZipCode: "",
      addAddress: "",
      addDetailAddress: "",
      daumApiDialog: false,
      currentAddress: {},
      addRating: 5,
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
      Vue.set(this, 'items', []);
      Vue.set(this, 'allItems', []);
      Vue.set(this, 'pageLength', 0);

      if (!this.keyword) {
        return;
      }

      let params = new URLSearchParams();
      params.append('keyword', this.keyword);
      params.append('x', this.$store.getters.getLocation.x);
      params.append('y', this.$store.getters.getLocation.y);

      this.$http.getKakaoMapToKeyword(params).then((response) => {

        const allItems = response.data;
        const itemCnt = allItems.length;

        if (itemCnt % 5 == 0) {
          Vue.set(this, 'pageLength', itemCnt / 5);
        } else {
          Vue.set(this, 'pageLength', (itemCnt / 5) + 1);
        }

        Vue.set(this, "page", 1);
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
    addressHere() {
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
    },
    setAddress() {
      this.daumApiDialog = true;

      let element_wrap = document.getElementById('wrap');

      // 현재 scroll 위치를 저장해놓는다.
      let currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

      let themeObj = {
        //bgColor: "", //바탕 배경색
        searchBgColor: "#0B65C8", //검색창 배경색
        //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        //pageBgColor: "", //페이지 배경색
        //textColor: "", //기본 글자색
        queryTextColor: "#FFFFFF" //검색창 글자색
        //postcodeTextColor: "", //우편번호 글자색
        //emphTextColor: "", //강조 글자색
        //outlineColor: "", //테두리
      };

      let $vue = this;

      new daum.Postcode({
        theme: themeObj,
        oncomplete: function (data) {
          // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let addr = ''; // 주소 변수
          let extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          Vue.set($vue, "addZipCode", data.zonecode);
          // 조합된 참고항목을 주소와 함께 해당 필드에 넣는다.
          Vue.set($vue, "addAddress", addr + extraAddr);
          // 커서를 상세주소 필드로 이동한다.
          // document.getElementById("sample3_detailAddress").focus();

          // iframe을 넣은 element를 안보이게 한다.
          // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
          element_wrap.style.display = 'none';
          $vue.daumApiDialog = false;

          // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
          document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize: function (size) {
          element_wrap.style.height = size.height + 5 + 'px';
        },
        width: '100%',
        height: '100%'
      }).embed(element_wrap);

      // iframe을 넣은 element를 보이게 한다.
      element_wrap.style.display = 'block';
    },
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

#app > div.application--wrap > div.w3-sand.w3-large > div:nth-child(4) > div > div > div.v-window > div > div:nth-child(2) > div > form > div > div.layout > div > div > div.v-menu__content.theme--light.menuable__content__active {
  left: 7.46% !important;
}
</style>
