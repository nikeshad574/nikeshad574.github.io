import { Outlet } from "react-router";
import BaseNavbar from "../components/BaseNavbar";

function BaseLayout() {
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
