import React from "react";
import { fireEvent, render } from "@testing-library/react";

import DateRangeFilter, {
  deserializeDateRange,
  serializeDateRange,
} from "./DateRangeFilter";
import { DateRange } from "../../utils/dateUtils";

describe("DateRangeFilter", () => {
  it("renders with correct date", () => {
    // Setup
    const dateRange: DateRange = {
      startDate: new Date(Date.UTC(2020, 9, 31, 1, 30)),
      endDate: new Date(Date.UTC(2020, 10, 1)),
    };

    // Test
    const { getByTestId } = render(
      <DateRangeFilter dateRange={dateRange} updateDateRange={() => {}} />
    );

    // Assertions
    const input = getByTestId("date-range-filter-input") as HTMLInputElement;
    expect(input.value).toEqual("31 Oct 2020 01:30 - 01 Nov 2020 00:00");
  });

  it("updates with correct date", () => {
    const dateRange: DateRange = {
      startDate: new Date(Date.UTC(2020, 9, 31, 1, 30)),
      endDate: new Date(Date.UTC(2020, 10, 1)),
    };
    let updatedDateRange: DateRange | null = null;

    const { getByTestId, getByText } = render(
      <DateRangeFilter
        dateRange={dateRange}
        updateDateRange={(r) => {
          updatedDateRange = r;
        }}
      />
    );
    // Click the input to open the date picker (required!).
    // Then click apply to call the callback.
    const input = getByTestId("date-range-filter-input") as HTMLInputElement;
    fireEvent.click(input);
    fireEvent.click(getByText(/Apply/));

    expect(updatedDateRange).toEqual({
      startDate: new Date(Date.UTC(2020, 9, 31, 1, 30)),
      endDate: new Date(Date.UTC(2020, 10, 1)),
    });
  });
});

test("serializeDateRange works", () => {
  expect(
    serializeDateRange({
      startDate: new Date(Date.UTC(2020, 9, 31, 1, 30)),
      endDate: new Date(Date.UTC(2020, 10, 1)),
    })
  ).toEqual("1604122200000-1604203200000");
});

test("deserializeDateRange works", () => {
  expect(deserializeDateRange("1604122200000-1604203200000")).toEqual({
    startDate: new Date(Date.UTC(2020, 9, 31, 1, 30)),
    endDate: new Date(Date.UTC(2020, 10, 1)),
  });
});
