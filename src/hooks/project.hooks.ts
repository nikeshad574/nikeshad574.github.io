import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { withAsyncErrorHandler } from "../utils/commonUtils";
import { tablesDB } from "../conf/appwriteConfig";
import conf from "../conf/conf";
import { Query } from "appwrite";
import type {
  ProjectListResponse,
  ProjectRowResp,
} from "../types/project.type";

const BASE_PROJECTS_KEY = ["projects"];

export const useGetSingleProject = (projectId: string) => {
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...BASE_PROJECTS_KEY, projectId],
    queryFn: withAsyncErrorHandler(async () => {
      const project = (await tablesDB.getRow({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.projects,
        rowId: projectId,
      })) as ProjectRowResp;

      return project;
    }),
  });

  return { project, isLoading, error };
};

export const useGetFeaturedProjects = () => {
  const limit = 3;

  const {
    data: featuredProjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...BASE_PROJECTS_KEY, "featured"],
    queryFn: withAsyncErrorHandler(async () => {
      const featuredProjects = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.projects,
        queries: [
          Query.equal("isFeatured", true),
          Query.orderDesc("$createdAt"),
          Query.limit(limit),
        ],
      })) as ProjectListResponse;

      const resultRows = featuredProjects.rows;

      if (featuredProjects.rows.length < limit) {
        const remainingSlots = limit - featuredProjects.rows.length;
        const latestProjects = (await tablesDB.listRows({
          databaseId: conf.appwrite.databaseId,
          tableId: conf.appwrite.collections.projects,
          queries: [
            Query.equal("isFeatured", false),
            Query.orderDesc("$createdAt"),
            Query.limit(remainingSlots),
          ],
        })) as ProjectListResponse;

        resultRows.push(...latestProjects.rows);
      }

      return resultRows;
    }),
  });

  return { featuredProjects, isLoading, error };
};

export const useGetInfiniteProjects = (skills: string[], limit = 3) => {
  const {
    data: projectsPages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: [...BASE_PROJECTS_KEY, "infinite", skills.toString()],
    queryFn: withAsyncErrorHandler(async ({ pageParam = 1 }) => {
      const projects = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.projects,
        queries: [
          Query.offset(pageParam),
          Query.limit(limit),
          Query.orderDesc("$createdAt"),
          ...skills.map((skill) => Query.equal("skills", skill)),
        ],
      })) as ProjectListResponse;
      return projects;
    }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ProjectListResponse,
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
    projectsPages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
};

export const useGetAllProjects = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: [...BASE_PROJECTS_KEY, "all"],
    queryFn: withAsyncErrorHandler(async () => {
      const allProjects = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.projects,
        queries: [Query.orderDesc("$createdAt")],
      })) as ProjectListResponse;

      return allProjects;
    }),
  });

  return { projects, isLoading, error };
};

export const useGetSimilarProject = (
  skills: string[],
  excludeProjectId: string,
  limit: number
) => {
  const {
    data: similarProjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      ...BASE_PROJECTS_KEY,
      skills?.toString(),
      excludeProjectId,
      limit,
    ],

    queryFn: withAsyncErrorHandler(async () => {
      const fetchedProjects: ProjectRowResp[] = [];

      const similarProjects = (await tablesDB.listRows({
        databaseId: conf.appwrite.databaseId,
        tableId: conf.appwrite.collections.projects,
        queries: [
          Query.notEqual("$id", excludeProjectId),
          Query.limit(limit),
          Query.orderAsc("$createdAt"),
          Query.equal("skills", skills),
        ],
      })) as ProjectListResponse;
      fetchedProjects.push(...similarProjects.rows);

      const nextLimit = limit - similarProjects.rows.length;
      if (nextLimit > 0) {
        const notToFetchIds = similarProjects.rows.map((p) => p.$id);
        const additionalProjects = (await tablesDB.listRows({
          databaseId: conf.appwrite.databaseId,
          tableId: conf.appwrite.collections.projects,
          queries: [
            Query.notEqual("$id", excludeProjectId),
            ...notToFetchIds.map((id) => Query.notEqual("$id", id)),
            Query.limit(nextLimit),
            Query.orderDesc("$createdAt"),
          ],
        })) as ProjectListResponse;
        fetchedProjects.push(...additionalProjects.rows);
      }
      return fetchedProjects;
    }),
    enabled: skills !== undefined && excludeProjectId !== undefined,
  });

  return { similarProjects, isLoading, error };
};
