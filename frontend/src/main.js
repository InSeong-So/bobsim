import Vue from 'vue'
import App from './App'
import router from './router'
/* axios */
import Axios from './common/parangHttps'
/* auth */
import store from './store'
/* components */
// import bobsimComponent from './common/components'

/* default */
Vue.config.productionTip = false;
/* default */

/* axios */
Vue.prototype.$http = Axios;
/* axios */

/* components */
// Vue.component(bobsimComponent.name, bobsimComponent)
/* components */

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
