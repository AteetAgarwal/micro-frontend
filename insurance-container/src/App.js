import React, { Suspense, lazy } from 'react';
import './App.scss';

function App() {
  // Dynamic imports for MFEs
  const InsuranceDetails = lazy(() =>
    import('insuranceDetails/InsuranceDetailsIndex').then((module) => {
      if (!module || !module.default) {
        throw new Error('Module does not export a default component');
      }
      return { default: module.default };
    })
  );

  const PremiumDetails = lazy(() =>
    import('insurancePremium/InsurancePremiumIndex').then((module) => {
      if (!module || !module.default) {
        throw new Error('Module does not export a default component');
      }
      return { default: module.default };
    })
  );

  return (
    <div className="container-app">
      <h1>Insurance Portal</h1>
      <div className="mfe-container">
        <Suspense fallback={<div className="loading-placeholder">Loading Insurance Details...</div>}>
          <div id="insurance-details">
            <InsuranceDetails />
          </div>
        </Suspense>
        <Suspense fallback={<div className="loading-placeholder">Loading Premium Details...</div>}>
          <div id="premium-details">
            <PremiumDetails />
          </div>
        </Suspense>
      </div>
    </div>  
  );
}

export default App;
