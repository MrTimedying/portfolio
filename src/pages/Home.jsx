import React from "react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import "../App.css";
import selfImg from "../assets/self.png";
import ProjectCard from "../components/ProjectCard";

const fulcrum = {
  title: "Fulcrum",
  body: "Fulcrum is a management software for experts in the field of movement sciences, such as physical education, adapted physical activity and physical rehabilitation.",
  language: "Javascript",
  backgroundColor: "#f7df1e",
  status: "Alpha",
  version: "0.7.0",    
};

const Home = () => (
  <>
    <NavMenu />
    <main
      style={{ background: "#fffff8" }}
      className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-6 pb-12 "
    >
      <div id="main_content" className=" text-black grid grid-cols-2 gap-4">
        <div id="avatar" className="col-span-1 text-center flex justify-center items-center my-6">
          <img
            src={selfImg}
            alt="Antonio's avatar"
            className="w-64 h-64 rounded-full shadow-lg object-cover border-4 border-[#e07a5f] bg-white dark:bg-zinc-800"
          />
        </div>
        <div id="stuff" className="col-span-1 text-center">
          <div id="presentation" className="text-center mb-6">
            <p>Hello, this is Antonio.</p>
            <p>
              I'm a kinesiologist, passionate about AI, movement sciences and
              coding. At the moment is all I have for you.
            </p>
          </div>
          <div
            id="projects_cards"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            <ProjectCard link={"https://github.com/MrTimedying/fulcrum"} data={fulcrum} />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Home;

