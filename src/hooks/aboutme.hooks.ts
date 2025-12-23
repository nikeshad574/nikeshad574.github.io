import { useQuery } from "@tanstack/react-query";
import { withAsyncErrorHandler } from "../utils/commonUtils";
import { tablesDB } from "../conf/appwriteConfig";
import conf from "../conf/conf";
import type { AboutMeListResponse } from "../types/aboutme.types";

const BASE_ABOUTME_KEY = ["aboutme"];

const useGetAboutme = () => {
  const {
    data: aboutMe,
    isLoading,
    error,
  } = useQuery({
    queryKey: BASE_ABOUTME_KEY,
    queryFn: withAsyncErrorHandler(async () => {
      const res = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.aboutMe,
      })) as AboutMeListResponse;

      return res;
    }),
  });

  return { aboutMe, isLoading, error };
};

export default useGetAboutme;
