import CSVDownloader from '@/app/component/CSVDownloader';
import PaginationInput from '@/app/component/PaginationInput';
import PrescriptionForm from '@/app/component/PopUp/PrescriptionForm';
import PrescriptionModal from '@/app/component/PopUp/PrescriptionModal';
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
import usePrescriptionService from '@/service/prescription.service';
import { format } from 'date-fns';
import {
  ArrowUpDown,
  CalendarPlus2,
  EyeIcon,
  FilePenLine,
  Trash2,
} from 'lucide-react';
import DeleteDialog from '../component/PopUp/DeleteDialog';
import AdminLayout from './AdminLayout';

const Prescription = () => {
  const { handleAction, handleCloseForms, action } = usePopUpService();
  const {
    filteredPrescription,
    sort,
    setSearchQuery,
    setSort,
    showModal,
    setShowModal,
    selectedPrescription,
    setSelectedPrescription,
  } = usePrescriptionService();
  const { start, end } = usePaginationService(filteredPrescription, 9);
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
            <p>Add Prescription</p>
          </div>
          <PrescriptionForm
            isOpen={action.type !== null && action.type !== 'delete'}
            onClose={handleCloseForms}
            data={action.data}
          />
          <div className="flex flex-row gap-2 w-1/2">
            <SearchInput setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex flex-row gap-4">
            <CSVDownloader
              data={filteredPrescription}
              fileName="Prescription"
            />

            <PrintButton
              head={['Patient Name', 'Date Created', 'Notes', 'Medicine']}
              data={
                filteredPrescription
                  ?.map((item) => [
                    item.userFullName ?? '',
                    format(item.dateVisit, 'MMM dd, yyyy') ?? '',
                    item.notes ?? '',
                    item.medicine ?? '',
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
                onClick={() => setSort('TH9')}
                className={`${sort == 'TH2' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Date Created
                {sort == 'TH9' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH3')}
                className={`${sort == 'TH3' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Notes
                {sort == 'TH3' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>
              <TableHead
                onClick={() => setSort('TH4')}
                className={`${sort == 'TH4' ? 'flex flex-row justify-between items-center bg-slate-100' : ''}`}
              >
                Medicine
                {sort == 'TH4' && <ArrowUpDown className="h-4 w-4" />}
              </TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescription
              .slice(start, end)
              .map((prescription: any, index: any) => {
                const { _id, userFullName, notes, medicine, createdAt } =
                  prescription;
                return (
                  <TableRow key={_id + index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{userFullName}</TableCell>
                    <TableCell>{format(createdAt, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{notes}</TableCell>
                    <TableCell>{medicine}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row gap-2 justify-end">
                        <EyeIcon
                          onClick={() => {
                            setShowModal(true);
                            setSelectedPrescription(prescription);
                          }}
                        />
                        <FilePenLine
                          onClick={() => handleAction('edit', prescription)}
                        />
                        <Trash2
                          onClick={() => handleAction('delete', prescription)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <div className="float-right mt-4">
          <PaginationInput data={filteredPrescription} />
        </div>
      </div>
      <DeleteDialog
        isOpen={action.type == 'delete'}
        data={action.data}
        onClose={handleCloseForms}
        service="prescription"
      />
      <PrescriptionModal
        prescription={selectedPrescription}
        isOpen={showModal}
        setIsOpen={setShowModal}
      />
    </AdminLayout>
  );
};

export default Prescription;
