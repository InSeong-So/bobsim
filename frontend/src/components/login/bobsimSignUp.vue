<template>
  <v-layout justify-space-around>
    <v-flex xs5>
      <v-card>
        <v-img
          src="../../../static/images/signup.jpg"
          height="150px"
        >
        </v-img>

        <v-card-title primary-title>
          <div class="col-12">
            <div class="headline">이메일로 회원가입하기</div>
            <span class="grey--text" @click="show = !show" style="cursor: pointer;">SNS로 회원가입하기
                <v-btn icon>
                  <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </span>
            <v-card-text v-show="show">
              <div class="snsLoginSection">
                <ul class="snsLogin">
                  <li><a href="#" class="sns_naver_icon">네이버 로그인</a></li>
                  <li><a href="#" class="sns_kakao_icon">카카오 로그인</a></li>
                </ul>
              </div>
            </v-card-text>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-form>
            <v-container>
              <v-layout row v-show="!show">
                <v-flex md12>
                  <v-text-field
                    v-model="regEmail"
                    label="이메일 주소"
                    append-icon='alternate_email'
                    :rules="[rules.required, rules.emailRules]"
                  ></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-model="regName"
                    label="닉네임"
                    append-icon='face'
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="regPassword"
                    label="비밀번호"
                    :append-icon="regPasswordShow ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    counter
                    @click:append="regPasswordShow = !regPasswordShow"
                    :type="regPasswordShow ? 'text' : 'password'"
                  ></v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="reRegPassword"
                    label="비밀번호 확인"
                    :append-icon="reRegPasswordShow ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min, passwordMatchCheck]"
                    counter
                    @click:append="reRegPasswordShow = !reRegPasswordShow"
                    :type="reRegPasswordShow ? 'text' : 'password'"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-actions>
        <div class="text-xs-center">
          <div>
            <v-btn color="primary" @click="emailRegistration" dark>가입하기
              <v-icon dark right>check_circle</v-icon>
            </v-btn>
            <!--            <v-btn dark @click="goHome">-->
            <v-btn dark href="/">
              <v-icon dark left>remove_circle</v-icon>
              돌아가기
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'bobsimSignUp',
  data() {
    return {
      //
      regEmail: "",
      regName: "",
      regPassword: "",
      reRegPassword: "",
      show: false,
      regPasswordShow: false,
      reRegPasswordShow: false,
      password: 'Password',
      rules: {
        required: v => !!v || '입력해주세요!',
        emailRules:
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '올바른 이메일 형식이 아니에요!'
        ,
        min: v => v.length >= 4 || '최소 4글자 이상 입력해주세요!'
      }
    }
  },
  methods: {
    goHome() {
      // TODO
      // this.$router.resolve({name: 'bobsimHome'}).href;
      // this.$router.push({name: 'bobsimHome', params: {topNav:true}});
    },
    emailRegistration() {
      let params = new URLSearchParams();
      params.append('email', this.regEmail)
      params.append('name', this.regName);
      params.append('password', this.regPassword);

      this.$http.emailRegistration(params).then(resolve => {
        alert("등록되었습니다. 가입하신 아이디로 로그인 해주세요.");
        this.$router.push("/");
        if (!$(".alt-2").hasClass('material-button')) {
          $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
          })

          setTimeout(function () {
            $(".overbox").css({
              "overflow": "initial"
            })
          }, 600)

          $(".alt-2").animate({
            "width": "140px",
            "height": "140px"
          }, 500, function () {
            $(".box").removeClass("back");

            $(".alt-2").removeClass('active')
          });

          $(".overbox .title").fadeOut(300);
          $(".overbox .input").fadeOut(300);
          $(".overbox .button").fadeOut(300);
          $(".alt-2").addClass('material-buton');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    authLogin() {
      const name = this.name;
      const password = this.password;

      if (!name || !password) return;

      $("#loginButton").empty();

      let params = new URLSearchParams();
      params.append('id', name);
      params.append('password', password);

      this.$store.dispatch("LOGIN", params).then(data => {
        console.log(this.$store);
        this.redirect();
      }).catch(({message}) => {
        this.msg = message
      });
    },
    redirect() {
      const {search} = window.location;
      const tokens = search.replace(/^\?/, "").split("&");
      const {returnPath} = tokens.reduce((qs, tkn) => {
        const pair = tkn.split("=")
        qs[pair[0]] = decodeURIComponent(pair[1])
        return qs
      }, {});

      console.log(returnPath);

      // 리다이렉트 처리
      this.$router.push(returnPath)
    },
  },
  created() {
    // TODO
  },
  mounted() {
    $(".input input").focus(function () {
      $(this).parent(".input").each(function () {
        $("label", this).css({
          "line-height": "18px",
          "font-size": "18px",
          "font-weight": "100",
          "top": "0px"
        })
        $(".spin", this).css({
          "width": "100%"
        })
      });
    }).blur(function () {
      $(".spin").css({
        "width": "0px"
      })
      if ($(this).val() == "") {
        $(this).parent(".input").each(function () {
          $("label", this).css({
            "line-height": "60px",
            "font-size": "24px",
            "font-weight": "300",
            "top": "10px"
          })
        });

      }
    });

    $(".button").click(function (e) {
      let pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",
      }, 600);
      $("button", this).addClass('active');
    })

    $(".alt-2").click(function () {
      if (!$(this).hasClass('material-button')) {
        $(".shape").css({
          "width": "100%",
          "height": "100%",
          "transform": "rotate(0deg)"
        })

        setTimeout(function () {
          $(".overbox").css({
            "overflow": "initial"
          })
        }, 600)

        $(this).animate({
          "width": "140px",
          "height": "140px"
        }, 500, function () {
          $(".box").removeClass("back");

          $(this).removeClass('active')
        });

        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);
        $(".alt-2").addClass('material-buton');
      }
    })

    $(".material-button").click(function () {
      if ($(this).hasClass('material-button')) {
        setTimeout(function () {
          $(".overbox").css({
            "overflow": "hidden"
          })
          $(".box").addClass("back");
        }, 200)
        $(this).addClass('active').animate({
          "width": "700px",
          "height": "700px"
        });
        setTimeout(function () {
          $(".shape").css({
            "width": "50%",
            "height": "50%",
            "transform": "rotate(45deg)"
          })
          $(".overbox .title").fadeIn(300);
          $(".overbox .input").fadeIn(300);
          $(".overbox .button").fadeIn(300);
        }, 700)
        $(this).removeClass('material-button');

      }
      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
    });
  },
  computed: {
    passwordMatchCheck() {
      return () => (this.regPassword == this.reRegPassword) || '비밀번호를 다시 입력해주세요!'
    }
  },
  components: {
    // TODO
  },
}

</script>
<style>
#app > div.application--wrap > div > div > div {
  margin-top: 15%;
}

.snsLoginSection .snsLogin:after {
  display: block;
  clear: both;
  content: "";
}

.snsLogin ul {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.snsLoginSection .snsLogin {
  display: inline-block;
  overflow: hidden;
  zoom: 1;
  width: 100%
}

.snsLoginSection .snsLogin:after {
  display: block;
  clear: both;
  content: ""
}

.snsLoginSection .snsLogin li {
  display: block;
  float: left;
  zoom: 1;
  position: relative;
  margin-bottom: 6px;
  width: 50%;
  height: 38px;
  box-sizing: border-box;
  background-color: #fff
}

.snsLoginSection .snsLogin a {
  display: block;
  zoom: 1;
  padding-left: 50px;
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
  background-image: url("../../../static/images/icons/badge/icon_sns_naver_m.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.snsLoginSection .snsLogin .sns_kakao_icon {
  margin-right: 3px;
  background-image: url("../../../static/images/icons/badge/icon_sns_kakao_m.png");
  background-position: 17px 9px;
  background-repeat: no-repeat;
}

ol, ul, li {
  list-style: none;
}


</style>
