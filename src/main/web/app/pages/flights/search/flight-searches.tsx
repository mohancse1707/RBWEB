/*
 * Copyright (c) 2021. ReserveBuddy.
 *  All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, AutoComplete, DatePicker, Select } from 'antd';
import { SearchOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

import Home from 'app/pages/home/home';
import { IFlightSearchModel, TravellingIn } from 'app/pages/flights/search/flight-search-model';
import moment from 'moment';
import { registerCustomer } from 'app/pages/customer/register/customer-register.slice';
import { searchFlight } from 'app/pages/flights/search/flight-search.slice';
import { useDispatch } from 'react-redux';
import './flight-search.css';
const { RangePicker } = DatePicker;
export const FlightSearchForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [departingOptions, setDepartingOptions] = useState<{ value: string }[]>([]);
  const [arrivingOptions, setArrivingOptions] = useState<{ value: string }[]>([]);
  const [flightSearchData, setFlightSearchData] = useState({} as IFlightSearchModel);
  const [isSearchHovering, setIsSearchHovering] = useState(false);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return moment().add(-1, 'days') >= current;
  };
  useEffect(() => {
    if (departingOptions.length === 0) {
      setDepartingOptions([
        {
          value: 'DXB'
        },
        {
          value: 'LON'
        },
        {
          value: 'LHR'
        },
        {
          value: 'BLR'
        }
      ]);
    }
    if (arrivingOptions.length === 0) {
      setArrivingOptions([
        {
          value: 'DXB'
        },
        {
          value: 'LON'
        },
        {
          value: 'LHR'
        },
        {
          value: 'BLR'
        }
      ]);
    }
  });

  const onSearchFlight = (values: any) => {
    console.log('Received values of form: ', values.dateRange);
    const searchFlightData = {} as IFlightSearchModel;
    searchFlightData.departingFrom = values.departingFrom;
    searchFlightData.arrivingTo = values.arrivingTo;
    searchFlightData.dateFrom = moment(values.dateRange[0]).toDate(); // moment(values.dateFrom).toDate();
    searchFlightData.dateTo = values.dateRange[1] ? moment(values.dateRange[1]).toDate() : null;
    const value: string = TravellingIn.ECONOMY.toString();
    searchFlightData.travellingIn = value;
    dispatch(searchFlight(searchFlightData));
  };
  // const mockVal = (str: string, repeat: number = 1) => {
  //   return {
  //     value: str.repeat(repeat)
  //   };
  // };
  // const [value, setValue] = useState('');
  // const [options, setOptions] = useState<{ value: string }[]>([]);
  const onSearch = (searchText: string) => {
    // setOptions(!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]);
  };
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };
  const onChange = (data: string) => {
    // setValue(data);
  };

  const toggleHover = () => {
    setIsSearchHovering((isSearchHovering) => !isSearchHovering);
  };
  return (
    <Form form={form} layout='vertical' onFinish={onSearchFlight}>
      <div className='rb-search-tab-cont'>
        <Row justify='center' style={{ textAlign: 'center' }}>
          <Col xs={24} xl={4}>
            <Form.Item name='departingFrom'>
              <AutoComplete options={departingOptions} onSelect={onSelect} onSearch={onSearch} placeholder='Departs From' />
            </Form.Item>
          </Col>
          <Col xs={24} xl={4}>
            <Form.Item name='arrivingTo'>
              <AutoComplete
                options={arrivingOptions}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
                placeholder='Arriving To'
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} xl={3}> */}
          {/*  <Form.Item name='dateFrom'> */}
          {/*    <DatePicker placeholder='From' defaultValue={undefined} disabledDate={disabledDate} /> */}
          {/*  </Form.Item> */}
          {/* </Col> */}
          {/* <Col xs={24} xl={3}> */}
          {/*  <Form.Item name='dateTo'> */}
          {/*    <DatePicker placeholder='To' defaultValue={undefined} disabledDate={disabledDate} /> */}
          {/*  </Form.Item> */}
          {/* </Col> */}
          <Col xs={24} xl={4}>
            <Form.Item name='dateRange'>
              <RangePicker allowEmpty={[false, true]} placeholder={['From', 'To']} defaultValue={undefined} disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={4}>
            <Form.Item name='travellingIn'>
              <Select defaultValue='ECONOMY'>
                <Select.Option value='ECONOMY'>Economy</Select.Option>
                <Select.Option value='BUSINESS'>Business</Select.Option>
                <Select.Option value='FIRST'>First</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Row gutter={[1, 1]} justify='center' align='middle'>
        <Col span={1}>Single</Col>
        <Col span={1}>Round</Col>
        <Col span={1}>Multi</Col>
      </Row>

      <Row justify='center' align='middle'>
        <Col span={12} offset={10}>
          <Button type='primary' shape='round' icon={<SearchOutlined />} htmlType='submit'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FlightSearchForm;
