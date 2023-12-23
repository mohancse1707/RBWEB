/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/shared/reducers';
import { Col, message, Row, Tabs, Typography } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import FlightSearchForm from 'app/pages/flights/search/flight-searches';
import './home.css';
import { MyProfile } from '../myaccount/myprofile/my-profile';
interface IHomeProp {}
const { Title } = Typography;
const { TabPane } = Tabs;
export const Home = (props: IHomeProp) => {
  const { account, isAuthenticated, logoutSuccess } = useSelector((state: RootState) => state.customerReducer);
  useEffect(() => {
    if (logoutSuccess) {
      message.success('You have logout successfully');
    }
  }, [logoutSuccess]);

  return (
    <div>
      {/* {isAuthenticated ? <label>Welcome {account.emailId}</label> : <label>Welcome to MKTRAVELNOW.COM</label>} */}
      <Row justify='center'>
        <Col>
          <Title>Reserve your TRIP with us!</Title>
        </Col>
      </Row>
      <Tabs centered defaultActiveKey='1' tabPosition='top'>
        <TabPane tab={<span>Flights</span>} key='1'>
          <FlightSearchForm />
        </TabPane>
        <TabPane tab={<span>Hotels</span>} key='2'>
          Hotels
        </TabPane>
        <TabPane tab={<span>Cabs</span>} key='3'>
          Cabs
        </TabPane>
      </Tabs>

      {/* <Row style={{ textAlign: 'center' }}> */}
      {/*  <Col span={24}>col</Col> */}
      {/* </Row> */}
      {/* <Row style={{ textAlign: 'center' }}> */}
      {/*  <Col span={12}>col-12</Col> */}
      {/*  <Col span={12}>col-12</Col> */}
      {/* </Row> */}
      {/* <Row style={{ textAlign: 'center' }} gutter={[8, 8]}> */}
      {/*  <Col span={12}>TEST</Col> */}
      {/*  <Col span={12}>TEST</Col> */}
      {/* </Row> */}
      {/* <Row> */}
      {/*  <Col span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}> */}
      {/*    1 col-order-responsive */}
      {/*  </Col> */}
      {/*  <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}> */}
      {/*    2 col-order-responsive */}
      {/*  </Col> */}
      {/*  <Col span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}> */}
      {/*    3 col-order-responsive */}
      {/*  </Col> */}
      {/*  <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}> */}
      {/*    4 col-order-responsive */}
      {/*  </Col> */}
      {/* </Row> */}
      {/* <Row gutter={[16, 16]}> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}

      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/* </Row> */}
      {/* <Row gutter={[16, 16]}> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/*  <Col span={2}>TEST</Col> */}
      {/* </Row> */}

      {/* <Row> */}
      {/* <Col xs={24} xl={8}> */}
      {/*   One of three columns */}
      {/* </Col> */}
      {/* <Col xs={24} xl={8}> */}
      {/*   One of three columns */}
      {/* </Col> */}
      {/* <Col xs={24} xl={8}> */}
      {/*   One of three columns */}
      {/* </Col> */}
      {/* </Row> */}
      {/* <Row> */}
      {/*  <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
      {/*    Col */}
      {/*  </Col> */}
      {/*  <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
      {/*    Col */}
      {/*  </Col> */}
      {/*  <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
      {/*    Col */}
      {/*  </Col> */}
      {/* </Row> */}
    </div>
  );
};
export default Home;
