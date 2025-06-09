import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import Fulcrum from "./pages/Fulcrum";
import HumanInTheLoopPost from "./pages/HumanInTheLoopPost";

function AnimatedRoutes() {
  const location = useLocation();

  // Function to scroll to top after exit animation completes
  const handleExitComplete = () => {
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />}/>
        <Route path="/blog/:slug" element={<SinglePost />} />
        <Route path="/fulcrum" element={<Fulcrum />}/>
        <Route path="/blog/human-in-the-loop" element={<HumanInTheLoopPost />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

export default App;
