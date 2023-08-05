import token from '@utils/token'
import axios from 'axios'
// Get the token value
const authToken = token.get()
console.log('Token value:', authToken)

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${token.get()}`,
    Accept: 'application/json',
  },
})

export default authClient
