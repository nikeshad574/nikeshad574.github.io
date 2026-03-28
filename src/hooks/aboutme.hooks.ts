import { useQuery } from "@tanstack/react-query";
import { apiGetAboutMe } from "../services/apiAboutMe";

export const aboutMeQueryKeys = {
  base: "about-me",
};

export const useGetAboutMe = () => {
  const {
    data: aboutMe,
    isLoading: isGettingAboutMe,
    error: errorGettingAboutMe,
  } = useQuery({
    queryKey: [aboutMeQueryKeys.base],
    queryFn: apiGetAboutMe,
  });

  return {
    aboutMe,
    isGettingAboutMe,
    errorGettingAboutMe,
  };
};
