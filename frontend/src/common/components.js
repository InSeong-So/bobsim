// const eventBus = new Vue()
//
// Vue.component("bobsimHeader", {
//   template: `
//     <div>
//     <v-app>
//       <div class="w3-top">
//         <div class="w3-row w3-padding w3-black">
//           <div class="w3-col s4" ref="tabLink01">
//             <a href="/" class="w3-button w3-block w3-black">HOME</a>
//           </div>
//           <div class="w3-col s4" @click="bobsimRecommended" ref="tabLink02">
//             <a href="#" class="w3-button w3-block w3-black">RECOMMENDED</a>
//           </div>
//           <div class="w3-col s4" @click="bobsimMypage(true)" ref="tabLink03">
//             <a href="#" class="w3-button w3-block w3-black">MY PAGE</a>
//             <v-dialog v-model="loginDialog" persistent style="background-color:#fdf5e6 !important">
//               <v-card>
//                 <v-card-title class="headline"></v-card-title>
//                 <v-card-text>
//                   <v-form
//                     ref="form"
//                     v-model="valid"
//                     lazy-validation
//                   >
//                     <v-text-field
//                       v-model="name"
//                       :counter="10"
//                       :rules="nameRules"
//                       label="Name"
//                       required
//                     ></v-text-field>
//
//                     <v-text-field
//                       v-model="password"
//                       :rules="passwordRules"
//                       label="Password"
//                       required
//                     ></v-text-field>
//                     <v-checkbox
//                       v-model="checkbox"
//                       label="로그인 상태 유지"
//                       required
//                     ></v-checkbox>
//                     <div class="row">
//                       <div class="col-6" style="float:none; margin:auto;">
//                         <div class="snsLoginSection">
//                           <ul class="snsLogin">
//                             <li><a href="#" class="signup_icon" @click="bobsimSignUp">회원가입</a></li>
//                             <li><a href="#" class="login_icon">로그인</a></li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="row"></div>
//                     <div class="row">
//                       <div class="col-6" style="float:none; margin:auto;">
//                         <div class="snsLoginSection">
//                           <ul class="snsLogin">
//                             <li><a href="#" class="sns_naver_icon">네이버 로그인</a></li>
//                             <li><a href="#" class="sns_kakao_icon">카카오 로그인</a></li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </v-form>
//                 </v-card-text>
//                 <v-card-actions>
//                   <v-spacer></v-spacer>
//                   <v-btn
//                     flat
//                     @click="bobsimMypage(false)"
//                     outline color="indigo"
//                   >
//                     <v-icon left>exit_to_app</v-icon>
//                     닫기
//                   </v-btn>
//                 </v-card-actions>
//               </v-card>
//             </v-dialog>
//           </div>
//         </div>
//       </div>
//
//       <header class="bgimg w3-display-container w3-grayscale-min">
//         <div class="w3-display-bottomleft w3-center w3-padding-large w3-hide-small">
//           <span class="w3-tag">Copyright hyunparang. All rights reserved.</span>
//         </div>
//         <div class="w3-display-middle w3-center">
//           <span class="w3-text-white" style="font-size:90px">THE<br>BOBSIM</span>
//         </div>
//         <div class="w3-display-bottomright w3-center w3-padding-large">
//           <span class="w3-text-white">소곤소곤 프로젝트</span>
//         </div>
//       </header>
//     </v-app>
//     </div>
//   `,
//   data() {
//     return {
//       loginDialog: false,
//       valid: true,
//       name: '',
//       nameRules: [
//         v => !!v || '밥심을 이용하실 아이디를 입력해주세요.',
//         v => (v && v.length <= 10) || '아이디는 최대 10글자입니다.'
//       ],
//       password: '',
//       passwordRules: [
//         v => !!v || '비밀번호를 입력해주세요.',
//         v => /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"/.test(v) || '최소 8자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자여야 합니다.'
//       ],
//       select: null,
//       checkbox: false,
//     }
//   },
//   methods: {
//     bobsimRecommended() {
//       $(this.$refs["tabLink02"]).addClass('on')
//         .siblings()
//         .removeClass('on');
//       this.$router.push('/recommended');
//     },
//     bobsimMypage(open) {
//       if (open) {
//         $(this.$refs["tabLink03"]).addClass('on')
//           .siblings()
//           .removeClass('on');
//       } else {
//         $(this.$refs["tabLink03"]).removeClass('on');
//       }
//
//       this.loginDialog = open;
//     },
//     bobsimSignUp() {
//       this.$router.push('/signUp');
//     },
//   },
// })
//
// Vue.component("bobsimFooter", {
//   template: `
//     <div>
//     <v-app>
//       <hr/>
//
//       <v-footer
//         dark
//         height="auto"
//       >
//         <v-card
//           flat
//           tile
//           class="white--text text-xs-center"
//           style="width:100%"
//         >
//           <v-card-text>
//             <v-btn
//               v-for="icon in icons"
//               :key="icon"
//               class="mx-3 white--text"
//               icon
//             >
//               <v-icon size="24px">{{ icon }}</v-icon>
//             </v-btn>
//           </v-card-text>
//
//           <v-card-text class="white--text">
//             &copy;2018 — <strong>Vuetify</strong>
//           </v-card-text>
//         </v-card>
//       </v-footer>
//     </v-app>
//     </div>`,
//   data() {
//     return {
//       icons: [
//         'fab fa-github',
//         'fab fa-google-plus',
//         'fab fa-linkedin',
//       ],
//     }
//   },
// })
