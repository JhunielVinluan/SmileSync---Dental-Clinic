import { generatePrintData } from '@/utils/common.utils';

const PrintDownloader = ({
    data,
    fileName,
  }: {
    data: Record<string, any>[];
    fileName: string;
  }) => {
    const handlePrint = () => {
      // You can customize the content that needs to be printed
      const tableContent = generatePrintTable(data);
      generatePrintData(tableContent);
    };
  
    const generatePrintTable = (data: Record<string, any>[]) => {
      if (data.length === 0) return '<p>No data available to print</p>';
  
      // Extract the headers from the first object
      const headers = Object.keys(data[0]);
      let tableContent = `<table border="1" style="width: 100%; border-collapse: collapse;">`;
      tableContent += '<thead><tr>';
  
      // Add headers to the table
      headers.forEach((header) => {
        tableContent += `<th style="padding: 8px; background-color: #f4f4f4; text-align: left;">${header}</th>`;
      });
      tableContent += '</tr></thead>';
  
      // Add rows of data
      tableContent += '<tbody>';
      data.forEach((entry) => {
        tableContent += '<tr>';
        headers.forEach((header) => {
          tableContent += `<td style="padding: 8px;">${entry[header] ?? ''}</td>`;
        });
        tableContent += '</tr>';
      });
      tableContent += '</tbody>';
      tableContent += '</table>';
  
      return tableContent;
    };
  
    return (
      <button
        onClick={handlePrint}
        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
      >
        Print
      </button>
    );
  };
  
  export default PrintDownloader;
  