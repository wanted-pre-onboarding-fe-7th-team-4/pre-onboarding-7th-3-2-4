import { AxiosError, AxiosResponseHeaders } from "axios";
import { SERVER_BASE_URL } from "lib/constants/constants";
import { AccountModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountServiceImpl } from "service/AccountService";
import CookieService from "service/CookieService";

export default async function accountsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query, body } = req;
    const accountsService = new AccountServiceImpl(SERVER_BASE_URL);

    switch (method) {
      case "GET": {
        const { accessToken } = CookieService.getCookies(res, { req, res });
        const response = await accountsService.getUserAccounts<AccountModel[]>({
          params: { ...query },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const responseHeaders = response.headers as AxiosResponseHeaders;
        const accounts = response.data;
        const totalItems = Number(responseHeaders.get("x-total-count"));
        return res.status(200).json({ accounts, totalItems });
      }
      case "POST": {
        const { accessToken } = CookieService.getCookies(res, { req, res });
        const response = await accountsService.createAccount<
          AccountModel,
          AccountModel
        >(body, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const responseHeaders = response.headers as AxiosResponseHeaders;
        const accounts = response.data;
        const totalItems = Number(responseHeaders.get("x-total-count"));
        return res.status(200).json({ accounts, totalItems, isSuccess: true });
      }
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
}
