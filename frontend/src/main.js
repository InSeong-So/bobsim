import Vue from 'vue'
import App from './App'
import router from './router'
/* axios */
import Axios from './common/parangHttps'
/* auth */
import store from './store'

/* default */
Vue.config.productionTip = false;
/* default */

/* axios */
Vue.prototype.$http = Axios;
/* axios */

/* custom javascript */
Array.prototype.shuffle = function () {
  let length = this.length;

  while (length) {
    let index = Math.floor((length--) * Math.random());

    let temp = this[length];

    this[length] = this[index];

    this[index] = temp;
  }

  return this;
}
/* custom javascript */

import vuetify from '../static/js/vuetify-v1.5.14.min'

Vue.use(vuetify);
import loadingComponent from '@/components/util/loading'

Vue.component('loadingComponent', loadingComponent)
window.Vue = new Vue({
  el: '#app',
  render: history => history(App),
  store,
  router,
  components: {App},
  template: '<App/>'
});
