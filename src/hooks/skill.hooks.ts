import { useQuery } from "@tanstack/react-query";
import { withAsyncErrorHandler } from "../utils/commonUtils";
import { tablesDB } from "../conf/appwriteConfig";
import conf from "../conf/conf";
import type { SkillListResponse } from "../types/skill.types";
import { searchQueryFromString } from "../utils/searchParamToQuery";

const BASE_SKILLS_KEY = ["skills"];

export const useGetSkills = () => {
  const {
    data: skills,
    isLoading,
    error,
  } = useQuery({
    queryKey: BASE_SKILLS_KEY,
    queryFn: withAsyncErrorHandler(async () => {
      const res = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.skills,
      })) as SkillListResponse;
      return res;
    }),
  });

  return { skills, isLoading, error };
};

export const useGetSearchSkills = (searchTxt: string) => {
  const {
    data: skills,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...BASE_SKILLS_KEY, "search", searchTxt],
    queryFn: withAsyncErrorHandler(async () => {
      const res = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.skills,
        queries: searchQueryFromString(searchTxt, ["name"]),
      })) as SkillListResponse;
      return res;
    }),
  });

  return { skills, isLoading, error };
};
