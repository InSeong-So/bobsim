<template>
  <div id="app">
    <v-app>
      <div class="w3-top" v-if="topNav">
        <div class="w3-row w3-padding w3-black">
          <div class="w3-col s4" @click="bobsimHome" ref="tabLink01">
            <a href="#" class="w3-button w3-block w3-black">HOME</a>
          </div>
          <div class="w3-col s4" @click="bobsimRecommended" ref="tabLink02">
            <a href="#" class="w3-button w3-block w3-black">RECOMMENDED</a>
          </div>
          <div class="w3-col s4" @click="bobsimMypage(true)" ref="tabLink03">
            <a href="#" class="w3-button w3-block w3-black">{{ REQUIRE_LOGIN }}</a>
            <v-dialog v-model="loginDialog" persistent style="background-color:#fdf5e6 !important">
              <v-card>
                <v-card-title class="headline text-center">BOBSIM</v-card-title>
                <v-card-text @keyup.enter="bobsimSignIn">
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="email"
                      label="이메일"
                      append-icon='alternate_email'
                      :rules="[rules.required]"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="비밀번호"
                      :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required]"
                      @click:append="passwordShow = !passwordShow"
                      :type="passwordShow ? 'text' : 'password'"
                    ></v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      label="로그인 상태 유지"
                      required
                    ></v-checkbox>
                    <div class="row">
                      <div class="col-6" style="float:none; margin:auto;">
                        <div class="snsLoginSection">
                          <ul class="snsLogin">
                            <li><a href="#" class="signup_icon" @click="bobsimSignUp">회원가입</a></li>
                            <li><a href="#" class="login_icon" @click="bobsimSignIn">로그인</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="row"></div>
                    <div class="row">
                      <div class="col-6" style="float:none; margin:auto;">
                        <div class="snsLoginSection">
                          <ul class="snsLogin">
                            <li><a href="#" class="sns_naver_icon">네이버 로그인</a></li>
                            <li><a href="#" class="sns_kakao_icon">카카오 로그인</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    @click="bobsimMypage(false)"
                    outline color="indigo"
                  >
                    <v-icon left>exit_to_app</v-icon>
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>

      <div v-if="topNav" class="bgimg w3-display-container w3-grayscale-min">
        <div class="w3-display-bottomleft w3-center w3-padding-large w3-hide-small">
          <span class="w3-tag">Copyright hyunparang. All rights reserved.</span>
        </div>
        <div class="w3-display-middle w3-center">
          <span class="w3-text-white" style="font-size:90px">THE<br>BOBSIM</span>
        </div>
        <div class="w3-display-bottomright w3-center w3-padding-large">
          <span class="w3-text-white">소곤소곤 프로젝트</span>
        </div>
      </div>

      <router-view/>

      <v-footer
        v-if="topNav"
        dark
        height="auto"
      >
        <v-card
          flat
          tile
          class="white--text text-xs-center"
          style="width:100%"
        >
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-3 white--text"
              icon
            >
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text">
            &copy;2021 — <strong>bobsim, hyunparang</strong>
          </v-card-text>
        </v-card>
      </v-footer>


      <loading-component :progressDialog="progressDialog"></loading-component>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      topNav: true,
      // REQUIRE_LOGIN: "Login",
      REQUIRE_LOGIN: "MyPage",
      currentMenu: "",
      loginDialog: false,
      valid: true,
      email: '',
      password: '',
      passwordShow: false,
      rules: {
        required: v => !!v || '입력해주세요!'
      },
      select: null,
      checkbox: false,
      ///
      icons: [
        'fab fa-github',
        'fab fa-google-plus',
        'fab fa-linkedin',
      ],
      progressDialog: false
    }
  },
  methods: {
    bobsimHome() {
      $(this.$refs["tabLink01"]).siblings()
        .removeClass('on');
      this.$router.push({name: 'bobsimHome', params: {}});
      Vue.set(this, "currentMenu", "");
    },
    bobsimRecommended() {
      $(this.$refs["tabLink02"]).addClass('on')
        .siblings()
        .removeClass('on');
      this.$router.push({name: 'bobsimRecommended', params: {}});
      Vue.set(this, "currentMenu", "recommended");
    },
    bobsimMypage(open) {
      if (open) {
        $(this.$refs["tabLink03"]).addClass('on')
          .siblings()
          .removeClass('on');
      } else {
        $(this.$refs["tabLink03"]).removeClass('on');
      }

      if (this.REQUIRE_LOGIN == "MyPage") {
        this.$router.push('/mypage');
      } else {
        this.loginDialog = open;
      }
    },
    bobsimSignUp() {
      this.loginDialog = false;
      this.topNav = false;
      this.$router.push('/signUp');
    },
    bobsimSignIn() {
      this.progressDialog = true;

      const email = this.email;
      const password = this.password;

      this.$store.dispatch("login", {email, password})
        .then(() => {
          this.loginDialog = false;
          this.progressDialog = false;
          // console.log(this.$store.getters.getAuthToken);
          Vue.set(this, "REQUIRE_LOGIN", "MyPage");
        })
        .catch(() => {
          alert("이메일/비밀번호를 다시 확인해주세요!");
          this.loginDialog = false;
        })
    },
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
  },
  mounted() {
    // TODO
  },
  created() {
    this.getLocation().then(resolve => {
      this.$store.dispatch("setLocation", resolve);
    });
  }
}
</script>
<style>
#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div.v-input.v-input--selection-controls.v-input--checkbox.theme--light > div > div.v-input__slot > label {
  margin: 0;
}

.bgimg {
  margin-top: 54px;
  background-position: center;
  background-size: cover;
  background-image: url("../static/images/platter-2009590_1920.jpg");
  min-height: 338px;
}

.material-icons {
  float: left;
  vertical-align: middle;
}

ol, ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.snsLoginSection .snsLogin {
  display: inline-block;
  overflow: hidden;
  zoom: 1;
  width: 100%
}

.snsLoginSection .snsLogin li {
  display: block;
  float: left;
  zoom: 1;
  position: relative;
  margin-bottom: 6px;
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  background-color: #fff
}

.snsLoginSection .snsLogin a {
  display: block;
  zoom: 1;
  height: 38px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #666;
  font-size: 12px;
  letter-spacing: -1px;
  line-height: 34px;
  text-decoration: none
}

.snsLoginSection .snsLogin .sns_naver_icon {
  margin-right: 3px;
  background-image: url("../static/images/icons/badge/icon_sns_naver_m.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.snsLoginSection .snsLogin .sns_kakao_icon {
  margin-right: 3px;
  background-image: url("../static/images/icons/badge/icon_sns_kakao_m.png");
  background-position: 17px 9px;
  background-repeat: no-repeat;
}

.snsLoginSection .snsLogin .login_icon {
  margin-right: 3px;
  background-image: url("../static/images/icons/badge/baseline_login_black_18dp.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.snsLoginSection .snsLogin .signup_icon {
  margin-right: 3px;
  background-image: url("../static/images/icons/badge/baseline_person_add_black_18dp.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.on a {
  color: #000 !important;
  background-color: #ccc !important;
}
</style>
