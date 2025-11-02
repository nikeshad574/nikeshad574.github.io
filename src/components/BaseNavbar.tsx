import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { ExternalLink } from "lucide-react";
import BaseMobileNav from "./BaseMobileNav";
import { NAVBAR_CONST } from "../conf/constants";

function BaseNavbar() {
  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 right-0 bg-primary-900/50 backdrop-blur-xs z-40 nav-height border-b border-primary-800 px-4 py-2 bg-text">
      <div className="h-full flex gap-4 items-center">
        <div className=" md:hidden">
          <BaseMobileNav />
        </div>

        <Logo className="h-full p-1" />
        <div className="hidden md:flex h-full gap-2 ">
          {NAVBAR_CONST.map((item) => (
            <NavLink
              key={item.title}
              to={item.link}
              className="flex hover:bg-primary-800 delay-150 items-center justify-center px-2 rounded-sm font-medium"
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="hidden md:flex h-full gap-4">
        <Link
          to="/external"
          className="flex gap-2 items-center justify-center px-2 rounded-sm font-medium"
        >
          Blogs
          <ExternalLink className="h-3 w-3 text-primary-500" />
        </Link>
        <NavLink
          to="/contact"
          className="bg-primary flex items-center justify-center px-4 rounded-sm font-medium"
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default BaseNavbar;
