import React, { useMemo } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import Nav from "../components/Nav";
// import withAuthServerSideProps from "../components/withAuth";
import { getFirstQueryValue, useQuery } from "../utils/urlUtils";
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const OeeAnalysisTableContainer = styled.div`
  box-shadow: 0px -2px 14px -10px;
  flex: 1;
  margin: 12px;
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
  const key = `/api?resolution=${serializedResolution}&dateRange=${serializedDateRange}&oeeAnalysisOption=${serializedOeeAnalysisOption}`;
  const { data } = useSWR(
    key,
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
      <MainContainer>
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
      </MainContainer>
    </Nav>
  );
};

export default OeeAnalysis;

// NOTE: You can use this function to check for authentication before actually loading the webpage.
// If you don't care about loading the webpage, then you can use the format below. Static loading
// currently isn't supported since the state for the filters is determined based on the query
// string (or alternately based on local storage).
// export const getServerSideProps = withAuthServerSideProps();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = (_context) => {
  return Promise.resolve({ props: {} });
};
