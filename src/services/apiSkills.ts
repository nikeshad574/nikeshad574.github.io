import type { IPaginatedResp } from "../types/common.type";

export const apiGetAllSkills = async (
  query: string,
): Promise<IPaginatedResp<ISkill>> => {
  const resp = await axios.get(`/api/skill?${query}`);
  return resp.data.data;
};
