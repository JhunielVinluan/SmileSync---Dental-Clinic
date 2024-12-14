import { $httpGet } from '@/api/_api';
import Calendar from '@/app/component/Calendar/Calendar';
import { MONTHS } from '@/app/component/Calendar/Calendar.constant';
import ListItem from '@/app/component/ListAppointment/ListItem';
import AppointmentModal from '@/app/component/PopUp/AppointmentModal';
import { SETTINGS } from '@/constants/settings.constants';
import { ChevronLeft, ChevronRight, Sunset } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

export type AppointmentType = {
  _id: string;
  userId: string;
  appointmentDate: Date; // ISO date string
  timeStart: string; // e.g., "6:30"
  timeEnd: string; // e.g., "6:45"
  minutesDuration: string; // e.g., "15", could also use `number` if you parse it
  service: string; // e.g., "orthodontics-braces"
  appointmentStatus: string; // e.g., "Pending"
  appointmentType: string; // e.g., "walk-in"
  userName: string; // e.g., "Jhuniel Vinluan"
  dateCode: string; // e.g., "20241203"
  userEmail: string;
  userPhoneNumber: string;
};

export type AppointmentDataType = {
  appointment: AppointmentType[];
  confirmedAppointments: number; // Count of confirmed appointments
  PendingAppointments: number; // Count of Pending appointments
};

const CalendarRequest = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentDataType>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAppointment, setSelectAppointment] =
    useState<AppointmentType>();
  const getInfoAppointments = async () => {
    try {
      const response = await $httpGet(
        SETTINGS.URL.API.GET_APPOINTMENT_INFO,
        {},
      );
      const data = await response.json();
      if (response.status === 200) {
        setAppointments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfoAppointments();
  }, []);
  const today = new Date();
  const goToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  const handleNextDay = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      ),
    );
  };

  const handlePrevDay = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1,
      ),
    );
  };

  const onDateSelect = (item: AppointmentType) => {
    setShowModal(true);
    setSelectAppointment(item);
    // console.log({ item });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="font-bold text-xl">Upcoming Appointments</p>
        <div className="flex flex-row justify-center gap-4">
          <div className="flex flex-col justify-center items-center border p-2">
            <p>
              Confirmed Request :{' '}
              <span>{appointments?.confirmedAppointments}</span>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border p-2">
            <p>
              Pending Request : <span>{appointments?.PendingAppointments}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center justify-between">
        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <ChevronLeft
              onClick={
                selectedComponent === 'monthly'
                  ? handlePrevMonth
                  : handlePrevDay
              }
              size={24}
              className="border p-2 h-10 w-10 hover:bg-blue-500 hover:text-white"
            />
            <ChevronRight
              onClick={
                selectedComponent === 'monthly'
                  ? handleNextMonth
                  : handleNextDay
              }
              size={24}
              className="border p-2 h-10 w-10 hover:bg-blue-500 hover:text-white"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-1 border p-2 rounded-lg group hover:bg-blue-500">
            <Sunset
              onClick={goToday}
              size={24}
              className="group-hover:text-white"
            />
            <p className="group-hover:text-white">Today</p>
          </div>
        </div>

        <div className="text-center font-bold">
          {MONTHS[currentDate.getMonth()]} {currentDate.getDate()}{' '}
          {currentDate.getFullYear()}
        </div>
        <div className="flex flex-row justify-center items-center border">
          <div
            onClick={() => {
              setSelectedComponent('monthly');
            }}
            className={` py-1 px-4 w-24 text-center ${selectedComponent === 'monthly' ? 'bg-blue-500 text-white' : ''}`}
          >
            Monthly
          </div>
          <div
            onClick={() => {
              setSelectedComponent('list');
            }}
            className={` py-1 px-4 w-24 text-center ${selectedComponent !== 'monthly' ? 'bg-blue-500 text-white' : ''}`}
          >
            List
          </div>
        </div>
      </div>
      {selectedComponent === 'monthly' ? (
        <Calendar
          appointments={appointments?.appointment ?? []}
          currentDate={currentDate}
          onDateSelect={onDateSelect}
        />
      ) : (
        <div className="flex flex-col gap-1">
          {appointments?.appointment?.map((item) => {
            return (
              item.appointmentStatus != 'canceled' && (
                <ListItem
                  onClick={() => {
                    setSelectAppointment(item);
                    setShowModal(true);
                  }}
                  appointment={item}
                  key={item._id}
                />
              )
            );
          })}
        </div>
      )}
      <AppointmentModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        appointment={selectedAppointment}
      />
    </AdminLayout>
  );
};

export default CalendarRequest;
