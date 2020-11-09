import Vue from 'vue'
import App from './App'
import router from './router'
/* axios */
import Axios from 'axios'

/* default */
Vue.config.productionTip = false
/* default */

/* axios { */
Vue.prototype.$http = Axios;
/* } axios */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
