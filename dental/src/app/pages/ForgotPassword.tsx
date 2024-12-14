import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ValidatedInput from '../component/ValidatedInput';
import FormLayout from './FormLayout';

const ForgotPassword = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={async (values) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/forgot`,
            values,
          );

          if (response.status === 200) {
            toast({
              title: 'Email Sent Successfully',
              description: 'Check your email for further instructions',
            });
            setTimeout(() => {
              navigate(`/OTP`);
            }, 2000);
          } else {
            toast({
              title: 'Email Sent Failed',
              description: 'Email does not exist in the database',
            });
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
            toast({
              title: 'Network Failed',
              description: 'Please check your network connection',
            });
          } else {
            console.error(err);
          }
        }
      }}
    >
      {({ handleSubmit, handleChange, errors }) => (
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
              <form>
                <div className="grid w-full items-center gap-4">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>
                  <ValidatedInput
                    id="email"
                    name="Email"
                    type="email"
                    onChange={handleChange('email')}
                    errors={errors.email}
                  />
                </div>
                <div className="flex flex-row gap-1 text-sm mt-2 items-end justify-end">
                  <p>Already have token?</p>
                  <a href="/OTP" className="focus:underline">
                    Reset Here
                  </a>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-between">
              <Button
                type="submit"
                onClick={() => handleSubmit()}
                className="w-full"
              >
                Request Password
              </Button>
              <div className="flex flex-row justify-center items-center gap-1">
                <p>Remember password? </p>
                <a href="/" className="hover:underline">
                  Sign In
                </a>
              </div>
            </CardFooter>
          </Card>
        </FormLayout>
      )}
    </Formik>
  );
};

export default ForgotPassword;
