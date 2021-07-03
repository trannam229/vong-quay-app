import { PageHeader, Card, Button, Image, Table } from 'antd';
import axios from '@configs/api-request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Example() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/card`);
      res.data.map(x => {
        x.key = x.createDate;
        return x;
      });
      setCards(res.data);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
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
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss'),
      sorter: (a, b) => a.createDate - b.createDate,
      sortDirections: ['descend', 'ascend', 'descend'],
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
      render: (x) => networkCard[x],
    },
    {
      title: 'Giá trị',
      dataIndex: 'cardValue',
      key: 'cardValue',
      render: (x) => numberWithCommas(x),
      sorter: (a, b) => a.cardValue - b.cardValue,
      sortDirections: ['descend', 'ascend', 'descend'],
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
      render: (x) => {
        let icon;
        switch (x) {
          case 1:
            icon = (
              <span className="text-info">
                <FontAwesomeIcon icon={['fas', 'check-circle']} /> {statusCard[x]}
              </span>
            )
            break;
          case 2:
          case 3:
          case 5:
            icon = (
              <span className="text-danger">
                <FontAwesomeIcon icon={['fas', 'times-circle']} /> {statusCard[x]}
              </span>
            )
            break;
          default:
            icon = (
              <span className="text-warning">
                <FontAwesomeIcon icon={['fas', 'minus-circle']} /> {statusCard[x]}
              </span>
            )
            break;
        }
        return icon;
      },
      sorter: ({ cardStatus: a }, { cardStatus: b }) => {
        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
      filters: Object.keys(statusCard).map(status => {
        return {
          text: statusCard[status],
          value: status
        }
      }),
      onFilter: (value, record) => {
        return record.cardStatus == value
      },
    },
  ];

  useEffect(() => { fetch() }, []);
  return (
    <Card
      title="Thẻ nạp"
      loading={loading}>
      <Table
        bordered="true"
        dataSource={cards}
        columns={columns}
        className="table-striped"
        pagination={{ defaultPageSize: 5 }}
      />
    </Card>
  )
}
