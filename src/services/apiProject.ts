import type { Key } from "react";
import type { IPaginatedResp } from "../types/common.type";
import type { IProjectWithSkills } from "../types/project.type";
import axios from "./axiosInstance";

export const apiGetAllProjects = async (
  query: string,
): Promise<IPaginatedResp<IProjectWithSkills>> => {
  const resp = await axios.get(`/api/project?${query}`);
  return resp.data.data;
};

export const apiGetAProjectById = async (
  id: Key,
): Promise<IProjectWithSkills> => {
  const resp = await axios.get(`/api/project/${id}`);
  return resp.data.data;
};

export const apiGetFeaturedProjects = async (
  count: number,
): Promise<IProjectWithSkills[]> => {
  const resp = await axios.get(`/api/project/featured/${count}`);
  return resp.data.data;
};
