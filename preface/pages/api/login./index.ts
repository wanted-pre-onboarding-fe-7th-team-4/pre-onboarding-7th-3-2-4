import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ isLogin: boolean }>
) {
  try {
    const {
      body: { email, password },
      method
    } = req;

    const response = await axios.post<UserModel>(
      "http://localhost:4000/login",
      {
        email,
        password
      }
    );

    const { accessToken } = response.data;

    // const stringUser = JSON.stringify(user);

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; path=/;  Max-Age=360; Secure; HttpOnly;`
    );
    // res.setHeader(
    //   "Set-Cookie",
    //   `user=${stringUser}; path=/;  Max-Age=360; Secure; HttpOnly;`
    // );

    return res.status(200).json({ isLogin: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
