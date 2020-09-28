import React, { useCallback } from "react";
import { Tabs } from "devextreme-react/tabs";
import styled from "styled-components";

export enum OeeAnalysisTabOption {
  OeePercent = "OEE",
  AvailabilityPercent = "Availability",
  EfficiencyPercent = "Efficiency",
}

type TabData = {
  id: OeeAnalysisTabOption;
  text: string;
};

const tabs: Array<TabData> = [
  {
    id: OeeAnalysisTabOption.OeePercent,
    text: "OEE %",
  },
  {
    id: OeeAnalysisTabOption.AvailabilityPercent,
    text: "Availability %",
  },
  {
    id: OeeAnalysisTabOption.EfficiencyPercent,
    text: "Efficiency %",
  },
];

const StyledTabs = styled(Tabs)`
  width: 42%;

  .dx-tab {
    padding: 2.5px;
  }

  .dx-tab-selected {
    box-shadow: 0px 0px 4px 0px;
    border-bottom: 3px solid #3c93c5;
  }
`;

type Props = {
  option: OeeAnalysisTabOption;
  updateOption: (option: OeeAnalysisTabOption) => any;
};

/**
 * Tabs for the OEE Analysis page. It may be helpful to move page-specific folders into
 * filters/OeeAnalysis and common filters in filter/common, but I didn't do that for this demo.
 */
const OeeAnalysisTabs = ({ option, updateOption }: Props) => {
  const handleSelectionChange = useCallback(
    (addedItems: Array<TabData>, removedItems: Array<TabData>) => {
      if (addedItems.length !== 1) {
        throw new Error("Multiple OeeAnalysis items selected!");
      }
      if (removedItems.length !== 1) {
        throw new Error("Multiple OeeAnalysis items desleected.");
      }
      updateOption(addedItems[0].id);
    },
    [updateOption]
  );
  return (
    <StyledTabs
      items={tabs}
      keyExpr="id"
      selectedItemKeys={[option]}
      onSelectionChanged={(e) => {
        handleSelectionChange(e.addedItems!, e.removedItems!);
      }}
    />
  );
};

/** Converts the OEE Analysis tab option into a string (not necessarily human-readable). */
export const serializeOeeAnalysisTabOption = (
  option: OeeAnalysisTabOption
): string => {
  return option as string;
};

/** Converts the serialized OEE Analysis Tab Option into the data type. */
export const deserializeOeeAnalysisTabOption = (
  option: string
): OeeAnalysisTabOption | null => {
  if (!Object.values(OeeAnalysisTabOption).includes(option as any)) {
    return null;
  }
  return option as OeeAnalysisTabOption;
};

export default OeeAnalysisTabs;
