import Send from './send'

export default {
  getRouletteData(param) {
    return Send({
      url: '/rouletteInit',
      method: 'post',
      params: param
    })
  },
  getLoginAuth(param) {
    return Send({
      url: '/login',
      method: 'post',
      params: param
    })
  }
}
