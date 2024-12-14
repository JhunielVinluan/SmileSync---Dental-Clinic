import PaginationInput from '@/app/component/PaginationInput';
import SearchInput from '@/app/component/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CRACKED_TOOTH } from '@/constants/image.constant';
import usePaginationService from '@/service/pagination.service';
import useValidationService from '@/service/userValidation.service';
import { UserAccountType } from '@/types/patient';
import { ArrowUpDown, Check, X } from 'lucide-react';
import AdminLayout from './AdminLayout';

const UserValidation = () => {
  const {
    handleStatusColor,
    filteredAppointment,
    sort,
    setSearchQuery,
    setSort,
    verifyAction,
  } = useValidationService();
  const { start, end } = usePaginationService(filteredAppointment, 9);
  return (
    <AdminLayout title={false}>
      <div className="flex justify-start p-4">
          <span className="text-xl font-semibold text-gray-400">User Management</span>
        </div>
      <div className="border mt-4 bg-slate-200 rounded-xl ">
        <div className="h-2 w-full rounded-t-xl bg-primaryColor"></div>
        <div className="flex flex-row justify-between w-full p-6">
          <div className="flex flex-row gap-2 w-full">
            <SearchInput setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead
                onClick={() => setSort('TH1')}
                className={` ${sort == 'TH1' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                ID
                {sort == 'TH1' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH2')}
                className={`${sort == 'TH2' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                First Name
                {sort == 'TH2' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH3')}
                className={`${sort == 'TH3' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Last Name
                {sort == 'TH3' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH4')}
                className={`${sort == 'TH4' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Age
                {sort == 'TH4' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH5')}
                className={`${sort == 'TH5' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Address
                {sort == 'TH5' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH6')}
                className={`${sort == 'TH6' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Email
                {sort == 'TH6' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH7')}
                className={`${sort == 'TH7' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Status
                {sort == 'TH7' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointment
              .slice(start, end)
              .map((appointment: UserAccountType, index: any) => {
                const { _id, firstName, lastName, email,age, address, isVerified } =
                  appointment;
                return (
                  <TableRow key={_id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{firstName}</TableCell>
                    <TableCell>{lastName}</TableCell>
                    <TableCell>{age}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
  <p
    className={`text-center text-white rounded-xl p-2 
      ${isVerified ? 'bg-green-500' : 'bg-yellow-500'} `}
  >
    {isVerified ? 'Verified' : 'Pending'}
  </p>
</TableCell>
                    <TableCell className="text-right">
  <div className="flex flex-row gap-2 justify-end">
    <Check
      onClick={() => verifyAction(_id, true)}
      className="cursor-pointer p-2 border-2 border-green-500 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
      style={{ width: '40px', height: '30px' }} // Set a specific size
    />
    <X
      onClick={() => verifyAction(_id, false)}
      className="cursor-pointer p-2 border-2 border-red-500 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
      style={{ width: '40px', height: '30px' }} // Set a specific size
    />
  </div>
</TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {filteredAppointment.length > 0 && (
          <div className="float-right mt-4">
            <PaginationInput data={filteredAppointment} />
          </div>
        )}
      </div>
      {filteredAppointment.length == 0 && (
        <div className="flex flex-col gap-4 justify-center items-center h-[50vh] ">
          <p className="text-2xl font-bold">NO DATA FOUND</p>
          <img src={CRACKED_TOOTH} alt="cracked tooth" className="w-32 h-32" />
        </div>
      )}
    </AdminLayout>
  );
};

export default UserValidation;
