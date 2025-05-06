import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />}/>
        <Route path="/blog/:slug" element={<SinglePost />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
