import axios from '@configs/api-request';
import { Card, Form, Input, Button, Image, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

function login() {
  localStorage.setItem('appId', 0)
  localStorage.setItem('unit', 'kim cương');

  const route = useRouter();
  const logout = () => {
    Cookies.remove('access-token')
    route.push('/login')
  };

  const style = {
    button: {
      width: 150,
      height: 40,
      fontSize: 16
    },
    txt: {
      fontSize: 18
    },
    header: {
      textAlign: 'center',
      marginTop: '12px'
    },
    card: {
      width: 600,
      textAlign: 'center',
      margin: '0 auto'
    }
  }

  return (
    <Card style={{ width: '40%', marginTop: 100, margin: 'auto', textAlign: 'center' }}>
      <Image preview={false} src="/logout.svg" className="mt-3" width={100} />
      <p style={style.txt} className="mt-5">Xác nhận đăng xuất</p>
      <Button
        type="primary"
        shape="round"
        style={style.button}
        onClick={logout}>OK</Button>
    </Card>
  );
}

export default login;
