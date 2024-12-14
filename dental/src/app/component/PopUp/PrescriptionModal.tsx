import PrintPrescription from '@/app/component/PrintPrescription';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PrescriptionInfoType } from '@/types/appointment';
import { Separator } from '@radix-ui/react-select';
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

interface PrescriptionProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  prescription?: PrescriptionInfoType;
}

const PrescriptionModal = ({
  isOpen,
  setIsOpen,
  prescription,
}: PrescriptionProps) => {
  const dateVisit = prescription?.dateVisit
    ? new Date(prescription.dateVisit)
    : new Date();
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:min-w-[425px] bg-modalBgColor border-none">
        <DialogHeader>
          <DialogTitle className="text-center">
            SMILESYNC AT RAMOS VALLAO DENTAL CLINIC
          </DialogTitle>
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
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Separator className="bg-black h-[1px] w-full" />
          <div className="w-full flex flex-row justify-between items-center">
            <p className="w-1/2">Name: {prescription?.userFullName}</p>
            <p className="w-1/2">Address: {prescription?.userAddress}</p>
          </div>
          <Separator className="bg-black h-[1px] w-full" />
          <div className="w-full flex flex-row justify-between items-center">
            <p className="w-1/2">Gender: {prescription?.userGender}</p>
            <p className="w-1/2">Age: {prescription?.userAge}</p>
            <p className="w-1/2">Date: {format(dateVisit, 'MMM dd, yyyy')}</p>
          </div>
          <Separator className="bg-black h-[1px] w-full" />
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
            <PrintPrescription data={prescription} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionModal;
