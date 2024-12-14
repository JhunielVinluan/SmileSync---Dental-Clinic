import UserCard from '@/app/component/UserCard';
import TableSelector from '@/app/component/UserTable/TableSelector';
import { userInfoAtom } from '@/store/store';
import { User } from '@/types/app.types';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const DashboardUserView = ({ patientId }: { patientId: string }) => {
  const [userInfo] = useAtom(userInfoAtom);
  const [userInfoData, setUserInfoData] = useState<User>();
  console.log({ patientId });
  const getUserInfo = async () => {
    try {
      const request = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/${patientId ?? userInfo?.id}`,
      );
      const data = request.data;
      if (request.status === 200) {
        console.log({ dataHehe: data });
        setUserInfoData(data?.user);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-row gap-4  h-full  overflow-scroll">
      <div className="w-[40%]">
        <UserCard
          name={userInfoData?.firstName + ' ' + userInfoData?.lastName}
          email={userInfoData?.email}
          gender={userInfoData?.gender}
          contactNumber={userInfoData?.contactNumber}
          address={userInfoData?.address}
          age={userInfoData?.age.toString()}
          avatar={userInfoData?.userImage?.secure_url}
        />
      </div>
      <TableSelector userId={patientId} setShowForm={() => {}} />
    </div>
  );
};
export default DashboardUserView;
