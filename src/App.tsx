import { BrowserRouter, Route, Routes } from "react-router";
import P from "./Page";
import { Suspense } from "react";
import BaseLayout from "./layout/BaseLayout";
import SuspenseFallBack from "./components/SuspenseFallBack";

function App() {
  return (
    <Suspense fallback={<SuspenseFallBack />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<P.Home />} />
            <Route path="projects" element={<P.Projects />} />
            <Route path="experiences" element={<P.Experiences />} />
            <Route path="about" element={<P.AboutMe />} />
            <Route path="contact" element={<P.Contact />} />
            <Route path="*" element={<P.NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
