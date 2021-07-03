import { Card, Descriptions } from 'antd';
import axios from '@configs/api-request';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

export default function Example() {
  const route = useRouter();
  const token = Cookies.get('access-token');
  if (!token) {
    console.log('token check');
    route.push({ pathname: '/login' });
  }

  const [monitoring, setMonitoring] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await axios.get(`/monitoring`);
      setMonitoring(res.data);
    } catch (e) {
      if (e.response.status == '403') {
        route.push({ pathname: '/login' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetch() }, []);
  return (
    <Card loading={isLoading} title="Thống kê">
      <Descriptions column={3} bordered layout="vertical">
        <Descriptions.Item label="Số người đăng ký trong ngày">{numberWithCommas(monitoring.memberRegisteredToday) || 0}</Descriptions.Item>
        <Descriptions.Item label="Số card nạp thành công/tổng card trong ngày">{(numberWithCommas(monitoring.correctCardToday) || 0) + '/' + (numberWithCommas(monitoring.totalCardToday) || 0)}</Descriptions.Item>
        <Descriptions.Item label="Doanh thu trong ngày">{numberWithCommas(monitoring.incomeToday) || 0}</Descriptions.Item>
        <Descriptions.Item label="Tổng số người đăng ký">{numberWithCommas(monitoring.totalMember) || 0}</Descriptions.Item>
        <Descriptions.Item label="Số card nạp thành công/tổng card">{(numberWithCommas(monitoring.totalCorrectCard) || 0) + '/' + (numberWithCommas(monitoring.totalCard) || 0)}</Descriptions.Item>
        <Descriptions.Item label="Doanh thu">{numberWithCommas(monitoring.totalIncome) || 0}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}