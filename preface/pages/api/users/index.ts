import { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants/constants";

import { UserModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";

import CookieService from "service/CookieService";
import { UserServiceImpl } from "service/UserService";

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
      method
    } = req;

    const { accessToken } = CookieService.getCookies(res, { req, res });

    const userService = new UserServiceImpl(SERVER_BASE_URL);
    switch (method) {
      case "GET": {
        const response = await userService.searchUser<UserModel[]>({
          params: { id },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const [users] = response.data;
        return res.status(200).json({ users });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
