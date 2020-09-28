import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export const getFirstQueryValue = (v: string | string[]): string | null => {
  if (v instanceof Array) {
    return v[0] || null;
  }
  return v;
};

export const useQuery = (key: string, initialValue: string) => {
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
