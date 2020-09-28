import React from "react";
import DropDownButton from "devextreme-react/drop-down-button";
import styled from "styled-components";
import { Resolution, resolutionToString } from "../../utils/dateUtils";

interface ResolutionItem {
  id: Resolution;
  text: string;
}

const resolutions: Array<Resolution> = [
  Resolution.OneHour,
  Resolution.TwoHour,
  Resolution.ThreeHour,
  Resolution.FourHour,
  Resolution.FiveHour,
  Resolution.SixHour,
  Resolution.SevenHour,
  Resolution.EightHour,
  Resolution.NineHour,
  Resolution.TenHour,
  Resolution.ElevenHour,
  Resolution.TwelveHour,
  Resolution.OneDay,
  Resolution.TwoDay,
  Resolution.ThreeDay,
  Resolution.FourDay,
  Resolution.FiveDay,
  Resolution.SixDay,
  Resolution.OneWeek,
  Resolution.TwoWeek,
  Resolution.ThreeWeek,
  Resolution.OneMonth,
];
const resolutionItems: Array<ResolutionItem> = resolutions.map(
  (resolution: Resolution) => {
    return { id: resolution, text: resolutionToString(resolution) };
  }
);

const StyledDropDownButton = styled(DropDownButton)`
  width: 100px;
`;

interface Props {
  resolution: Resolution;
  updateResolution: (resolution: Resolution) => void;
}

/** A component which contains a filter for selecting the time resolution. */
const ResolutionFilter = ({ resolution, updateResolution }: Props) => {
  return (
    <StyledDropDownButton
      items={resolutionItems}
      useSelectMode
      onSelectionChanged={(e) => {
        updateResolution(e.item.id);
      }}
      selectedItemKey={resolution}
      keyExpr="id"
      displayExpr="text"
    />
  );
};

/** Converts the resolution into a string (not necessarily human-readable). */
export const serializeResolution = (resolution: Resolution): string => {
  return resolution as string;
};

/** Converts the serialized resolution into the data type. */
export const deserializeResolution = (
  resolution: string
): Resolution | null => {
  if (!Object.values(Resolution).includes(resolution as any)) {
    return null;
  }
  return resolution as Resolution;
};

export default ResolutionFilter;
