import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useNavigate } from 'react-router-dom';
import FormLayout from './FormLayout';

const OTP: React.FC = () => {
  const [OTP, setOTP] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleVerify = async () => {
    try {
      if (OTP.length === 6) {
        console.log({ OTP });
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/verify/${OTP}`,
        );
        const data = response.data;
        if (response.status === 200) {
          toast({
            title: 'Token Sent Successfully',
            description: 'You can now reset your password',
          });
          setTimeout(() => {
            navigate(`/reset/${OTP}`);
          }, 2000);
        } else {
          toast({
            title: 'Failed to Generated',
            description: data.message,
          });
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast({
          title: 'Network Error',
          description: err.message,
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
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
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p>Enter OTP sent from your email</p>
              <div className="flex flex-col space-y-1.5 w-full justify-center items-center">
                <InputOTP
                  maxLength={6}
                  className="w-full"
                  onChange={(e) => setOTP(e)}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </form>
          {OTP.length > 0 && OTP.length < 6 && (
            <p className="text-center text-red-500">Invalid OTP</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 justify-between">
          <Button onClick={handleVerify} className="w-full">
            Verify OTP
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
  );
};

export default OTP;
