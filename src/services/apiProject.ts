import type { IPaginatedResp } from "../types/common.type";
import type { IProjectWithSkills } from "../types/project.type";
import axios from "./axiosInstance";

export const apiGetAllProjects = async (
  query: string,
): Promise<IPaginatedResp<IProjectWithSkills>> => {
  const resp = await axios.get(`/api/project?${query}`);
  return resp.data.data;
};
