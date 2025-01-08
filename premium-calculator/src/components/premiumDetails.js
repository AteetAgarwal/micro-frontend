import React, { useState, useEffect } from 'react';
import { createWorker } from '../workers/createWorker';
import './PremiumDetails.scss';

export default function PremiumDetails() {
  const [premiumPerYear, setPremiumPerYear] = useState(0);
  const [premiumPerMonth, setPremiumPerMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [premWorker, setPremWorker] = useState(null);
  //Considered 3 lakhs as default value so that MFE rendered successfully as a self hosted application
  const [sumInsured, setSumInsured] = useState(300000); 

  useEffect(() => {
    import("insuranceDetails/InsuranceDetailsIndex")
      .then(({ getInputValue, subscribeToSumInsuredUpdates }) => {
        console.log("Sum Insured from insuranceDetails:", getInputValue());
        setSumInsured(getInputValue());
        const unsubscribe = subscribeToSumInsuredUpdates((updatedValue) => {
          console.log("Sum Insured updated:", updatedValue);
          setSumInsured(updatedValue);
        });
        return () => {
          unsubscribe(); // Cleanup subscription on unmount
        };
      })
      .catch((err) => {
        console.error("Failed to load insuranceDetails module:", err);
      });
  }, []);

  useEffect(() => {
    async function loadWorker() {
        const worker = await createWorker(__webpack_public_path__ + 'workers/premiumcalc.worker.js');
        setPremWorker(worker);
    }
    loadWorker();
  }, []);

  // This effect will run every time sumInsured changes
  useEffect(() => {
    if (sumInsured > 0) {
      calculatePremiumWithWorker(sumInsured);
    }
  }, [sumInsured, premWorker]);

  const calculatePremiumWithWorker = (sumInsured) => {
    if (window.Worker && premWorker) {
      setIsLoading(true);
      setError(null);
      console.log('Posting to worker:', { sumInsured });

      // Send the sum insured to the worker for calculation
      premWorker.postMessage({ sumInsured });

      // Listen for the result from the worker
      premWorker.onmessage = function (e) {
        setPremiumPerYear(e.data.premiumPerYear); 
        setPremiumPerMonth(e.data.premiumPerMonth); 
        setIsLoading(false);
        //premWorker.terminate();  // Terminate the worker once done
      };

      // Handle any errors that occur within the worker
      premWorker.onerror = function (e) {
        setError('An error occurred during premium calculation.');
        setIsLoading(false);
        premWorker.terminate();
      };
    } else {
      setError('Your browser does not support Web Workers.');
    }
  };

  if (sumInsured <= 0) {
    return <div>No premium details to show.</div>;
  }

  if(!premWorker) return <></>

  return (
    <div className="premium-details">
      <h2>Premium Details</h2>
      {isLoading && <p className="loading-message">Calculating Premium...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="premium-amount">
        <p className="premium-per-year">
          Calculated Premium/year: ₹ <span>{Number(premiumPerYear).toLocaleString('en-IN')}</span>
        </p>
        <p className="premium-per-month">
          Calculated Premium/month: ₹ <span>{Number(premiumPerMonth).toLocaleString('en-IN')}</span>
        </p>
      </div>
    </div>
  );
}
