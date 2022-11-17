import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "service/CookieService";

export default async function accountsByIdHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { accountId },
      method,
    } = req
  
    const { accessToken } = CookieService.getCookies({ req, res })
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;   
    
    switch (method) {
      case "GET": {
        const response = await axios.get(
          `http://localhost:4000/account/${accountId}`
        );
        res.status(200).json({ account: response.data , isSuccess: true })
        break
      }
      case "PUT": {
        const { body } = req;
        const response = await axios.put(
          `http://localhost:4000/account/${accountId}`,
          {
            body
          }
        );
        res.status(200).json({ account: response.data, isSuccess: true })
        break
      }
      case "DELETE": {
        await axios.delete(
          `http://localhost:4000/account/${accountId}`);
        res.status(200).json({ isSuccess: true })
        break
      }
      default:
        res.setHeader("Allow", ["PUT", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
