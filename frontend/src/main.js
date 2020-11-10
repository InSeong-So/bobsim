import Vue from 'vue'
import App from './App'
import router from './router'
/* axios */
import Axios from 'axios'

/* default */
Vue.config.productionTip = false
/* default */

/* axios */
Vue.prototype.$http = Axios;
/* axios */

/* custom javascript */
Array.prototype.shuffle = function(){
  let length = this.length;

  while(length){
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
  router,
  components: {App},
  template: '<App/>'
});
