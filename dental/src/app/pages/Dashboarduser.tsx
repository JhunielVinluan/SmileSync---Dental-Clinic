import RequestAppointment from '@/app/component/RequestAppointment';
import UserCard from '@/app/component/UserCard';
import TableSelector from '@/app/component/UserTable/TableSelector';
import TableAppointment from '@/app/component/UserTable/TableAppointment'; // Import TableAppointment
import { userInfoAtom } from '@/store/store';
import { User } from '@/types/app.types';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import for query parameters
import AdminLayout from './AdminLayout';

const DashboardUser = () => {
  const [userInfo] = useAtom(userInfoAtom);
  const [userInfoData, setUserInfoData] = useState<User>();
  const [currentView, setCurrentView] = useState<'user' | 'table' | 'form'>('user');
  const [searchParams] = useSearchParams();

  const getUserInfo = async () => {
    if (!userInfo?.id) return; // Guard clause for undefined userInfo
    try {
      const { id } = userInfo;
      const request = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/${id}`,
      );
      const data = request.data;
      if (request.status === 200) {
        setUserInfoData(data?.user);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  useEffect(() => {
    // Check query parameter to set the initial view
    const showAppointments = searchParams.get('showAppointments') === 'true';
    if (showAppointments) {
      setCurrentView('table');
    }
  }, [searchParams]);

  return (
    <AdminLayout title={false}>
      {/* Add Home/Dashboard Text only if not in 'table' view */}
      {currentView !== 'table' && (
        <div className="flex justify-start p-4">
          <span className="text-xl font-semibold text-gray-400">Home / Dashboard</span>
        </div>
      )}

      {/* Back Button is visible when in any view other than 'user' */}
      {currentView !== 'user' && (
        <div className="flex justify-start p-4">
          <button
            onClick={() => setCurrentView('user')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Go Back to Dashboard
          </button>
        </div>
      )}

      {/* Render Views */}
      {currentView === 'user' && (
        <div className="flex flex-row gap-4 h-full overflow-scroll">
          <div className="w-[40%]">
            <UserCard
              name={userInfoData?.firstName + ' ' + userInfoData?.lastName}
              email={userInfoData?.email}
              gender={userInfoData?.gender}
              contactNumber={userInfoData?.contactNumber}
              address={userInfoData?.address}
              age={userInfoData?.age?.toString()}
              avatar={userInfoData?.userImage?.secure_url}
              birthdate={userInfoData?.birthdate}
            />
          </div>
          <TableSelector
            userId={userInfo?.id}
            setShowForm={() => setCurrentView('form')}
          />
        </div>
      )}

      {currentView === 'table' && (
        <TableAppointment userId={userInfo?.id || ''} />
      )}

      {currentView === 'form' && (
        <RequestAppointment onClose={() => setCurrentView('user')} />
      )}
    </AdminLayout>
  );
};

export default DashboardUser;
