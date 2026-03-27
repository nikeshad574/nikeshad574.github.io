import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiGetAllSkills } from "../services/apiSkills";

export const skillQueryKeys = {
  base: "skill",
};

export const useGetAllSkill = (query: string) => {
  const {
    data: skills,
    isLoading: isGettingSkills,
    error: errorGettingSkill,
  } = useQuery({
    queryKey: [skillQueryKeys.base, query],
    queryFn: () => apiGetAllSkills(query),
  });

  return {
    skills,
    isGettingSkills,
    errorGettingSkill,
  };
};

export const useGetAllInfiniteSkill = (query: string) => {
  const {
    data: skillPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [skillQueryKeys.base, "inf", query],
    queryFn: ({ pageParam }) => apiGetAllSkills(`page=${pageParam}&${query}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      const nextPage = lastPage.pagination.has_more_pages
        ? lastPage.pagination.current_page + 1
        : undefined;
      return nextPage;
    },
  });
  return {
    skillPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
