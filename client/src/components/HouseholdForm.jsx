import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoughnutChart from './DoughnutChart.jsx';

// Reusable input field component
const FormInput = ({ label, unit, value, onChange, name, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    <div className="flex items-center">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        min="0"
      />
      {unit && <span className="ml-3 text-gray-600">{unit}</span>}
    </div>
  </div>
);

const HouseholdForm = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    gasCylinders: '',
    waste: '',
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const submissionData = {
      commonFormData: {
        electricityUsage: Number(formData.electricity),
        gasCylinder: Number(formData.gasCylinders),
        wasteGeneration: Number(formData.waste),
      },
      familyFormData: [], // This can be expanded later
    };

    try {
      const { data } = await axios.post('/api/household/save', submissionData, { withCredentials: true });
      setResult({
        recommendation: data.recommendation,
        contributions: data.contributions,
        totalEmissions: data.totalEmissions,
      });
      toast.success("Calculation successful!");
    } catch (error) {
      // --- START OF FIX ---
      // Added missing curly braces around the catch block
      toast.error(error.response?.data?.message || "Calculation failed.");
      // --- END OF FIX ---
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Household Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <FormInput label="Monthly Electricity Consumption" unit="kWh" value={formData.electricity} onChange={handleChange} name="electricity" placeholder="e.g., 250" />
        <FormInput label="Monthly LPG Cylinders Used" unit="cylinders" value={formData.gasCylinders} onChange={handleChange} name="gasCylinders" placeholder="e.g., 1" />
        <FormInput label="Monthly Waste Generated" unit="kg" value={formData.waste} onChange={handleChange} name="waste" placeholder="e.g., 15" />
        
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" disabled={isLoading} className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors">
            {isLoading ? "Calculating..." : "Calculate Footprint"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-10">
          <div className="text-center p-6 bg-gray-100 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Carbon Footprint Results</h3>
            <p className="text-2xl mt-2 font-bold">Total Monthly Emissions: <span className="text-green-700">{result.totalEmissions.toFixed(2)} kg CO₂e</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
              <div className="prose" dangerouslySetInnerHTML={{ __html: result.recommendation.replace(/\n/g, '<br />') }} />
            </div>
            <div>
              <DoughnutChart contributions={result.contributions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseholdForm;
