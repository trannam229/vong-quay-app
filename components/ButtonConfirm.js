import { Popconfirm } from 'antd';

export default function ButtonConfirm({ action, children }) {
  function confirm() {
    action();
  }

  function cancel() {
  }

  return (
    <Popconfirm
      title="Bạn chắc chắn thực hiện thao tác này chứ?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="OK"
      cancelText="Không"
    >
      {children}
    </Popconfirm>
  )
}
