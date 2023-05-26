import axios from 'axios'
import Cookies from 'js-cookie'

const spotify = Cookies.get('spotify')

const authClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${spotify}`,
    Accept: 'application/json',
  },
})

export default authClient
