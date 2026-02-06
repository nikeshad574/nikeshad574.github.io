import type { Models } from "appwrite";

export interface InputCreateContact {
  name: string;
  email: string;
  message: string;
  isRead?: boolean;
  isFav?: boolean;
}

export interface ContactRowResp extends Models.DefaultRow, InputCreateContact {}
export interface ContactListResponse extends Models.RowList<ContactRowResp> {}
