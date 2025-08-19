// // // // import React, { useEffect } from 'react';
// // // // import AOS from 'aos';
// // // // import 'aos/dist/aos.css';

// // // // // Import homepage components
// // // // import Hero from '../components/Hero'; // Assuming you have a Hero component
// // // // import BelowHero from '../components/BelowHero';
// // // // import InfoCard from '../components/InfoCard';
// // // // import Accordian from '../components/Accordian';

// // // // const Home = () => {
// // // //   // Initialize the animation library when the component mounts
// // // //   useEffect(() => {
// // // //     AOS.init({
// // // //       duration: 1000, // Animation duration
// // // //       once: true,     // Animate elements only once
// // // //     });
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       <Hero />
// // // //       <BelowHero />
// // // //       <InfoCard />
// // // //       <Accordian />
// // // //     </>
// // // //   );
// // // // };

// // // // export default Home;



// // // import React, { useEffect } from 'react';
// // // import AOS from 'aos';
// // // import 'aos/dist/aos.css';

// // // // Import the redesigned components with corrected paths
// // // import Hero from '../components/Hero.jsx';
// // // import BelowHero from '../components/BelowHero.jsx';
// // // import InfoCard from '../components/InfoCard.jsx';
// // // import Accordian from '../components/Accordian.jsx';

// // // const Home = () => {
// // //   useEffect(() => {
// // //     AOS.init({
// // //       duration: 1000,
// // //       once: true,
// // //     });
// // //   }, []);

// // //   return (
// // //     // The main container for the homepage content
// // //     <div className="bg-gray-50">
// // //       <Hero />
// // //       <BelowHero />
// // //       <InfoCard />
// // //       <Accordian />
// // //     </div>
// // //   );
// // // };

// // // export default Home;


// // // FILE: client/src/pages/Home.jsx
// // import React from "react";
// // import Hero from "../components/Hero.jsx";
// // import BelowHero from "../components/BelowHero.jsx";
// // import InfoCard from "../components/InfoCard.jsx";
// // import Accordian from "../components/Accordian.jsx";

// // const Home = () => {
// //   return (
// //     <div className="bg-gray-50">
// //       <Hero />
// //       <BelowHero />
// //       <InfoCard />
// //       <Accordian />
// //     </div>
// //   );
// // };

// // export default Home;

// // FILE: client/src/pages/Home.jsx
// import React from "react";
// import Hero from "../components/Hero.jsx";
// import BelowHero from "../components/BelowHero.jsx";
// import InfoCard from "../components/InfoCard.jsx";
// import Accordian from "../components/Accordian.jsx";
// import Footer from "../components/Footer.jsx";

// const Home = () => {
//   return (
//     <div className="bg-gray-50">
//       <Hero />
//       <BelowHero />
//       <InfoCard />
//       <Accordian />
      
//     </div>
//   );
// };
// export default Home;

// client/src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BelowHero from "../components/BelowHero";
import InfoCard from "../components/InfoCard";
import Accordian from "../components/Accordian";
import Footer from "../components/Footer";

const Home = ({ loggedIn, setLoggedIn, setUser }) => {
  return (
    <div className="bg-gray-50">
      
      <Hero />
      <BelowHero />
      <InfoCard />
      <Accordian />
      
    </div>
  );
};

export default Home;