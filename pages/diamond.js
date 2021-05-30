import { PageHeader, Card, Button, Image, Table } from 'antd';
import axios from '@configs/api-request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const appId = localStorage.getItem('appId');

  const [request, setRequest] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get('/diamondDraw/getAll');
      res.data.filter(x => x.appId == appId && x.status == 0);
      res.data.map(x => {
        x.key = x.id;
        return x;
      });
      setRequest(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'Ngày yêu cầu',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss')
    },
    {
      title: 'Username',
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: 'Tên ingame',
      key: 'idGame',
      dataIndex: 'idGame',
    },
    {
      title: 'Số lượng',
      key: 'diamond',
      dataIndex: 'diamond',
      render: x => numberWithCommas(x)
    },
    {
      title: 'Nội dung',
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <>
          <Button type="primary" className="mr-2" onClick={() => handleOk(id)}>Duyệt</Button>
          <Button type="danger" onClick={() => handleDelete(id)}>Xóa</Button>
        </>
      )
    }
  ];

  const handleOk = async (id) => {
    try {
      await axios.patch(`/diamondDraw/updateStatus?id=${id}&status=${1}`);
      fetch();
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.patch(`/diamondDraw/updateStatus?id=${id}&status=${2}`);
      fetch();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetch() }, []);
  return (
    <Card title="Duyệt kim cương">
      <Table
        bordered="true"
        dataSource={request}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </Card>
  )
}
