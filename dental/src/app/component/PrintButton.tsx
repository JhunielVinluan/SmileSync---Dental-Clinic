import PrintableTable from '@/app/component/PrintableTable';
import { usePrintService } from '@/service/print.service';
import { Printer } from 'lucide-react';

type PrintButtonProps = {
  head: string[]; // Array of strings for table headers
  data: string[][]; // 2D array for table rows
};

const PrintButton = ({ head, data }: PrintButtonProps) => {
  const { handlePrint, printRef } = usePrintService();

  return (
    <>
      {/* Hidden table content to be printed */}
      <div ref={printRef} className="hidden">
        <PrintableTable head={head} data={data} />
      </div>

      {/* Print button */}
      <div
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 bg-primaryColor h-[2.5em] text-white rounded-md hover:bg-primaryColor-dark"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </div>
    </>
  );
};

export default PrintButton;
