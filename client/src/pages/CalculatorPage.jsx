import React from 'react';
import HouseholdForm from '../components/HouseholdForm'; // Assuming you have this component

const CalculatorPage = ({ user }) => {
  // Extracts the user's first name for a personalized greeting
  const firstName = user ? user.name.split(' ')[0] : 'User';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Welcome, {firstName}!
      </h1>
      <p className="text-center text-slate-600 mb-8">
        Let's calculate your carbon footprint.
      </p>
      <HouseholdForm />
    </div>
  );
};

export default CalculatorPage;