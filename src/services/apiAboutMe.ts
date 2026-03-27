import type { IAboutMe, IAboutMeInput } from "../types/aboutme.type";
import axios from "./axiosInstance";

type IAboutMeApi = Omit<
  IAboutMe,
  "professionalExperiences" | "homeProfessions" | "homeHello"
> & {
  professionalExperience: IAboutMeInput["professionalExperiences"];
  homeProfession: IAboutMeInput["homeProfessions"];
  helloHome: IAboutMeInput["homeHello"];
};

const toFrontendAboutMe = (about: IAboutMeApi): IAboutMe => {
  return {
    ...about,
    professionalExperiences: about.professionalExperience || [],
    homeProfessions: about.homeProfession || [],
    homeHello: about.helloHome || "",
  };
};

export const apiGetAboutMe = async (): Promise<IAboutMe> => {
  const resp = await axios.get(`/api/about`);
  return toFrontendAboutMe(resp.data.data as IAboutMeApi);
};
