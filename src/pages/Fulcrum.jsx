
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
        <p>Fulcrum is a solution for professionals in the field of movement sciences. It's an inclusive people management solution, which empowers the users with several tools to overcharge their workflow. Fulcrum allows the creation of individual ICF standard profiles and interventions for patients with the two built in React Flow based editors. The flow diagram approach allows for fast overviews, hierarchical and evidence based organization of interventions, testing and profiling.
        The current Alpha version allows multiple interventions for each patient, templating for fast designing and planning, and modular composition of single activities within a discipline agnostic frame.</p></div>
        <div label="fulcrum-image"><img src={FulcrumUI} className="shadow-lg shadow-gray-800" style={{width: '100%'}} alt="Fulcrum UI" /></div>
      </div>


        <Footer />

    </div>
  );
};

export default Fulcrum;

