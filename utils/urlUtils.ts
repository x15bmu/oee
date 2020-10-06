import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { AxiosResponse } from "axios";
import { LOGIN_PAGE } from "../interfaces/navigation";

export const getFirstQueryValue = (v: string | string[]): string | null => {
  if (v instanceof Array) {
    return v[0] || null;
  }
  return v;
};

export const useQuery = (key: string, initialValue: string) => {
  // NOTE: If you would rather use local storage instead of a query string,
  // that is an option as well. Instead of using router, you can use window.localStorage
  // to get / set state in the local storage. Sharing with the query string was pretty
  // important when I was working at Google, but may not be important for your use case.
  const router = useRouter();

  // Get the state from the query string if available, otherwise use the provided initial value.
  const [state, updateState] = useState(router.query[key] || initialValue);

  const updateQuery = useCallback(
    (value: string) => {
      const { query } = router;
      query[key] = value;
      updateState(value);
      router.push({
        query,
      });
    },
    [key, updateState]
  );

  return { value: state, updateQuery };
};

/** Unconditionally redirects the user to the login page */
export const redirectToLogin = (): void => {
  // Another option here is to use NextRouter, but then you have to pass
  // it down through a bunch of pages.
  window.location.href = LOGIN_PAGE;
};

/** Redirects the user to the login page if the user is unauthorized. */
export const redirectToLoginIfUnauthorized = (
  response: AxiosResponse<any>
): Promise<AxiosResponse<any>> => {
  if (response.status === 401) {
    redirectToLogin();
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};
