import { Queries } from "lib/types/types";

export const generateQueryString = (query: Queries) => {
  const queryEntries = Object.entries(query);
  const queryStrings = queryEntries
    .map(([key, value]) => value && `${key}=${value}`)
    .filter((value) => value !== undefined);
  return `?${queryStrings.join("&")}`;
};
