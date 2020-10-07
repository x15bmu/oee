import { GetServerSideProps } from "next";
import { IncomingMessage } from "http";

const LOGIN_PAGE = "/";

const JWT_NAME = "jwt";
const JWT_TOKEN_PREFIX = `${JWT_NAME}=`;
const JWT_TOKEN = "myToken";

const isAuthorized = async (
  cookies: string[] | undefined
): Promise<boolean> => {
  return (
    !!cookies &&
    cookies.some((cookie) => {
      const index = cookie.indexOf(JWT_TOKEN_PREFIX);
      if (index !== 0) {
        return false;
      }
      // In reality, here you would query the server to see if the token matches.
      return cookie.trimRight().substr(JWT_TOKEN_PREFIX.length) === JWT_TOKEN;
    })
  );
};

async function checkAuthentication(req: IncomingMessage) {
  return isAuthorized(req.headers.cookie?.split(";"));
}

export default function withAuthServerSideProps(
  getServerSidePropsFn?: GetServerSideProps
): GetServerSideProps {
  return async function getServerSideProps(ctx) {
    const isAuthenticated = await checkAuthentication(ctx.req);
    if (!isAuthenticated) {
      ctx.res.writeHead(302, { Location: LOGIN_PAGE });
      ctx.res.end();
      return { props: {} };
    }
    return getServerSidePropsFn?.(ctx) || { props: {} };
  };
}
