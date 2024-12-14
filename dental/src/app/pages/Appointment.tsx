import { $httpGet } from '@/api/_api';
import DatePicker from '@/app/component/DatePicker';
import Selection from '@/app/component/Selection';
import TimeDisplay from '@/app/component/TimeDisplay';
import { SETTINGS } from '@/constants/settings.constants';
import usePopUpService from '@/service/popUp.service';
import { actionDataAtom } from '@/store/store';
import { MINUTE_DURATION_60, MINUTE_INTERVALS } from '@/types/appointment';
import {
  generateAppointmentDataForWeek,
  getWeekNumber,
  reWriteDummyData,
} from '@/utils/common.utils';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import '../../style/Dasboard.style.css';
import AppointmentRow from '../component/Appointment/AppointmentRow';
import AppointmentForm from '../component/PopUp/AppointmentForm';
import AdminLayout from './AdminLayout';

interface AppointmentCell {
  _id: string;
  userId: string;
  appointmentDate: string;
  timeStart: string;
  timeEnd: string;
  minutesDuration: string;
  service: string;
  appointmentStatus: string;
  appointmentType: string;
  userName: string;
  dateCode: string;
  status?: string;
}

interface AppointmentDataCell {
  [time: string]: AppointmentCell[];
}
export function Appointment() {
  const [action] = useAtom(actionDataAtom);
  const { handleCloseForms } = usePopUpService();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointmentData, setAppointmentData] = useState<AppointmentDataCell>(
    {},
  );
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedInterval] = useState<string>('');
  const timeArray = [
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];
  const filteredTime = timeArray.slice(timeArray.indexOf(selectedStartTime));
  const fetchAppointment = async () => {
    try {
      const response = await $httpGet(
        SETTINGS.URL.API.GET_FORMATTED_APPOINTMENT,
        {},
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log({ data });
        const week = getWeekNumber(date);

        const dummyData = generateAppointmentDataForWeek(
          week,
          new Date().getFullYear(),
          60,
        );
        const rewrite = reWriteDummyData(data, dummyData);
        setAppointmentData(rewrite);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [date]);

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(selectedInterval);
    console.log(e.target.value);
  };
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center overflow-auto">
        <div className="flex flex-row justify-between">
          {/* <div
            onClick={() => handleAction('create', {})}
            className="flex items-center gap-2 bg-primaryColor w-1/5 p-2 px-8 justify-center text-white rounded-md"
          >
            <CalendarPlus2 />
            <p>Add Appointment</p>
          </div> */}
          <AppointmentForm
            isOpen={action.type !== null && action.type !== 'delete'}
            onClose={handleCloseForms}
          />
          <TimeDisplay />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center w-2/3">
                  <p className="font-bold">Chosen Date</p>
                  <DatePicker date={date} setDate={setDate} />
                </div>

                <div className="flex flex-row w-1/2 justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <p className="font-bold">Start Time</p>
                    <Selection
                      name="startTime"
                      options={MINUTE_DURATION_60}
                      onChange={handleChangeStartTime}
                      defaultValue="7:00 AM"
                    />
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <p className="font-bold">Chose Interval</p>
                    <Selection
                      name="minutesDuration"
                      options={MINUTE_INTERVALS}
                      onChange={handleChangeInterval}
                      defaultValue="60 Minutes"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <table className="appointment">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(appointmentData).map((time: string, rowIndex) => {
                  if (filteredTime.includes(time) || !selectedStartTime) {
                    return (
                      <tr key={rowIndex}>
                        <td className="time">{time}</td>
                        {appointmentData[time].map(
                          (cell: any, cellIndex: number) => {
                            const {
                              status,
                              appointmentStatus,
                              minutesDuration,
                              userName,
                              service,
                            } = cell;
                            const description = `${userName} - ${service}`;
                            if (status !== 'empty') {
                              return (
                                <td
                                  className={status || appointmentStatus}
                                  key={cellIndex}
                                  rowSpan={Number(minutesDuration) / 60}
                                >
                                  <AppointmentRow
                                    type={status}
                                    description={description}
                                  />
                                </td>
                              );
                            }
                          },
                        )}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
