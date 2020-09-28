import { Moment } from "moment";
import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import styled from "styled-components";
import { DateRange, dateToMillis, millisToDate } from "../../utils/dateUtils";

const momentDateAsUtc = (m: Moment) => {
  const date = m.toDate();
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

const utcAsLocalDate = (date: Date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana, sans-serif;
  font-size: 11px;
  padding: 0 12px 0 30px;
  width: 240px;
`;

interface Props {
  dateRange: DateRange;
  updateDateRange: (dateRange: DateRange) => void;
}

/** Creates component that wraps the date range picker widget. */
const DateRangeFilter = ({ dateRange, updateDateRange }: Props) => {
  return (
    <DateRangePicker
      initialSettings={{
        startDate: utcAsLocalDate(dateRange.startDate),
        endDate: utcAsLocalDate(dateRange.endDate),
        locale: {
          format: "DD MMM YYYY HH:mm",
        },
        timePicker: true,
        timePicker24Hour: true,
      }}
      onApply={(_e, picker) => {
        updateDateRange({
          startDate: momentDateAsUtc(picker.startDate),
          endDate: momentDateAsUtc(picker.endDate),
        });
      }}
    >
      <StyledInput type="text" data-testid="date-range-filter-input" />
    </DateRangePicker>
  );
};

/** Converts the date range into a string (not necessarily human-readable). */
export const serializeDateRange = (dateRange: DateRange): string => {
  return `${dateToMillis(dateRange.startDate)}-${dateToMillis(
    dateRange.endDate
  )}`;
};

/** Converts the serialized date range into the data type. */
export const deserializeDateRange = (dateRangeString: string): DateRange => {
  // TODO: Error handling.
  const [startDateString, endDateString] = dateRangeString.split("-");
  return {
    startDate: millisToDate(parseInt(startDateString, 10)),
    endDate: millisToDate(parseInt(endDateString, 10)),
  };
};

export default DateRangeFilter;
