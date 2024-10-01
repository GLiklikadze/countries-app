import "@/App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "@/components/Layout/Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
