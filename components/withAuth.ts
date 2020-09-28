import { GetServerSideProps } from "next";
import { IncomingMessage } from "http";

const LOGIN_PAGE = "/login";

async function checkAuthentication(req: IncomingMessage) {
  // TODO: Implement authentication checking.
  return !!req;
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
