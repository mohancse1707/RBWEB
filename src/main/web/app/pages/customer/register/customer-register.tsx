/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerCustomer,
  sendActivationCode,
  resetCustomerRegister,
  hideRegister
} from 'app/pages/customer/register/customer-register.slice';
import { RootState } from 'app/shared/reducers';
import { Modal, Button, Form, Input, Alert, message } from 'antd';
import { ICustomer } from 'app/pages/customer/customer.model';
import { CustomerLogin } from 'app/pages/customer/login/customer-login';
import { showLogin } from 'app/pages/customer/customer.slice';
interface ICustomerRegisterProp {}

export const CustomerRegister = (props: ICustomerRegisterProp) => {
  const dispatch = useDispatch();
  const { error, isActivationCodeSent, activationResponse, customerRegisterResponse, showRegisterModal } = useSelector(
    (state: RootState) => state.customerRegisterReducer
  );
  const { showLoginModal } = useSelector((state: RootState) => state.customerReducer);
  const [customerMailId, setCustomerMailId] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(isActivationCodeSent);

  useEffect(() => {
    if (error && error.type === 'validation') {
      message.error(error.message);
    }
    if (isActivationCodeSent) {
      setShowOTPForm(true);
      OTPSuccessMessage();
    }
    if (customerRegisterResponse) {
      message.success('Account is created successfully, please login');
      dispatch(hideRegister());
      dispatch(showLogin());
    }
  }, [isActivationCodeSent, error, customerRegisterResponse]);

  const handleOk = () => {};

  const handleCancel = () => {
    setShowOTPForm(false);
    dispatch(resetCustomerRegister());
  };
  const onFinish = (values) => {
    console.log('Success:', values.emailId);
    setCustomerMailId(values.emailId);
    dispatch(sendActivationCode(values.emailId));
  };

  const confirmRegistration = (values) => {
    const customer = {} as ICustomer;
    customer.emailId = customerMailId;
    customer.verificationCode = values.verificationCode;
    customer.password = values.password;
    customer.confirmPassword = values.confirmPassword;
    customer.roles = ['Customer'];
    console.log('Success:', values.verificationCode);
    dispatch(registerCustomer(customer));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      email: '${label} is not a valid email!'
    }
  };

  const validateConfirmRegister = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!'
  };

  const OTPSuccessMessage = () => {
    message.success('Verification code has been sent your mail Id.');
  };

  const reSendOTP = () => {
    console.log('customerMailId:', customerMailId);
    dispatch(sendActivationCode(customerMailId));
  };

  const validateOTP = async (rule, value) => {
    if (!value || activationResponse.data.verificationCode === value) {
      return Promise.resolve();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('The two passwords that you entered do not match!');
  };

  const renderedLogin = showLoginModal ? <CustomerLogin /> : '';

  // @ts-ignore
  return (
    <div>
      <Modal
        maskClosable={false}
        title='Create New Account'
        visible={showRegisterModal}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {error && error.type !== 'validation' ? (
          <div>
            <h1>Something went wrong...</h1>
            <div>{error.message}</div>
          </div>
        ) : showOTPForm ? (
          <Form
            validateMessages={validateConfirmRegister}
            hideRequiredMark
            layout='vertical'
            name='basic'
            onFinish={confirmRegistration}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item>
              <Form.Item label='OTP' name='verificationCode' rules={[{ required: true }]}>
                <Input placeholder='Please enter your OTP' />
              </Form.Item>
              <a onClick={reSendOTP} style={{ float: 'right' }}>
                Resend OTP
              </a>
            </Form.Item>
            <Form.Item label='Password' hasFeedback name='password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm Password'
              name='confirmPassword'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  type: 'string'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('The two passwords that you entered do not match!');
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ alignItems: 'center', marginTop: 10 }}>
              <Button block type='primary' htmlType='submit'>
                SUBMIT
              </Button>
            </div>
          </Form>
        ) : (
          <Form
            validateMessages={validateMessages}
            hideRequiredMark
            layout='vertical'
            name='basic'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label='Email' name='emailId' rules={[{ type: 'email', required: true }]}>
              <Input placeholder='Please enter your email' />
            </Form.Item>

            <Alert
              style={{ marginBottom: 10 }}
              message='This will be the username for your new MKT account.'
              type='info'
              closable
              showIcon
            />
            <div style={{ alignItems: 'center', marginTop: 10 }}>
              <Button block type='primary' htmlType='submit'>
                REGISTER
              </Button>
            </div>
          </Form>
        )}
      </Modal>
      {renderedLogin}
    </div>
  );
};
