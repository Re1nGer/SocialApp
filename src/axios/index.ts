import { default as axiosInstance } from 'axios'

export const axios = axiosInstance.create({
  baseURL: import.meta.env.VITE_API_DOMAIN as string,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
