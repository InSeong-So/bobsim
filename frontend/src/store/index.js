import Vue from 'vue'
import Vuex from 'vuex'
/* axios */
import $http from '../common/parangHttps'
import {web} from '../../../root/enviroment/properties';

Vue.use(Vuex)
const resourceHost = web.serverHost();

export default new Vuex.Store({
  state: {
    accessToken: null,
  },
  getters: {},
  mutations: {
    LOGIN(state, {accessToken}) {
      state.accessToken = accessToken
    },
    LOGOUT(state) {
      state.accessToken = null
    },
  },
  actions: {
    LOGIN({commit}, params) {
      return $http.getLoginAuth(params).then(resolve => {
        commit("LOGIN", resolve);

        $http.defaults.headers.common['Authorization'] = `bobsim ${resolve.accessToken}`;
        alert("맛있는 식사 되세요!");
      }).catch(err => {
        console.log(err);
      });
    },
    LOGOUT({commit}) {
      commit("LOGOUT")
    },
  },
})
