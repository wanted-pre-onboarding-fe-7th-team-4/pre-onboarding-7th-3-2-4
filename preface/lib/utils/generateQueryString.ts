import { Queries, QueryKeys } from "lib/types/types";

export const generateQueryString = (query: Queries) => {
  const queryList: string[] = [];
  let key: QueryKeys | undefined;
  for (key in query) {
    const queryKey = key;
    if (queryKey && query[queryKey]) {
      queryList.push(`${queryKey}=${query[queryKey]}`);
    }
  }
  return queryList.length !== 0 ? `?${queryList.join("&")}` : "";
};
