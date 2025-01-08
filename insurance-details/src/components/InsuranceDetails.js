import React, { useEffect, useState } from "react";
import './InsuranceDetails.scss';

let inputValue = 300000; // Default sum insured
let insuranceData = null; // Insurance data
const listeners = [];

export function getInputValue() {
  return inputValue;
}

export function setInputValue(value) {
  inputValue = value;
  listeners.forEach((listener) => listener(value));
}

export function getInsuranceData() {
  return insuranceData;
}

export function setInsuranceData(data) {
  insuranceData = data;
}

export const subscribeToSumInsuredUpdates = (callback) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
  };
};

function InsuranceDetails() {
  const sampleInsuranceData = {
    policyDetails: {
      currentSumInsured: 300000,
    },
    members: [
      { name: "ME", relationship: "Self", gender: "Male", dob: "1989-01-04" },
      { name: "Wife", relationship: "Spouse", gender: "Female", dob: "1990-04-13" },
      { name: "Daughter", relationship: "Daughter", gender: "Female", dob: "2020-09-18" },
    ],
  };

  const [localInputValue, setLocalInputValue] = useState(inputValue);
  const [localInsuranceData, setLocalInsuranceData] = useState(insuranceData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("insuranceDetails");
    if (data) {
      setLocalInsuranceData(JSON.parse(data));
      setInsuranceData(JSON.parse(data)); // Update external reference
      dispatchSumInsuredUpdateEvent(localInputValue);
    } else {
      setLocalInsuranceData(sampleInsuranceData);
      setInsuranceData(sampleInsuranceData); // Fallback data
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if(localInsuranceData === null) return;
    localStorage.setItem("insuranceDetails", JSON.stringify(localInsuranceData));
    setInsuranceData(localInsuranceData); // Sync external reference
  }, [localInsuranceData]);

  const handleInputChange = (e) => {
    const updatedValue = parseInt(e.target.value, 10) || 0;
    setLocalInputValue(updatedValue);
    setInputValue(updatedValue); // Sync external reference
  };

  const handleSubmit = () => {
    dispatchSumInsuredUpdateEvent(localInputValue);
  };

  const dispatchSumInsuredUpdateEvent = (value) => {
    const event = new CustomEvent("sumInsuredUpdated", {
      detail: { sumInsured: value },
    });
    window.dispatchEvent(event);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="insurance-details">
      <h1>Policy Details</h1>
      <div>
        <strong>Your current sum insured:</strong> ₹{" "}
        <input
          type="text"
          value={localInputValue}
          onChange={handleInputChange}
          placeholder="Enter sum insured"
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <table className="insurance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>Gender</th>
            <th>DOB (YYYY-MM-DD)</th>
          </tr>
        </thead>
        <tbody>
          {localInsuranceData && localInsuranceData.members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.relationship}</td>
              <td>{member.gender}</td>
              <td>{member.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InsuranceDetails;