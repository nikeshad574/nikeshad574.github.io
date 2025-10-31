import { lazy } from "react";

const Home = lazy(() => import("./features/home/Home"));

export default {
  Home,
};
