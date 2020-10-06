import { NextApiRequest, NextApiResponse } from "next";

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  // For demonstration purposes only, since you presumably already have some way of
  // issuing tokens. Very hacky, so do not copy.
  const JWT = "myToken";
  res.setHeader("Set-Cookie", `jwt=${JWT}; Path=/; HttpOnly`);
  res.send("");
};
