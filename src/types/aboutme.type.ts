import type { Key } from "react";

export interface IAboutMeInput {
  name: string;
  location: string;
  profession: string;
  professionalSummary: string;
  email: string;
  github?: string;
  linkedin?: string;
  site?: string;
  coreSkills: string[];
  additionalSkills: string[];
  professionalExperiences: Array<{
    role: string;
    company: string;
    duration: string;
    location: string;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  socials: string | Record<string, string>; // stored as JSON string or object
  homeHello: string;
  homeProfessions: string[];
  homeShortBio: string;
  photoImageURL: string;
}

export interface IAboutMe extends IAboutMeInput {
  id: Key;
  created_at: string;
  updated_at: string;
}
