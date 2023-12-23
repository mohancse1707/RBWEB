import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from 'app/shared/reducers';
import { ChangePassword, ICustomer } from 'app/pages/customer/customer.model';
import { updatePassword } from 'app/pages/myaccount/change-password/change-password.slice';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, Descriptions, Form, Input, message } from 'antd';

interface IChangePasswordProp {}

export const ChangePasswordComponent = (props: IChangePasswordProp) => {
  const { changePassword, successMessage } = useSelector((state: RootState) => state.changePasswordSlice);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ChangePassword>();

  const onSubmit: SubmitHandler<ChangePassword> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);
  // const confirmPasswordUpdate = (changePassword: ChangePassword) => {
  //   dispatch(updatePassword(changePassword));
  // };

  const confirmPasswordUpdate = (values) => {
    const changePassword = {} as ChangePassword;
    console.log('values:', values);
    changePassword.currentPassword = values.currentPassword;
    changePassword.newPassword = values.newPassword;
    changePassword.confirmPassword = values.confirmPassword;
    dispatch(updatePassword(changePassword));
  };
  const confirmPasswordFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateChangePassword = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!'
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {/*  <label>First Name</label> */}
      {/*  <input */}
      {/*    {...register('currentPassword', { */}
      {/*      required: true, */}
      {/*      maxLength: 20, */}
      {/*      pattern: /^[A-Za-z]+$/i */}
      {/*    })} */}
      {/*  /> */}
      {/*  {errors?.currentPassword?.type === 'required' && <p>This field is required</p>} */}
      {/*  {errors?.currentPassword?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>} */}
      {/*  {errors?.currentPassword?.type === 'pattern' && <p>Alphabetical characters only</p>} */}
      {/*  <label>Laste Name</label> */}
      {/*  <label>Age</label>a */}
      {/*  <input {...register('confirmPassword', { min: 18, max: 99 })} /> */}
      {/*  {errors.confirmPassword && <p>You Must be older then 18 and younger then 99 years old</p>} */}
      {/*  <Controller */}
      {/*    rules={{ */}
      {/*      required: true, */}
      {/*      pattern: /^[A-Za-z]+$/i */}
      {/*    }} */}
      {/*    name='newPassword' */}
      {/*    control={control} */}
      {/*    render={({ field }) => <Input.Password {...field} />} */}
      {/*  /> */}
      {/*  {errors.newPassword && <p>This is required.</p>} */}
      {/*  <input {...register('newPassword', { pattern: /^[A-Za-z]+$/i })} /> */}
      {/*  {errors?.newPassword?.type === 'pattern' && <p>Alphabetical characters only</p>} */}
      {/*  <input type='submit' /> */}
      {/* </form> */}
      <div className='ant-descriptions-header'>
        <div className='ant-descriptions-title'>Change Password</div>
        {/* <div className='ant-descriptions-extra'> */}
        {/*  <button type='button' className='ant-btn ant-btn-primary'> */}
        {/*    <span>Edit</span> */}
        {/*  </button> */}
        {/* </div> */}
      </div>
      <Form
        validateMessages={validateChangePassword}
        hideRequiredMark
        layout='vertical'
        name='basic'
        onFinish={confirmPasswordUpdate}
        onFinishFailed={confirmPasswordFailed}
        initialValues={changePassword}
      >
        <Form.Item label='Current Password' hasFeedback name='currentPassword' rules={[{ required: true }]}>
          <Input.Password placeholder='********' />
        </Form.Item>
        <Form.Item label='New Password' hasFeedback name='newPassword' rules={[{ required: true }]}>
          <Input.Password placeholder='********' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              type: 'string'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('The two passwords that you entered do not match!');
              }
            })
          ]}
        >
          <Input.Password placeholder='********' />
        </Form.Item>
        <div style={{ alignItems: 'center', marginTop: 10 }}>
          <Button block type='primary' htmlType='submit'>
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};
