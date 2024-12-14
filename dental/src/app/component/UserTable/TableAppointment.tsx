import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { newAppointmentType } from '@/types/appointment';
import { formatTimeIfNeeded } from '@/utils/common.utils';
import axios from 'axios';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// Sorting function
const sortAppointments = (
  appointments: any[],
  key: string,
  ascending: boolean,
) => {
  return appointments.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });
};

// Get status color class
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-300 text-black rounded-md p-1 font-bold text-center h-8 w-24 flex items-center justify-center mt-10 mr-6 border-2 border-gray-800 ';
    case 'Confirmed':
      return 'bg-green-600 text-white rounded-md p-1 font-bold text-center h-8 w-24 flex items-center justify-center mt-10 mr-6 border-2 border-gray-800';
    case 'Complete':
      return 'bg-blue-600 text-white rounded-md p-1 font-bold text-center h-8 w-24 flex items-center justify-center mt-10 mr-6 border-2 border-gray-800';
    default:
      return 'bg-gray-300 text-black rounded-md p-1 font-bold text-center h-8 w-24 flex items-center justify-center mt-10 border-2 border-gray-800';
  }
};

const TableAppointment = ({ userId }: { userId: string }) => {
  const [sort, setSort] = useState('');
  const [ascending, setAscending] = useState(true);
  const [appointment, setAppointment] = useState<newAppointmentType[]>([]);

  // Handle sorting
  const handleSort = (key: string) => {
    const isSameSort = sort === key;
    const newAscending = isSameSort ? !ascending : true;

    const sortedAppointment = sortAppointments(
      [...appointment],
      key,
      newAscending,
    );
    setAppointment(sortedAppointment);
    setSort(key);
    setAscending(newAscending);
  };

  const getAppointments = async () => {
    try {
      const request = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/appointment/${userId}`,
      );
      const data = request.data;
      if (request.status === 200) {
        setAppointment(data);
        console.log({ data, appoint: true });
      }
    } catch (err) {
      setAppointment([]);
      console.log({ err });
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
      <div className='border-2 rounded-md'>
      <Table>
        {appointment.length > 0 && (
          <TableHeader>
            <TableRow >
              <TableHead
                onClick={() => handleSort('userId')}
                className={`${
                  sort === 'userId'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                ID
                {sort === 'userId' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('patientName')}
                className={`${
                  sort === 'patientName'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Patient Name
                {sort === 'patientName' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('appointmentDate')}
                className={`${
                  sort === 'appointmentDate'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Appointment Date
                {sort === 'appointmentDate' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('timeStart')}
                className={`${
                  sort === 'timeStart'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Time
                {sort === 'timeStart' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('service')}
                className={`${
                  sort === 'service'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Service
                {sort === 'service' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('doctorName')}
                className={`${
                  sort === 'doctorName'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Doctor Name
                {sort === 'doctorName' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('appointmentStatus')}
                className={`${
                  sort === 'appointmentStatus'
                    ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}
              >
                Status
                {sort === 'appointmentStatus' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {appointment.length > 0 &&
            appointment.map((appointment, index) => {
              const {
                userId,
                userFullName,
                appointmentDate,
                timeStart,
                timeEnd,
                service,
                appointmentStatus,
              } = appointment;
              return (
                <TableRow key={userId + index} className="py-4">
                  <TableCell className="font-medium pt-10">{index + 1}</TableCell>
                  <TableCell className="pt-10">{userFullName}</TableCell>
                  <TableCell className="pt-10">{format(appointmentDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell className="pt-10">
                    {timeStart && timeEnd
                      ? `${formatTimeIfNeeded(timeStart)} - ${formatTimeIfNeeded(
                          timeEnd,
                        )}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="pt-10">{service}</TableCell>
                  <TableCell className="pt-10">{'Dr. Siyo R. Vallao'}</TableCell>
                  <TableCell className={`pt-10 ${getStatusClass(appointmentStatus)}`}>
                    {appointmentStatus || 'N/A'}
                  </TableCell>
                </TableRow>
              );
            })}

          {appointment.length === 0 && (
            <div className="flex flex-row justify-center items-center">
              <p className="text-center my-2">NO RECORDS</p>
            </div>
          )}
        </TableBody>
      </Table>
      {/* Pagination Section */}
    </div>
  );
};

export default TableAppointment;
