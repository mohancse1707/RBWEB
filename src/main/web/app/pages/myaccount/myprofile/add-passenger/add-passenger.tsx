import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, DatePicker, Descriptions, Divider, Form, Input, List, Row, Select, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/shared/reducers';
import {
  addOrUpdatePassenger,
  getPassengers,
  resetEditableFlag,
  updateEditableFlag
} from 'app/pages/myaccount/myprofile/add-passenger/add-passenger.slice';
import moment from 'moment';
import { APP_DATE_FORMAT, DEFAULT_GENDER } from 'app/settings/constants';
import { defaultCustomerPassport, IPassenger, ITravelDocument } from 'app/pages/customer/customer.model';
import { EditFilled } from '@ant-design/icons';

interface IAddPassengerProp {
  prefixSelector: any;
}

export const AddPassenger = (props: IAddPassengerProp) => {
  const [passengerForm] = Form.useForm();
  const { Option } = Select;
  const { passenger, passengerList } = useSelector((state: RootState) => state.addPassengerSlice);
  const { countries } = useSelector((state: RootState) => state.commonReducer);
  const { account } = useSelector((state: RootState) => state.customerReducer);
  const dispatch = useDispatch();

  // All states
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAddPassenger, setShowAddPassenger] = useState(false);
  const [passengerEditable, setPassengerEditable] = useState(false);
  const initialValues = {
    fullName: passenger?.fullName ? passenger?.fullName : null,
    birthDay: passenger?.birthDay ? moment(passenger?.birthDay) : null,
    callingCode: passenger?.callingCode ? passenger?.callingCode : null,
    gender: passenger?.gender ? passenger?.gender : DEFAULT_GENDER,
    mobileNumber: passenger?.mobileNumber ? passenger?.mobileNumber : null,
    emailId: passenger?.emailId ? passenger?.emailId : null,
    travelDocument: passenger?.travelDocuments
      ? {
          expiryDate: passenger?.travelDocuments[0]?.expiryDate ? moment(passenger?.travelDocuments[0]?.expiryDate) : null,
          passportNumber: passenger?.travelDocuments[0]?.passportNumber ? passenger?.travelDocuments[0]?.passportNumber : null,
          issuingCountry: passenger?.travelDocuments[0]?.issuingCountry ? passenger?.travelDocuments[0]?.issuingCountry : null
        }
      : null
  };

  useEffect(() => {
    dispatch(getPassengers());
  }, []);
  useEffect(() => {
    setInitLoading(false);
    passengerForm.setFieldsValue(initialValues);
  }, [passenger]);

  const addTraveller = () => {
    // passengerForm.resetFields();
    // passengerForm.setFieldsValue({});
    setShowAddPassenger(true);
    setPassengerEditable(false);
  };
  const editPassenger = (item) => {
    setShowAddPassenger(false);
    setPassengerEditable(true);
    dispatch(updateEditableFlag(item));
  };

  const discardTraveller = (item) => {
    setShowAddPassenger(false);
    setPassengerEditable(false);
    dispatch(resetEditableFlag(item));
  };

  const discardAddTraveller = () => {
    passengerForm.resetFields();
    setShowAddPassenger(false);
  };

  const savePassenger = (values) => {
    console.log('PASSENGER', values);
    const travelDocuments = [];
    values.travelDocument.id = passenger?.travelDocuments[0]?.id;
    travelDocuments.push(values.travelDocument);
    values.customerId = account.id;
    values.travelDocuments = travelDocuments;
    values.id = passenger.id;
    dispatch(addOrUpdatePassenger(values));
    setShowAddPassenger(false);
  };

  const validateFormValues = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
      // eslint-disable-next-line no-template-curly-in-string
      email: '${label} is not a valid email!'
    }
  };

  const onLoadMore = () => {};
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const addPassengerForm = (
    <div style={{ display: 'block', padding: 20 }}>
      <Form
        initialValues={initialValues}
        form={passengerForm}
        validateMessages={validateFormValues}
        hideRequiredMark
        layout='vertical'
        name='basic'
        onFinish={savePassenger}
      >
        <Divider orientation='left'>Passenger Details</Divider>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name='fullName' label='Full Name' rules={[{ required: true }]}>
              <Input placeholder='Please enter full name as per passport' />
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
          <Col span={12}>
            <Form.Item name='birthDay' label='Date of birth' rules={[{ required: false }]}>
              <DatePicker format={APP_DATE_FORMAT} style={{ width: '100%' }} placeholder='From' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='mobileNumber' label='Mobile Number' rules={[{ required: false }]}>
              <Input addonBefore={props.prefixSelector} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='emailId' label='Email Id' rules={[{ type: 'email', required: false }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation='left'>Passport Details</Divider>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name={['travelDocument', 'passportNumber']} label='Passport Number' rules={[{ required: false }]}>
              <Input placeholder='Passport Number' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['travelDocument', 'issuingCountry']} label='Issuing Country' rules={[{ required: false }]}>
              <Select showSearch placeholder='Please select'>
                {countries.map((item) => (
                  <Option value={item.countryName} key={item.id}>
                    {item.countryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={['travelDocument', 'expiryDate']} label='Expiry Date' rules={[{ required: false }]}>
              <DatePicker format={APP_DATE_FORMAT} style={{ width: '100%' }} placeholder='From' />
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType='submit' type='primary'>
          Save
        </Button>
        {showAddPassenger ? (
          <Button onClick={discardAddTraveller} style={{ marginLeft: 8 }}>
            Discard
          </Button>
        ) : (
          ''
        )}
      </Form>
    </div>
  );
  return (
    <div className='my-account-section' style={{ marginTop: 10 }}>
      <div className='ant-descriptions-header'>
        <div className='ant-descriptions-title'>Travellers List</div>
        <div className='ant-descriptions-extra'>
          <button disabled={passengerEditable} onClick={addTraveller} type='button' className='ant-btn ant-btn-primary'>
            <span>Add Traveller</span>
          </button>
        </div>
      </div>
      {showAddPassenger ? addPassengerForm : <div />}
      <Divider />
      {passengerList ? (
        <List
          loading={initLoading}
          itemLayout='horizontal'
          dataSource={passengerList}
          renderItem={(item) => (
            <>
              <List.Item
                actions={[
                  item.isEditable ? (
                    <a aria-disabled={item.isEditable} onClick={() => discardTraveller(item)} key='list-cancel-edit'>
                      Cancel
                    </a>
                  ) : (
                    <a onClick={() => editPassenger(item)} key='list-loadmore-edit'>
                      <EditFilled />
                    </a>
                  )
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.fullName} />}
                    title={<a href='https://ant.design'>{item.fullName}</a>}
                    description={`${item.callingCode ? item.callingCode : ''}-${item.mobileNumber ? item.mobileNumber : ''}`}
                  />
                  <div>{item.emailId}</div>
                </Skeleton>
              </List.Item>
              {item.isEditable ? addPassengerForm : <div />}
            </>
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddPassenger;
