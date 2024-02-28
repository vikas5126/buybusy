import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
// import { buyBusyContext } from './buyBusyContext';
import CustomBuyBusyProvider from './buyBusyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomBuyBusyProvider>
      <App/>
    </CustomBuyBusyProvider>
  </React.StrictMode>
);

