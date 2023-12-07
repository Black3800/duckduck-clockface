import axios from 'axios'
import { BaseAPI } from './Constant'
import { DEVICE_CODE, DEVICE_SECRET } from './Config'

const api = axios.create({
  baseURL: BaseAPI,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
  }
});

const login = () => {
  api.post(`${BaseAPI}/device-login`, {
    device_code: DEVICE_CODE,
    secret: DEVICE_SECRET
  }).then((response) => {
    if (response.data.success === true) {
      let token = response.data.data.token
      localStorage.setItem('token', token)
      let sub = JSON.parse(atob(token.split('.')[1])).sub
      localStorage.setItem('sub', sub)

      api.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  })
}

const getAlarm = () => {
  return api.get('/alarms')
}

const setBulbPower = async (power) => {
  if (localStorage.getItem('lightId') === null) {
    await api.get('/light-control').then((response) => {
      const lightId = response.data.data.id
      localStorage.setItem('lightId', lightId)
    })
  }
  return await api.patch(`/switch-status/${localStorage.getItem('lightId')}`, {
    on: power
  })
}

export { login, getAlarm, setBulbPower }