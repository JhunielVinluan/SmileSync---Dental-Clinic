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
import usePaginationService from '@/service/pagination.service';
import usePopUpService from '@/service/popUp.service';
import { ArrowUpDown, CalendarPlus2, FilePenLine, Trash2 } from 'lucide-react';
import DeleteDialog from '../component/PopUp/DeleteDialog';
import AdminLayout from './AdminLayout';

import CSVDownloader from '@/app/component/CSVDownloader';
import ScheduleForm from '@/app/component/PopUp/ScheduleForm';
import PrintButton from '@/app/component/PrintButton';
import useScheduleService from '@/service/schedule.service';
import { format } from 'date-fns';
const Schedule = () => {
  const { handleAction, handleCloseForms, action } = usePopUpService();
  const { filteredAppointment, sort, setSearchQuery, setSort } =
    useScheduleService();
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
            <p>Add Schedule</p>
          </div>
          <ScheduleForm
            isOpen={action.type !== null && action.type !== 'delete'}
            onClose={handleCloseForms}
            data={action.data}
          />
          <div className="flex flex-row gap-2 w-1/2">
            <SearchInput setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex flex-row gap-4">
            <CSVDownloader data={filteredAppointment} fileName="Schedule" />

            <PrintButton
              head={[
                'Patient Name',
                'Teeth Number',
                'Description',
                'Fees',
                'Remarks',
              ]}
              data={filteredAppointment.map((item) => [
                'Dr. Siyo R. Vallao',
                item.startTime,
                item.duration,
                item.duration,
                format(item.day, 'MMM dd, yyyy'),
              ])}
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
                Doctor Name
                {sort == 'TH2' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH3')}
                className={`${sort == 'TH3' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Start Time
                {sort == 'TH3' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH4')}
                className={`${sort == 'TH4' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Duration
                {sort == 'TH4' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH5')}
                className={`${sort == 'TH5' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Date
                {sort == 'TH5' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointment
              .slice(start, end)
              .map((appointment: any, index: any) => {
                const { doctorId, startTime, duration, day } = appointment;
                return (
                  <TableRow key={doctorId + index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{'Dr. Siyo R. Vallao'}</TableCell>
                    <TableCell>{startTime}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>{format(day, 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-2 justify-end">
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
        service="schedule"
      />
    </AdminLayout>
  );
};

export default Schedule;
