import CSVDownloader from '@/app/component/CSVDownloader';
import PaginationInput from '@/app/component/PaginationInput';
import PrintButton from '@/app/component/PrintButton';
import SearchInput from '@/app/component/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useAppointmentService from '@/service/appointment.service';
import usePaginationService from '@/service/pagination.service';
import usePopUpService from '@/service/popUp.service';
import {
  ArrowUpDown,
  CalendarPlus2,
  FilePenLine,
  Hospital,
  Trash2,
} from 'lucide-react';
import AppointmentForm from '../component/PopUp/AppointmentForm';
import DeleteDialog from '../component/PopUp/DeleteDialog';
import HealthDeclaration from '../component/PopUp/HealthDeclaration';
import AdminLayout from './AdminLayout';

const OnlineRequest = () => {
  const { handleAction, handleCloseForms, action } = usePopUpService();
  const {
    handleStatusColor,
    filteredAppointment,
    sort,
    setSearchQuery,
    setSort,
    showDeclaration,
    setShowDeclaration,
    declarationData,
    setDeclarationData,
  } = useAppointmentService('online');
  const { start, end } = usePaginationService(filteredAppointment, 9);
  return (
    <AdminLayout>
      <div className="border mt-4 bg-slate-200 rounded-xl ">
        <div className="h-2 w-full rounded-t-xl bg-primaryColor"></div>
        <div className="flex flex-row justify-between w-full p-6">
          <div
            onClick={() => handleAction('create', {})}
            className="flex items-center gap-2 bg-primaryColor  p-2 px-8 justify-center text-white rounded-md"
          >
            <CalendarPlus2 />
            <p>Add Appointment</p>
          </div>
          <AppointmentForm
            isOpen={action.type !== null && action.type !== 'delete'}
            onClose={handleCloseForms}
            data={action.data}
          />
          <div className="flex flex-row gap-2 w-1/2">
            <SearchInput setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex flex-row gap-4">
            <CSVDownloader
              data={filteredAppointment}
              fileName="Walkin Request"
            />

            <PrintButton
              head={[
                'Patient Name',
                'Appointment Date',
                'Time',
                'Service',
                'Status',
              ]}
              data={
                filteredAppointment
                  ?.map((item) => [
                    item.userFullName ?? '',
                    item.appointmentDate ?? '',
                    (item.timeStart ?? '') + ' - ' + (item.timeEnd ?? ''),
                    item.service ?? '',
                    item.appointmentStatus ?? '',
                  ])
                  .filter((row) => row.every((cell) => cell !== '')) ?? []
              }
            />
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
                Patient Name
                {sort == 'TH2' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH3')}
                className={`${sort == 'TH3' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Appointment Date
                {sort == 'TH3' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH4')}
                className={`${sort == 'TH4' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Time Appointed
                {sort == 'TH4' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH5')}
                className={`${sort == 'TH5' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Service
                {sort == 'TH5' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH6')}
                className={`${sort == 'TH6' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Status
                {sort == 'TH6' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointment
              .slice(start, end)
              .map((appointment: any, index: any) => {
                const {
                  userId,
                  userFullName,
                  appointmentDate,
                  timeEnd,
                  timeStart,
                  appointmentStatus,
                  service,
                  healthDeclaration,
                } = appointment;
                return (
                  <TableRow key={userId + index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{userFullName}</TableCell>
                    <TableCell>{appointmentDate.toString()}</TableCell>
                    <TableCell>{`${timeStart} - ${timeEnd}`}</TableCell>
                    <TableCell>{service}</TableCell>
                    <TableCell>
                      <p
                        className={`text-center text-white rounded-xl p-2 ${handleStatusColor(appointmentStatus)}`}
                      >
                        {appointmentStatus}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-2 justify-end">
                        <Hospital
                          onClick={() => {
                            setShowDeclaration(true);
                            setDeclarationData(healthDeclaration);
                          }}
                        />
                        <FilePenLine
                          onClick={() => handleAction('edit', appointment)}
                        />
                        <Trash2
                          onClick={() => handleAction('delete', appointment)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div className="float-right mt-4">
          <PaginationInput data={filteredAppointment} />
        </div>
      </div>
      <DeleteDialog
        isOpen={action.type == 'delete'}
        data={action.data}
        onClose={handleCloseForms}
        service="appointment"
      />
      <HealthDeclaration
        data={declarationData || []}
        isOpen={showDeclaration}
        setIsOpen={setShowDeclaration}
      />
    </AdminLayout>
  );
};

export default OnlineRequest;
