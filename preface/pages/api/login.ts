import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { email }
  } = req;

  const hi = axios.post("http://localhost:4000/login");

  return res.status(200).json({ email });
}
