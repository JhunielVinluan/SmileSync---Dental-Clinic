import SelectInput from '@/app/component/SelectInput';
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
import { useSurgicalFormService } from '@/service/component/service';
import { ServiceFormProps } from '@/types/service.types';
import TextAreaInput from '../TextAreaInput';

const ServiceForm = ({ isOpen, onClose }: ServiceFormProps) => {
  const { errors, isSubmitting, handleSubmit, register, onSubmit, data, type } =
    useSurgicalFormService();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type?.toUpperCase()} SURGICAL</DialogTitle>
          <DialogDescription>
            Enter the details of the patient. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <TextInput
              label="Equipment Name"
              name="name"
              register={register}
              error={errors.name?.message}
              defaultValue={data?.name}
            />
            <SelectInput
              label="Status"
              name="status"
              register={register}
              error={errors.status?.message}
              defaultValue={data?.status}
              options={[
                {
                  label: 'Active',
                  value: 'active',
                },
                {
                  label: 'Inactive',
                  value: 'inactive',
                },
              ]}
            />
            <TextAreaInput
              label="Description"
              name="description"
              register={register}
              error={errors.description?.message}
              defaultValue={data?.description}
            />
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <p className="text-sm">Send Email</p>
            </div>
          </div>
          <DialogFooter>
            {type == 'view' ? (
              <Button
                onClick={onClose}
                className="bg-primaryColor"
                disabled={isSubmitting}
              >
                Close
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-primaryColor"
                disabled={isSubmitting}
              >
                Save changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ServiceForm;
