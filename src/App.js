import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Video from "./Pages/VideoDetails";
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
