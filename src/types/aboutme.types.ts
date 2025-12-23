import type { Models } from "appwrite";

export interface InputCreateAboutMe {
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

export interface AboutMeRowResp extends Models.DefaultRow, InputCreateAboutMe {}
export interface AboutMeListResponse extends Models.RowList<AboutMeRowResp> {}
