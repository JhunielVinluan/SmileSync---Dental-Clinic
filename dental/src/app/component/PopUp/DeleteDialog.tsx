import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppointmentFormService } from '@/service/component/appointment';
import { usePatientFormService } from '@/service/component/patient';
import usePrescriptionService from '@/service/component/prescription/prescription.service';
import useScheduleService from '@/service/component/schedule/schedule.service';
import { useSurgicalFormService } from '@/service/component/service';
import useTreatmentService from '@/service/component/treatment/treatment.service';
import { actionDataAtom } from '@/store/store';
import { useSetAtom } from 'jotai';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  service?: string;
}
const formatName = (data: any) => {
  if (data.name) {
    return data.name;
  } else if (data.lastName && data.firstName) {
    return data.lastName + ' ' + data.firstName;
  } else {
    return data?.patiendId || data?._id;
  }
};
const DeleteDialog = ({
  isOpen,
  onClose,
  data = {},
  service,
}: DeleteDialogProps) => {
  const { deletePatient } = usePatientFormService();
  const { deleteSurgical } = useSurgicalFormService();
  const { deleteAppointment } = useAppointmentFormService();
  const { deleteTreatment } = useTreatmentService();
  const { deleteSchedule } = useScheduleService();
  const { deletePrescription } = usePrescriptionService();
  const setAction = useSetAtom(actionDataAtom);
  const message = formatName(data);
  const handleDelete = () => {
    setAction({ type: null, data: {} });
    switch (service) {
      case 'patient':
        deletePatient(data?._id);
        break;
      case 'surgical':
        deleteSurgical(data?._id);
        break;
      case 'appointment':
        deleteAppointment(data?._id);
        break;
      case 'treatment':
        deleteTreatment(data?._id);
        break;
      case 'schedule':
        deleteSchedule(data?._id);
        break;
      case 'prescription':
        deletePrescription(data?._id);
        break;
      default:
        console.warn(`Unexpected service type: ${service}`);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm to Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {message} ? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className="bg-primaryColor">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
