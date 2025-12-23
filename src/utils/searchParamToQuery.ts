import { Query } from "appwrite";

interface SearchParamToQuery {
  searchParams: URLSearchParams;
  searchKeyWords?: string[];
  limits?: number;
}

/**
 * Converts search parameters to a query array for database querying.
 * @param searchParams - The URL search parameters.
 * @param searchKeyWords - The keywords to search in the database fields.
 * @param limits - The limit for the number of results to fetch. (-1) for no limit.
 */
const searchParamToQuery = ({
  searchParams,
  searchKeyWords = ["name"],
  limits = -1,
}: SearchParamToQuery) => {
  const queries: string[] = [];

  const { search, page, sortBy } = {
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    sortBy: searchParams.get("sortBy") || "",
  };

  if (limits !== -1) {
    queries.push(Query.limit(limits));
    queries.push(Query.offset(page - 1));
  }

  if (sortBy) {
    const splitSortNames = sortBy.split(",");
    splitSortNames.forEach((sortName) => {
      if (sortName.startsWith("-")) {
        queries.push(Query.orderDesc(sortName.substring(1)));
      } else {
        queries.push(Query.orderAsc(sortName));
      }
    });
  }

  if (search.trim() !== "" && searchKeyWords.length > 0) {
    searchKeyWords.forEach((key) => {
      queries.push(Query.search(key, search));
    });
  }

  const skillsParam = searchParams.get("skills");
  if (skillsParam) {
    const skillIds = skillsParam.split(",").filter(Boolean);
    if (skillIds.length > 0) {
      skillIds.map((id) => {
        queries.push(Query.equal("skills", id));
      });
    }
  }

  return queries;
};

/**
 *
 * @param search  Just text to search. eg: nikesh
 * @param searchKeyWords  The keywords to search in the database fields.
 */
export const searchQueryFromString = (
  search: string,
  searchKeyWords: string[]
) => {
  const queries: string[] = [];

  if (search.trim() !== "") {
    searchKeyWords.forEach((key) => {
      queries.push(Query.search(key, search));
    });
  }

  return queries;
};

export default searchParamToQuery;
