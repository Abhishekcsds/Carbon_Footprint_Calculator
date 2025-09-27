// client/src/components/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About PrithWe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering sustainable decisions for a greener future
          </p>
        </div>

        {/* About PrithWe Section */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
            About PrithWe
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              PrithWe is a platform dedicated to helping individuals and businesses calculate and reduce their carbon footprint. We provide tools and resources to promote sustainability and environmental consciousness in everyday practices.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
            Our Mission
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Our mission at PrithWe is to empower people and organizations to make informed decisions that contribute to a greener and more sustainable world. We believe in the importance of environmental stewardship and strive to make a positive impact on the planet.
            </p>
          </div>
        </section>

        {/* Founders Section */}
        <section className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-8 text-center">
            Meet the Founders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Abhishek Yadav</h3>
              <p className="text-green-600 font-medium">Founder</p>
            </div>

            {/* Co-founders */}
{[
  { name: 'Harshita Dubey', icon: '👩‍💼' },
  { name: 'Shubham Sharma', icon: '👨‍💼' },
  { name: 'Mohd Suhel Imshad', icon: '👨‍💼' }, // ✅ fixed to male
  { name: 'Naman Verma', icon: '👨‍💼' },
].map((member, index) => (
  <div key={index} className="text-center">
    <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <span className="text-4xl text-gray-500">{member.icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
    <p className="text-green-600 font-medium">Co-founder</p>
  </div>
))}

          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            to="/calculator" 
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            Calculate Your Carbon Footprint
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;