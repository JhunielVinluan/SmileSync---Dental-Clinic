import { AppointmentType } from '@/app/pages/Calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@radix-ui/react-select';
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

interface AppointmentModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  appointment?: AppointmentType;
}

const AppointmentModal = ({
  isOpen,
  setIsOpen,
  appointment,
}: AppointmentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Appointment Info</DialogTitle>
        </DialogHeader>
        <Separator className="bg-black h-1 w-full" />
        <div className="text-xl gap-4 flex flex-col">
          <div>
            <p className="font-bold">Client: {appointment?.userName}</p>
            <p>Number: {appointment?.userPhoneNumber}</p>
            <p>Email: {appointment?.userEmail}</p>
          </div>
          <div>
            <p>Dentist: Dr. Siyo Vallao</p>
            <p>
              Date:
              {format(
                appointment?.appointmentDate ?? new Date(),
                ' MMM dd , yyyy',
              )}
            </p>
            <p className="font-bold">
              Time:
              {appointment?.timeStart} - {appointment?.timeEnd}
            </p>
          </div>
          <p>
            Status:{''}
            <span className="bg-primaryColor text-white px-2 py-1 rounded-xl">
              {appointment?.appointmentStatus}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
