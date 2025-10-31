import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <>
      <nav>NavBar</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default BaseLayout;
