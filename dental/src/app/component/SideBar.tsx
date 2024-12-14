import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Bolt,
  BriefcaseMedical,
  CalendarCheck,
  CalendarClock,
  CalendarRange,
  Footprints,
  LayoutDashboard,
  LucideUser,
  PersonStanding,
  PersonStandingIcon,
  Rss,
  Settings,
  SquareUserRound,
  Syringe,
  User2Icon,
  UserCheckIcon,
  UserCircle,
} from 'lucide-react';

import { ResizablePanel } from '@/components/ui/resizable';

import { activeSideMenu, isAdminAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';

interface ISideBarProps {
  collapse: string;
}
const SideBar = ({ collapse }: ISideBarProps) => {
  const [isAdmin] = useAtom(isAdminAtom);
  const [active, setActive] = useAtom(activeSideMenu);
  const navigate = useNavigate();
  const isMenuPartOfAppointment = () => {
    return (
      active === 'Appointment' ||
      active === 'Walk-In-Request' ||
      active === 'Online-Request' ||
      active === 'Calendar'
    );
  };
  const handleChangeSideMenu = (value: string) => {
    setActive(value);
    if (
      value === 'Patient' ||
      value === 'Service' ||
      value === 'Walk-In-Request' ||
      value === 'Online-Request'
    ) {
      navigate(`/${value.toLowerCase()}?page=1`);
    } else {
      navigate(`/${value.toLowerCase()}`);
    }
  };

  const renderHighCollapse = () => {
    return (
      <ResizablePanel maxSize={25} minSize={20}>
        <div className="w-full bg-primaryColor h-full flex flex-col justify-start items-center">
          <div className="flex flex-col items-center text-white relative mb-4">
            <img
              src="/teeth.png"
              alt="teethImage"
              height={300}
              width={300}
              className=""
            />
            <p className="text-4xl font-bold absolute bottom-1">SmileSync</p>
          </div>
          <div className="w-full  bg-primaryColor text-white">
            <Command className=" bg-primaryColor border-none text-white">
              <CommandInput
                placeholder="Type a command or search..."
                className="text-white"
              />
              <CommandList className="text-white ">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Manage">
                  {!isAdmin && (
                    <div onClick={() => handleChangeSideMenu('DashboardUser')}>
                      <CommandItem
                        className="Dashboard"
                        active={active === 'DashboardUser'}
                      >
                        <LayoutDashboard className="mr-2 h-7 w-7" />
                        <span>Dashboard</span>
                      </CommandItem>
                    </div>
                  )}
                  {isAdmin && (
                    <>
                      <div onClick={() => handleChangeSideMenu('Dashboard')}>
                        <CommandItem
                          className=""
                          active={active === 'Dashboard'}
                        >
                          <LayoutDashboard className="mr-2 h-7 w-7" />
                          <span>Dashboard</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('User')}>
                        <CommandItem className="" active={active === 'User'}>
                          <UserCheckIcon className="mr-2 h-7 w-7" />
                          <span>User Management</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('Patient')}>
                        <CommandItem className="" active={active === 'Patient'}>
                          <SquareUserRound className="mr-2 h-7 w-7" />
                          <span>Patient</span>
                        </CommandItem>
                      </div>

                      <div onClick={() => handleChangeSideMenu('Treatment')}>
                        <CommandItem
                          className=""
                          active={active === 'Treatment'}
                        >
                          <BriefcaseMedical className="mr-2 h-7 w-7" />
                          <span>Treatment</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('Schedule')}>
                        <CommandItem
                          className=""
                          active={active === 'Schedule'}
                        >
                          <CalendarClock className="mr-2 h-7 w-7" />
                          <span>Schedule</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('Prescription')}>
                        <CommandItem
                          className=""
                          active={active === 'Prescription'}
                        >
                          <Syringe className="mr-2 h-7 w-7" />
                          <span>Prescription</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('Appointment')}>
                        <CommandItem
                          className=""
                          active={active === 'Appointment'}
                        >
                          <CalendarCheck className="mr-2 h-7 w-7" />
                          <span>Appointment</span>
                        </CommandItem>
                      </div>
                    </>
                  )}
                  {isMenuPartOfAppointment() && (
                    <div className="pl-6">
                      <div
                        onClick={() => handleChangeSideMenu('Walk-In-Request')}
                      >
                        <CommandItem
                          className=""
                          active={active === 'Walk-In-Request'}
                        >
                          <Footprints className="mr-2 h-7 w-7" />
                          <span>Walk-In-Request</span>
                        </CommandItem>
                      </div>
                      <div
                        onClick={() => handleChangeSideMenu('Online-Request')}
                      >
                        <CommandItem
                          className=""
                          active={active === 'Online-Request'}
                        >
                          <Rss className="mr-2 h-7 w-7" />
                          <span>Online-Request</span>
                        </CommandItem>
                      </div>
                      <div onClick={() => handleChangeSideMenu('Calendar')}>
                        <CommandItem
                          className=""
                          active={active === 'Calendar'}
                        >
                          <CalendarRange className="mr-2 h-7 w-7" />
                          <span>Calendar</span>
                        </CommandItem>
                      </div>
                    </div>
                  )}
                </CommandGroup>
                {isAdmin && <CommandSeparator />}
                <CommandGroup heading={isAdmin ? 'Settings' : ''}>
                  {isAdmin && (
                    <div onClick={() => handleChangeSideMenu('Service')}>
                      <CommandItem className="" active={active === 'Service'}>
                        <Bolt className="mr-2 h-7 w-7" />
                        <span>Service</span>
                      </CommandItem>
                    </div>
                  )}
                  {isAdmin && (
                    <div onClick={() => handleChangeSideMenu('Settings')}>
                      <CommandItem className="" active={active === 'Settings'}>
                        <Settings className="mr-2 h-7 w-7" />
                        <span>Settings</span>
                      </CommandItem>
                    </div>
                  )}
                  {!isAdmin && (
                    <div onClick={() => handleChangeSideMenu('SettingsUser')}>
                      <CommandItem
                        className=""
                        active={active === 'SettingsUser'}
                      >
                        <Settings className="mr-2 h-7 w-7" />
                        <span>User Profile</span>
                      </CommandItem>
                    </div>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </ResizablePanel>
    );
  };

  const renderMediumCollapse = () => {
    return (
      <ResizablePanel maxSize={5} minSize={5}>
        <div className="w-full bg-primaryColor h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-white relative mb-4">
            <img src="/teeth.png" alt="teeth image ko" height={50} width={50} />
          </div>
          <div className="w-full  bg-primaryColor text-white">
            <Command className=" bg-primaryColor border-none flex flex-col items-center text-white">
              <CommandList className="text-white ">
                <CommandEmpty>No results found.</CommandEmpty>
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Dashboard')}>
                    <CommandItem className="" active={active === 'Dashboard'}>
                      <LayoutDashboard className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {!isAdmin && (
                  <div onClick={() => handleChangeSideMenu('DashboardUser')}>
                    <CommandItem
                      className=""
                      active={active === 'DashboardUser'}
                    >
                      <LayoutDashboard className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Appointment')}>
                    <CommandItem className="" active={active === 'Appointment'}>
                      <CalendarCheck className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isMenuPartOfAppointment() && (
                  <div className="">
                    <div
                      onClick={() => handleChangeSideMenu('Walk-In-Request')}
                    >
                      <CommandItem
                        className=""
                        active={active === 'Walk-In-Request'}
                      >
                        <Footprints className="mr-2 h-7 w-7" />
                      </CommandItem>
                    </div>
                    <div onClick={() => handleChangeSideMenu('Online-Request')}>
                      <CommandItem
                        className=""
                        active={active === 'Online-Request'}
                      >
                        <Rss className="mr-2 h-7 w-7" />
                      </CommandItem>
                    </div>
                    <div onClick={() => handleChangeSideMenu('Calendar')}>
                      <CommandItem className="" active={active === 'Calendar'}>
                        <CalendarRange className="mr-2 h-7 w-7" />
                      </CommandItem>
                    </div>
                  </div>
                )}

                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('User')}>
                    <CommandItem className="" active={active === 'User'}>
                      <LayoutDashboard className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Treatment')}>
                    <CommandItem className="" active={active === 'Treatment'}>
                      <BriefcaseMedical className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Schedule')}>
                    <CommandItem className="" active={active === 'Schedule'}>
                      <CalendarClock className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Prescription')}>
                    <CommandItem
                      className=""
                      active={active === 'Prescription'}
                    >
                      <Syringe className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Patient')}>
                    <CommandItem className="" active={active === 'Patient'}>
                      <SquareUserRound className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                <CommandSeparator />
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Service')}>
                    <CommandItem className="" active={active === 'Service'}>
                      <Bolt className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {isAdmin && (
                  <div onClick={() => handleChangeSideMenu('Settings')}>
                    <CommandItem className="" active={active === 'Settings'}>
                      <Settings className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
                {!isAdmin && (
                  <div onClick={() => handleChangeSideMenu('SettingsUser')}>
                    <CommandItem
                      className=""
                      active={active === 'SettingsUser'}
                    >
                      <Settings className="mr-2 h-7 w-7" />
                    </CommandItem>
                  </div>
                )}
              </CommandList>
            </Command>
          </div>
        </div>
      </ResizablePanel>
    );
  };
  return (
    <>
      {collapse !== 'low' ? (
        <>
          {collapse === 'high' && renderHighCollapse()}
          {collapse === 'medium' && renderMediumCollapse()}
        </>
      ) : null}
    </>
  );
};

export default SideBar;
