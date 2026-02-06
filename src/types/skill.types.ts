import type { Models } from "appwrite";

export interface InputCreateSkill {
  name: string;
  imageURL: string;
}

export interface SkillRowResp extends Models.DefaultRow, InputCreateSkill {}
export interface SkillListResponse extends Models.RowList<SkillRowResp> {}
