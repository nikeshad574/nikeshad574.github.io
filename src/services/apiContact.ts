import type { IContact, IContactInput } from "../types/contact.type";
import axios from "./axiosInstance";

export const apiCreateContact = async (
  data: IContactInput,
): Promise<IContact> => {
  const resp = await axios.post("/api/contact", data);
  return resp.data.data;
};
