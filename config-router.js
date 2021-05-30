import { AppstoreOutlined, DollarCircleOutlined, CreditCardOutlined, UserOutlined, CheckCircleOutlined, PlayCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

export default {
  path: '/',
  routes: [
    {
      path: '/dashboard',
      name: 'Thống kê',
      icon: <DollarCircleOutlined />,
    },
    {
      path: '/member',
      name: 'Thành viên',
      icon: <UnorderedListOutlined />
    },
    {
      path: '/card',
      name: 'Danh sách thẻ nạp',
      icon: <CreditCardOutlined />,
    },
    {
      path: '/diamond',
      name: 'Duyệt kim cương',
      icon: <CheckCircleOutlined />,
    },
    {
      path: '/rotation',
      name: 'Vòng quay',
      icon: <PlayCircleOutlined />,
      routes: [
        {
          path: '/rotation/list',
          name: 'Danh sách vòng quay',
        },
        {
          path: '/rotation/new',
          name: 'Tạo mới vòng quay',
        }
      ]
    },
    {
      path: '/account',
      name: 'Cá nhân',
      icon: <UserOutlined />,
      routes: [
        {
          path: '/account/changepassword',
          name: 'Đổi mật khẩu',
        },
        {
          path: '/account/logout',
          name: 'Đăng xuất',
        }
      ]
    },
  ],
}