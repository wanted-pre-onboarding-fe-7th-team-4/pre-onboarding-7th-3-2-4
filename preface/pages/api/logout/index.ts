import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "service/CookieService";

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ isLogin: boolean }>
) {
  try {
    CookieService.removeCookie();

    return res.status(200).json({ isLogin: false });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
