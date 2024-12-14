import CSVDownloader from '@/app/component/CSVDownloader';
import PaginationInput from '@/app/component/PaginationInput';
import TreatmentForm from '@/app/component/PopUp/TreatmentForm';
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
import usePaginationService from '@/service/pagination.service';
import usePopUpService from '@/service/popUp.service';
import useTreatmentService from '@/service/treatment.service';
import { ArrowUpDown, CalendarPlus2, FilePenLine, Trash2 } from 'lucide-react';
import DeleteDialog from '../component/PopUp/DeleteDialog';
import AdminLayout from './AdminLayout';

const Treatment = () => {
  const { handleAction, handleCloseForms, action } = usePopUpService();
  const { filteredTreatment, sort, setSearchQuery, setSort } =
    useTreatmentService();
  const { start, end } = usePaginationService(filteredTreatment, 9);
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
            <p>Add Treatment</p>
          </div>
          <TreatmentForm
            isOpen={action.type !== null && action.type !== 'delete'}
            onClose={handleCloseForms}
            data={action.data}
          />
          <div className="flex flex-row gap-2 w-1/2">
            <SearchInput setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex flex-row gap-4">
            <CSVDownloader data={filteredTreatment} fileName="Treatment" />
            <PrintButton
              head={[
                'Patient Name',
                'Teeth Number',
                'Description',
                'Fees',
                'Remarks',
              ]}
              data={filteredTreatment.map((item) => [
                item.userFullName,
                item.teethNo,
                item.description,
                item.fees,
                item.remarks,
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
                Patient Name
                {sort == 'TH2' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH3')}
                className={`${sort == 'TH3' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Teeth Number
                {sort == 'TH3' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH4')}
                className={`${sort == 'TH4' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Description
                {sort == 'TH4' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH10')}
                className={`${sort == 'TH10' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Treatment
                {sort == 'TH10' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH5')}
                className={`${sort == 'TH5' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Fees
                {sort == 'TH5' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH6')}
                className={`${sort == 'TH6' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Remarks
                {sort == 'TH6' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTreatment
              .slice(start, end)
              .map((appointment: any, index: any) => {
                const {
                  userId,
                  userFullName,
                  teethNo,
                  description,
                  fees,
                  remarks,
                  treatment,
                } = appointment;
                return (
                  <TableRow key={userId + index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{userFullName}</TableCell>
                    <TableCell>{teethNo}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{treatment}</TableCell>
                    <TableCell>{fees}</TableCell>
                    <TableCell>{remarks}</TableCell>
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
          <PaginationInput data={filteredTreatment} />
        </div>
      </div>
      <DeleteDialog
        isOpen={action.type == 'delete'}
        data={action.data}
        onClose={handleCloseForms}
        service="treatment"
      />
    </AdminLayout>
  );
};

export default Treatment;
