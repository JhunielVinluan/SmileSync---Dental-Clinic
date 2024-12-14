import ChatBot from '@/app/component/ChatBot/ChatBot';
import ChatButton from '@/app/component/ChatBot/ChatButton';
import AvatarMenu from '@/app/component/Header/Avatar';
import Notification from '@/app/component/Header/Notification';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/sonner';
import {
  activeSideMenu,
  collapsedAtom,
  isAdminAtom,
  isOpenChatBotAtom,
} from '@/store/store';
import { useAtom } from 'jotai';
import { Menu } from 'lucide-react';
import '../component/ChatBot/ChatBot.style.css';
import SideBar from '../component/SideBar';
type SideBarProps = {
  children: React.ReactNode;
  title?: boolean;
};

const AdminLayout = ({ children, title= true }: SideBarProps): JSX.Element => {
  const [active] = useAtom(activeSideMenu);
  const [collapse, setCollapsed] = useAtom(collapsedAtom);
  const [isOpenChatBot, setIsOpenChatBot] = useAtom(isOpenChatBotAtom);
  const [isAdmin] = useAtom(isAdminAtom);
  const handleCollapse = () => {
    if (collapse === 'high') {
      setCollapsed('medium');
    } else if (collapse === 'medium') {
      setCollapsed('low');
    } else {
      setCollapsed('high');
    }
    console.log({ collapse });
  };
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="w-full ">
        <SideBar collapse={collapse} />
        {collapse !== 'low' && (
          <ResizableHandle withHandle className="bg-primaryColor" />
        )}
        <ResizablePanel defaultSize={75} className="overflow-auto">
          <div className="bg-primaryColor  w-full flex flex-row items-center justify-between p-1 px-6">
            <Menu onClick={handleCollapse} className="text-white" />
            <div className="flex flex-row ">
              <div className="flex flex-row  items-center gap-2">
                <Notification />
                <AvatarMenu />
              </div>
            </div>
          </div>
          <div className="px-6 border  overflow-auto h-full no-scrollbar">
            <p className="text-2xl my-4 font-bold">{title ? active: ''}</p>
            <div className="overflow-y-auto h-[calc(100vh-120px)] no-scrollbar">
              {children}
            </div>
          </div>
          {isOpenChatBot && !isAdmin && <ChatBot />}
          {!isOpenChatBot && !isAdmin && (
            <ChatButton onClick={() => setIsOpenChatBot(true)} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster />
      {/* <ErrorHandlingApi isOpen={errorApi} /> */}
    </div>
  );
};

export default AdminLayout;
