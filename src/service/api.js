import axios from 'axios'
import { API_ENDPOINT } from '../../constant/API_ENDPOINT'

axios.defaults.baseURL = API_ENDPOINT

const api = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

  get: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  post: (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  put: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default api
