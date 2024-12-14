import { $httpPost } from '@/api/_api';
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
import { SETTINGS } from '@/constants/settings.constants';
import { isAdminAtom, userInfoAtom } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import FormLayout from './FormLayout';

const LoginSchema = z.object({
  email: z
    .string()
    .min(8, 'Should be atleast 8 characters')
    .email('Invalid email address'),
  password: z.string().min(5, 'Should be atleast 5 characters'),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setIsAdmin = useSetAtom(isAdminAtom);
  const [isShowPass, setShowPass] = useState<boolean>(false);
  const setUserID = useSetAtom(userInfoAtom);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    try {
      const response = await $httpPost(SETTINGS.URL.API.GET_LOGIN, values);
      const data = await response.json();

      if (response.status == 200) {
        const isVerified = data.isVerified;
        console.log({ isVerified });
        if (!data.isVerified) {
          toast({
            title: 'Login Failed',
            description:
              'User is not a verified, please wait for verification of admin',
          });
          return;
        }
        toast({
          title: 'Login Succesfully',
          description: 'Congratulations You have successfully logged in',
        });
        setUserID({
          id: data.id,
          userImage: data.userImage,
          fullName: data.fullName,
          role: data.role,
        });
        setIsAdmin(data.role !== 'patient');
        setTimeout(() => {
          navigate(data.role === 'patient' ? '/dashboarduser' : '/dashboard');
        }, 2000);
      } else {
        toast({
          title: 'Login Failed',
          description: 'Please check the credentials and try again.',
        });
      }
    } catch (error) {
      console.log({ error });
      toast({
        title: 'Login Failed',
        description: 'Please check the credentials and try again.',
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <FormLayout>
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
              <h1 className="text-2xl font-bold">Log In</h1>
              <TextInput
                label="Email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <TextInput
                type={!isShowPass ? 'password' : 'text'}
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message}
              />
              <div className="flex flex-row w-full justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isShowPass}
                    onClick={() => setShowPass(!isShowPass)}
                  />

                  <Label htmlFor="terms">Show Password</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Label>
                    <a href="/forgot" className="focus:underline">
                      Forgot Password
                    </a>
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 justify-between">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Login
            </Button>
            <div className="flex flex-row justify-center items-center gap-1">
              <p>Don't have an account? </p>
              <a href="/create" className="hover:underline">
                Sign Up
              </a>
            </div>
          </CardFooter>
        </Card>
      </FormLayout>
    </form>
  );
};

export default Login;
