import { Outlet, useLocation } from "react-router";
import BaseNavbar from "../components/BaseNavbar";
import { useEffect } from "react";

function BaseLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <BaseNavbar />
      <main className="margin-nav-height">
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
