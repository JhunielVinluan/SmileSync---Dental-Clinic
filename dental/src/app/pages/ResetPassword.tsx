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
import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ValidatedInput from '../component/ValidatedInput';
import FormLayout from './FormLayout';

const ResetPassword: React.FC = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  return (
    <FormLayout>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), ''],
            'Passwords must match',
          ),
        })}
        onSubmit={async (values) => {
          try {
            const { password } = values;
            const objData = { password, token };
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/auth/resetPassword`,
              objData,
            );
            if (response.status === 200) {
              toast({
                title: 'Password Changed',
                description: 'Congrats, your password has been changed.',
              });
              setTimeout(() => {
                navigate('/');
              }, 2000);
            } else {
              toast({
                title: 'Password Failed',
                description: response.data.message,
              });
            }
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(err.message);
            } else {
              console.error(err);
            }
            toast({
              title: 'Network Failed',
              description: 'Please check the credentials and try again.',
            });
          }
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <Card className="w-full sm:w-1/2  border-none shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">SMILESYNC</CardTitle>
              <CardDescription className="text-md">
                <p>Web-based Management System</p>
                <p>At Ramos Vallao-Dental Clinic</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <h1 className="text-2xl font-bold">Update Password</h1>
                  <ValidatedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    errors={errors.password}
                    onChange={handleChange('password')}
                  />
                  <ValidatedInput
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    errors={errors.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showPass"
                      checked={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    <Label htmlFor="showPass">Show Password</Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-between">
              <Button
                onClick={() => handleSubmit()}
                className="w-full"
                type="submit"
              >
                Submit
              </Button>
              <div className="flex flex-row justify-center items-center gap-1">
                <p>Remember password? </p>
                <a href="/" className="hover:underline">
                  Sign In
                </a>
              </div>
            </CardFooter>
          </Card>
        )}
      </Formik>
    </FormLayout>
  );
};

export default ResetPassword;
