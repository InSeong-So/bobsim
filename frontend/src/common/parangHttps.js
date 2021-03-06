import Send from './send'

export default {
  Send,
  getRouletteData(param) {
    return Send({
      url: '/rouletteInit',
      method: 'post',
      params: param
    })
  },
  getCurrentAddress(param) {
    return Send({
      url: '/currentAddress',
      method: 'post',
      params: param
    })
  },
  getKakaoMapToAddress(param) {
    return Send({
      url: '/address',
      method: 'post',
      params: param
    })
  },
  getKakaoMapToKeyword(param) {
    return Send({
      url: '/keyword',
      method: 'post',
      params: param
    })
  },
  emailRegistration(param) {
    return Send({
      url: '/registration',
      method: 'post',
      params: param
    })
  },
  loginAuth(param) {
    return Send({
      url: '/login',
      method: 'post',
      params: param
    })
  },
  getAuthToken() {
    return Send({
      url: '/authToken',
      method: 'get'
    })
  },
}
