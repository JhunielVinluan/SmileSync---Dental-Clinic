import { Button } from '@/components/ui/button';
import useSettingsService from '@/service/settings.service';
import { Separator } from '@radix-ui/react-select';
import { useRef, useState } from 'react';
import '../../style/Dasboard.style.css';
import SelectInput from '../component/SelectInput';
import TextInput from '../component/TextInput';
import AdminLayout from './AdminLayout';

const SettingsUser = () => {
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
    userImage,
    setUserImage,
  } = useSettingsService();
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChangeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setValue('userImage', reader.result as string);
          setUserImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  // Calculate Age based on Date of Birth
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

  // Handle Date of Birth change and update Age
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdate = e.target.value;
    setValue('birthdate', birthdate); // Update birthdate in the form
    const age = calculateAge(birthdate); // Calculate the age
    setValue('age', age); // Update age as a number in the form
  };

  return (
    <AdminLayout title={false}>
      <div className="flex justify-start p-4">
          <span className="text-xl font-semibold text-gray-400">User / Settings</span>
        </div>
      <div className="grid gap-2 w-full border-2 pb-4 rounded-t-xl mb-8">
        <div className="h-4 bg-primaryColor w-full rounded-t-xl" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row border justify-between w-1/4 rounded-xl ml-4">
            <div
              onClick={() => setShowPassword(false)}
              className={`${!isShowPassword ? 'bg-primaryColor rounded-md' : ''} p-2 px-4 w-full `}
            >
              <p className={`${!isShowPassword ? 'text-white' : ''}`}>
                Edit Profile
              </p>
            </div>
            <div
              onClick={() => setShowPassword(true)}
              className={`${isShowPassword ? 'bg-primaryColor rounded-md' : ''} p-2 px-4 w-full `}
            >
              <p className={`${isShowPassword ? 'text-white' : ''}`}>
                Change Password
              </p>
            </div>
          </div>
          {!isShowPassword && (
            <div className="p-6 flex flex-col gap-4 w-full">
              {/* First Row: Name Fields */}
              <div className="grid grid-cols-3 items-center gap-4">
                <TextInput
                  label="First Name"
                  name="firstName"
                  register={register}
                  error={errors?.firstName?.message}
                />
                <TextInput
                  label="Middle Name"
                  name="middleName"
                  register={register}
                  error={errors?.middleName?.message}
                />
                <TextInput
                  label="Last Name"
                  name="lastName"
                  register={register}
                  error={errors?.lastName?.message}
                />
              </div>

              {/* Second Row: Gender, Age, and Date of Birth */}
              <div className="grid grid-cols-2 items-center gap-4">
                <SelectInput
                  label="Gender"
                  name="gender"
                  register={register}
                  error={errors.gender?.message}
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                  ]}
                />
               <SelectInput
                  label="Civil Status"
                  name="civilStatus"
                  register={register}
                  error={errors.civilStatus?.message}
                  options={[
                    { label: 'Single', value: 'single' },
                    { label: 'Married', value: 'married' },
                    { label: 'Divorced', value: 'divorced' },
                    { label: 'Widow', value: 'widow' },
                  ]}
                />
              </div>
              <div>
                  <label className="block text-md mb-1" htmlFor="birthdate">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    {...register('birthdate')}
                    onChange={handleDateChange} // Handle change for age calculation
                    min="1900-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    className="input-field border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  />
                  {errors.birthdate && (
                    <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
                  )}
                </div>
              {/* Third Row: Civil Status, Contact Number, and Address */}
              <div className="grid grid-cols-3 items-center gap-4">
              <TextInput
                  label="Age"
                  name="age"
                  register={register}
                  error={errors?.age?.message}
                  disabled
                />
                <TextInput
                  label="Contact Number"
                  name="contactNumber"
                  register={register}
                  error={errors?.contactNumber?.message}
                />
                 <TextInput
                  label="Email"
                  name="email"
                  register={register}
                  error={errors?.email?.message}
                  disabled
                />
              </div>
              <div>
              </div>
              <TextInput
                label="Address"
                name="address"
                register={register}
                error={errors?.address?.message}
              />
            </div>
          )}
          <div className="px-6 pt-6 flex flex-col gap-4 w-full">
            {isShowPassword && (
              <div className="grid grid-rows-2 items-center gap-4 w-1/4">
                <TextInput
                  label="New Password"
                  name="newPassword"
                  register={register}
                  error={errors?.newPassword?.message}
                />
                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  register={register}
                  error={errors?.confirmPassword?.message}
                />
              </div>
            )}
          </div>
          {!isShowPassword && <Separator className=" border" />}
          <div className="flex flex-row justify-between items-end">
            {!isShowPassword && (
              <div className="flex flex-col  w-full p-6 gap-4 ">
                <p>Profile Image</p>
                <div className="w-48 flex flex-col gap-2">
                  <div className="border p-4 flex flex-row justify-center items-center w-48">
                    <div className="p-2 my-4 border-gray-500 border-2 rounded-full w-32 h-32">
                      <img
                        src={userImage}
                        alt="Profile"
                        className="mx-auto object-cover h-full bg-primaryColor rounded-full w-full"
                      />
                      <input
                        type="file"
                        ref={imageRef}
                        onChange={handleChangeImgInput}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleImageUpload}
                    className="bg-primaryColor w-full"
                    disabled={isSubmitting}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            )}
            <div className="flex flex-row gap-4 justify-end items-end px-4 mt-4">
              <Button
                type="submit"
                className="bg-primaryColor w-36"
                disabled={isSubmitting}
              >
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsUser;
