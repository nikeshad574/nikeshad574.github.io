import { BrowserRouter, Route, Routes } from "react-router";
import P from "./Page";
import { Suspense } from "react";
import BaseLayout from "./layout/BaseLayout";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<P.Home />} />
            <Route path="projects" element={<P.Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
