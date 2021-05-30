import { PageHeader, Card, Button, Image, Table } from 'antd';
import axios from '@configs/api-request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const [cards, setCards] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get(`/card`);
      setCards(res.data);
    } catch (e) {
      console.log(e)
    }
  }

  const statusCard = {
    0: 'Chờ duyệt',
    1: 'Thẻ đúng',
    2: 'Thẻ sai mệnh giá',
    3: 'Thẻ sai mệnh giá',
    5: 'Thẻ sai',
    99: 'Bảo trì'
  }

  const networkCard = {
    'VTT': 'Viettel',
    'VMS': 'Mobifone',
    'VNP': 'Vinaphone', 
    'VNM': 'Vietnam Mobile'
  }

  const columns = [
    {
      title: 'Ngày nạp thẻ',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss')
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Nhà mạng',
      key: 'network',
      dataIndex: 'network',
      render: (x) => networkCard[x]
    },
    {
      title: 'Giá trị',
      dataIndex: 'cardValue',
      key: 'cardValue',
      render: (x) => numberWithCommas(x)
    },
    {
      title: 'Số serial',
      dataIndex: 'cardSeri',
      key: 'cardSeri',
    },
    {
      title: 'Mã thẻ nạp',
      dataIndex: 'cardCode',
      key: 'cardCode',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'cardStatus',
      key: 'cardStatus',
      render: (x) => statusCard[x]
    },
  ];

  useEffect(() => { fetch() }, []);
  return (
    <Card title="Thẻ nạp">
      <Table
        bordered="true"
        dataSource={cards}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
      />
    </Card>
  )
}
