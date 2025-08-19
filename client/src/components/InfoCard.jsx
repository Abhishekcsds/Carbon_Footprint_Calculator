// // FILE: client/src/components/InfoCard.jsx
// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const FeatureCard = ({ heading, description }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full sm:w-1/2 md:w-1/4" data-aos="fade-up">
//     <h3 className="text-xl text-green-600 font-semibold mb-2">{heading}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const InfoCard = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <div className="bg-gray-50 py-16">
//       <div className="container mx-auto px-6 text-center">
//         <h2 className='font-bold text-3xl md:text-4xl mb-12 text-gray-800' data-aos="fade-up">Why Choose Us?</h2>
//         <div className="flex flex-wrap items-stretch justify-center gap-8">
//           <FeatureCard 
//             heading="Easy to use"
//             description="Our platform offers a user-friendly interface, making it simple for anyone to calculate their carbon footprint effortlessly."
//           />
//           <FeatureCard
//             heading="Accurate Results"
//             description="We provide precise calculations, ensuring that you receive accurate insights into your environmental impact."
//           />
//           <FeatureCard
//             heading="Chart representation"
//             description="Visualize your carbon footprint breakdown through interactive pie charts, allowing for easy interpretation of data."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default InfoCard;

// client/src/components/InfoCard.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeatureCard = ({ heading, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full" data-aos="fade-up">
    <h3 className="text-xl text-green-600 font-semibold mb-2">{heading}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const InfoCard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className='font-bold text-3xl md:text-4xl mb-12 text-center text-gray-800' data-aos="fade-up">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            heading="Easy to use"
            description="Our platform offers a user-friendly interface, making it simple for anyone to calculate their carbon footprint effortlessly."
          />
          <FeatureCard
            heading="Accurate Results"
            description="We provide precise calculations, ensuring that you receive accurate insights into your environmental impact."
          />
          <FeatureCard
            heading="Chart representation"
            description="Visualize your carbon footprint breakdown through interactive pie charts, allowing for easy interpretation of data."
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;