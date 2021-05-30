import { PageHeader, Card, Button, Image, Table } from 'antd';
import { server } from '../configs/index';
import axios from '@configs/api-request';
import { numberWithCommas } from '@configs/helper';
import { useEffect, useState } from 'react';

export default function Example() {
  const [users, setUsers] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get('/user/getListUser');
      res.data.map(x => {
        x.key = x.id;
        return x;
      })
      setUsers(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: 'Số tiền đã nạp (VND)',
      dataIndex: 'amount',
      key: 'amount',
      render: (data) => numberWithCommas(data)
    },
    {
      title: 'Số tiền còn lại (VND)',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
      render: (data) => numberWithCommas(data)
    },
    {
      title: 'Tài sản',
      dataIndex: 'diamond',
      key: 'diamond',
      render: (data) => numberWithCommas(data)
    },
    // {
    //   title: 'Thao tác',
    //   key: 'action',
    //   render: () => ('Thêm sửa xóa')
    // },
  ];
  useEffect(() => { fetch() }, []);

  return (
    <Card title="Thành viên">
      <Table
        bordered="true"
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </Card>
  )
}
