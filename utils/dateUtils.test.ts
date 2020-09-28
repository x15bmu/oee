import {
  resolutionToString,
  Resolution,
  resolutionToDateDelta,
  addDateDelta,
  dateToMillis,
  millisToDate,
} from "./dateUtils";

// Note: it is important to express all dates in UTC otherwise daylight savings time might affect computations.

test("resolutionToString converted resolution to the correct string", () => {
  // Test a few.
  expect(resolutionToString(Resolution.OneHour)).toEqual("1 hour");
  expect(resolutionToString(Resolution.ThreeHour)).toEqual("3 hours");
  expect(resolutionToString(Resolution.OneMonth)).toEqual("1 month");
});

test("resolutionToDateDelta converts resolution to the right date delta", () => {
  // Test a few.
  expect(resolutionToDateDelta(Resolution.TwoDay)).toEqual({
    month: 0,
    week: 0,
    day: 2,
    hour: 0,
  });
  expect(resolutionToDateDelta(Resolution.ThreeHour)).toEqual({
    month: 0,
    week: 0,
    day: 0,
    hour: 3,
  });
  expect(resolutionToDateDelta(Resolution.OneWeek)).toEqual({
    month: 0,
    week: 1,
    day: 0,
    hour: 0,
  });
  expect(resolutionToDateDelta(Resolution.OneMonth)).toEqual({
    month: 1,
    week: 0,
    day: 0,
    hour: 0,
  });
});

describe("addDateDelta", () => {
  it("correctly adds a month", () => {
    const date = new Date(Date.UTC(2020, 9, 31));

    addDateDelta(date, { month: 1, week: 0, day: 0, hour: 0 });

    // 31 is invalid in November, so the month advances. Note: this may
    // not be what you'd expect.
    expect(date).toEqual(new Date(Date.UTC(2020, 11, 1)));
  });

  it("correctly adds two weeks", () => {
    const date = new Date(Date.UTC(2020, 9, 31));

    addDateDelta(date, { month: 0, week: 2, day: 0, hour: 0 });

    expect(date).toEqual(new Date(Date.UTC(2020, 10, 14)));
  });

  it("correctly adds 5 days", () => {
    const date = new Date(Date.UTC(2020, 9, 31));

    addDateDelta(date, { month: 0, week: 0, day: 5, hour: 0 });

    expect(date).toEqual(new Date(Date.UTC(2020, 10, 5)));
  });

  it("correctly adds 3 hours", () => {
    const date = new Date(Date.UTC(2020, 9, 31));

    addDateDelta(date, { month: 0, week: 0, day: 0, hour: 3 });

    expect(date).toEqual(new Date(Date.UTC(2020, 9, 31, 3)));
  });
});

test("dateToMillis converts date to correct millis", () => {
  expect(dateToMillis(new Date(Date.UTC(2020, 1, 1)))).toEqual(1580529600000);
});

test("millisToDate converts millis to correct date", () => {
  expect(millisToDate(1580529600000)).toEqual(new Date(Date.UTC(2020, 1, 1)));
});
