import React, { useState, useEffect, lazy } from 'react';
import { createWorker } from '../workers/createWorker';

export default function PremiumDetails() {
  const [premiumPerYear, setPremiumPerYear] = useState(0);
  const [premiumPerMonth, setPremiumPerMonth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [premWorker, setPremWorker] = useState(null);
  const [sumInsured, setSumInsured] = useState(300000); //Considered 3 lakhs as default value so that its index rendered successfully

  useEffect(() => {
    import("insuranceDetails/InsuranceDetailsIndex")
      .then(({ getInputValue, subscribeToSumInsuredUpdates }) => {
        console.log("Sum Insured from MFE:", getInputValue());
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
        console.error("Failed to load MFE module:", err);
      });
  }, []);

  useEffect(() => {
    async function loadWorker() {
        const worker = await createWorker(__webpack_public_path__ + 'workers/premiumcalc.worker.js');
        setPremWorker(worker);
    }
    loadWorker();
  }, []);

  /*
  useEffect(() => {
    const handleSumInsuredUpdate = (event) => {
      setSumInsured(event.detail.sumInsured);
      console.log('Updated Sum Insured:', event.detail.sumInsured);
      calculatePremiumWithWorker(event.detail.sumInsured);
    };

    // Listen for the custom event
    window.addEventListener('sumInsuredUpdated', handleSumInsuredUpdate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('sumInsuredUpdated', handleSumInsuredUpdate);
    };
  }, []);
  */

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
    <div>
      <h2>Premium Details</h2>
      {isLoading && <p>Calculating Premium...</p>}
      {error && <p>{error}</p>}
      <p>Calculated Premium/year: ₹ {premiumPerYear}</p>
      <p>Calculated Premium/month: ₹ {premiumPerMonth}</p>
    </div>
  );
}
