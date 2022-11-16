import type { NextApiRequest, NextApiResponse } from "next";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.send(200).json({ data: "hihi" });
}
