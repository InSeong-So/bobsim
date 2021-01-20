<template>
  <div id="app">
    <div class="w3-top">
      <div class="w3-row w3-padding w3-black">
        <div class="w3-col s6">
          <a href="/" class="w3-button w3-block w3-black">HOME</a>
        </div>
        <div class="w3-col s6">
          <a href="#" class="w3-button w3-block w3-black" @click="loginDialog=true">MY PAGE</a>
          <v-dialog v-model="loginDialog" persistent style="background-color:#fdf5e6 !important">
            <v-card>
              <v-card-title class="headline"></v-card-title>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-checkbox
                    v-model="checkbox"
                    label="로그인 상태 유지"
                    required
                  ></v-checkbox>
                  <v-btn
                    :disabled="!valid"
                    @click="validate"
                    outline color="indigo"
                  >
                    <v-icon left>login</v-icon>
                    로그인
                  </v-btn>
                  <v-btn
                    outline color="blue"
                    @click="bobsimSignUp"
                  >
                    <v-icon left>group_add</v-icon>
                    회원가입
                  </v-btn>
                  <div class="snsLoginSection">
                    <ul class="snsLogin">
                      <li><a href="#" class="sns_naver_icon">네이버 로그인</a></li>
                      <li><a href="#" class="sns_kakao_icon">카카오 로그인</a></li>
                    </ul>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="loginDialog = false">닫기</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: 'App',
    data() {
      return {
        loginDialog: false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || '밥심을 이용하실 아이디를 입력해주세요.',
          v => (v && v.length <= 10) || '아이디는 최대 10글자입니다.'
        ],
        password: '',
        passwordRules: [
          v => !!v || '비밀번호를 입력해주세요.',
          v => /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"/.test(v) || '최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자여야 합니다.'
        ],
        select: null,
        checkbox: false
      }
    },
    mounted() {
      // TODO
    },
    methods: {
      bobsimSignUp() {
        this.$router.push('/signUp');
      },
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      }
    },
  }
</script>

<style>
  #app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div.v-input.v-input--selection-controls.v-input--checkbox.theme--light > div > div.v-input__slot > label {
    margin: 0;
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

  ol, ul, li {
    list-style: none;
  }
</style>
