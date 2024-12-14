import PaginationInput from '@/app/component/PaginationInput';
import DeleteDialog from '@/app/component/PopUp/DeleteDialog';
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
import useServiceService from '@/service/pages/service.service';
import usePaginationService from '@/service/pagination.service';
import { Pencil, Trash2, UserPlus } from 'lucide-react';
import ServiceForm from '../component/PopUp/ServiceForm';
import TimeDisplay from '../component/TimeDisplay';
import AdminLayout from './AdminLayout';

const Service = () => {
  const {
    handleAction,
    setSearchQuery,
    action,
    filteredServices,
    handleCloseForms,
  } = useServiceService();
  const { start, end } = usePaginationService(filteredServices);

  return (
    <AdminLayout>
      <div className="flex flex-row justify-between ">
        <div
          className="flex items-center gap-2 bg-primaryColor w-1/5 p-2 justify-center text-white rounded-md"
          onClick={() => handleAction('create', {})}
        >
          <UserPlus />
          <p>Add Surgical Equipment</p>
        </div>
        <div className="flex flex-row gap-2 w-1/2">
          <SearchInput setSearchQuery={setSearchQuery} />
        </div>
        <TimeDisplay />
      </div>
      <ServiceForm
        isOpen={action.type !== null && action.type !== 'delete'}
        onClose={handleCloseForms}
      />
      {filteredServices.length > 0 ? (
        <>
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Equipment Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.slice(start, end).map((patient, index) => {
                const { name, status, description, _id } = patient;
                return (
                  <TableRow key={_id ? _id : '' + index}>
                    <TableCell
                      className="font-medium"
                      onDoubleClick={() => handleAction('view', patient)}
                    >
                      {`P00${index + 1}`}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => handleAction('view', patient)}
                    >{`${name}`}</TableCell>
                    <TableCell
                      onDoubleClick={() => handleAction('view', patient)}
                    >
                      {status}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => handleAction('view', patient)}
                    >
                      {description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-2 justify-end z-50">
                        <Pencil onClick={() => handleAction('edit', patient)} />
                        <Trash2
                          onClick={() => handleAction('delete', patient)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="float-right mt-4">
            <PaginationInput data={filteredServices} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center h-[50vh] ">
          <p className="text-2xl font-bold">NO DATA FOUND</p>
          <img src={CRACKED_TOOTH} alt="cracked tooth" className="w-32 h-32" />
        </div>
      )}
      <DeleteDialog
        isOpen={action.type === 'delete'}
        onClose={handleCloseForms}
        data={action.data}
        service="surgical"
      />
    </AdminLayout>
  );
};

export default Service;
