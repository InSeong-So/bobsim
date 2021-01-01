<template>
  <v-app>
    <v-form @submit.prevent="authLogin()">
      <div class="contentFrame">
        <div class="materialContainer">
          <div class="box">
            <div class="title">어서오세요!</div>
            <div class="input">
              <label for="name">아이디</label>
              <input type="text" name="name" id="name" v-model="name">
              <span class="spin"></span>
            </div>
            <div class="input">
              <label for="pass">비밀번호</label>
              <input type="password" name="pass" id="pass" v-model="password">
              <span class="spin"></span>
            </div>
            <div class="button login">
              <button><span id="loginButton">로그인</span> <i class="fa fa-check"></i></button>
            </div>
            <a href="" class="pass-forgot">비밀번호가 기억나지 않으신가요?</a>
          </div>
          <div class="overbox">
            <div class="material-button alt-2"><span class="shape"></span></div>
            <div class="title">가입하기</div>
            <div class="input">
              <label for="regName">아이디</label>
              <input type="text" name="regName" id="regName" v-model="regName">
              <span class="spin"></span>
            </div>
            <div class="input">
              <label for="regPassword">비밀번호</label>
              <input type="password" name="regPassword" id="regPassword" v-model="regPassword">
              <span class="spin"></span>
            </div>
            <div class="input">
              <label for="reRegPassword">비밀번호 확인</label>
              <input type="password" name="reRegPassword" id="reRegPassword" v-model="reRegPassword"
                     @change.prevent="reRegPasswordCheck()">
              <span class="spin"></span>
            </div>
            <div class="button">
              <button @click.prevent="authRegistration()"><span>등록</span></button>
            </div>
          </div>
        </div>
      </div>
    </v-form>
  </v-app>
</template>
<script>
  import $ from '../../static/js/jquery-3.4.1.min';

  import Vue from "vue";
  import router from "../router";
  import App from "../App";
  import Vuetify from '../../static/js/vuetify-v1.5.14.min';

  Vue.use(Vuetify);

  export default {
    name: 'login',
    data() {
      return {
        name: "",
        password: "",
        //
        message: "",
        //
        regName: "",
        regPassword: "",
        reRegPassword: "",
      }
    },
    methods: {
      reRegPasswordCheck() {
        const regPassword = this.regPassword;
        const reRegPassword = this.reRegPassword;
        if (regPassword !== reRegPassword) {
          alert("동일한 비밀번호를 입력해주세요.");
          Vue.set(this, "reRegPassword", "");
          $("#reRegPassword").focus();
        }
      },
      authRegistration() {
        let params = new URLSearchParams();
        params.append('id', this.regName);
        params.append('password', this.regPassword);

        this.$http.setAuthRegistration(params).then(resolve => {
          alert("등록되었습니다. 가입하신 아이디로 로그인 해주세요.");
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
    components: {
      // TODO
    },
  }

</script>
<style>
  /* login { */
  .contentFrame {
    background-image: url(https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    font-family: "Roboto", sans-serif;
    overflow: hidden;
  }

  .box {
    position: relative;
    top: 0;
    opacity: 1;
    float: left;
    padding: 60px 50px 40px 50px;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    transform: scale(1);
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    z-index: 5;
  }

  .box.back {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    top: -20px;
    opacity: 0.8;
    z-index: -1;
  }

  .box:before {
    content: "";
    width: 100%;
    height: 30px;
    border-radius: 10px;
    position: absolute;
    top: -10px;
    background: rgba(255, 255, 255, 0.6);
    left: 0;
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    z-index: -1;
  }

  .overbox .title {
    color: #fff;
  }

  .overbox .title:before {
    background: #fff;
  }

  .title {
    width: 100%;
    float: left;
    line-height: 46px;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #ED2553;
    position: relative;
  }

  .title:before {
    content: "";
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -50px;
    background: #ED2553;
  }

  .input {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input label, .input input, .input .spin {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    float: left;
  }

  .button {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .button button .button.login button i.fa {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .material-button .shape:before, .material-button .shape:after {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .button.login button {
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .material-button, .alt-2, .material-button .shape, .alt-2 .shape, .box {
    transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
    -ms-transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input {
    width: 100%;
    float: left;
  }

  .button {
    width: 100%;
    float: left;
  }

  .button button {
    width: 100%;
    float: left;
  }

  .input, .button {
    margin-top: 30px;
    height: 70px;
  }

  .input {
    position: relative;
  }

  .input input {
    position: relative;
  }

  .button {
    position: relative;
  }

  .button button {
    position: relative;
  }

  .input input {
    height: 60px;
    top: 10px;
    border: none;
    background: transparent;
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
  }

  .input label {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
  }

  .button button {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
  }

  .input:before, .input .spin {
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .input:before {
    content: "";
    background: rgba(0, 0, 0, 0.1);
    z-index: 3;
  }

  .input .spin {
    background: #ED2553;
    z-index: 4;
    width: 0;
  }

  .overbox .input .spin {
    background: white;
  }

  .overbox .input:before {
    background: rgba(255, 255, 255, 0.5);
  }

  .input label {
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 2;
    cursor: pointer;
    line-height: 60px;
  }

  .button {
    margin-top: 20px;
    margin: 40px 0;
    overflow: hidden;
    z-index: 2;
  }

  .button.login {
    width: 60%;
    left: 20%;
  }

  .button.login button {
    width: 100%;
    line-height: 64px;
    left: 0%;
    background-color: transparent;
    border: 3px solid rgba(0, 0, 0, 0.1);
    font-weight: 900;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.2);
  }

  .button button {
    width: 100%;
    line-height: 64px;
    left: 0%;
    background-color: transparent;
    border: 3px solid rgba(0, 0, 0, 0.1);
    font-weight: 900;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.2);
  }

  .button.login {
    margin-top: 30px;
  }

  .button button {
    background-color: #fff;
    color: #ED2553;
    border: none;
  }

  .button.login button.active {
    border: 3px solid transparent;
    color: #fff !important;
  }

  .button.login button.active span {
    opacity: 0;
    transform: scale(0);
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    color: white;
  }

  .button.login button.active i.fa {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    -webkit-transform: scale(1) rotate(0deg);
    -ms-transform: scale(1) rotate(0deg);
  }

  .button.login button i.fa {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 60px;
    transform: scale(0) rotate(-45deg);
    -webkit-transform: scale(0) rotate(-45deg);
    -ms-transform: scale(0) rotate(-45deg);
  }

  .button.login button:hover {
    color: #ED2553;
    border-color: #ED2553;
  }

  .button button {
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  .pass-forgot {
    width: 100%;
    float: left;
    text-align: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 18px;
  }

  .click-efect {
    position: absolute;
    top: 0;
    left: 0;
    background: #ED2553;
    border-radius: 50%;
  }

  .overbox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: inherit;
    border-radius: 10px;
    padding: 60px 50px 40px 50px;
  }

  .overbox .title, .overbox .button, .overbox .input {
    z-index: 111;
    position: relative;
    color: #fff !important;
    display: none;
  }

  .overbox .title {
    width: 100%;
  }

  .overbox .input {
    margin-top: 20px;
  }

  .overbox .input input, .overbox .input label {
    color: #fff;
  }

  .overbox .material-button, .overbox .alt-2 {
    display: block;
  }

  .overbox .material-button .shape, .overbox .alt-2 .shape {
    display: block;
  }

  .material-button, .alt-2 {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: #ED2553;
    position: absolute;
    top: 40px;
    right: -70px;
    cursor: pointer;
    z-index: 100;
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    -ms-transform: translate(0%, 0%);
  }

  .material-button .shape, .alt-2 .shape {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .material-button .shape:before, .alt-2 .shape:before, .material-button .shape:after, .alt-2 .shape:after {
    content: "";
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(360deg);
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    -ms-transform: translate(-50%, -50%) rotate(360deg);
  }

  .material-button .shape:before, .alt-2 .shape:before {
    width: 25px;
    height: 4px;
  }

  .material-button .shape:after, .alt-2 .shape:after {
    height: 25px;
    width: 4px;
  }

  .material-button.active, .alt-2.active {
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%) rotate(0deg);
    -webkit-transform: translate(50%, -50%) rotate(0deg);
    -ms-transform: translate(50%, -50%) rotate(0deg);
  }

  .materialContainer {
    width: 100%;
    max-width: 460px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style-type: none;
    outline: none;
  }

  *:after, *::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style-type: none;
    outline: none;
  }

  /* } */
</style>
