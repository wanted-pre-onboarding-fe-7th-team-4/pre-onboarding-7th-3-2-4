import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "lib/constants/constants";
import { AccountModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountServiceImpl } from "service/AccountService";
import CookieService from "service/CookieService";

export default async function accountsByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, method } = req;

    const { accessToken } = CookieService.getCookies(res, { req, res });
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const accountsService = new AccountServiceImpl(SERVER_BASE_URL);

    switch (method) {
      case "GET": {
        const response = await accountsService.getUserAccounts<AccountModel[]>({
          params: { ...query }
        });

        res.status(200).json({ account: response.data, isSuccess: true });
        break;
      }
      case "PUT": {
        const { body } = req;
        const { id } = query;

        const response = await accountsService.updateAccount<
          AccountModel,
          AccountModel
        >(Number(id), body);
        return res
          .status(200)
          .json({ account: response.data, isSuccess: true });
      }
      case "DELETE": {
        const { id } = query;
        await accountsService.deleteAccount({ params: { id } });
        return res.status(200).json({ isSuccess: true });
      }
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
