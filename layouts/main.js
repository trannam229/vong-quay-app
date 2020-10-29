import dynamic from 'next/dynamic'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.less';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import RouterConfigs from "../config-router";
import { useEffect } from 'react';

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})


const menuHeaderRender = (logoDom, titleDom, props) => (
  <Link href="/">
    <a>
      {logoDom}
      {/* {!props?.collapsed && titleDom} */}
    </a>
  </Link>
)

const menuItemRender = (options, element) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

const headerRender = () => {
  return <div className="d-flex justify-content-end mr-5">
    Xin chào nhà đầu tư Nguyễn Văn A
  </div>
}

export default function Main({ children }) {
  const route = useRouter();
  useEffect(() => {
    const token = Cookies.get('access_token');
    
    if (!token) {
      route.push({ pathname: '/example' })
      return;
    }
  }, [])

  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={RouterConfigs}
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
      headerRender={headerRender}
    >
      {children}
    </ProLayout>
  )
}
