import type { Key } from "react";

export interface IProject {
  id: Key;
  title: string;
  imageUrl: string;
  content: string;
  projectUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  create_at: string;
  update_at: string;
}

export interface IProjectWithSkills extends IProject {
  skills: {
    id: Key;
    name: string;
    imageURL: string;
    order: number;
    created_at: string;
    updated_at: string;
    pivot: {
      project_id: Key;
      skill_id: Key;
    };
  }[];
}
