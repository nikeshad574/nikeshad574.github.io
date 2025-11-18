import { lazy } from "react";

const Home = lazy(() => import("./features/home/Home"));
const Projects = lazy(() => import("./features/projects/Projects"));
const Experiences = lazy(() => import("./features/experiences/Experiences"));
const AboutMe = lazy(() => import("./features/aboutme/AboutMe"));
const Contact = lazy(() => import("./features/contacts/Contact"));

export default {
  Home,
  Projects,
  Experiences,
  AboutMe,
  Contact,
};
