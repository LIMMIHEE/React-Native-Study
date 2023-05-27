import axios from 'axios';

// __DEV__ 값을 통해 개발 환경인지 아닌지 판단할 수 있다.
const baseURL = __DEV__
  ? 'http://localhost:1337'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  client.defaults.headers.Authorization = undefined;
}

export default client;
