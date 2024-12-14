import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { collapsedAtom, userInfoAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const AvatarMenu = () => {
  const [collapse, setCollapsed] = useAtom(collapsedAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setUserInfo({
      id: '',
      fullName: '',
      role: '',
      userImage: {
        asset_id: '',
        public_id: '',
        secure_url: '',
      },
    });
    navigate('/');
  };
  return (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-transparent cursor-pointer">
          <div className="flex flex-row justify-center items-center gap-2">
            <img
              loading="lazy"
              src={userInfo?.userImage?.secure_url}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
           <p className="text-white font-bold text-[17px] leading-6">{userInfo?.fullName}</p>

          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            onClick={() => setCollapsed('low')}
            checked={collapse === 'low'}
          >
            Toggle Fullscreen
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarCheckboxItem
            onClick={() => setCollapsed('high')}
            checked={collapse === 'high'}
          >
            Show Sidebar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarCheckboxItem
            onClick={() => setCollapsed('medium')}
            checked={collapse === 'medium'}
          >
            Hide Sidebar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem onClick={handleLogout}>
            Logout
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AvatarMenu;
