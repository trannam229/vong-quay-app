import axios from '@configs/api-request';
import { Card, Form, Input, Button, Image, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

function login() {
  localStorage.setItem('appId', 1)
  localStorage.setItem('unit', 'kim cương');

  const route = useRouter();
  const onFinish = async (values) => {
    try {
      const res = await axios.post('/login/admin', { ...values, appId: 0 });
      Cookies.set('access-token', res.data.accessToken);
      notification.open({
        type: 'success',
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${values.username}`,
      });

      route.push({ pathname: '/dashboard' })
    } catch (e) {
      notification.open({
        type: 'error',
        message: 'Đăng nhập thất bại!',
        description: 'Sai tên đăng nhập hoặc mật khẩu.',
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const quenMatKhau = () => {
    console.log('Quen mat khau')
  }

  const style = {
    form: {
      width: '70%',
      margin: '0 auto'
    },
    btnSubmit: {
      margin: '0 auto',
      marginTop: '-16px',
      display: 'block',
      borderRadius: '20px',
      paddingLeft: '20px',
      paddingRight: '20px',
      fontSize: '16px'
    },
    formForgot: {
      marginTop: '-20px'
    },
    btnForgot: {
      float: 'right',
      border: 'none',
    }
  }

  return (
    <Card style={{ width: '40%', marginTop: 100, margin: 'auto', textAlign: 'center' }}>
      <Image preview={false} src="/key.svg" className="changepass-img" width={180} />
      <Form
        style={style.form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item style={style.formForgot}>
          <a style={style.btnForgot} onClick={quenMatKhau}>Quên mật khẩu?</a>
        </Form.Item>
        <Form.Item>
          <Button style={style.btnSubmit} type="primary" htmlType="submit">Đăng nhập</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default login;
