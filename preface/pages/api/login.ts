import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface UserModel {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ isLogin: boolean }>
) {
  try {
    const {
      body: { email, password }
    } = req;

    const response = await axios.post<UserModel>(
      "http://localhost:4000/login",
      {
        email,
        password
      }
    );

    const { accessToken, user } = response.data;
    console.log(accessToken, user);

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; path=/;  Max-Age=360000; Secure; HttpOnly;`
    );

    return res.status(200).json({ isLogin: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
