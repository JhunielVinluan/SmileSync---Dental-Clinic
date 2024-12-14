import * as XLSX from 'xlsx';
import { generateExcelData } from '@/utils/common.utils';

const ExcelDownloader = ({
  data,
  fileName,
}: {
  data: Record<string, any>[];
  fileName: string;
}) => {
  // Function to handle Excel export
  const handleDownloadExcel = () => {
    const worksheet = generateExcelData(data); // Generate worksheet
    if (!worksheet) {
      console.error('No data available to export');
      return;
    }

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleDownloadExcel}
      className="bg-green-600 p-2 h-10 rounded-md text-center text-white w-[10em]"
    >
      Download Excel
    </button>
  );
};

export default ExcelDownloader;
