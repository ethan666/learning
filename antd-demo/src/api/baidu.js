import axios from 'axios'

export function getLocation (params) {
  return axios({
    url: '/baidumap',
    method: 'get',
    params
  })
}
