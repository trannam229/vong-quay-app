import { PageHeader, Card, Button, Image, Table } from 'antd';
import { server } from '../configs/index';
import axios from '@configs/api-request';

export default function Example({ datas }) {
  datas = datas.map(data => {
    data.key = data.id;
    return data;
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Nội dung',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Tóm tắt',
      dataIndex: 'brief',
      key: 'brief',
    },
    {
      title: 'Chi tiết',
      key: 'detail',
      render: () => (
        <>
          <Button type="primary">Chỉnh sửa</Button>
          <Button type="danger">Xóa</Button>
        </>
      )
    }
  ];

  return (
    <Card title="Bài đăng">
      <Button type="primary" className="mb-3">Thêm bài viết</Button>
      <Table
        bordered="true"
        dataSource={datas}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
      />
    </Card>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get(`/post`);
  const datas = res.data;

  return {
    props: {
      datas
    }
  }
}
