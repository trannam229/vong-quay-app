import { PageHeader, Card, Button, Image, Table } from 'antd';
import { server } from '../configs/index';
import axios from '@configs/api-request';
import { numberWithCommas } from '@configs/helper';
import { useEffect, useState } from 'react';
import moment from 'moment';

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
      title: 'Ngày tham gia',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (x) => moment(x).format('DD/MM/YYYY'),
      sorter: (a, b) => a.createDate - b.createDate,
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
      sorter: ({username: a}, { username: b}) => {
        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend', 'descend'],
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
      render: (data) => numberWithCommas(data),
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: 'Số tiền còn lại (VND)',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
      render: (data) => numberWithCommas(data),
      sorter: (a, b) => a.currentAmount - b.currentAmount,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
      title: 'Tài sản',
      dataIndex: 'diamond',
      key: 'diamond',
      render: (data) => numberWithCommas(data),
      sorter: (a, b) => a.diamond - b.diamond,
      sortDirections: ['descend', 'ascend', 'descend'],
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
        className="table-striped"
        bordered="true"
        dataSource={users}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </Card>
  )
}
