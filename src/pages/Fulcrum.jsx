
import React from 'react';
import NavMenu from '../components/NavMenu'; // Assuming NavMenu component is correctly imported
import Footer from '../components/Footer';
import FulcrumUI from '../assets/fulcrumUI.png'; // Assuming Footer component is correctly imported




const Fulcrum = () => {


  return (
    <div className="relative h-screen w-screen overflow-scroll">



        <NavMenu />


      <div className="text-black h-full flex flex-row gap-5 items-center justify-center w-4/5 mx-auto">
        <div label="fulcrum-content" className="w-1/2"><h1 className="text-3xl font-light"> Fulcrum App</h1>
        <p>Fulcrum is an app that allows easy patients management in the field of movement sciences. The application spans from physical education to physical therapy. It allows to create interventions that are structured following up to standards framework with regards to periodization, time management and activities structure. The alpha version is fully equipped with multiple interventions creation, templating to speed up your workflow and multiple patients management.</p></div>
        <div label="fulcrum-image"><img src={FulcrumUI} className="shadow-lg shadow-gray-800" style={{width: '100%'}} alt="Fulcrum UI" /></div>
      </div>


        <Footer />

    </div>
  );
};

export default Fulcrum;

