import CSVDownloader from '@/app/component/CSVDownloader';
import ExcelDownloader from '@/app/component/ExcelDownloader';
import PDFDownloader from '@/app/component/PDFDownloader';
import PrintDownloader from '@/app/component/PrintDownloader';
import PaginationInput from '@/app/component/PaginationInput';
import DeleteDialog from '@/app/component/PopUp/DeleteDialog';
import PatientForm from '@/app/component/PopUp/PatientForm';
import SearchInput from '@/app/component/SearchInput';
import Selection from '@/app/component/Selection';
import DashboardUserView from '@/app/pages/DashboardUserView';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CRACKED_TOOTH } from '@/constants/image.constant';
import usePatientService from '@/service/pages/patient.service';
import usePaginationService from '@/service/pagination.service';
import { EyeIcon, Pencil, Trash2, UserPlus } from 'lucide-react';
import AdminLayout from './AdminLayout';

const Patient = () => {
  const {
    handleAction,
    setSearchQuery,
    action,
    filteredPatients,
    handleCloseForms,
    filterPatientsByTimeframe,
    patientId,
    setPatientId,
  } = usePatientService();
  const { start, end } = usePaginationService(filteredPatients);

  return (
    <AdminLayout title={false}>
      <div className="flex justify-start p-4">
        <span className="text-xl font-semibold text-gray-400">Patients</span>
      </div>
      <div className="bg-white border border-black-300 p-4 rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left: Treatment List */}
          <div className="text-lg font-semibold text-gray-500">TREATMENT LIST</div>

          {/* Right: Add Patient */}
          <div
            className="mb-2 flex items-center gap-2 bg-primaryColor w-auto p-2 text-white rounded-md"
            onClick={() => handleAction('create', {})}
          >
            <UserPlus />
            <p>Add Patient</p>
          </div>
        </div>

        {/* Back Button */}
        {patientId.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <button
              className="bg-gray-500 text-white p-2 rounded-md"
              onClick={() => setPatientId('')}
            >
              Back
            </button>
          </div>
        )}

        <hr className="border-gray-300 mb-4" />

        {patientId.length === 0 && (
          <>
            {/* Search Section */}
            <div className="flex flex-row items-center justify-center px-4 gap-4">
              <div className="flex flex-row gap-2 flex-1">
                <SearchInput setSearchQuery={setSearchQuery} />
              </div>
              <div className="flex flex-row gap-2">
                <Selection
                  name="doctor"
                  className="w-36"
                  defaultValue="Dr. Vallao"
                  disabled={true}
                  onChange={() => console.log('hehe')}
                  options={[]}
                />
                <Selection
                  name="exportBtn"
                  className="w-36"
                  defaultValue="Filter Date"
                  onChange={(e) => filterPatientsByTimeframe(e.target.value)}
                  options={[
                    { label: 'All', value: 'all' },
                    { label: 'This Month', value: 'month' },
                    { label: 'This Week', value: 'week' },
                    { label: 'This Day', value: 'day' },
                  ]}
                />
              </div>
            </div>

            {/* CSV Downloader Section */}
            <div className="mt-4 flex justify-end gap-2 ">
              <CSVDownloader data={filteredPatients} fileName="Patient" />
              <ExcelDownloader data={filteredPatients} fileName="Patient" />
              <PDFDownloader data={filteredPatients} fileName="PatientData" />
              <PrintDownloader data={filteredPatients} fileName="PatientData" />
            </div>
          </>
        )}

        <PatientForm
          isOpen={action.type !== null && action.type !== 'delete'}
          onClose={handleCloseForms}
        />

        {filteredPatients.length > 0 && patientId.length === 0 && (
          <>
            <div className="bg-white border border-black-300 p-4 rounded-md shadow-md mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.slice(start, end).map((patient, index) => {
                    const {
                      address,
                      contactNumber,
                      firstName,
                      lastName,
                      linkUserId,
                      _id,
                      gender,
                      email,
                    } = patient;
                    return (
                      <TableRow key={_id ?? '' + index}>
                        <TableCell className="font-medium">{`${index + 1}`}</TableCell>
                        <TableCell>{`${firstName} ${lastName}`}</TableCell>
                        <TableCell>{gender || 'N/A'}</TableCell>
                        <TableCell>{contactNumber}</TableCell>
                        <TableCell>{address}</TableCell>
                        <TableCell>{email || ''}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row gap-2 justify-end z-50">
                            {/* Eye Icon */}
                            <div className="border border-gray-300 p-1 rounded-md">
                              <EyeIcon
                                onClick={() => setPatientId(linkUserId ?? '')}
                                className="cursor-pointer"
                              />
                            </div>

                            {/* Pencil Icon */}
                            <div className="border border-gray-300 p-1 rounded-md">
                              <Pencil
                                onClick={() => handleAction('edit', patient)}
                                className="cursor-pointer"
                              />
                            </div>

                            {/* Trash Icon */}
                            <div className="border border-gray-300 p-1 rounded-md">
                              <Trash2
                                onClick={() => handleAction('delete', patient)}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="float-right mt-12">
                <PaginationInput data={filteredPatients} />
              </div>
            </div>
          </>
        )}

        <DeleteDialog
          isOpen={action.type == 'delete'}
          onClose={handleCloseForms}
          data={action.data}
          service="patient"
        />

        {patientId.length > 0 && <DashboardUserView patientId={patientId} />}
      </div>
    </AdminLayout>
  );
};

export default Patient;
