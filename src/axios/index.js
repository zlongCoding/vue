import axios from 'axios'

export const indexGet = (url) => {
  return axios.get(url)
}
