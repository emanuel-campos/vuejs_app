import Vue from 'vue'
import VueResource from 'vue-resource'
import config from '../core/config'
import JwtToken from './jwt-token'
import localStorage from './local-storage'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getObject('user') && JwtToken.token) {
    request.headers.set('access-token', JwtToken.token)
    request.headers.set('uid', localStorage.getObject('user').email)
  }
  next()
})

export class Jwt {
  static accessToken (email, password) {
    return Vue.http.post(config.apiUrl + '/auth', { email, password })
  }
}
