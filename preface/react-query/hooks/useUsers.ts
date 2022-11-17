import { useQuery } from "@tanstack/react-query";
import { userApi } from "lib/api/instance";
import { UserModel } from "model/model";
import { queryKeys } from "react-query/constants";

export const getUsers = async (): Promise<UserModel[]> => {
  try {
    const { data } = await userApi.searchUser<{ users: UserModel[] }>({
      withCredentials: true
    });
    return data.users;
  } catch (error) {
    return [];
  }
};
function useUsers() {
  const { data } = useQuery([queryKeys.users], () => getUsers(), {
    staleTime: 1000 * 60 * 60,
    retry: 3,
    retryDelay: 3000
  });

  return {
    users: data
  };
}

export default useUsers;
