import { generatePDFData } from '@/utils/common.utils';

const PDFDownloader = ({
  data,
  fileName,
}: {
  data: Record<string, any>[];
  fileName: string;
}) => {
  // Function to handle PDF export
  const handleDownloadPDF = () => {
    const pdfDoc = generatePDFData(data); // Generate PDF document
    if (!pdfDoc) {
      console.error('No data available to export');
      return;
    }

    // Save the PDF with the specified file name
    pdfDoc.save(`${fileName}.pdf`);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-red-600 p-2 h-10 rounded-md text-center text-white w-[10em]"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloader;
