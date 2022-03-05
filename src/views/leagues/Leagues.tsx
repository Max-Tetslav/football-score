import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import cl from './Leagues.module.scss';

const { Content } = Layout;

function Leagues() {
  return (
    <Content className={cl.content}>
      <Outlet />
    </Content>
  );
}

export default Leagues;
