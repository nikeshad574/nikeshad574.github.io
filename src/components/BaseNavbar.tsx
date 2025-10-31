import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { ExternalLink } from "lucide-react";

const NAVBAR_CONST = [
  {
    title: "Projects",
    link: "/project",
  },
  {
    title: "Experiences",
    link: "/experiences",
  },
  {
    title: "About Me",
    link: "/about",
  },
];

function BaseNavbar() {
  return (
    <nav className="flex items-center justify-between nav-height border-b border-slate-800 px-4 py-2 bg-text">
      <div className="h-full flex gap-4 items-center">
        <Logo className="h-full p-1" />
        <div className=" flex h-full gap-2">
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

      <div className="h-full flex gap-4">
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
