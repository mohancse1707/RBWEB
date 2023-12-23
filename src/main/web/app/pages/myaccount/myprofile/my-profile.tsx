/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from 'app/shared/reducers';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Avatar, message, Col, Row, Descriptions, Button, Input, Select, DatePicker, Upload, Space } from 'antd';
import { defaultCustomerPassport, ICustomer, Passport } from 'app/pages/customer/customer.model';
import { getAccount, updateCustomerProfile } from 'app/pages/customer/customer.slice';
import moment from 'moment';
import { updateCustomerPassport, getCustomerPassport } from 'app/pages/myaccount/myprofile/my-profile.slice';
import { AddPassenger } from './add-passenger/add-passenger';
import { SERVER_API_URL } from 'app/settings/constants';
import { ChangePasswordComponent } from 'app/pages/myaccount/change-password/change-password';

interface IMyProfileProp {}

export const MyProfile = (props: IMyProfileProp) => {
  const { account } = useSelector((state: RootState) => state.customerReducer);
  const { customerPassport } = useSelector((state: RootState) => state.myProfileReducer);
  const { countries } = useSelector((state: RootState) => state.commonReducer);

  // All states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassport, setShowEditPassport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const { Option } = Select;
  const dispatch = useDispatch();
  const [profileForm] = Form.useForm();
  const [passportForm] = Form.useForm();
  useEffect(() => {
    dispatch(getCustomerPassport());
    if (account) {
      profileForm.setFieldsValue(initialValues);
    }
  }, [account]);
  //
  useEffect(() => {
    if (customerPassport) {
      passportForm.setFieldsValue(initialValuesPassport);
    }
  }, [customerPassport]);
  //
  // useEffect(() => {
  //   setCustomerPhoneState(JSON.parse(JSON.stringify(customerPhone)));
  // }, [customerPhone]);

  const editProfile = () => {
    setShowEditProfile(true);
  };
  const discardProfile = () => {
    setShowEditProfile(false);
  };
  // const saveProfile = (values) => {
  //   dispatch(updateCustomerProfile(accountState));
  //   setShowEditProfile(false);
  // };
  //
  // const onChangeInput = (event, options) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //
  //   if (options.formName === 'profile') {
  //     accountState[name] = value;
  //     setAccountState(accountState);
  //   } else if (options.formName === 'phone') {
  //   } else {
  //     customerPassportState.passport[name] = value;
  //     setCustomerPassportState({ ...customerPassportState });
  //   }
  // };
  //
  // const onChangeSelect = (event, options) => {
  //   if (options.formName === 'profile') {
  //     accountState[options.name] = event;
  //     setAccountState(accountState);
  //   } else if (options.formName === 'phone') {
  //     customerPhoneState.phone.country[options.name] = event;
  //     setCustomerPhoneState(customerPhoneState);
  //   } else {
  //     options.name === 'countryId'
  //       ? (customerPassportState.passport.issuingCountry[options.name] = event)
  //       : (customerPassportState.passport[options.name] = event);
  //     setCustomerPassportState({ ...customerPassportState });
  //   }
  // };
  //
  // const onChangeDate = (event, options) => {
  //   if (options.formName === 'profile') {
  //     accountState[options.name] = event;
  //     setAccountState({ ...accountState });
  //   } else if (options.formName === 'phone') {
  //   } else {
  //   }
  // };
  //
  // const onChangePassportInput = (event) => {
  //   customerPassportState.passport[event.target.name] = event.target.value;
  //   setCustomerPassportState({ ...customerPassportState });
  // };

  const editPassport = () => {
    setShowEditPassport(true);
  };

  const discardPassport = () => {
    setShowEditPassport(false);
  };

  const savePassportDetails = (values) => {
    let saveCustomerPassport = {} as any;
    if (!customerPassport) {
      saveCustomerPassport = defaultCustomerPassport;
    } else {
      saveCustomerPassport = { ...customerPassport };
    }
    saveCustomerPassport.expiryDate = values.expiryDate;
    saveCustomerPassport.passportNumber = values.passportNumber;
    saveCustomerPassport.issuingCountry = values.issuingCountry;

    saveCustomerPassport.customerId = account.id;
    dispatch(updateCustomerPassport(saveCustomerPassport));
    setShowEditPassport(false);
  };

  const validateFormValues = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      email: '${label} is not a valid email!'
    }
  };

  const savePassportDetailsFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name='callingCode' noStyle>
      <Select showSearch optionFilterProp='children' style={{ width: 100 }}>
        {countries.map((item) => (
          <Option value={item.callingCode} key={item.id}>
            {item.callingCode} - {item.countryName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  // const prefixSelector =
  //   customerPhoneState.phone && customerPhoneState.phone.country ? (
  //     <Select
  //       showSearch
  //       optionFilterProp='children'
  //       value={customerPhoneState.phone.country.countryId}
  //       onChange={(value, name) => onChangeSelect(value, { name: 'countryId', formName: 'phone' })}
  //       style={{ width: 70 }}
  //     >
  //       {countries.map((item) => (
  //         <Option value={item.countryId} key={item.countryId}>
  //           {item.phonePrefix} - {item.countryName}
  //         </Option>
  //       ))}
  //     </Select>
  //   ) : (
  //     ''
  //   );

  const initialValues = {
    countryId: account && account.callingCode ? account.callingCode : null,
    fullName: account ? account.fullName : '',
    birthDate: account && account.birthDate ? moment(account.birthDate) : null,
    gender: account ? account.gender : '',
    mobileNumber: account ? account.mobileNumber : '',
    callingCode: account ? account.callingCode : '',
    emailId: account ? account.emailId : ''
  };

  const initialValuesPassport = {
    expiryDate: customerPassport && customerPassport.expiryDate ? moment(customerPassport.expiryDate) : null,
    passportNumber: customerPassport ? customerPassport.passportNumber : '',
    issuingCountry: customerPassport ? customerPassport.issuingCountry : null
  };

  const savePersonalInfo = (values) => {
    const customer = {} as ICustomer;
    customer.id = account.id;
    customer.fullName = values.fullName;
    customer.birthDate = values.birthDate;
    customer.gender = values.gender;
    customer.mobileNumber = values.mobileNumber;
    customer.callingCode = values.callingCode;
    dispatch(updateCustomerProfile(customer));
    setShowEditProfile(false);
  };

  const onSubmitPersonalInfoFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageURL(info.file.response.message);
      dispatch(getAccount());
    }
  };

  const uploadButton = () => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const UPLOAD_API_URL = SERVER_API_URL + '/api/customer/upload-avatar';

  // @ts-ignore
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Row justify='center' className='my-account-section'>
            <Upload
              name='file'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action={UPLOAD_API_URL}
              data={{ id: account.id }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {account.avatarURL ? <Avatar src={account.avatarURL} size={100} icon={<UserOutlined />} /> : uploadButton}
            </Upload>
          </Row>
        </Col>
        <Col span={18}>
          <Row justify='center' className='my-account-section'>
            <Form
              form={profileForm}
              validateMessages={validateFormValues}
              hideRequiredMark
              layout='vertical'
              name='basic'
              onFinish={savePersonalInfo}
            >
              {showEditProfile ? (
                <>
                  <div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <Button onClick={discardProfile} style={{ marginRight: 8 }}>
                      Discard
                    </Button>
                    <Button htmlType='submit' type='primary'>
                      Save
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name='fullName' label='Full Name' rules={[{ required: true }]}>
                        <Input value={account.fullName} placeholder='Please enter full name as per passport' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name='gender' label='Gender' rules={[{ required: false }]}>
                        <Select placeholder='Please select'>
                          <Option value='MALE'>MALE</Option>
                          <Option value='FEMALE'>FEMALE</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name='birthDate' label='Date of birth' rules={[{ required: false }]}>
                        <DatePicker style={{ width: '100%' }} placeholder='From' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name='mobileNumber' label='Mobile Number' rules={[{ required: true }]}>
                        <Input addonBefore={prefixSelector} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name='emailId' label='Date of birth' rules={[{ required: false }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12} />
                  </Row>
                </>
              ) : (
                <Descriptions
                  extra={
                    <Button onClick={editProfile} type='primary'>
                      Edit
                    </Button>
                  }
                  title='Profile Details'
                  bordered
                  column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item span={1} label='NAME'>
                    {account.fullName}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='GENDER'>
                    {account.gender}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='BIRTHDAY'>
                    {account.birthDate}
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label='MOBILE NUMBER'>
                    {account.mobileNumber ? `${account.callingCode} - ${account.mobileNumber}` : ''}
                  </Descriptions.Item>
                  <Descriptions.Item span={2} label='EMAIL ID'>
                    {account.emailId}
                  </Descriptions.Item>
                </Descriptions>
              )}
            </Form>
          </Row>
          <ChangePasswordComponent />
          <AddPassenger prefixSelector={prefixSelector} />
          {/* <Row justify='center' className='my-account-section'>

          </Row>
          <Row justify='center' className='my-account-section'>

          </Row> */}
        </Col>
      </Row>
    </>
  );
};
