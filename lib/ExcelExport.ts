import * as XLSX from "xlsx";

export const ExportDataToExcel = (
  dataToExport: any[],
  title?: string,
  worksheetname?: string
) => {
  try {
    if (!dataToExport || dataToExport.length === 0) {
      alert("No data to export");
      return;
    }

    const chartData = dataToExport.map((item) => ({
      periode: new Date(item.periode).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      }),
      total: item.total,
      totalBersih: item.totalBersih,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(chartData);
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      worksheetname || "Sheet1"
    );

    XLSX.writeFile(workbook, `${title || "export"}.xlsx`);
    console.log("Exported to Excel successfully");
  } catch (error) {
    console.error("Failed to export to Excel", error);
  }
};
