import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiGetAllProjects } from "../services/apiProject";

export const projectQueryKeys = {
  base: "project",
};

export const useGetAllProject = (query: string) => {
  const {
    data: projects,
    isLoading: isGettingProjects,
    error: errorGettingProject,
  } = useQuery({
    queryKey: [projectQueryKeys.base, query],
    queryFn: () => apiGetAllProjects(query),
  });

  return {
    projects,
    isGettingProjects,
    errorGettingProject,
  };
};

export const useGetAllInfiniteProject = (query: string) => {
  const {
    data: projectPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [projectQueryKeys.base, "inf", query],
    queryFn: ({ pageParam }) => apiGetAllProjects(`page=${pageParam}&${query}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      const nextPage = lastPage.pagination.has_more_pages
        ? lastPage.pagination.current_page + 1
        : undefined;
      return nextPage;
    },
  });
  return {
    projectPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
