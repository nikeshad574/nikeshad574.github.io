import type { Models } from "appwrite";

export interface InputCreateProject {
  title: string;
  imageUrl: string;
  content: string;
  projectUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  skills: string[];
}

export interface ProjectRowResp extends Models.DefaultRow, InputCreateProject {}
export interface ProjectListResponse extends Models.RowList<ProjectRowResp> {}
