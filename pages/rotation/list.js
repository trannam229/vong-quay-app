import { Descriptions, Card, Button, Modal, Table, Image, Switch } from 'antd';
import axios from '@configs/api-request';
import { numberWithCommas } from '@configs/helper';
import { useEffect, useState } from 'react';
import ButtonConfirm from '../../components/ButtonConfirm';

export default function Example() {
  //Init state
  const [modal, setModal] = useState({ visible: false, modalDatas: null });
  const [listRotation, setlistRotation] = useState([]);
  const [loading, setLoading] = useState(true);

  //Init const data
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên vòng quay',
      key: 'rotationName',
      dataIndex: 'rotationName',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (data) => numberWithCommas(data)
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: () => localStorage.getItem('unit')
    },
    {
      title: 'Ảnh thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (thumbnail, record) => <Image width={80} src={thumbnail ? `http://vongquay.shop/` + thumbnail : '/treasure.svg'} />
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => <Switch onClick={() => switchButton(status, record)} defaultChecked={!!status} />
    },
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'id',
      render: (id) => (
        <>
          <Button type="primary" onClick={() => showModal(id)}>Chi tiết</Button>
          <ButtonConfirm action={() => deleteRotation(id)}>
            <Button type="danger" className="ml-3" >Xóa vòng quay</Button>
          </ButtonConfirm>
        </>
      )
    },
  ];

  const columnsDetail = [
    {
      title: 'ID',
      dataIndex: 'valueId',
      key: 'valueId',
    },
    {
      title: 'Giá trị',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'Tỉ lệ',
      dataIndex: 'ratio',
      key: 'ratio',
      render: (ratio) => {
        return ratio + '%'
      }
    },
    {
      title: 'Chữ hiển thị',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Ảnh hiển thị',
      key: 'photo',
      dataIndex: 'photo',
      render: (photo, record) => <Image preview={false} width={30} src={photo ? `http://vongquay.shop/` + photo : '/treasure.svg'} />
    },
  ];

  //Init function
  const showModal = (id) => {
    const modalDatas = listRotation.find(item => item.id === id);

    modalDatas.createValueJsons.map(data => {
      data.key = data.valueId;
      return data;
    });

    setModal({
      visible: true,
      modalDatas: modalDatas
    });
  };

  const renderModal = () => {
    if (!modal.modalDatas) return;
    return (
      <>
        <Descriptions column={3} title={modal.modalDatas.name} layout="horizontal">
          <Descriptions.Item label="Giá tiền">{numberWithCommas(modal.modalDatas.price) + ' VND/lần' || 'Không xác định'}</Descriptions.Item>
          <Descriptions.Item label="Đơn vị">{modal.modalDatas.unit || 'Không xác định'}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">{modal.modalDatas.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</Descriptions.Item>
        </Descriptions>

        <Table
          className="table-striped"
          bordered="true"
          dataSource={modal.modalDatas.createValueJsons}
          columns={columnsDetail}
          pagination={{ hideOnSinglePage: true, defaultPageSize: 20 }}
        />
      </>
    )
  }

  const handleCancel = () => {
    setModal({ visible: false });
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await axios.put(`/rotation/${record.id}`, { ...record, status: !status });
    } catch (e) {
      setConfirmLoading(false);
      console.log(e);
    }
  };

  const switchButton = async (status, record) => {
    try {
      await axios.patch(`/rotation/updateStatus?rotationId=${record.id}&status=${status == 0 ? 1 : 0}`);
      fetch();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRotation = async (id) => {
    try {
      await axios.delete(`/rotation/delete?rotationId=${id}`);
      fetch();
    } catch (e) {
      console.log(e);
    }
  }

  const fetch = async () => {
    try {
      const res = await axios.get(`/rotation/getListRotation`);
      res.data.map(x => {
        x.key = x.id;
        return x;
      })
      setlistRotation(res.data);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetch() }, []);


  return (
    <>
      <Card
        title="Vòng quay"
        loading={loading}
      >
        <Table
          className="table-striped"
          bordered="true"
          dataSource={listRotation}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
        />

        <Modal
          visible={modal.visible}
          style={{ top: 20 }}
          onOk={handleOk}
          onCancel={handleCancel}
          // confirmLoading={confirmLoading}
          title={modal.modalDatas ? modal.modalDatas.name : ''}
          width={1000}
        >
          {renderModal()}
        </Modal>
      </Card>
    </>
  )
}
