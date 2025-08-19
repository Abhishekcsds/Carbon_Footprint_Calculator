// // FILE: client/src/components/Accordian.jsx
// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const AccordianItem = ({ question, answer, isOpen, onClick }) => (
//     <div className="border-b border-gray-300">
//       <button
//         onClick={onClick}
//         className="w-full flex justify-between items-center text-left py-4"
//       >
//         <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600">{question}</h3>
//         <span className="text-2xl text-gray-500">{isOpen ? "−" : "+"}</span>
//       </button>
//       <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
//         <div className="overflow-hidden">
//           <div className="pb-4 pr-4 text-gray-600">
//             <p>{answer}</p>
//           </div>
//         </div>
//       </div>
//     </div>
// );

// const Accordian = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);
  
//   const data = [
//     { question: "What is PrithWe?", answer: "PrithWe is a comprehensive carbon footprint calculator designed for both households and businesses." },
//     { question: "How do I use the carbon footprint calculator?", answer: "Simply log in, select whether you are a household or a business, and fill in the required details." },
//     { question: "I forgot my password. What should I do?", answer: "Click on 'Forgot Password' on the login page and follow the instructions." },
//     { question: "Why is it important to calculate my carbon footprint?", answer: "It helps you understand your environmental impact and take steps to reduce it." },
//   ];

//   const handleToggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="bg-white py-16">
//       <div className="max-w-screen-lg w-full mx-auto px-6">
//         <h2 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-800" data-aos="fade-up">
//           FAQs
//         </h2>
//         <div className="space-y-2" data-aos="fade-up">
//           {data.map((item, index) => (
//             <AccordianItem
//               key={index}
//               {...item}
//               isOpen={openIndex === index}
//               onClick={() => handleToggle(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Accordian;


// client/src/components/Accordian.jsx
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AccordianItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-4" data-aos="fade-up">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left"
    >
      <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
      <span className="text-2xl text-gray-500">{isOpen ? "−" : "+"}</span>
    </button>
    {isOpen && (
      <div className="mt-2 text-gray-600">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const data = [
    { 
      question: "What is PrithWe?", 
      answer: "PrithWe is a comprehensive carbon footprint calculator designed for both households and businesses." 
    },
    { 
      question: "How do I use the carbon footprint calculator?", 
      answer: "Simply log in, select whether you are a household or a business, and fill in the required details." 
    },
    { 
      question: "I forgot my password. What should I do?", 
      answer: "Click on 'Forgot Password' on the login page and follow the instructions." 
    },
    { 
      question: "Why is it important to calculate my carbon footprint?", 
      answer: "It helps you understand your environmental impact and take steps to reduce it." 
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">
          FAQs
        </h2>
        <div className="space-y-2">
          {data.map((item, index) => (
            <AccordianItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordian;