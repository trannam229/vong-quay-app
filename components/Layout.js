import dynamic from 'next/dynamic'
import Link from 'next/link'
import RouterConfigs from "../config-router";
import { Avatar, Image } from "antd";
import Cookies from 'js-cookie';

const accessToken = Cookies.get('access-token');

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})

const menuHeaderRender = (logoDom, titleDom, props) => (
  <Link href="/category/dashboard" className="m-auto">
    <div className="text-center">{logoDom}</div>
  </Link>
)

const menuItemRender = (options, element) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

const rightContentRender = () => {
  const contentLogined = (
    <>
      Xin chào admin
      <Avatar shape="square" className="ml-3"
        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      />
    </>
  );

  return (
  <div>
    {accessToken
      ? contentLogined
      : <Link href="/login">ĐĂNG NHẬP</Link>
    }
    
  </div>
)};

export default function Main({ children }) {
  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={RouterConfigs}
      logo="/logo.svg"
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
      rightContentRender={rightContentRender}
      title="Vòng quay"
    >
      {children}
    </ProLayout>
  )
}
