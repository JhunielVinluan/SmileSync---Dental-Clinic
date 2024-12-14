import DatePicker from '@/app/component/DatePicker';
import SelectInput from '@/app/component/SelectInput';
import TextAreaInput from '@/app/component/TextAreaInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import usePrescriptionService from '@/service/component/prescription/prescription.service';
import { AppointmentFormProps } from '@/types/appointment';
import { format } from 'date-fns';
const PrescriptionForm = ({
  isOpen,
  onClose,
  data = {},
}: AppointmentFormProps) => {
  const {
    user,
    dateVisit,
    errors,
    isSubmitting,
    setDateVisit,
    handleSubmit,
    register,
    onSubmit,
    setSelectedUser,
    selectedUser,
    appointment,
  } = usePrescriptionService();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{data?.type?.toUpperCase()} PRESCRIPTION</DialogTitle>
          <DialogDescription>
            Enter the details of the treatment. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                label="User"
                name="userId"
                register={register}
                options={user}
                error={errors.userId?.message}
                onChange={(e) => setSelectedUser(e.target.value)}
              />
            </div>
            <SelectInput
              label="Appointment"
              name="appointmentId"
              register={register}
              options={appointment
                .filter((item) => item.userId === selectedUser) // Filter out invalid items
                .map((item) => ({
                  value: item._id as string, // Assert that _id is a string
                  label: format(item.appointmentDate, 'MMM dd, yyyy'), // Assert that userFullName is a string
                }))}
              error={errors.appointmentId?.message}
            />
            <DatePicker
              date={dateVisit}
              setDate={setDateVisit}
              label="Date Visit"
              disableFutureDates={true}
            />
            <TextAreaInput
              label="Notes"
              name="notes"
              register={register}
              error={errors.notes?.message}
            />

            <TextAreaInput
              label="Medicine"
              name="medicine"
              register={register}
              error={errors.medicine?.message}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primaryColor"
              disabled={isSubmitting}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default PrescriptionForm;
