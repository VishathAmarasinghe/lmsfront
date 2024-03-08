import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const GradeDeleteButtonPopUp = ({ opendeleteModel, setOpendeleteModel }) => {
  
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpendeleteModel(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpendeleteModel(false);
  };

  return (
    <Modal
      title={
        <div>
          <ExclamationCircleOutlined style={{ color: 'orange', marginRight: '8px',fontSize:"20px" }} />
          Confirmation
        </div>
      }
      visible={opendeleteModel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <p>{modalText}</p>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button className='bg-blue-700 ml-3' onClick={handleOk} loading={confirmLoading}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GradeDeleteButtonPopUp;
