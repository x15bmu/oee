// API dates are offset from GMT by + this many hours.
const GMT_OFFSET_HOURS = 4;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertUnreachable = (_v: never) => {};

export enum Resolution {
  OneHour = "oneHour",
  TwoHour = "twoHour",
  ThreeHour = "threeHour",
  FourHour = "fourHour",
  FiveHour = "fiveHour",
  SixHour = "sixHour",
  SevenHour = "sevenHour",
  EightHour = "eightHour",
  NineHour = "nineHour",
  TenHour = "tenHour",
  ElevenHour = "elevenHour",
  TwelveHour = "twelveHour",
  OneDay = "oneDay",
  TwoDay = "twoDay",
  ThreeDay = "threeDay",
  FourDay = "fourDay",
  FiveDay = "fiveDay",
  SixDay = "sixDay",
  OneWeek = "oneWeek",
  TwoWeek = "twoWeek",
  ThreeWeek = "threeWeek",
  OneMonth = "oneMonth",
}

/** Converts the provided resolution to a human readable string.  */
export const resolutionToString = (resolution: Resolution): string => {
  switch (resolution) {
    case Resolution.OneHour:
      return "1 hour";
    case Resolution.TwoHour:
      return "2 hours";
    case Resolution.ThreeHour:
      return "3 hours";
    case Resolution.FourHour:
      return "4 hours";
    case Resolution.FiveHour:
      return "5 hours";
    case Resolution.SixHour:
      return "6 hours";
    case Resolution.SevenHour:
      return "7 hours";
    case Resolution.EightHour:
      return "8 hours";
    case Resolution.NineHour:
      return "9 hours";
    case Resolution.TenHour:
      return "10 hours";
    case Resolution.ElevenHour:
      return "11 hours";
    case Resolution.TwelveHour:
      return "12 hours";
    case Resolution.OneDay:
      return "1 day";
    case Resolution.TwoDay:
      return "2 days";
    case Resolution.ThreeDay:
      return "3 days";
    case Resolution.FourDay:
      return "4 days";
    case Resolution.FiveDay:
      return "5 days";
    case Resolution.SixDay:
      return "6 days";
    case Resolution.OneWeek:
      return "1 week";
    case Resolution.TwoWeek:
      return "2 weeks";
    case Resolution.ThreeWeek:
      return "3 weeks";
    case Resolution.OneMonth:
      return "1 month";
    default:
      assertUnreachable(resolution);
      throw new Error("Invalid resolution");
  }
};

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateDelta {
  hour: number;
  day: number;
  week: number;
  month: number;
}

/** Creates a date delta from the provided resolution. */
const createDateDelta = (resolution: Resolution): DateDelta => {
  switch (resolution) {
    case Resolution.OneHour:
      return { hour: 1, day: 0, week: 0, month: 0 };
    case Resolution.TwoHour:
      return { hour: 2, day: 0, week: 0, month: 0 };
    case Resolution.ThreeHour:
      return { hour: 3, day: 0, week: 0, month: 0 };
    case Resolution.FourHour:
      return { hour: 4, day: 0, week: 0, month: 0 };
    case Resolution.FiveHour:
      return { hour: 5, day: 0, week: 0, month: 0 };
    case Resolution.SixHour:
      return { hour: 6, day: 0, week: 0, month: 0 };
    case Resolution.SevenHour:
      return { hour: 7, day: 0, week: 0, month: 0 };
    case Resolution.EightHour:
      return { hour: 8, day: 0, week: 0, month: 0 };
    case Resolution.NineHour:
      return { hour: 9, day: 0, week: 0, month: 0 };
    case Resolution.TenHour:
      return { hour: 10, day: 0, week: 0, month: 0 };
    case Resolution.ElevenHour:
      return { hour: 11, day: 0, week: 0, month: 0 };
    case Resolution.TwelveHour:
      return { hour: 12, day: 0, week: 0, month: 0 };
    case Resolution.OneDay:
      return { hour: 0, day: 1, week: 0, month: 0 };
    case Resolution.TwoDay:
      return { hour: 0, day: 2, week: 0, month: 0 };
    case Resolution.ThreeDay:
      return { hour: 0, day: 3, week: 0, month: 0 };
    case Resolution.FourDay:
      return { hour: 0, day: 4, week: 0, month: 0 };
    case Resolution.FiveDay:
      return { hour: 0, day: 5, week: 0, month: 0 };
    case Resolution.SixDay:
      return { hour: 0, day: 6, week: 0, month: 0 };
    case Resolution.OneWeek:
      return { hour: 0, day: 0, week: 1, month: 0 };
    case Resolution.TwoWeek:
      return { hour: 0, day: 0, week: 2, month: 0 };
    case Resolution.ThreeWeek:
      return { hour: 0, day: 0, week: 3, month: 0 };
    case Resolution.OneMonth:
      return { hour: 0, day: 0, week: 0, month: 1 };
    default:
      assertUnreachable(resolution);
      throw new Error("Invalid resolution");
  }
};

const dateDeltaByResolution: Map<Resolution, DateDelta> = new Map(
  Object.values(Resolution).map((v: Resolution) => {
    return [v, createDateDelta(v)];
  })
);

/** Converts the provided resolution to a date delta. */
export const resolutionToDateDelta = (resolution: Resolution): DateDelta => {
  if (!dateDeltaByResolution.has(resolution)) {
    throw new Error("Invalid resolution!");
  }
  return dateDeltaByResolution.get(resolution)!;
};

/** Adds a date delta to the provided date. */
export const addDateDelta = (date: Date, dateDelta: DateDelta) => {
  date.setUTCMonth(date.getUTCMonth() + dateDelta.month);
  date.setUTCDate(date.getUTCDate() + dateDelta.day);
  date.setUTCDate(date.getUTCDate() + dateDelta.week * 7);
  date.setUTCHours(date.getUTCHours() + dateDelta.hour);
};

/** Converts the provided date to milliseconds. */
export const dateToMillis = (date: Date): number => {
  const tmp = new Date(date);
  tmp.setUTCHours(tmp.getUTCHours() + GMT_OFFSET_HOURS);
  return tmp.getTime();
};

/** Converts the provided number of milliseconds to a date. */
export const millisToDate = (millis: number): Date => {
  const date = new Date(millis);
  date.setUTCHours(date.getUTCHours() - GMT_OFFSET_HOURS);
  return date;
};
