import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiGetAllExperiences } from "../services/apiExperience";

export const experienceQueryKeys = {
  base: "experience",
};

export const useGetAllExperience = (query: string) => {
  const {
    data: experiences,
    isLoading: isGettingExperiences,
    error: errorGettingExperience,
  } = useQuery({
    queryKey: [experienceQueryKeys.base, query],
    queryFn: () => apiGetAllExperiences(query),
  });

  return {
    experiences,
    isGettingExperiences,
    errorGettingExperience,
  };
};

export const useGetAllInfiniteExperience = (query: string) => {
  const {
    data: experiencePages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [experienceQueryKeys.base, "inf", query],
    queryFn: ({ pageParam }) =>
      apiGetAllExperiences(`page=${pageParam}&${query}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      const nextPage = lastPage.pagination.has_more_pages
        ? lastPage.pagination.current_page + 1
        : undefined;
      return nextPage;
    },
  });
  return {
    experiencePages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
