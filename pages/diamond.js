import { PageHeader, Card, Button, Image, Table } from 'antd';
import axios from '@configs/api-request';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import ButtonConfirm from '../components/ButtonConfirm';

export default function Example() {
  const appId = localStorage.getItem('appId');
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState([]);
  const [approved, setApproved] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/diamondDraw/getAll');

      res.data.map(x => {
        x.key = x.id;
        return x;
      });

      const requestList = res.data.filter(x => x.appId == appId && x.status == 0);
      const approvedList = res.data.filter(x => x.appId == appId && x.status == 1);
      const deletedList = res.data.filter(x => x.appId == appId && x.status == 2);

      setRequest(requestList);
      setApproved(approvedList);
      setDeleted(deletedList);

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      title: 'Ngày yêu cầu',
      key: 'createDate',
      dataIndex: 'createDate',
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss'),
      sorter: (a, b) => a.createDate - b.createDate,
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
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
  ];

  const action = {
    title: 'Thao tác',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <>
        <ButtonConfirm action={() => handleOk(id)}>
          <Button type="primary" className="mr-2">Duyệt</Button>
        </ButtonConfirm>
        <ButtonConfirm action={() => handleDelete(id)}>
          <Button type="danger">Xóa</Button>
        </ButtonConfirm>
      </>
    )
  };

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

  const [tab, setTab] = useState({ key: 'tab1' });

  const tabList = [
    {
      key: 'tab1',
      tab: 'Yêu cầu rút kim cương',
    },
    {
      key: 'tab2',
      tab: 'Đã duyệt',
    },
    {
      key: 'tab3',
      tab: 'Đã xóa',
    },
  ];

  const contentList = {
    tab1: (
      <Table
        className="table-striped"
        bordered="true"
        dataSource={request}
        columns={[...columns, action]}
        pagination={{ defaultPageSize: 10 }}
      />
    ),
    tab2: (
      <Table
        className="table-striped"
        bordered="true"
        dataSource={approved}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    ),
    tab3: (
      <Table
        className="table-striped"
        bordered="true"
        dataSource={deleted}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    ),
  };

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };

  return (
    <Card title="Duyệt kim cương"
      loading={loading}
      tabList={tabList}
      activeTabKey={tab.key}
      onTabChange={key => { onTabChange(key, 'key'); }}
    >
      {contentList[tab.key]}
    </Card>
  )
}
