import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";

import Home from "./pages/Home";
import PhotoDetails from "./pages/PhotoDetails";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/photo/:id" element={<PhotoDetails />}/>
      </Routes>
    </Router>
  );
}

export default App;