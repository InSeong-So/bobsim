import Vue from 'vue'
import Vuex from 'vuex'
/* axios */
import $http from '../common/parangHttps'
/* properties */
import {web} from '../../../root/enviroment/properties';

Vue.use(Vuex)
const resourceHost = web.serverHost();

export default new Vuex.Store({
  state: {
    authToken: null,
    errorCode: null,
  },
  mutations: {
    login(state, authToken) {
      state.authToken = authToken;
    },
    logout(state) {
      state.authToken = null;
    },
    error(state, errorCode) {
      state.errorCode = errorCode;
    }
  },
  actions: {
    login({commit}, {email, password}) {

      return new Promise(syncResult => {
        let params = new URLSearchParams();
        params.append('email', email)
        params.append('password', password);

        $http.loginAuth(params).then(response => {
          console.log(response);
          syncResult(this.commit('login', response.data.detail[0].name));
        }).catch((err) => {
          this.commit('error', err);
        });
      });
    },
    logout({commit}) {
      this.commit("logout")
    },
  },
  getters: {
    getAuthToken(state) {
      return state.authToken;
    },
    getCatchError(state) {
      return state.errorCode;
    },
  },
})
