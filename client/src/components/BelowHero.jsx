// // // FILE: client/src/components/BelowHero.jsx
// // import React, { useEffect } from "react";
// // import AOS from "aos";
// // import "aos/dist/aos.css";

// // const BelowHero = () => {
// //   useEffect(() => {
// //     AOS.init({ duration: 1000, once: true });
// //   }, []);

// //   return (
// //     <div className="bg-white py-16">
// //       <div className="container mx-auto px-6 text-center" data-aos="fade-up">
// //         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What is Carbon Footprint?</h2>
// //         <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
// //           Just like an actual footprint it is a mark you leave upon the environment (not with your shoes 😉) but with every action that releases carbon.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };
// // export default BelowHero;


// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const BelowHero = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <div className="bg-white py-16">
//       <div className="container mx-auto px-6 text-center" data-aos="fade-up">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What is Carbon Footprint?</h2>
//         <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
//           Just like an actual footprint it is a mark you leave upon the environment
//           <br />(not with your shoes 😉) but with every action that releases carbon.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BelowHero;

// client/src/components/BelowHero.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BelowHero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-aos="fade-up">
          What is Carbon Footprint?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto" data-aos="fade-up">
          Just like an actual footprint it is a mark you leave upon the environment
          <br />(not with your shoes 😊) but with every action that releases carbon.
        </p>
      </div>
    </div>
  );
};

export default BelowHero;