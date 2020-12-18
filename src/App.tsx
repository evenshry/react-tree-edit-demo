import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Index from './pages';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="app">
        <Index />
      </div>
    </ConfigProvider>
  );
}

export default App;
