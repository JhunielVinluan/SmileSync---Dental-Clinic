import SelectInput from '@/app/component/SelectInput';
import TextAreaInput from '@/app/component/TextAreaInput';
import TextInput from '@/app/component/TextInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useTreatmentService from '@/service/component/treatment/treatment.service';
import { AppointmentFormProps } from '@/types/appointment';
import { format } from 'date-fns';
const TreatmentForm = ({
  isOpen,
  onClose,
  data = {},
}: AppointmentFormProps) => {
  const {
    user,
    errors,
    isSubmitting,
    handleSubmit,
    register,
    onSubmit,
    appointment,
    setSelectedUser,
    selectedUser,
    setSelectedAppointment,
    selectedAppointment,
    setValue,
  } = useTreatmentService();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{data?.type?.toUpperCase()} TREATMENT</DialogTitle>
          <DialogDescription>
            Enter the details of the treatment. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                label="Patient"
                name="userId"
                register={register}
                options={user}
                error={errors.userId?.message}
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                label="Appointment"
                name="appointmentId"
                register={register}
                options={appointment
                  .filter((item) => item.userId === selectedUser) // Filter out invalid items
                  .map((item) => {
                    console.log({ item });
                    return {
                      value: item._id as string, // Assert that _id is a string
                      label: format(item.appointmentDate, 'MMM dd, yyyy'), // Assert that userFullName is a string
                    };
                  })}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const foundAppointment = appointment.find(
                    (item) => item._id === selectedId,
                  );
                  console.log({ foundAppointment });
                  setValue('treatment', foundAppointment?.service ?? 'none');
                  setSelectedAppointment(selectedId);
                }}
                error={errors.userId?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                type={'text'}
                label="Treatment"
                name="treatment"
                defaultValue={selectedAppointment ?? 'none'}
                register={register}
                error={errors.treatment?.message}
                disabled={true}
              />
            </div>
            <TextInput
              type={'text'}
              label="Teeth No./s"
              name="teethNo"
              register={register}
              error={errors.teethNo?.message}
            />
            <TextAreaInput
              label="Description"
              name="description"
              register={register}
              error={errors.description?.message}
            />
            <TextInput
              type={'text'}
              label="Fees"
              name="fees"
              register={register}
              error={errors.fees?.message}
            />
            <TextInput
              type={'text'}
              label="Remarks"
              name="remarks"
              register={register}
              error={errors.remarks?.message}
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
export default TreatmentForm;
