import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import PageNotFound from "./page/PageNotFound.js";
import AppBar from "./components/AppBar/AppBar.js";

import Converter from "./page/Converter.js";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <header>
        <AppBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
