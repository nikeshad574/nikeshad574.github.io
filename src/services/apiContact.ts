import type { IPaginatedResp } from "../types/common.type";
import type { IContact } from "../types/contact.type";
import axios from "./axiosInstance";

export const apiGetAllContacts = async (
  query: string,
): Promise<IPaginatedResp<IContact>> => {
  const resp = await axios.get(`/api/contact?${query}`);
  return resp.data.data;
};
