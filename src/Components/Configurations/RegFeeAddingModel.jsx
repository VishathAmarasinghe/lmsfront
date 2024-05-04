import React, { useState } from 'react';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import { salaryValidation } from '../../Utils/Validations';
import { createNewRegistrationFee } from '../../API';

const RegFeeAddingModel = ({fetchRegisrationFees, openFeeAddingModel, setOpenFeeAddingModel }) => {
    const [regFeeData,setRegFeeData]=useState({});
    const [overallValidateError,setOverallValidateError]=useState({});
  const handleOk = () => {
    setOpenFeeAddingModel(false);
  };

  const handleCancel = () => {
    setOpenFeeAddingModel(false);
  };



  const handleSave = async() => {
    try {
        if (checkValidationStatusToSubmit()) {
            const creationResult=await createNewRegistrationFee(regFeeData);
            if (creationResult.status==200) {
                notification.success({
                    description:"All registration payments value is changed to new value",
                    message:"Registration fee added successfully!",
                })
            }
            setOpenFeeAddingModel(false);
        }else{
            message.error("please check your inputs!")
        }
    } catch (error) {
        console.log("registration payment fee adding error!",error);
        message.error("registration payment fee adding error!")
    }
    fetchRegisrationFees();

    
  };



  const handleChangeInputs = (e) => {
    setRegFeeData({ ...regFeeData, [e.target.name]: e.target.value });
    handleValidations(e)
  };

  const checkValidationStatusToSubmit=()=>{
    let errorStatus=true;
    for (const key in overallValidateError) {
      if (overallValidateError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns=["amount"]
    for(const value of requiredcolumns){
      if (regFeeData[value]=="" || regFeeData[value]==null || regFeeData[value]==undefined) {
        message.error("please fill mandatory columns")
        errorStatus=false;
      }
    }
    return errorStatus;
  }



  
  const handleValidations=(e)=>{
    if (e.target.name=="amount") {
      setOverallValidateError({...overallValidateError,amount:salaryValidation(e.target.value)})
    }
  }

  return (
    <Modal
      title="Registration Payment adding panel"
      maskClosable={false}
      open={openFeeAddingModel}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" className='bg-blue-500 hover:bg-blue-600 text-white font-medium' onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
        <Form layout='vertical'>
        <Form.Item
                  label="Enter Registration Fee"
                  validateStatus={overallValidateError?.amount?"error":"success"}
                  help={overallValidateError?.amount || ""}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="bg-[#EBEEFF]"
                    name="amount"
                    onChange={handleChangeInputs}
                    value={regFeeData?.amount}
                    placeholder="Please enter registration fee"
                  />
                </Form.Item>
        </Form>
      
    </Modal>
  );
};

export default RegFeeAddingModel;
