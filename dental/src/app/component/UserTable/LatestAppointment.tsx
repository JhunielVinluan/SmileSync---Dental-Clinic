import { Button } from '@/components/ui/button';
import useConfirmActionService from '@/service/confirmAction.service';
import { userInfoAtom } from '@/store/store';
import { formatTimeIfNeeded } from '@/utils/common.utils';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type LatestAppointmentProps = {
  setShowForm: () => void;
};

type AppointmentProps = {
  id: string;
  date: string;
  time: string;
  description: string;
  status: string;
};

const LatestAppointment = ({ setShowForm }: LatestAppointmentProps) => {
  const { confirmAction, resultAction } = useConfirmActionService();
  const [hasAppointment, setHasAppointment] = useState(false);
  const [userInfo] = useAtom(userInfoAtom);
  const [latestAppointment, setLatestAppointment] =
    useState<AppointmentProps>();

  const getLatestAppointment = async () => {
    try {
      const { id } = userInfo;
      const request = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/appointment/latest/latest/${id}`,
      );
      const data = request.data;
      if (request.status === 200) {
        const { appointmentDate, timeStart, appointmentStatus, description } =
          data;
        if (appointmentStatus == 'Pending') {
          setLatestAppointment({
            id: data._id,
            date: appointmentDate,
            time: timeStart,
            description: description,
            status: appointmentStatus,
          });
          setHasAppointment(true);
        }
      } else {
        setLatestAppointment({
          id: '',
          date: '',
          time: '',
          description: '',
          status: '',
        });
        setHasAppointment(false);
      }
    } catch (err) {
      setHasAppointment(false);
      console.log({ err });
    }
  };

  useEffect(() => {
    getLatestAppointment();
  }, []);

  const deleteAppointment = async (id: string) => {
    try {
      const confirm = await confirmAction('Cancel Appointment...');
      if (confirm) {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/appointment/${id}`,
        );
        if (response.status === 200) {
          resultAction('Appointment Canceled successfully', 'Error');
          getLatestAppointment();
        } else {
          resultAction('Something went wrong', 'Error');
        }
      } else {
        resultAction('Cancelled', 'Error');
      }
    } catch (error) {
      resultAction('Something went wrong', 'Error');
    }
  };

  return (
  
    <div className="flex-col gap-2 flex">
      <div
        onClick={() => {
          if (hasAppointment) {
            resultAction(
              'There is Pending appointment, check your scheduled',
              'Error',
            );
          } else {
            setShowForm();
          }
        }}
        className="text-green-600 w-1/3 inline-flex flex-row gap-2 border border-black p-2 rounded-lg"
      >
    <div className="bg-green-600 w-6 h-6 rounded-md p-1 flex justify-center items-center">
          <Plus color="white" />
        </div>
        <p>Request an Appointment</p>
      </div>


      
      <div className="flex flex-row justify-between items-start">
        {latestAppointment?.date ? (
          <div className="border border-gray-300 rounded-lg p-6  w-full">
            <p className="text-2xl text-gray-500">Latest Appointment Details</p>
            <div className="flex flex-row text-xl gap-2">
  <p className="font-bold mt-4 ml-[20px]">Appointment Date:</p>
  <p className="ml-[232px] mt-4">
    {new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(latestAppointment.date))}
  </p>
</div>

            <div className="flex flex-row text-xl gap-2 items-center">
              <p className="font-bold mt-2 ml-[20px]">Time:</p>
              <p className="ml-[373px]">
                {formatTimeIfNeeded(latestAppointment.time)}
              </p>
            </div>
            <div className="flex flex-row text-xl gap-2 items-center">
              <p className="font-bold mt-2 ml-[20px]">Status:</p>
              <p className="text-black ml-[354px] border-2 bg-yellow-300 rounded-md p-1 font-bold text-[15px] border-gray-800">{latestAppointment.status}</p>
            </div>
            {latestAppointment?.status === 'Pending' && (
              <div className="mt-4">
                <Button
                  onClick={() => deleteAppointment(latestAppointment.id)}
                  className="bg-red-500 ml-[454px] border-gray-800 border-2 rounded-md"
                >
                  Cancel Appointment
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="mt-5 text-2xl text-gray-500">No Latest Appointment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestAppointment;
