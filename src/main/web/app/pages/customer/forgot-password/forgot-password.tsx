/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Alert, message, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/shared/reducers';
import { hideRegister, registerCustomer } from 'app/pages/customer/register/customer-register.slice';
import { ICustomer } from 'app/pages/customer/customer.model';
import {
  confirmForgotPassword,
  hideForgotPassword,
  sendForgotPasswordCode
} from 'app/pages/customer/forgot-password/forgot-password.slice';
import { CustomerLogin } from 'app/pages/customer/login/customer-login';
import { showLogin } from 'app/pages/customer/customer.slice';

interface IForgotPasswordProp {}

export const ForgotPassword = (props: IForgotPasswordProp) => {
  const dispatch = useDispatch();

  const [customerMailId, setCustomerMailId] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const { showLoginModal } = useSelector((state: RootState) => state.customerReducer);
  const { error, showForgotPasswordModal, isForgotPasswordCodeSent, confirmForgotPasswordResponse } = useSelector(
    (state: RootState) => state.forgotPasswordSlice
  );

  useEffect(() => {
    if (error && error.type === 'validation') {
      message.error(error.message);
    }
    if (isForgotPasswordCodeSent) {
      setShowOTPForm(true);
      OTPSuccessMessage();
    }
    if (confirmForgotPasswordResponse) {
      message.success('Your password has been changed successfully, please login');
      dispatch(hideForgotPassword());
      dispatch(showLogin());
    }
  }, [isForgotPasswordCodeSent, error, confirmForgotPasswordResponse]);

  const handleCancel = () => {
    setShowOTPForm(false);
    dispatch(hideForgotPassword());
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      email: '${label} is not a valid email!'
    }
  };

  const confirmPasswordUpdate = (values) => {
    const customer = {} as ICustomer;
    customer.emailId = customerMailId;
    customer.verificationCode = values.verificationCode;
    customer.newPassword = values.password;
    console.log('Success:', values.verificationCode);
    dispatch(confirmForgotPassword(customer));
  };

  const onFinish = (values) => {
    console.log('Success:', values.emailId);
    setCustomerMailId(values.emailId);
    dispatch(sendForgotPasswordCode(values.emailId));
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const OTPSuccessMessage = () => {
    message.success('Verification code has been sent your mail Id.');
  };

  const reSendOTP = () => {
    console.log('customerMailId:', customerMailId);
    dispatch(sendForgotPasswordCode(customerMailId));
  };

  const validateOTP = async (rule, value) => {
    // if (!value || activationResponse.data.verificationCode === value) {
    //   return Promise.resolve();
    // }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('The two passwords that you entered do not match!');
  };
  const renderedLogin = showLoginModal ? <CustomerLogin /> : '';
  // @ts-ignore
  return (
    <div>
      <Modal maskClosable={false} title='Forgot Password' visible={showForgotPasswordModal} footer={null} onCancel={handleCancel}>
        {error && error.type !== 'validation' ? (
          <div>
            <h1>Something went wrong...</h1>
            <div>{error.message}</div>
          </div>
        ) : showOTPForm ? (
          <Form
            validateMessages={validateMessages}
            hideRequiredMark
            layout='vertical'
            name='basic'
            onFinish={confirmPasswordUpdate}
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
            <Alert
              style={{ marginBottom: 10 }}
              message='You will receive the forgot password OTP on your registered email.'
              type='info'
              closable
              showIcon
            />
            <Form.Item label='Email' name='emailId' rules={[{ type: 'email', required: true }]}>
              <Input placeholder='Please enter your email' />
            </Form.Item>

            <div style={{ alignItems: 'center', marginTop: 10 }}>
              <Button block type='primary' htmlType='submit'>
                SEND OTP
              </Button>
            </div>
          </Form>
        )}
      </Modal>
      {renderedLogin}
    </div>
  );
};
