import axios from 'axios';

export const axiosAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default function fetcher(url) {
  return axiosAPI.get(url).then(res => res.data.data);
}
