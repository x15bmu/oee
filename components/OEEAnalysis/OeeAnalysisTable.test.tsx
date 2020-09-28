import React from "react";
import { render } from "@testing-library/react";
import { DateRange, dateToMillis, Resolution } from "../../utils/dateUtils";
import OeeAnalysisTable from "./OeeAnalysisTable";

describe("OeeAnalysisTable", () => {
  describe("column header", () => {
    const dateRange: DateRange = {
      startDate: new Date(Date.UTC(2020, 9, 20)),
      endDate: new Date(Date.UTC(2020, 10, 1)),
    };

    it("renders columns correctly with month resolution", () => {
      const { container } = render(
        <OeeAnalysisTable
          dataSource={undefined}
          dateRange={dateRange}
          resolution={Resolution.OneMonth}
        />
      );

      // Check all the columns.
      let column = container.querySelector(
        'tr.dx-header-row [aria-colindex="1"]'
      );
      expect(column?.textContent).toBe("Node");

      column = container.querySelector('tr.dx-header-row [aria-colindex="2"]');
      expect(column?.textContent).toBe("Avg.");

      column = container.querySelector('tr.dx-header-row [aria-colindex="3"]');
      expect(column?.textContent).toBe("Min");

      column = container.querySelector('tr.dx-header-row [aria-colindex="4"]');
      expect(column?.textContent).toBe("Max");

      column = container.querySelector('tr.dx-header-row [aria-colindex="5"]');
      // TODO(bmattinson): There's an ICU bug on my machine which causes this
      // to be rendered in my local date representation instead of the requested
      // en-GB.
      expect(column?.textContent).toBe("Oct 20, 12:00 AM - Nov 20, 12:00 AM");

      // No column 6.
      column = container.querySelector('tr.dx-header-row [aria-colindex="6"]');
      expect(column).toBeNull();
    });

    it("renders columns correctly with week resolution", () => {
      const { container } = render(
        <OeeAnalysisTable
          dataSource={undefined}
          dateRange={dateRange}
          resolution={Resolution.TwoWeek}
        />
      );

      // Check all the columns.
      let column = container.querySelector(
        'tr.dx-header-row [aria-colindex="1"]'
      );
      expect(column?.textContent).toBe("Node");

      column = container.querySelector('tr.dx-header-row [aria-colindex="2"]');
      expect(column?.textContent).toBe("Avg.");

      column = container.querySelector('tr.dx-header-row [aria-colindex="3"]');
      expect(column?.textContent).toBe("Min");

      column = container.querySelector('tr.dx-header-row [aria-colindex="4"]');
      expect(column?.textContent).toBe("Max");

      column = container.querySelector('tr.dx-header-row [aria-colindex="5"]');
      // TODO(bmattinson): There's an ICU bug on my machine which causes this
      // to be rendered in my local date representation instead of the requested
      // en-GB.
      expect(column?.textContent).toBe("Oct 20, 12:00 AM - Nov 03, 12:00 AM");

      // No column 6.
      column = container.querySelector('tr.dx-header-row [aria-colindex="6"]');
      expect(column).toBeNull();
    });

    it("renders columns correctly with day resolution", () => {
      const { container } = render(
        <OeeAnalysisTable
          dataSource={undefined}
          dateRange={dateRange}
          resolution={Resolution.OneDay}
        />
      );

      const headerRows = Array.from(
        container.querySelectorAll("tr.dx-header-row")
      );
      expect(headerRows.length).toEqual(2);

      // Check first header row.
      let column = headerRows[0].querySelector('[aria-colindex="1"]');
      expect(column?.textContent).toBe("Node");

      column = headerRows[0].querySelector('[aria-colindex="2"]');
      expect(column?.textContent).toBe("Avg.");

      column = headerRows[0].querySelector('[aria-colindex="3"]');
      expect(column?.textContent).toBe("Min");

      column = headerRows[0].querySelector('[aria-colindex="4"]');
      expect(column?.textContent).toBe("Max");

      column = headerRows[0].querySelector('[aria-colindex="5"]');
      expect(column?.textContent).toBe("October");

      // Note: colindex jumps up because previous colspan is 12.
      column = headerRows[0].querySelector('[aria-colindex="17"]');
      expect(column?.textContent).toBe("November");

      // Check second header row.
      column = headerRows[1].querySelector('[aria-colindex="1"]');
      expect(column?.textContent).toBe("20");

      column = headerRows[1].querySelector('[aria-colindex="2"]');
      expect(column?.textContent).toBe("21");

      column = headerRows[1].querySelector('[aria-colindex="12"]');
      expect(column?.textContent).toBe("31");

      column = headerRows[1].querySelector('[aria-colindex="13"]');
      expect(column?.textContent).toBe("1");

      column = headerRows[1].querySelector('[aria-colindex="14"]');
      expect(column).toBeNull();
    });

    it("renders columns correctly with hour resolution", () => {
      const { container } = render(
        <OeeAnalysisTable
          dataSource={undefined}
          dateRange={dateRange}
          resolution={Resolution.TwelveHour}
        />
      );

      const headerRows = Array.from(
        container.querySelectorAll("tr.dx-header-row")
      );
      expect(headerRows.length).toEqual(2);

      // Check first header row.
      let column = headerRows[0].querySelector('[aria-colindex="1"]');
      expect(column?.textContent).toBe("Node");

      column = headerRows[0].querySelector('[aria-colindex="2"]');
      expect(column?.textContent).toBe("Avg.");

      column = headerRows[0].querySelector('[aria-colindex="3"]');
      expect(column?.textContent).toBe("Min");

      column = headerRows[0].querySelector('[aria-colindex="4"]');
      expect(column?.textContent).toBe("Max");

      column = headerRows[0].querySelector('[aria-colindex="5"]');
      // TODO(bmattinson): There's an ICU bug on my machine which causes this
      // to be rendered in my local date representation instead of the requested
      // en-GB.
      expect(column?.textContent).toBe("October 20");

      column = headerRows[0].querySelector('[aria-colindex="7"]');
      // TODO(bmattinson): There's an ICU bug on my machine which causes this
      // to be rendered in my local date representation instead of the requested
      // en-GB.
      expect(column?.textContent).toBe("October 21");

      column = headerRows[0].querySelector('[aria-colindex="29"]');
      // TODO(bmattinson): There's an ICU bug on my machine which causes this
      // to be rendered in my local date representation instead of the requested
      // en-GB.
      expect(column?.textContent).toBe("November 01");

      // Check second header row.
      column = headerRows[1].querySelector('[aria-colindex="1"]');
      expect(column?.textContent).toBe("12:00 AM - 12:00 PM");

      column = headerRows[1].querySelector('[aria-colindex="2"]');
      expect(column?.textContent).toBe("12:00 PM - 12:00 AM");
    });
  });

  describe("cell header", () => {
    it("renders correctly", async () => {
      const dateRange: DateRange = {
        startDate: new Date(Date.UTC(2020, 9, 20)),
        endDate: new Date(Date.UTC(2020, 9, 23)),
      };

      const { findByText } = render(
        <OeeAnalysisTable
          dataSource={[
            {
              id: "dataSourceId",
              parentId: undefined,
              sName: "dataSourceName",
              average: 0.87,
              Min: "",
              Max: "",
            },
          ]}
          dateRange={dateRange}
          resolution={Resolution.OneDay}
        />
      );

      const nameDiv = await findByText("dataSourceName");
      expect(nameDiv).not.toBeNull();
      const nameTd = nameDiv.closest("td");
      expect(nameTd).not.toBeNull();
      expect(nameTd!.style.backgroundColor).toMatch("rgb(77, 165, 216)");
    });
  });

  describe("cell data avg", () => {
    it("renders correctly", async () => {
      const dateRange: DateRange = {
        startDate: new Date(Date.UTC(2020, 9, 20)),
        endDate: new Date(Date.UTC(2020, 9, 23)),
      };

      const { findByText } = render(
        <OeeAnalysisTable
          dataSource={[
            {
              id: "dataSourceId",
              parentId: undefined,
              sName: "dataSourceName",
              average: 0.87,
              Min: "",
              Max: "",
            },
          ]}
          dateRange={dateRange}
          resolution={Resolution.OneDay}
        />
      );

      const avgDiv = await findByText(/0\.87/);
      expect(avgDiv).not.toBeNull();
      expect(avgDiv.textContent).toEqual("0.87 %");
      const avgTd = avgDiv.closest("td");
      expect(avgTd).not.toBeNull();
    });
  });

  describe("other cell data", () => {
    it("renders correctly", async () => {
      const dateRange: DateRange = {
        startDate: new Date(Date.UTC(2020, 9, 20)),
        endDate: new Date(Date.UTC(2020, 9, 27)),
      };

      const { findByText } = render(
        <OeeAnalysisTable
          dataSource={[
            {
              id: "dataSourceId",
              parentId: undefined,
              sName: "dataSourceName",
              average: 0.87,
              Min: "",
              Max: "",
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 20)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 21))
              )}`]: 59.9,
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 21)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 22))
              )}`]: 60,
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 22)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 23))
              )}`]: 84.9,
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 23)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 24))
              )}`]: 85,
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 24)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 25))
              )}`]: 94.9,
              [`${dateToMillis(new Date(Date.UTC(2020, 9, 26)))}-${dateToMillis(
                new Date(Date.UTC(2020, 9, 27))
              )}`]: 95,
            },
          ]}
          dateRange={dateRange}
          resolution={Resolution.OneDay}
        />
      );

      const testCell = async (cellText: RegExp, backgroundColor: string) => {
        const div = await findByText(cellText);
        expect(div).not.toBeNull();
        const td = div.closest("td");
        expect(td).not.toBeNull();
        expect(td!.style.backgroundColor).toMatch(backgroundColor);
      };

      await testCell(/59\.9/, "rgb(255, 102, 102)");
      await testCell(/60/, "rgb(255, 153, 51)");
      await testCell(/84\.9/, "rgb(255, 153, 51)");
      await testCell(/85/, "rgb(255, 255, 102)");
      await testCell(/94.9/, "rgb(255, 255, 102)");
      await testCell(/95/, "rgb(153, 255, 102)");
    });
  });
});
