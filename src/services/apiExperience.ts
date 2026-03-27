import type { IPaginatedResp } from "../types/common.type";
import type { IExperience } from "../types/experience.type";
import axios from "./axiosInstance";

export const apiGetAllExperiences = async (
  query: string,
): Promise<IPaginatedResp<IExperience>> => {
  const resp = await axios.get(`/api/experience?${query}`);
  return resp.data.data;
};
