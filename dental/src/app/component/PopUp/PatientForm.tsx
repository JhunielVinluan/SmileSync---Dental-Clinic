import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePatientFormService } from '@/service/component/patient';
import { PatientFormProps } from '@/types/appointment';
import SelectInput from '@/app/component/SelectInput';
import TextInput from '@/app/component/TextInput';
import { useState } from 'react';

const PatientForm = ({ isOpen, onClose }: PatientFormProps) => {
  const {
    errors,
    isSubmitting,
    handleSubmit,
    register,
    onSubmit,
    data,
    type,
    user,
    setValue,
  } = usePatientFormService();

  // Function to calculate age based on the birthdate
  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Handle the change event for birthdate input and set age
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdate = e.target.value;
    setValue('birthdate', birthdate); // Update birthdate in the form

    const age = calculateAge(birthdate); // Calculate the age
    setValue('age', age); // Update the age field dynamically
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type?.toUpperCase()} PATIENT</DialogTitle>
          <DialogDescription>
            Enter the details of the patient. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <SelectInput
              label="Existing Patient (Optional)"
              name="linkUserId"
              register={register}
              options={user}
              error={errors.linkUserId?.message}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
                defaultValue={data?.firstName}
              />
              <TextInput
                label="Initial Name"
                name="middleName"
                register={register}
                error={errors.middleName?.message}
                defaultValue={data?.middleName}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Last Name"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
                defaultValue={data?.lastName}
              />
              <TextInput
                label="Age"
                name="age"
                type="number"
                register={register}
                error={errors.age?.message}
                defaultValue={data?.age}
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectInput
                label="Civil Status"
                name="civilStatus"
                register={register}
                error={errors.civilStatus?.message}
                defaultValue={data?.civilStatus}
                options={[
                  { label: 'Single', value: 'single' },
                  { label: 'Married', value: 'married' },
                  { label: 'Divorced', value: 'divorced' },
                  { label: 'Widow', value: 'widow' },
                ]}
              />
              {/* Birthdate */}
              <TextInput
                label="Birthdate"
                name="birthdate"
                type="date"
                register={register}
                error={errors.birthdate?.message}
                defaultValue={data?.birthdate || ''}
                onChange={handleDateChange} // Handle change for age calculation
              />
              <SelectInput
                label="Gender"
                name="gender"
                register={register}
                error={errors.gender?.message}
                defaultValue={data?.gender}
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
              />
            </div>
            <TextInput
              label="Contact Number"
              name="contactNumber"
              register={register}
              error={errors.contactNumber?.message}
              defaultValue={data?.contactNumber}
            />
            <TextInput
              label="Address"
              name="address"
              register={register}
              error={errors.address?.message}
              defaultValue={data?.address}
            />
            <TextInput
              label="Email"
              name="email"
              register={register}
              error={errors.email?.message}
              defaultValue={data?.address}
            />
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

export default PatientForm;
