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
import useScheduleService from '@/service/component/schedule/schedule.service';
import {
  AppointmentFormProps,
  MINUTE_DURATION_60,
  MINUTE_INTERVALS,
} from '@/types/appointment';
const ScheduleForm = ({ isOpen, onClose, data = {} }: AppointmentFormProps) => {
  const {
    user,
    dateVisit,
    errors,
    isSubmitting,
    setDateVisit,
    handleSubmit,
    register,
    onSubmit,
  } = useScheduleService();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{data?.type?.toUpperCase()} SCHEDULE</DialogTitle>
          <DialogDescription>
            Enter the details of the schedule. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                label="Doctor"
                name="doctorId"
                register={register}
                options={user}
                error={errors.doctorId?.message}
              />
            </div>

            <DatePicker
              date={dateVisit}
              setDate={setDateVisit}
              label="Day"
              disablePastDates={true}
            />
            <SelectInput
              label="Start Time"
              name="startTime"
              register={register}
              options={MINUTE_DURATION_60}
              error={errors.startTime?.message}
            />
            <SelectInput
              label="Duration"
              name="duration"
              register={register}
              options={MINUTE_INTERVALS}
              error={errors.doctorId?.message}
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
export default ScheduleForm;
