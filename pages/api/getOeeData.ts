import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

import oeeData from "../../data/oeeReponse";

// NOTE: This code is just demonstration code for the purposes of authentication.
// Do not copy.

const JWT_NAME = "jwt";
const JWT_TOKEN = "myToken";

const isAuthorized = (cookies: NextApiRequestCookies): boolean => {
  return JWT_NAME in cookies && cookies[JWT_NAME] === JWT_TOKEN;
};

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (isAuthorized(req.cookies)) {
    res.status(200).json(oeeData);
  } else {
    res.status(401).send("Unauthorized");
  }
};
