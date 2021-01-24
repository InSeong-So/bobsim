<template>
  <v-app>
  </v-app>
</template>
<script>
export default {
  name: 'bobsimHeader',
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
      checkbox: false,
    }
  },
  methods: {
    bobsimRecommended() {
      $(this.$refs["tabLink02"]).addClass('on')
        .siblings()
        .removeClass('on');
      this.$router.push('/recommended');
    },
    bobsimMypage(open) {
      if (open) {
        $(this.$refs["tabLink03"]).addClass('on')
          .siblings()
          .removeClass('on');
      } else {
        $(this.$refs["tabLink03"]).removeClass('on');
      }

      this.loginDialog = open;
    },
    bobsimSignUp() {
      this.$router.push('/signUp');
    },
  },
}
</script>

<style>
#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > form > div.v-input.v-input--selection-controls.v-input--checkbox.theme--light > div > div.v-input__slot > label {
  margin: 0;
}

.bgimg {
  background-position: center;
  background-size: cover;
  background-image: url("../../../static/images/platter-2009590_1920.jpg");
  min-height: 20%;
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

.snsLoginSection .snsLogin .login_icon {
  margin-right: 3px;
  background-image: url("../../../static/images/icons/badge/baseline_login_black_18dp.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.snsLoginSection .snsLogin .signup_icon {
  margin-right: 3px;
  background-image: url("../../../static/images/icons/badge/baseline_person_add_black_18dp.png");
  background-position: 20px 12px;
  background-repeat: no-repeat;
}

.on a {
  color: #000 !important;
  background-color: #ccc !important;
}
</style>
