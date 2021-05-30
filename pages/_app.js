import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.less";
import "../assets/style.less";
import Layout from '../components/Layout';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

export default function MyApp({ Component, pageProps }) {
  // const route = useRouter();
  // const token = Cookies.get('access-token');
  // if (!token) {
  //   route.push({ pathname: '/login' })
  //   return;
  // }
  return (<Layout>
    <Component {...pageProps} />
  </Layout>
  );
}
