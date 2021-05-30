import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

export default function Home() {
  const route = useRouter();
  const token = Cookies.get('access-token');
  if (!token) {
    route.push({ pathname: '/login' });
    // return;
  } else {
    route.push({ pathname: '/dashboard' });
    // return;
  }

  return (<></>)
}
