import { Image, notification } from 'antd';
import { useEffect, useState } from 'react';
import axios from '@configs/api-request';
import _ from 'lodash';

export default function Spin({ rotation }) {
  const appId = localStorage.getItem('appId');

  //Style
  const style = {
    card: {
      width: '23%',
      marginRight: '20px',
      marginBottom: '20px',
      display: 'inline-block'
    },
  }

  //State
  const [listValue, setListValue] = useState([0]);

  //Function
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const addValue = () => {
    setListValue([...listValue, listValue[listValue.length - 1] + 1 || 0]);
  };

  const removeValue = (count) => {
    return function () {
      setListValue(listValue.filter(x => x != count))
    };
  }

  const onFinish = async (values) => {
    values.createValueJsons = values.createValueJsons.filter(x => !!x);
    try {
      if (!_.isEmpty(values.thumbnail)) {
        const thumbnail = await toBase64(values.thumbnail.file.originFileObj);
        values.thumbnail = thumbnail.split('base64,')[1];
      }

      await Promise.all(values.createValueJsons.map(async (x) => {
        if (!_.isEmpty(x.photo)) {
          const photoBase64 = await toBase64(x.photo.file.originFileObj);
          x.photo = photoBase64.split('base64,')[1];
        }
        return x;
      }));

      await axios.post(`/rotation/create`, {...values, appId: appId});
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card title="Thêm vòng quay">
      <Form
        name="basic"
        onFinish={onFinish}
      >

        <Descriptions layout="vertical" column={4}>
          <Descriptions.Item label="Tên vòng quay">
            <Form.Item name="rotationName" rules={[{ required: true, message: 'Cần nhập thông tin' }]}>
              <Input style={{width: '100%'}}/>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Giá tiền mỗi lần quay">
            <Form.Item name="price" rules={[{ required: true, message: 'Cần nhập thông tin' }]}>
              <InputNumber />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Ảnh thumbnail">
            <Form.Item name="thumbnail">
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item>
            <Button type="primary" className="mr-3" onClick={addValue}>Thêm ô thưởng</Button>
            <Button type="primary" htmlType="submit" >Tạo vòng quay</Button>
          </Descriptions.Item>
        </Descriptions>

        {
          listValue.map((count, index) =>
            <Card key={count} style={style.card} title={'Ô thưởng số ' + (index + 1)} extra={<Button type="danger" onClick={removeValue(count)}>Xóa</Button>}>
              <Form.Item label="Giá trị" name={['createValueJsons', count, "value"]} rules={[{ required: true, message: 'Cần nhập thông tin' }]}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Tỉ lệ" name={['createValueJsons', count, "ratio"]} rules={[{ required: true, message: 'Cần nhập thông tin' }]}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Thông báo" name={['createValueJsons', count, "text"]}>
                <Input />
              </Form.Item>

              <Form.Item label="Ảnh" name={['createValueJsons', count, "photo"]}>
                <Upload maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Card>
          )
        }
      </Form>
    </Card>
  )
}