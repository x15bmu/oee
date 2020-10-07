import axios from "axios";
import { redirectToLoginIfUnauthorized } from "./urlUtils";

interface OeeDataEntry {
  id: string;
  parentId?: string;
  sName: string;
  average: number;
  Min: string;
  Max: string;
  [dateRange: string]: any;
}

// This file is super hacky since it's only meant to generate a mock response. Do not copy the style in this file.

export type OeeData = Array<OeeDataEntry>;

/**
 * Gets the CellOeeAnalysis data if the user is authorized. If not,
 * redirects the user to the login page.
 */
async function getCellOeeAnalysis(): Promise<OeeData | undefined> {
  return axios
    .get("/api/getOeeData")
    .then((response) => {
      // Process response. Note: do not copy this example. The post-processing
      // is only done here due to the mock data. Ideally, the server could just
      // return data that can be directly used. If that is possible, you can just
      // write this logic and the catch logic inline as the second argument to useSWR.
      const oeeResponse = response.data;
      // eslint-disable-next-line no-restricted-syntax
      for (const o of oeeResponse as any) {
        o.id = o.sNodeChild || o.sName;
        o.parentId = o.cellParent || undefined;
      }
      return (oeeResponse as any) as OeeData;
    })
    .catch((error) => {
      redirectToLoginIfUnauthorized(error.response);
      return undefined;
    });
}

export default getCellOeeAnalysis;
