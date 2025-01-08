import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import InsuranceDetail from './components/InsuranceDetails';

const root = ReactDOM.createRoot(document.getElementById('insurance-details'));
root.render(
  <React.StrictMode>
    <InsuranceDetail />
  </React.StrictMode>
);