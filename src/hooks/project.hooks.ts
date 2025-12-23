import { useQuery } from "@tanstack/react-query";
import { withAsyncErrorHandler } from "../utils/commonUtils";
import { tablesDB } from "../conf/appwriteConfig";
import conf from "../conf/conf";
import { Query } from "appwrite";
import type { ProjectListResponse } from "../types/project.type";

const BASE_PROJECTS_KEY = ["projects"];

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
        queries: [Query.equal("isFeatured", true), Query.limit(limit)],
      })) as ProjectListResponse;

      const resultRows = featuredProjects.rows;

      if (featuredProjects.rows.length < limit) {
        const remainingSlots = limit - featuredProjects.rows.length;
        const latestProjects = (await tablesDB.listRows({
          databaseId: conf.appwrite.databaseId,
          tableId: conf.appwrite.collections.projects,
          queries: [
            Query.equal("isFeatured", false),
            Query.limit(remainingSlots),
            Query.orderDesc("$createdAt"),
          ],
        })) as ProjectListResponse;

        resultRows.push(...latestProjects.rows);
      }

      return resultRows;
    }),
  });

  return { featuredProjects, isLoading, error };
};
