import AppointmentItem from '@/app/component/Appointment/AppointmentItem';
import CreateAppointment from '@/app/component/PopUp/AppointmentForm';
import { UserCalendar } from '@/components/ui/userCalendar';
import { AppointmentData } from '@/types/appointment';
import axios from 'axios';
import { format, isSameDay } from 'date-fns';
import { CalendarX } from 'lucide-react';
import { useEffect, useState } from 'react';
import '../../style/Dasboard.style.css';

const UserHomePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openSheet, setOpenSheet] = useState(false);
  const [data, setData] = useState<AppointmentData[]>();

  const getSelectedDate = (): string => {
    return date ? format(date, 'MMM dd, yyyy') : 'Invalid date';
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/appointment`,
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkDateMatch = (date1: Date, date2: Date) => {
    console.log(date1, date2);
    return isSameDay(date1, date2);
  };

  const isThereNoMatch = (data: AppointmentData[], sampleDate: Date) => {
    return !data.some((appointment) =>
      isSameDay(new Date(appointment.date), sampleDate),
    );
  };
  return (
    <div className="w-full border border-red-400 h-full flex flex-col justify-center items-center">
      <UserCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        onDayClick={() => {
          setOpenSheet(true);
        }}
        initialFocus
        className=""
        disabled={(date) => date.getDate() === 2}
      />
      {openSheet && (
        <div className="w-full border rounded-2xl bg-slate-200 h-full p-4 flex flex-col  relative">
          <div
            onClick={() => setOpenSheet(false)}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-1 bg-black rounded-lg absolute top-2"></div>
          </div>
          <p className="font-bold">{getSelectedDate()}</p>

          {isThereNoMatch(data || [], date || new Date()) ? (
            <div className="flex flex-col justify-center items-center ">
              <CalendarX className="h-24 w-24" />
              <p>No Appointments</p>
            </div>
          ) : (
            data?.map((appointment, index) => {
              if (
                checkDateMatch(new Date(appointment.date), date || new Date())
              )
                return <AppointmentItem key={index} data={appointment} />;
            })
          )}
        </div>
      )}
      <CreateAppointment isOpen={false} onClose={() => setOpenSheet(false)} />
    </div>
  );
};

export default UserHomePage;
