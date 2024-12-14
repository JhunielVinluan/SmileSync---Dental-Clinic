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

// Define the type for the new data structure
type DentalRecord = {
  id: string;
  _id: string;
  teethNo: number;
  treatment: string;
  description: string;
  fees: number;
  service: string;
  remarks: string;
  appointmentId: string;
  createdAt: string;
};

// Sample data for the new table
const dentalRecords: DentalRecord[] = [
  {
    id: '',
    _id: '',
    teethNo: 12,
    treatment: '',
    description: '',
    appointmentId: '',
    service: 'Dental Crown',
    fees: 150,
    remarks: '',
    createdAt: '2024-11-30T09:35:29.496Z',
  },
];

// Sorting function for Dental Records
const sortRecords = (
  records: DentalRecord[],
  key: keyof DentalRecord,
  ascending: boolean,
): DentalRecord[] => {
  return [...records].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

const TableTreatment = ({ userId }: { userId: string }) => {
  const [records, setRecords] = useState(dentalRecords);
  const [sort, setSort] = useState<keyof DentalRecord | ''>('');
  const [ascending, setAscending] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [appointments, setAppointments] = useState<
    {
      service: any;
      _id: string;
      appointmentDate: Date;
    }[]
  >([]);
  // Handle sorting
  const handleSort = (key: keyof DentalRecord) => {
    const isSameSort = sort === key;
    const newAscending = isSameSort ? !ascending : true;

    const sortedRecords = sortRecords([...records], key, newAscending);
    setRecords(sortedRecords);
    setSort(key);
    setAscending(newAscending);
  };

  const getAllAppointment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/appointment/${userId}`,
      );
      const data = await response.data;
      if (response.status === 200) {
        console.log(data, 'hehehe');
        setAppointments(data);
        setSelectedAppointment(data[0]?.appointmentId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAppointment();
  }, []);

  const getAllTreatment = async () => {
    try {
      const response = await $httpGet(
        SETTINGS.URL.API.GET_TREATMENT_BY_ID(userId ?? '123'),
        {},
      );
      const data = await response.json();
      if (response.status === 200) {
        setRecords(data);
        console.log(data, 'treatment');
        setSelectedAppointment(data[0]?.appointmentId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTreatment();
  }, []);
  const { register } = useForm();

  return (
<div>
<div className="border-2 border-gray-200 p-4 rounded-md">
        <SelectInput
          label="Select an Service Availed to see Treatment"
                name="user"
                register={register}
                options={appointments.map((item) => ({
                  value: item?._id ?? '123', // Assert that _id is a string
                  label: `${item.service} | ${format(item.appointmentDate, 'MMM dd, yyyy')}`, // Assert that userFullName is a string
                }))}
                onChange={(e) => setSelectedAppointment(e.target.value)}
              />
            </div>

    

    <div className='border-2 rounded-md mt-5'>
    <Table>
      <TableHeader>
        <TableRow>
        </TableRow>
        <TableRow>
          <TableHead onClick={() => handleSort('id')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            ID {sort === 'id' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('createdAt')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Date Created {sort === 'createdAt' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('teethNo')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Number of Teeth{' '}
            {sort === 'teethNo' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('description')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Description
            {sort === 'description' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('treatment')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Treatment
            {sort === 'treatment' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('fees')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Fee {sort === 'fees' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
          <TableHead onClick={() => handleSort('remarks')} className={` ${sort === 'id' ? 'flex flex-row justify-between items-center bg-blue-100'
                    : 'bg-blue-100'
                }`}>
            Remarks {sort === 'remarks' && <ArrowUpDown className="h-4 w-4" />}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record, index) => {
          if (!record._id) {
            return null;
          }
          if (record.appointmentId === selectedAppointment) {
            return (
              <TableRow key={record._id}>
                <TableCell className="font-medium pt-10">{index + 1}</TableCell>
                <TableCell className="pt-10">
                  {format(record?.createdAt ?? new Date(), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="pt-10">{record?.teethNo}</TableCell>
                <TableCell className="pt-10">{record?.description}</TableCell>
                <TableCell className="pt-10">{record?.treatment}</TableCell>
                <TableCell className="pt-10">{`${record?.fees}`}</TableCell>
                <TableCell className="pt-10">{record?.remarks}</TableCell>
              </TableRow>
            );
          }
        })}
        {records.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No Treatment found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>


    </div>
   
  );
};

export default TableTreatment;
