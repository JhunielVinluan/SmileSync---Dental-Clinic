import { PrescriptionInfoType } from '@/types/appointment';
import { format } from 'date-fns';

type PrintableTableProps = {
  prescription?: PrescriptionInfoType; // 2D array for table rows
};

const PrintablePrescription = ({ prescription }: PrintableTableProps) => (
  <div id="printable-table">
    <div className="sm:min-w-[425px] bg-modalBgColor border-none">
      <div className="text-center">
        <h2>SMILESYNC AT RAMOS VALLAO DENTAL CLINIC</h2>
        <div className="flex flex-col justify-center items-center">
          <p>Bugallon, Pangasinan</p>
          <p>+63 912 345 6789</p>
          <img
            src="/teeth.png"
            alt="teethImage"
            height={100}
            width={100}
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-black h-[1px] w-full" />
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-1/2">Name: {prescription?.userFullName}</p>
          <p className="w-1/2">Address: {prescription?.userAddress}</p>
        </div>
        <div className="bg-black h-[1px] w-full" />
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-1/2">Gender: {prescription?.userGender}</p>
          <p className="w-1/2">Age: {prescription?.userAge}</p>
          <p className="w-1/2">
            Date:
            {format(prescription?.dateVisit ?? new Date(), 'MMM dd, yyyy')}
          </p>
        </div>
        <div className="bg-black h-[1px] w-full" />
        <div className="flex flex-row justify-center items-center my-4">
          <img
            src="/rx.png"
            alt="teethImage"
            height={150}
            width={150}
            className=""
          />
          <p>{prescription?.medicine}</p>
        </div>
        <div className="text-sm">
          <p>Lic No: 12345</p>
          <p>PTR No: 1235134</p>
        </div>
      </div>
    </div>
  </div>
);

export default PrintablePrescription;
