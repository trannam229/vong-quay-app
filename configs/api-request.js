import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';

const dev = process.env.NODE_ENV !== "production";
const url = "http://vongquay.shop/api/";
axios.defaults.baseURL = url;
const success = [200, 304];

axios.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('access-token');
  config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

axios.interceptors.response.use((res) => {
  if (res.config.url === '/login/admin' || res.config.method === 'get') return res;

  if (res.config.method !== 'get' && success.indexOf(res.status) >= 0) {
    console.log('success');
    notification.open({
      type: 'success',
      description: `Thao tác thành công`,
    });
  }

  return res;
}, (error) => {
  if (error.response.status == '403') {
    notification.open({
      type: 'error',
      description: 'Bạn chưa đăng nhập',
    });

    Cookies.remove('access-token');
    return Promise.reject(error);
  }

  notification.open({
    type: `error ${error.response.status}`,
    description: error.response.data.message,
  });

  return Promise.reject(error);
}
);

export default axios;
