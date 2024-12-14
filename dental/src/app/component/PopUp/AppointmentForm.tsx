import DatePicker from '@/app/component/DatePicker';
import SelectInput from '@/app/component/SelectInput';
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
import { AppointmentFormProps, MINUTE_DURATION_60 } from '@/types/appointment';
const AppointmentForm = ({
  isOpen,
  onClose,
  data = {},
}: AppointmentFormProps) => {
  const {
    user,
    dentalServices,
    appointmentType,
    dentist,
    dentalStatus,
    appointmentDate,
    errors,
    isSubmitting,
    setAppointmentDate,
    handleSubmit,
    register,
    onSubmit,
  } = useAppointmentFormService();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data?.type?.toUpperCase()} PATIENT</DialogTitle>
          <DialogDescription>
            Enter the details of the patient. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <SelectInput
                label="Patient"
                name="userId"
                register={register}
                options={user}
                error={errors.userId?.message}
              />
              <SelectInput
                label="Doctor"
                name="doctorId"
                register={register}
                options={dentist}
                error={errors.doctorId?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                date={appointmentDate}
                setDate={setAppointmentDate}
                label="Appointment Date"
              />
              <SelectInput
                label="Appointment Type"
                name="appointmentType"
                register={register}
                options={appointmentType}
                error={errors.appointmentType?.message}
              />
            </div>
            <SelectInput
              label="Appointed Time"
              name="timeStart"
              register={register}
              options={MINUTE_DURATION_60}
              error={errors.timeStart?.message}
            />
            <SelectInput
              label="Appointed Time"
              name="timeEnd"
              register={register}
              options={MINUTE_DURATION_60}
              error={errors.timeEnd?.message}
            />
            <SelectInput
              label="Service"
              name="service"
              register={register}
              options={dentalServices}
              error={errors.service?.message}
            />
            <SelectInput
              label="Appointed Status"
              name="appointmentStatus"
              register={register}
              options={dentalStatus}
              error={errors.appointmentStatus?.message}
            />
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <p className="text-sm">Send Email</p>
            </div>
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
export default AppointmentForm;
