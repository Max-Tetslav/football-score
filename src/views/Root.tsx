import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import MyHeader from '../components/containers/header/Header';

function Root(): JSX.Element {
  return (
    <Layout className="layout">
      <MyHeader />
      <Outlet />
    </Layout>
  );
}

export default Root;
