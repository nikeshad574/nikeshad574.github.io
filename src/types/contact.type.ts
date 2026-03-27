import type { Key } from "react";

export interface IContactInput {
  name: string;
  email: string;
  message: string;
}

export interface IContact extends IContactInput {
  id: Key;
  isRead: boolean;
  isFav: boolean;
  created_at: string;
  updated_at: string;
}
