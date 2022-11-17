import axios, { AxiosResponseHeaders } from "axios";
import { generateQueryString } from "lib/utils/generateQueryString";
import { AccountModel } from "model/model";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "service/CookieService";

export default async function accountsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const queries = generateQueryString(query);
      const { accessToken } = CookieService.getCookies({ req, res });
      const response = await axios.get<AccountModel[]>(
        `http://localhost:4000/accounts${queries}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const responseHeaders = response.headers as AxiosResponseHeaders;
      const accounts = response.data;
      const totalItems = Number(responseHeaders.get("x-total-count"));
      return res.status(200).json({ accounts, totalItems });
    }
  }
}
