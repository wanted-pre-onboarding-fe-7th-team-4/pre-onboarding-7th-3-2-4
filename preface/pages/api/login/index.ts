import axios, { AxiosError } from "axios";
import { LoginModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
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

    switch (method) {
      case "POST": {
        const response = await axios.post<LoginModel>(
          "http://localhost:4000/login",
          {
            email,
            password
          }
        );
        const { accessToken, user } = response.data;
        const cookies = { accessToken, user };
        CookieService.setCookie(JSON.stringify(cookies), {
          req,
          res,
          maxAge: 3500
        });
        return res.status(200).json({ isLogin: true });
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
