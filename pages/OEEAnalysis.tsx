import React, { useMemo } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Nav from "../components/Nav";
// import withAuthServerSideProps from "../components/withAuth";
import { getFirstQueryValue, useQuery } from "../utils/queryUtils";
import ResolutionFilter, {
  serializeResolution,
  deserializeResolution,
} from "../components/filters/ResolutionFilter";
import OeeAnalysisTabs, {
  OeeAnalysisTabOption,
  serializeOeeAnalysisTabOption,
  deserializeOeeAnalysisTabOption,
} from "../components/filters/OeeAnalysisTabs";
import OeeAnalysisTable from "../components/OEEAnalysis/OeeAnalysisTable";
import DateRangeFilter, {
  deserializeDateRange,
  serializeDateRange,
} from "../components/filters/DateRangeFilter";
import FilterWrapper from "../components/FilterWrapper";
import getCellOeeAnalysis from "../utils/oeeApi";
import { Resolution } from "../utils/dateUtils";

const OeeAnalysisTableContainer = styled.div`
  margin: 12px;
  box-shadow: 0px -2px 14px -10px;
`;

// This is the top-level component for the whole OEE anlaysis page.
const OeeAnalysis = () => {
  // TODO: Consider clearing query keys that aren't used by this page.

  // Setup query strings. These hooks are basically fancy wrappers around the useState hook.
  // They also update the router if necessary.
  const DEFAULT_RESOLUTION = Resolution.OneDay;
  const {
    value: serializedResolution,
    updateQuery: updateResolution,
  } = useQuery("resolution", DEFAULT_RESOLUTION);
  const defaultDateRange = {
    // TODO: Update the default dates. Perhaps store them in a table?
    startDate: new Date(Date.UTC(2020, 8 - 1, 4)),
    endDate: new Date(Date.UTC(2020, 8 - 1, 18)),
  };
  const { value: serializedDateRange, updateQuery: updateDateRange } = useQuery(
    "dateRange",
    serializeDateRange(defaultDateRange)
  );
  const DEFAULT_OEE_ANALYSIS_TAB_OPTION = OeeAnalysisTabOption.OeePercent;
  const {
    value: serializedOeeAnalysisOption,
    updateQuery: updateOeeAnalysisOption,
  } = useQuery("oeeAnalysisOption", DEFAULT_OEE_ANALYSIS_TAB_OPTION);

  // Fetch data for the query.
  // TODO: Handle the error.
  const { data } = useSWR(
    `/api?resolution=${serializedResolution}&dateRange=${serializedDateRange}&oeeAnalysisOption=${serializedOeeAnalysisOption}`,
    getCellOeeAnalysis // You can use any async function here to fetch data.
  );

  // Convert query strings to real objects. Memoization isn't strictly required here but may make things slightly faster.
  const resolution = useMemo(() => {
    const firstQuery = getFirstQueryValue(serializedResolution);
    return (
      (firstQuery && deserializeResolution(firstQuery)) || DEFAULT_RESOLUTION
    );
  }, [serializedResolution]);
  const dateRange = useMemo(() => {
    const firstQuery = getFirstQueryValue(serializedDateRange);
    return (firstQuery && deserializeDateRange(firstQuery)) || defaultDateRange;
  }, [serializedDateRange]);
  const oeeAnalysisTabOption = useMemo(() => {
    const firstQuery = getFirstQueryValue(serializedOeeAnalysisOption);
    return (
      (firstQuery && deserializeOeeAnalysisTabOption(firstQuery)) ||
      DEFAULT_OEE_ANALYSIS_TAB_OPTION
    );
  }, [serializedOeeAnalysisOption]);

  // Render.
  return (
    <Nav>
      <FilterWrapper>
        <ResolutionFilter
          resolution={resolution}
          updateResolution={(r) => {
            updateResolution(serializeResolution(r));
          }}
        />
        <DateRangeFilter
          dateRange={dateRange}
          updateDateRange={(r) => {
            updateDateRange(serializeDateRange(r));
          }}
        />
        <OeeAnalysisTabs
          option={oeeAnalysisTabOption}
          updateOption={(o) => {
            updateOeeAnalysisOption(serializeOeeAnalysisTabOption(o));
          }}
        />
      </FilterWrapper>
      <OeeAnalysisTableContainer>
        <OeeAnalysisTable
          dataSource={data}
          dateRange={dateRange}
          resolution={resolution}
        />
      </OeeAnalysisTableContainer>
    </Nav>
  );
};

export default OeeAnalysis;

// TODO: Auth.
// export const getServerSideProps = withAuthServerSideProps();
