import mainAxios from "axios";
import conf from "../conf/conf";

const axios = mainAxios.create({
  baseURL: conf.backURL,
  withCredentials: true,
});

export default axios;
