import PrintablePrescription from '@/app/component/PrintablePrescription';
import { usePrintService } from '@/service/print.service';
import { PrescriptionInfoType } from '@/types/appointment';
import { Printer } from 'lucide-react';

type PrintButtonProps = {
  data?: PrescriptionInfoType; // 2D array for table rows
};

const PrintPrescription = ({ data }: PrintButtonProps) => {
  const { handlePrint, printRef } = usePrintService();

  return (
    <>
      {/* Hidden table content to be printed */}
      <div ref={printRef} className="hidden">
        <PrintablePrescription prescription={data} />
      </div>

      {/* Print button */}
      <div
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 bg-primaryColor w-[6em] h-[2.5em] text-white rounded-md hover:bg-primaryColor-dark"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </div>
    </>
  );
};

export default PrintPrescription;
