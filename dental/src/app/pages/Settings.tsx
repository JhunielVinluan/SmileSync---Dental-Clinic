import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSettingsService from '@/service/settings.service';
import { Separator } from '@radix-ui/react-select';
import '../../style/Dasboard.style.css';
import SelectInput from '../component/SelectInput';
import TextInput from '../component/TextInput';
import AdminLayout from './AdminLayout';

const Settings = () => {
  const { handleSubmit, register, errors, onSubmit } = useSettingsService();
  return (
    <AdminLayout>
      <div className="grid gap-2 w-full">
        <div>
          <p className="text-2xl">Account Information</p>
          <p>
            Update your account information. Set your preferred birth date and
            timezone.
          </p>
        </div>
        <Separator className="my-4 border" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 items-center gap-4">
              <TextInput
                label="First Name"
                name="firstName"
                register={register}
                error={errors?.firstName?.message}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                register={register}
                error={errors?.lastName?.message}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <TextInput
                label="Contact Number"
                name="contactNumber"
                register={register}
                error={errors?.contactNumber?.message}
              />
              <TextInput
                label="Address"
                name="address"
                register={register}
                error={errors?.address?.message}
              />
              <TextInput
                label="Email"
                name="email"
                register={register}
                error={errors?.email?.message}
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <SelectInput
                label="Gender"
                name="gender"
                register={register}
                error={errors.gender?.message}
                options={[
                  {
                    label: 'Male',
                    value: 'Male',
                  },
                  {
                    label: 'Female',
                    value: 'Female',
                  },
                ]}
              />
              <SelectInput
                label="Civil Status"
                name="civilStatus"
                register={register}
                error={errors.civilStatus?.message}
                options={[
                  {
                    label: 'Single',
                    value: 'single',
                  },
                  {
                    label: 'Married',
                    value: 'married',
                  },
                  {
                    label: 'Divorced',
                    value: 'divorced',
                  },
                  {
                    label: 'Widow',
                    value: 'widow',
                  },
                ]}
              />
            </div>

          {/* Birthdate Input */}
          <div className="flex flex-col gap-2">
              <Label htmlFor="birthdate" className="text-left">
                Birthdate
              </Label>
              <TextInput
                label="Birthdate"
                name="birthdate"
                type="date"  // Set the type as "date" for a date picker
                register={register}
                error={errors?.birthdate?.message}
               
              />
            </div>

          </div>
          <div className="">
            <p className="text-2xl">System Preferences</p>
            <p>Update your system Preferences.</p>
          </div>
          <Separator className=" border" />
          <div className="flex flex-row justify-between">
            <div className="flex flex-col  w-full p-6 gap-4 ">
              <div className="flex flex-col gap-2 w-1/2 ">
                <Label htmlFor="contact" className="text-left">
                  System Theme
                </Label>
                <Select disabled={true}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Light" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Dark</SelectItem>
                      <SelectItem value="Female">Light</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 w-1/2 ">
                <Label htmlFor="contact" className="text-left">
                  Language
                </Label>
                <Select disabled={true}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">English</SelectItem>
                      <SelectItem value="Female">Filipino</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end items-end">
              <Button type="submit" className="bg-primaryColor w-36">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Settings;
