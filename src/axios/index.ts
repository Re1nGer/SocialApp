import { default as axiosInstance } from 'axios'

export const axios = axiosInstance.create({
  baseURL: 'http://localhost:5191',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
