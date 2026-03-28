import type { Key } from "react";

export interface ISkill {
  id: Key;
  name: string;
  imageURL: string;
  order: number;
  created_at: string;
  updated_at: string;
}
