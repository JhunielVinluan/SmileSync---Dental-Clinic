import { useRef, useState } from 'react';
import SelectInput from '@/app/component/SelectInput';
import TextInput from '@/app/component/TextInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import FormLayout from './FormLayout';
import { SETTINGS } from '@/constants/settings.constants';
import { $httpPost } from '@/api/_api';

const RegisterSchema = z
  .object({
    firstName: z.string().min(3, 'Should be at least 3 characters'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
    age: z.number().min(1, 'Age is required'),
    gender: z.string().min(1, 'Gender is required'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    address: z.string().min(1, 'Address is required'),
    civilStatus: z.string().min(1, 'Civil status is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password should be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password should be at least 8 characters'),
    userImage: z.string().min(1, 'User image is required'),
    birthdate: z.string().min(1, 'Required'), // Add birthdate field
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });


type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register = (): JSX.Element => {
  const [isComplete, setIsComplete] = useState(false);
  const [isShowPass, setShowPass] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [userImage, setUserImage] = useState<string>('/no-user.webp');
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
// --------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (formData) => {
    try {
      const response = await $httpPost(SETTINGS.URL.API.GET_REGISTER, formData);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 200) {
        toast({
          title: 'Registration Successful',
          description: 'Congratulations You have successfully registered',
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast({
          title: 'Registration Failed',
          description: data.message,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const handleImageUpload = () => {
    setValue('userImage', 'image.png');
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <FormLayout>
        {isComplete ? (
          <Card className="w-full sm:w-1/2  border-none shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">SMILESYNC</CardTitle>
              <CardDescription className="text-md">
                <p>Web-based Management System</p>
                <p>At Ramos Vallao-Dental Clinic</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <div className="flex flex-row w-full gap-3">
                  <SelectInput
                    label="Civil Status"
                    name="civilStatus"
                    register={register}
                    error={errors.civilStatus?.message}
                    className="w-60"
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
                        label: 'Widow',
                        value: 'widow',
                      },
                    ]}
                  />
                  <TextInput
                    name="contactNumber"
                    label="Contact Number"
                    type="text"
                    register={register}
                    error={errors.contactNumber?.message}
                    className="w-full"
                  />
                </div>
                <TextInput
                  name="address"
                  label="Address"
                  type="text"
                  register={register}
                  error={errors.address?.message}
                  className="w-full"
                />
                <TextInput
                  name="email"
                  label="Email"
                  type="text"
                  register={register}
                  error={errors.email?.message}
                  className="w-full"
                />

                <div className="flex flex-row w-full gap-2">
                  <TextInput
                    type={!isShowPass ? 'password' : 'text'}
                    name="password"
                    label="Password"
                    register={register}
                    error={errors.password?.message}
                    className="w-full"
                  />
                  <TextInput
                    type={!isShowPass ? 'password' : 'text'}
                    name="confirmPassword"
                    label="Confirm Password"
                    register={register}
                    error={errors.confirmPassword?.message}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isShowPass}
                    onClick={() => setShowPass(!isShowPass)}
                  />
                  <Label htmlFor="terms">Show Password</Label>
                </div>
                <p
                  className="mt-2 text-sm hover:underline text-right"
                  onClick={() => setIsComplete && setIsComplete(false)}
                >
                  Previous Info
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-between">
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              <div className="flex flex-row justify-center items-center gap-1">
                <p>Already have an account? </p>
                <a href="/" className="hover:underline">
                  Sign In
                </a>
              </div>
            </CardFooter>
          </Card>
        ) : (

          <Card className=" items-center w-full sm:w-1/2  border-none shadow-none">
  <CardHeader className="text-center">
    <CardTitle className="text-4xl">SMILESYNC</CardTitle>
    <CardDescription className="text-md">
      <p>Web-based Management System</p>
      <p>At Ramos Vallao-Dental Clinic</p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className=" w-full items-center gap-4">
      <div className="flex flex-row gap-6">
        <div className="w-[310px]">
          <TextInput
            name="firstName"
            label="First Name"
            type="text"
            register={register}
            error={errors.firstName?.message}
          />
          <TextInput
            name="middleName"
            label="Middle Name"
            type="text"
            register={register}
            error={errors.middleName?.message}
            className='mt-5'
          />
          <TextInput
            name="lastName"
            label="Last Name"
            type="text"
            register={register}
            error={errors.lastName?.message}
             className='mt-5 mb-5'
          />

<label>Date of Birth</label>
<div className="flex gap-4 w-[310px]">
  <input
    type="date"
    aria-label="Date of Birth"
    id="birthdate"
    {...register('birthdate')}
    onChange={handleDateChange} // Handle change for age calculation
    min="1900-01-01"
    max={new Date().toISOString().split('T')[0]}
    className=" input-field border border-gray-300 rounded-md  p-2 w-full cus:outline-none focus:ring-2 focus:ring-primaryColor"
  />
  {errors.birthdate && (
    <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
  )}

  <TextInput
    name="age"
    label="Age"
    register={register}
    className="w-1/4 h-[43px] mb-10"
    error={errors.age?.message}
    disabled
  />
          
</div>
          <SelectInput
          label="Gender"
          name="gender"
          register={register}
           className='mt-5 cus:outline-none focus:ring-2 focus:ring-primaryColor'
          defaultValue="Select a Gender"
          error={errors.gender?.message}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
          ]}
          
        />
</div>
        
        <div className="flex flex-col flex-1 items-center">
  <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-gray-900">
    <img
      onClick={handleImageUpload}
      src={userImage}
      alt="no user"
      className="w-full h-full object-cover"
    />
  </div>
  <p className="text-red-500">{errors.userImage?.message}</p>
</div>

<input
  type="file"
  ref={imageRef}
  onChange={handleChangeImgInput}
  className="hidden"
/>


      
      </div>
    </div>
  </CardContent>
  <CardFooter className="  items-bottom">
    <Button
      onClick={() => {
        if (
          errors.firstName ||
          errors.middleName ||
          errors.lastName ||
          errors.age ||
          errors.gender
        ) {
          toast({
            title: 'Required Fields',
            description: 'Please make sure to fill all required fields',
          });
        } else {
          setIsComplete && setIsComplete(true);
        }
      }}
      className="w-[310px]"
    >
      Next
    </Button>
  </CardFooter>
</Card>

        )}
      </FormLayout>
    </form>
  );
};

export default Register;
