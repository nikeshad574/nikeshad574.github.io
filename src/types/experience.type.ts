import type { Models } from "appwrite";

export interface InputCreateExperience {
  description: string;
  time: string;
  orderByYear: number;
  title: string;
}

export interface ExperienceRowResp
  extends Models.DefaultRow,
    InputCreateExperience {}
export interface ExperienceListResponse
  extends Models.RowList<ExperienceRowResp> {}
