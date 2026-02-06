import { ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import cns from "../utils/classNames";
import { motion } from "motion/react";
import { Link, NavLink } from "react-router";
import { BLOG_CONST, NAVBAR_CONST } from "../conf/constants";

function BaseMobileNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <Menu
        className="cursor-pointer"
        onClick={() => setIsNavOpen((s) => !s)}
      />

      <motion.div
        initial={{ left: "-100%" }}
        animate={{ left: isNavOpen ? "0%" : "-100%" }}
        className={cns(
          "flex flex-col transition duration-200 top-0 left-0 bottom-0 w-screen fixed bg-slate-800/30 backdrop-blur-[2px] z-40",
        )}
      >
        <div className="absolute top-0 left-0 bg-primary-900 w-full max-w-sm h-full ">
          <div className="nav-height px-4 py-2 border-b border-primary-800 flex items-center justify-between">
            <Logo className="h-full p-1" />

            <motion.button
              aria-label="Close Menu"
              className="cursor-pointer h-full aspect-square flex items-center justify-center"
              onClick={() => setIsNavOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90, animationDuration: 1 }}
            >
              <X className="h-5" />
            </motion.button>
          </div>

          <div className=" flex flex-col">
            {NAVBAR_CONST.map((item) => (
              <NavLink
                to={item.link}
                key={item.title}
                className="flex hover:bg-primary-800 delay-150 items-center px-4 py-2 rounded-sm font-medium"
              >
                {item.title}
              </NavLink>
            ))}

            <Link
              to={BLOG_CONST.url}
              className="px-4 py-2 flex gap-2 items-center rounded-sm font-medium"
            >
              Blogs
              <ExternalLink className="h-3 w-3 text-primary-500" />
            </Link>

            <NavLink
              to="/contact"
              className="m-2 px-2 py-2 bg-primary flex items-center justify-center rounded-sm font-medium"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BaseMobileNav;
