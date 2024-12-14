import { Toaster } from '@/components/ui/toaster';
import * as React from 'react';

interface IFormLayoutProps {
  children: React.ReactNode;
}
const FormLayout = ({ children }: IFormLayoutProps): JSX.Element => {
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center w-full">
        <div className="flex flex-row  w-full h-full ">
          <div className="w-1/2 h-full bg-primaryColor flex flex-row items-center justify-center max-md:hidden">
            <img src="/teeth.png" alt="teeth image" />
          </div>
          <div className="w-1/2 h-full flex flex-row justify-center items-center max-md:w-full border">
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default FormLayout;
