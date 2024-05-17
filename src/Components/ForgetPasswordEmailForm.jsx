import React, { useState } from 'react';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import { emailValidation } from '../Utils/Validations';
import { sendForgotPasswordEmail } from '../API';

const ForgetPasswordEmailForm = ({ openModel, setOpenModel }) => {
    const [email, setSelectedEmail] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value);
        setEmailError(emailValidation(e.target.value));
    }

    const handleOk = async () => {
        try {
            setLoading(true);
            if (email!="" && email!=null) {
            if (emailError == null || emailError === "") {
                const sendEmailResult = await sendForgotPasswordEmail(email);
                if (sendEmailResult.status === 200) {
                    if (sendEmailResult.data?.errorStatus === 0) {
                        notification.success({
                            message: "Email Sent!",
                            description: "Please check your email to reset the password"
                        });
                    } else {
                        notification.warning({
                            message: "No existing User!",
                            description: "Please contact the administrator."
                        });
                    }
                }
            }
            handleCancel();
                            
        }else{
            message.warning("Please fill the email")
        }
        } catch (error) {
            message.error("Email sending Error!");
            console.error("error ", error);
            handleCancel();
        }
        setLoading(false);
       
    };

    const handleCancel = () => {
        setOpenModel(false);
        setEmailError(null);
        setSelectedEmail(null);
    };

    return (
        <Modal
            title="Forgot Password"
            okButtonProps={{ className: "bg-blue-500" }}
            okText="Reset Password"
            open={openModel}
            maskClosable={false}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="reset"
                    className='bg-blue-500 hover:bg-blue-600  text-white'
                    loading={loading}
                    onClick={handleOk}
                    disabled={emailError}
                >
                    Reset Password
                </Button>
            ]}
        >
            <Form layout='vertical'>
                <Form.Item
                    label="Registered Email"
                    validateStatus={emailError ? "error" : "success"}
                    help={emailError || ""}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input className="bg-[#EBEEFF]" name="email" onChange={handleEmailChange} value={email} placeholder="Please enter your registered email" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ForgetPasswordEmailForm;
