import React, { ReactElement } from "react";
import { TreeList, Column, FilterRow } from "devextreme-react/tree-list";
import styled from "styled-components";
import { dxTreeListColumn, dxTreeListNode } from "devextreme/ui/tree_list";
import { LoadPanel } from "devextreme-react/load-panel";
import {
  addDateDelta,
  DateDelta,
  DateRange,
  dateToMillis,
  Resolution,
  resolutionToDateDelta,
} from "../../utils/dateUtils";
import { OeeData } from "../../utils/oeeApi";

const customizeRowHeader = (cellElement: HTMLElement, level: number) => {
  let styles: Array<string>;
  if (level === 0) {
    styles = ["background-color: rgb(77, 165, 216); ", "color: white"];
  } else {
    styles = ["background-color: white; ", "color: black"];
  }
  cellElement.setAttribute("style", styles.join(";"));
};

const colorCellByNumber = (
  cellElement: HTMLElement,
  value: number | undefined
) => {
  if (value === undefined) {
    return;
  }

  const styles: Array<string> = [];
  if (value < 60) {
    styles.push("background-color: rgb(255, 102, 102)");
  } else if (value < 85) {
    styles.push("background-color: rgb(255, 153, 51)");
  } else if (value < 95) {
    styles.push("background-color: rgb(255, 255, 102)");
  } else {
    styles.push("background-color: rgb(153, 255, 102)");
  }
  cellElement.setAttribute("style", styles.join(";"));
};

const customizeDataCell = (
  column: dxTreeListColumn,
  node: dxTreeListNode,
  cellElement: HTMLElement,
  value: any
) => {
  switch (column.dataField) {
    case "sName":
      customizeRowHeader(cellElement, node.level!);
      break;
    case "Min":
    case "Max":
      // Do nothing
      break;
    case "average":
      colorCellByNumber(cellElement, value);
      break;
    default:
      if (node.level === 0) {
        colorCellByNumber(cellElement, value);
      } else if (value !== null && value !== undefined) {
        // Color the cell grey.
        cellElement.setAttribute(
          "style",
          "background-color: rgb(213, 213, 195)"
        );
      }
      break;
  }
};

const customizeColumnHeaderCell = (cellElement: HTMLElement) => {
  const styles = [
    "background-color: rgb(60, 141, 188)",
    "color: white",
    "text-align: center",
  ];
  cellElement.setAttribute("style", styles.join(";"));
};

type RowType = "data" | "detail" | "detailAdaptive" | "header" | "filter";

const customizeCell = (
  rowType: RowType,
  column: dxTreeListColumn,
  node: dxTreeListNode | null,
  cellElement: HTMLElement,
  value: any
) => {
  switch (rowType) {
    case "data":
      customizeDataCell(column, node!, cellElement, value);
      break;
    case "header":
      customizeColumnHeaderCell(cellElement);
      break;
    default:
      // No customization.
      break;
  }
};

const getDataFieldKey = (date: Date, dateDelta: DateDelta) => {
  const nextDate = new Date(date);
  addDateDelta(nextDate, dateDelta);
  return `${dateToMillis(date)}-${dateToMillis(nextDate)}`;
};

const createMonthOrWeekDateColumns = (
  dateRange: DateRange,
  dateDelta: DateDelta
): Array<ReactElement> => {
  const columns: Array<ReactElement> = [];
  for (
    let date = new Date(dateRange.startDate);
    date <= dateRange.endDate;
    addDateDelta(date, dateDelta)
  ) {
    const dataFieldKey = getDataFieldKey(date, dateDelta);
    const endDate = new Date(date);
    addDateDelta(endDate, dateDelta);
    columns.push(
      <Column
        allowFiltering={false}
        caption={`${date.toLocaleDateString("en-GB", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })} - ${endDate.toLocaleDateString("en-GB", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })}`}
        dataField={dataFieldKey}
        key={dataFieldKey}
      />
    );
  }
  return columns;
};

const createDayDateColumns = (
  dateRange: DateRange,
  dateDelta: DateDelta
): Array<ReactElement> => {
  const columnByDate: Map<Date, ReactElement> = new Map();
  for (
    let date = new Date(dateRange.startDate);
    date <= dateRange.endDate;
    addDateDelta(date, dateDelta)
  ) {
    const dataFieldKey = getDataFieldKey(date, dateDelta);
    columnByDate.set(
      new Date(date),
      <Column
        allowFiltering={false}
        caption={`${date.getUTCDate()}`}
        dataField={dataFieldKey}
        key={dataFieldKey}
      />
    );
  }

  const startMonthDate = new Date(
    Date.UTC(
      dateRange.startDate.getUTCFullYear(),
      dateRange.startDate.getUTCMonth(),
      1
    )
  );
  const endMonthDate = new Date(
    Date.UTC(
      dateRange.endDate.getUTCFullYear(),
      dateRange.endDate.getUTCMonth(),
      1
    )
  );
  const monthColumns: Array<ReactElement> = [];
  const monthDateDelta: DateDelta = { month: 1, week: 0, day: 0, hour: 0 };
  for (
    let date = startMonthDate;
    date <= endMonthDate;
    addDateDelta(date, monthDateDelta)
  ) {
    const dataFieldKey = getDataFieldKey(date, dateDelta);
    const endDate = new Date(date);
    addDateDelta(endDate, monthDateDelta);
    monthColumns.push(
      <Column
        allowFiltering={false}
        caption={date.toLocaleDateString(undefined, {
          month: "long",
          timeZone: "UTC",
        })}
        key={dataFieldKey}
      >
        {[...columnByDate]
          .filter(([columnDate]) => columnDate >= date && columnDate < endDate)
          .map(([, column]) => column)}
      </Column>
    );
  }
  return monthColumns;
};

const createHourDateColumns = (
  dateRange: DateRange,
  dateDelta: DateDelta
): Array<ReactElement> => {
  const columnByDate: Map<Date, ReactElement> = new Map();
  for (
    let date = new Date(dateRange.startDate);
    date <= dateRange.endDate;
    addDateDelta(date, dateDelta)
  ) {
    const dataFieldKey = getDataFieldKey(date, dateDelta);
    const endDate = new Date(date);
    addDateDelta(endDate, dateDelta);
    columnByDate.set(
      new Date(date),
      <Column
        allowFiltering={false}
        caption={`${date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })} - ${endDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })}`}
        dataField={dataFieldKey}
        key={dataFieldKey}
      />
    );
  }

  const dateColumns: Array<ReactElement> = [];
  const dateDateDelta: DateDelta = { month: 0, week: 0, day: 1, hour: 0 };
  const startDate = new Date(dateRange.startDate);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(dateRange.endDate);
  endDate.setUTCHours(0, 0, 0, 0);
  for (
    let date = startDate;
    date <= endDate;
    addDateDelta(date, dateDateDelta)
  ) {
    const dataFieldKey = getDataFieldKey(date, dateDelta);
    const endDateRange = new Date(date);
    addDateDelta(endDateRange, dateDateDelta);
    dateColumns.push(
      <Column
        allowFiltering={false}
        caption={date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          timeZone: "UTC",
        })}
        key={dataFieldKey}
      >
        {[...columnByDate]
          .filter(
            ([columnDate]) => columnDate >= date && columnDate < endDateRange
          )
          .map(([, column]) => column)}
      </Column>
    );
  }
  return dateColumns;
};

const createDateColumns = (
  dateRange: DateRange,
  dateDelta: DateDelta
): Array<ReactElement> => {
  // Construct different parent columns depending on the delta.
  if (dateDelta.month > 0 || dateDelta.week > 0) {
    return createMonthOrWeekDateColumns(dateRange, dateDelta);
  }
  if (dateDelta.day > 0) {
    return createDayDateColumns(dateRange, dateDelta);
  }
  if (dateDelta.hour > 0) {
    return createHourDateColumns(dateRange, dateDelta);
  }
  throw new Error("Invalid date delta!");
};

const ROW_PADDING_PX = 4;
const COL_MIN_WIDTH = 45 + 2 * ROW_PADDING_PX;

const StyledTreeList = styled(TreeList)`
  font-size: 11px;

  .dx-row > td {
    padding: ${ROW_PADDING_PX}px;
  }
`;

interface Props {
  dataSource: OeeData | undefined;
  dateRange: DateRange;
  resolution: Resolution;
}

/** The OEE analysis table, which displays data from the provided dataSource. */
const OeeAnalysisTable = React.memo(
  ({ dataSource, dateRange, resolution }: Props) => {
    if (dataSource === undefined) {
      // For some reason, it's better to completely remove the tree list from the DOM
      // as opposed to setting the dataSource to undefined. Probably, it's not
      // well optimized.
      return <LoadPanel visible />;
    }
    return (
      <StyledTreeList
        columnMinWidth={75}
        dataSource={dataSource}
        height="100%"
        keyExpr="id"
        loadPanel={{ enabled: true }}
        onCellPrepared={(e) => {
          customizeCell(
            e.rowType as RowType,
            e.column!,
            e.row?.node!,
            e.cellElement!,
            e.value
          );
        }}
        parentIdExpr="parentId"
        rootValue={null}
        scrolling={{ columnRenderingMode: "virtual" }}
        width="100%"
      >
        <FilterRow visible />
        <Column dataField="sName" caption="Node" width="191px" />
        <Column
          dataField="average"
          caption="Avg."
          minWidth={COL_MIN_WIDTH}
          cellRender={(e) => <>{e.value} %</>}
        />
        <Column dataField="Min" caption="Min" minWidth={COL_MIN_WIDTH} />
        <Column dataField="Max" caption="Max" minWidth={COL_MIN_WIDTH} />
        {createDateColumns(dateRange, resolutionToDateDelta(resolution))}
      </StyledTreeList>
    );
  }
);

export default OeeAnalysisTable;
