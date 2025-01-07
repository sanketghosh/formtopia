import { ColumnType, RowType } from "@/types";
import * as XLSX from "xlsx";

export const exportToExcel = (
  columns: ColumnType[],
  rows: RowType[],
  fileName: string,
) => {
  // Transform columns and rows into a flat data structure
  const headers = columns.map((col) => col.label); // Extract column labels for headers
  headers.push("Submitted At");
  const data = rows.map((row) => {
    const rowData: any = {};
    columns.forEach((col) => {
      rowData[col.label] = row[col.id] || ""; // Match column id with row data
    });
    rowData["Submitted At"] = row.submittedAt; // Add the submitted date
    return rowData;
  });

  // Add headers to the data
  const worksheetData = [headers, ...data.map(Object.values)];

  // Create a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  // Trigger the download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
