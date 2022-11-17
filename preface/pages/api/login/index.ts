import { AxiosError } from "axios";
import { COOKIE_MAX_AGE, SERVER_BASE_URL } from "lib/constants/constants";
import { LoginModel, LoignVariable } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthServiceImpl } from "service/AuthService";
import CookieService from "service/CookieService";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ isLogin: boolean }>
) {
  try {
    const {
      body: { email, password },
      method
    } = req;

    const authService = new AuthServiceImpl(SERVER_BASE_URL);

    switch (method) {
      case "POST": {
        const response = await authService.login<LoginModel, LoignVariable>({
          email,
          password
        });
        const { accessToken, user } = response.data;
        const cookies = { accessToken, user };
        CookieService.setCookie(JSON.stringify(cookies), {
          req,
          res,
          maxAge: COOKIE_MAX_AGE
        });
        return res.status(200).json({ isLogin: true });
      }
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
