import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Card */}
          <div className="md:w-1/2" data-aos="fade-right">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Wanna reduce your <br />
                <span className="text-green-600">carbon footprints?</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-2 mb-4">
                Calculate it first
              </h2>
              <p className="text-gray-600 text-lg">
                Our platform, PrithWe, empowers households and businesses to calculate their environmental impact accurately with easy-to-use tools and insightful data.
              </p>
              <div className="mt-8">
                <Link 
                  to="/calculator" 
                  className="inline-block bg-green-500 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition-colors"
                >
                  Track Your Carbon Footprint
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Side: Image */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img 
              src="/assets/Hero.gif" 
              alt="Carbon Footprint Meter" 
              className="rounded-lg w-full h-auto max-w-md mx-auto shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;