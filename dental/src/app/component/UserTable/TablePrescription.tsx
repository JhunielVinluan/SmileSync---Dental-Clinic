import { $httpGet } from '@/api/_api';
import SelectInput from '@/app/component/SelectInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SETTINGS } from '@/constants/settings.constants';
import axios from 'axios';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Appointment = {
  id: string;
  _id: string;
  userFullName: string;
  appointmentId: string;
  appointmentDate: Date;
  dateVisit: Date;
  service: string;
  medicine: string;
  notes: string;
  createdAt: string;
};

const updatedAppointments = [
  {
    id: '',
    _id: '',
    userFullName: '',
    appointmentId: '',
    dateVisit: new Date(2024, 9, 20),
    appointmentDate: new Date(2024, 9, 20),
    service: 'Dental Crown',
    medicine: '',
    notes: '',
    createdAt: '2024-11-30T09:35:29.496Z',
  },
];

const sortAppointments = (
  prescriptions: Appointment[],
  key: keyof Appointment,
  ascending: boolean
): Appointment[] => {
  return [...prescriptions].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

const TablePrescription = ({ userId }: { userId: string }) => {
  const [prescriptions, setPrescriptions] = useState(updatedAppointments);
  const [sort, setSort] = useState('');
  const [ascending, setAscending] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSort = (key: any) => {
    const isSameSort = sort === key;
    const newAscending = isSameSort ? !ascending : true;

    const sortedAppointments = sortAppointments(
      [...prescriptions],
      key,
      newAscending
    );
    setPrescriptions(sortedAppointments);
    setSort(key);
    setAscending(newAscending);
  };

  const getAllAppointment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/appointment/${userId}`
      );
      const data = await response.data;
      if (response.status === 200) {
        setAppointments(data);
        setSelectedAppointment(data[0]?.appointmentId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPrescription = async () => {
    try {
      const response = await $httpGet(
        SETTINGS.URL.API.GET_PRESCRIPTION_BY_ID(userId ?? '123'),
        {}
      );
      const data = await response.json();
      if (response.status === 200) {
        setPrescriptions(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAppointment();
    getAllPrescription();
  }, []);

  const { register } = useForm();

  return (
    <div>
      {/* Appointment Selection Section */}
      <div className="border-2 border-gray-200 p-4 rounded-md">
        <SelectInput
          label="Select an Service Availed to see Prescription"
          name="user"
          register={register}
          options={appointments.map((item) => ({
            value: item._id ?? '123',
            label: `${item.service} | ${format(item.appointmentDate, 'MMM dd, yyyy')}`,
          }))}
          onChange={(e) => setSelectedAppointment(e.target.value)}
        />
      </div>

      {/* Prescriptions Table Section */}
      <div className='border-2 rounded-md mt-5'>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead
                onClick={() => handleSort('id')}
                className={`cursor-pointer ${
                  sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                  : 'bg-blue-100'
              }`}
              >
                ID
                {sort === 'id' && <ArrowUpDown className="h-4 w-4 inline" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('doctorName')}
                className={`cursor-pointer ${
                  sort === 'doctorName' ? 'flex flex-row justify-between items-center bg-blue-100'
                  : 'bg-blue-100'
              }`}
              >
                Doctor Name
                {sort === 'doctorName' && <ArrowUpDown className="h-4 w-4 inline" />}
              </TableHead>
              <TableHead
                onClick={() => handleSort('appointmentDate')}
                className={`cursor-pointer ${
                  sort === 'appointmentDate' ? 'flex flex-row justify-between items-center bg-blue-100'
                  : 'bg-blue-100'
              }`}
              >
                Date Created
                {sort === 'appointmentDate' && <ArrowUpDown className="h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="bg-blue-100">Medicine</TableHead>
              <TableHead className="bg-blue-100">Notes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {prescriptions.map((prescription, index) => {
              const { _id, dateVisit, medicine, notes } = prescription;
              if (prescription.appointmentId === selectedAppointment) {
                return (
                  <TableRow key={_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{'Dr. Siyo R. Vallao'}</TableCell>
                    <TableCell>{format(dateVisit, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{medicine}</TableCell>
                    <TableCell>{notes}</TableCell>
                  </TableRow>
                );
              }
            })}
            {prescriptions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No prescriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TablePrescription;
