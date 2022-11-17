import { Queries } from "lib/types/types";

export const deleteQueryStringKey = (key: string, query: Queries) => {
  if (key === "broker_id") {
    delete query.broker_id;
  } else if (key === "is_active") {
    delete query.is_active;
  } else if (key === "status") {
    delete query.status;
  } else if (key === "q") {
    delete query.q;
  }

  return query;
};
