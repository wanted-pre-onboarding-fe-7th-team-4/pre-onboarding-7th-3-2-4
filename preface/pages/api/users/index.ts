import axios, { AxiosError } from "axios";

import { UserModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "service/CookieService";

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { id },
      method
    } = req;

    const { accessToken } = CookieService.getCookies({ req, res });

    switch (method) {
      case "GET": {
        const response = await axios.get<UserModel[]>(
          `http://localhost:4000/users?${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

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
