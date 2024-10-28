import "@/App.css";
import Layout from "@/components/Layout/Layout.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./pages/about/About";
import ErrorPage from "./pages/error/ErrorPage";
import Experience from "./pages/experience/Experience";
import Hero from "./components/Hero/Hero";
import { lazy, Suspense } from "react";
import CountryDetailsPage from "./pages/destinations/views/country-details/CountryDetailsPage";

const LazyDestinationsPage = lazy(
  () => import("./pages/destinations/DestinationsPage"),
);
const LazyContactPage = lazy(() => import("./pages/contact/Contact"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route path="" element={<Hero />} />
          <Route
            path="destinations"
            element={
              <Suspense fallback={<div>Loading</div>}>
                <LazyDestinationsPage />
              </Suspense>
            }
          />
          <Route path="destinations/:id" element={<CountryDetailsPage />} />
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
        <Route path="/" element={<Navigate to="/ka/" />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
