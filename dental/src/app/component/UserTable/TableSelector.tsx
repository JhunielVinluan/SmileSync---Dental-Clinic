import PaginationInput from '@/app/component/PaginationInput';
import LatestAppointment from '@/app/component/UserTable/LatestAppointment';
import TableAppointment from '@/app/component/UserTable/TableAppointment';
import TablePrescription from '@/app/component/UserTable/TablePrescription';
import TableTreatment from '@/app/component/UserTable/TableTreatment';
import { tableSelectorAtom, userInfoAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

type TableSelectorProps = {
  setShowForm: () => void;
  userId?: string;
};

const TableSelector = ({ setShowForm, userId }: TableSelectorProps) => {
  const [tableSelector, setTableSelector] = useAtom(tableSelectorAtom);
  const [userInfo] = useAtom(userInfoAtom);
  console.log({ userInfo });
  const tabs = [
    ...(userInfo.role === 'patient'
      ? [{ key: 'requestAppointment', label: 'Request Appointment' }]
      : []),
    { key: 'Appointment', label: 'Appointment' },
    { key: 'Prescription', label: 'Prescription' },
    { key: 'Treatment', label: 'Treatment' },
  ];
  useEffect(() => {
    if (userInfo.role !== 'patient') setTableSelector('Appointment');
    if (userInfo.role === 'patient') setTableSelector('requestAppointment');
  }, []);

  return (
    <div className="w-full border border-gray-500 relative rounded-xl h-auto">
      <div className="border-b border-gray-500  flex flex-row justify-between">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${tableSelector === tab.key ? 'bg-primaryColor' : ''} ${
              tab.key === 'requestAppointment' ? 'rounded-tl-xl' : ''
            } 
            ${tab.key === 'Treatment' ? 'rounded-tr-xl' : ''}
            p-4 w-full`}
            onClick={() => setTableSelector(tab.key)} // Set the selected tab
          >
            <p
              className="text-xl text-center"
              style={{ color: tableSelector === tab.key ? 'white' : 'black' }}
            >
              {tab.label}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4">
        {tableSelector === 'requestAppointment' &&
          userInfo.role === 'patient' && (
            <LatestAppointment setShowForm={setShowForm} />
          )}
        {tableSelector === 'Appointment' && (
          <TableAppointment userId={userId ?? ''} />
        )}
        {tableSelector === 'Prescription' && (
          <TablePrescription userId={userId ?? ''} />
        )}
        {tableSelector === 'Treatment' && (
          <TableTreatment userId={userId ?? ''} />
        )}
      </div>



      {/* Pagination Section */}
     {tableSelector !== 'requestAppointment' && (
  <div className="p-4 mb-4">
    {/* Footer Section */}
    <div className="absolute bottom-0 left-0 right-0 ">
      {/* Horizontal Line */}
      <hr className="border-gray-300 mb-4 w-150px mx-auto ml-5 mr-5" />

      {/* Entries and Pagination */}
      <div className="flex justify-between items-center px-4">
        {/* Showing Entries */}
        <div className="text-sm text-gray-500">
          {userId && <span>Showing 1 to 1 of 1 entries</span>}
        </div>

        {/* Pagination */}
        <div className=" mb-2">
          <PaginationInput data={['1', '2', '3']} />
        </div>
      </div>
    </div>
  </div>
)}





    </div>
  );
};

export default TableSelector;
