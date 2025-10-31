import { Outlet } from "react-router";
import BaseNavbar from "../components/BaseNavbar";

function BaseLayout() {
  return (
    <>
      <BaseNavbar />
      <main className="nav-height">
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
