import { lazy } from "react";

const Home = lazy(() => import("./features/home/Home"));
const Projects = lazy(() => import("./features/projects/Projects"));

export default {
  Home,
  Projects,
};
