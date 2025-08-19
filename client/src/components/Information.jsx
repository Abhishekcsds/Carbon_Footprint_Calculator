// client/src/components/Information.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Information = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Carbon Footprint Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential knowledge for sustainable business practices
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* What is Carbon Footprint */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
              What is Carbon Footprint?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                It represents the total amount of greenhouse gases, particularly carbon dioxide, 
                that your business is directly or indirectly responsible for emitting into the atmosphere.
              </p>
              <p>
                Every action that releases carbon leaves a mark on the environment, 
                similar to an actual footprint.
              </p>
            </div>
          </section>

          {/* Why You Need to Calculate It */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
              Why You Need to Calculate It?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Understanding and reducing your carbon footprint is essential for sustainable business practices.
              </p>
              <p>
                It's not only an ethical responsibility but also a strategic move for enhancing 
                brand reputation and resilience.
              </p>
              <p>
                Consumers and investors are increasingly focusing on environmentally conscious businesses.
              </p>
            </div>
          </section>

          {/* What Indian Government Says */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
              What Indian Government Says?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Government of India has set ambitious goals for carbon reduction and sustainable development.
              </p>
              <p>
                India plays a crucial role in the global carbon reduction effort due to its 
                diverse industrial landscape and rapidly growing economy.
              </p>
            </div>
          </section>

          {/* Our Goals */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
              Our Goals
            </h2>
            <ul className="space-y-4 text-gray-700 list-disc pl-6">
              <li>Facilitating Accurate Carbon Calculations</li>
              <li>Aligning with National and Global Targets</li>
              <li>Empowering Sustainable Decision-Making</li>
              <li>Continuous Improvement</li>
            </ul>
          </section>

          {/* Call to Action */}
          <section className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Get Started with PrithWe
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards a sustainable future with PrithWe. Empower your business 
              to make informed decisions, reduce your carbon footprint, and contribute to a 
              greener and more resilient world.
            </p>
            <Link 
              to="/calculator" 
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition-colors"
            >
              Calculate Your Carbon Footprint
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Information;