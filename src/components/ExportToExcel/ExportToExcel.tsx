import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { IUser } from '@/types';
import { Button } from '@/components/ui/button';

interface IDataExport {
    apiData: IUser[];
    fileName: string;
}

const ExportToExcel = ({ apiData, fileName }: IDataExport) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: IUser[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button className="md:text-base sm:text-sm text-xs" onClick={(e) => exportToCSV(apiData, fileName)}>Export to excel</Button>
  );
};

export default ExportToExcel;