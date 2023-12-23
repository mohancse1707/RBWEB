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
import { hideLogin, login } from 'app/pages/customer/customer.slice';
import { showRegister } from 'app/pages/customer/register/customer-register.slice';
import { showForgotPassword } from 'app/pages/customer/forgot-password/forgot-password.slice';
interface ICustomerLoginProp {}

export const CustomerLogin = (props: ICustomerLoginProp) => {
  const dispatch = useDispatch();
  const { error, showLoginModal } = useSelector((state: RootState) => state.customerReducer);
  const [form] = Form.useForm();

  useEffect(() => {
    if (error && error.type === 'validation') {
      message.error(error.message);
    }
    if (showLoginModal === false) {
      handleCancel();
    }
  }, [error, showLoginModal]);

  const handleCancel = () => {
    dispatch(hideLogin());
  };

  const register = () => {
    dispatch(hideLogin());
    dispatch(showRegister());
  };

  const forgot = () => {
    dispatch(hideLogin());
    dispatch(showForgotPassword());
  };

  const onLogin = (values) => {
    console.log('form values', form.getFieldValue('username'));
    console.log('form values', form.getFieldValue('password'));
    // console.log('form values', form.resetFields());
    sessionStorage.getItem('master_class');
    console.log('Success:', values.username);
    dispatch(login(values.username, values.password, values.rememberMe));
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      email: '${label} is not a valid email!'
    }
  };

  // @ts-ignore
  return (
    <div>
      <Modal maskClosable={false} title='Login' visible={showLoginModal} footer={null} onCancel={handleCancel}>
        <Form
          initialValues={{ rememberMe: false }}
          form={form}
          validateMessages={validateMessages}
          hideRequiredMark
          layout='vertical'
          name='basic'
          onFinish={onLogin}
        >
          <Form.Item label='Email' name='username' rules={[{ type: 'email', required: true }]}>
            <Input placeholder='Please enter your email' />
          </Form.Item>
          <Form.Item label='Password' hasFeedback name='password' rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name='rememberMe' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
            <a className='login-form-forgot' onClick={forgot}>
              Forgot password
            </a>
          </Form.Item>

          <div style={{ alignItems: 'center', marginTop: 10 }}>
            <Button block type='primary' htmlType='submit'>
              LOGIN
            </Button>
            Or <a onClick={register}>register now!</a>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
