import "@/App.css";
import Layout from "@/components/Layout/Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import ErrorPage from "./pages/error/ErrorPage";
import Experience from "./pages/experience/Experience";
import Destinations from "./pages/destinations/Destinations";
import { lazy, Suspense } from "react";

const LazyHomePage = lazy(() => import("./pages/home/HomePage"));
const LazyContactPage = lazy(() => import("./pages/contact/Contact"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading</div>}>
                <LazyHomePage />
              </Suspense>
            }
          />
          <Route path="destinations" element={<Destinations />} />
          <Route path="experiences" element={<Experience />} />
          <Route
            path="contact"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <LazyContactPage />
              </Suspense>
            }
          />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
