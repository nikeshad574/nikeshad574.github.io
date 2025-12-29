import { useInfiniteQuery } from "@tanstack/react-query";
import { withAsyncErrorHandler } from "../utils/commonUtils";
import type { ExperienceListResponse } from "../types/experience.type";
import { tablesDB } from "../conf/appwriteConfig";
import conf from "../conf/conf";
import { Query } from "appwrite";

const BASE_EXPERIENCES_KEY = ["experiences"];

export const useGetInfiniteExperiences = (limit: number = 3) => {
  const {
    data: experiences,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: [...BASE_EXPERIENCES_KEY, "infinite"],
    queryFn: withAsyncErrorHandler(async ({ pageParam = 1 }) => {
      const experiences = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.experience,
        queries: [
          Query.offset(pageParam),
          Query.limit(limit),
          Query.orderDesc("orderByYear"),
        ],
      })) as ExperienceListResponse;
      return experiences;
    }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ExperienceListResponse,
      _,
      lastPageParam: number
    ) => {
      const totalItems = lastPage.total;
      const loadedItems = lastPageParam * limit + lastPage.rows.length;
      if (loadedItems >= totalItems) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam: number) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  return {
    experiences,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
