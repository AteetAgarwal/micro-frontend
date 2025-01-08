import React, { useState, Suspense, lazy } from 'react';

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
      <div>
        <h1>Insurance Portal</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Suspense fallback={<div>Loading Insurance Details...</div>}>
            <div id="insurance-details">
              <InsuranceDetails />
            </div>
          </Suspense>
          <Suspense fallback={<div>Loading Premium Details...</div>}>
            <div id="premium-details">
              <PremiumDetails/>
            </div>
          </Suspense>
        </div>
      </div>
  );
}

export default App;
