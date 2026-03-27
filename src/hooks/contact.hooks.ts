import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiGetAllContacts } from "../services/apiContact";

export const contactQueryKeys = {
  base: "contact",
};

export const useGetAllContact = (query: string) => {
  const {
    data: contacts,
    isLoading: isGettingContacts,
    error: errorGettingContact,
  } = useQuery({
    queryKey: [contactQueryKeys.base, query],
    queryFn: () => apiGetAllContacts(query),
  });

  return {
    contacts,
    isGettingContacts,
    errorGettingContact,
  };
};

export const useGetAllInfiniteContact = (query: string) => {
  const {
    data: contactPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [contactQueryKeys.base, "inf", query],
    queryFn: ({ pageParam }) => apiGetAllContacts(`page=${pageParam}&${query}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      const nextPage = lastPage.pagination.has_more_pages
        ? lastPage.pagination.current_page + 1
        : undefined;
      return nextPage;
    },
  });
  return {
    contactPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
