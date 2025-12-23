import { BrowserRouter, Route, Routes } from "react-router";
import P from "./Page";
import { Suspense } from "react";
import BaseLayout from "./layout/BaseLayout";
import SuspenseFallBack from "./components/SuspenseFallBack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<SuspenseFallBack />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<P.Home />} />
              <Route path="projects" element={<P.Projects />} />
              <Route
                path="projects/:project_slug"
                element={<P.SingleProject />}
              />
              <Route path="experiences" element={<P.Experiences />} />
              <Route path="about" element={<P.AboutMe />} />
              <Route path="contact" element={<P.Contact />} />
              <Route path="*" element={<P.NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
