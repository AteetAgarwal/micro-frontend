import React from 'react';
import ReactDOM from 'react-dom/client';
import PremiumDetails from './components/premiumDetails';


const root = ReactDOM.createRoot(document.getElementById('insurance-premium'));
root.render(
  <React.StrictMode>
    <PremiumDetails sumInsured={300000} />
  </React.StrictMode>
);


