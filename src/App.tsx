import "@/App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "@/components/Layout/Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import ErrorPage from "./pages/error/ErrorPage";
import Planning from "./pages/planning/Planning";
import Experience from "./pages/experience/Experience";
import Destinations from "./pages/destinations/Destinations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="experiences" element={<Experience />} />
          <Route path="planning" element={<Planning />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
