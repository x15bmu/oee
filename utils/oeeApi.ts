import oeeReponse from "../data/oeeReponse";

interface OeeDataEntry {
  id: string;
  parentId?: string;
  sName: string;
  average: number;
  Min: "";
  Max: "";
  [dateRange: string]: any;
}

// This file is super hacky since it's only meant to generate a mock response. Do not copy the style in this file.

export type OeeData = Array<OeeDataEntry>;

async function getCellOeeAnalysis(): Promise<OeeData> {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const o of oeeReponse as any) {
      o.id = o.sNodeChild || o.sName;
      o.parentId = o.cellParent || undefined;
    }
    return (oeeReponse as any) as OeeData;
  });
}

export default getCellOeeAnalysis;
