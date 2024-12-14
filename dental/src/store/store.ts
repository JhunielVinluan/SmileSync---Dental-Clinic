import { userDataDropDown } from '@/types/app.types';
import {
  AppointmentInfo,
  PrescriptionInfoType,
  ScheduleInfoType,
  TreatmentInfoType,
} from '@/types/appointment';
import { PatientInfo } from '@/types/patient';
import { ServiceInfo } from '@/types/service.types';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage: any = createJSONStorage(() => localStorage);

export const isAdminAtom = atomWithStorage<boolean>('isAdmin', false, storage, {
  getOnInit: true,
});

export const tableSelectorAtom = atomWithStorage<string>(
  'tableSelector',
  'requestAppointment',
  storage,
  {
    getOnInit: true,
  },
);

export const collapsedAtom = atomWithStorage<string>(
  'sidebarCollapsed',
  'high',
  storage,
  {
    getOnInit: true,
  },
);

export const activeSideMenu = atomWithStorage<string>(
  'activeMenu',
  '',
  storage,
  {
    getOnInit: true,
  },
);
export const errorApiAtom = atomWithStorage<boolean>(
  'errorApi',
  true,
  storage,
  {
    getOnInit: true,
  },
);

export const errorApiMessageAtom = atomWithStorage<string>(
  'errorApiMessage',
  '',
  storage,
  {
    getOnInit: true,
  },
);
type UserInfoType = {
  id: string;
  fullName: string;
  role?: string;
  userImage: {
    asset_id: string;
    public_id: string;
    secure_url: string;
  };
};

export const userInfoAtom = atomWithStorage<UserInfoType>(
  'userInfo',
  {
    id: '',
    fullName: '',
    role: '',
    userImage: {
      asset_id: '',
      public_id: '',
      secure_url: '',
    },
  },
  storage,
  {
    getOnInit: true,
  },
);

export const patientDataAtom = atomWithStorage<PatientInfo[]>(
  'patientData',
  [],
  storage,
);
export const userDataDropDownAtom = atomWithStorage<userDataDropDown[]>(
  'userDataDropDown',
  [],
  storage,
);

export const serviceDataAtom = atomWithStorage<ServiceInfo[]>(
  'serviceData',
  [],
  storage,
);
export const appointmentDataAtom = atomWithStorage<AppointmentInfo[]>(
  'appointmentData',
  [],
  storage,
);

export const prescriptionDataAtom = atomWithStorage<PrescriptionInfoType[]>(
  'prescriptionData',
  [],
  storage,
);

export const treatmentDataAtom = atomWithStorage<TreatmentInfoType[]>(
  'treatmentData',
  [],
  storage,
);

export const scheduleDataAtom = atomWithStorage<ScheduleInfoType[]>(
  'scheduleData',
  [],
  storage,
);

type ActionType = 'create' | 'view' | 'edit' | 'delete' | null;

interface IAction {
  type: ActionType;
  data: any;
}

export const actionDataAtom = atomWithStorage<IAction>('actionData', storage);

export const isOpenChatBotAtom = atomWithStorage<boolean>(
  'isOpenChatBot',
  false,
);

type ChatMessage = {
  isUser: boolean;
  message: string;
};
export const chatResponseAtom = atomWithStorage<ChatMessage[]>(
  'chatResponse',
  [
    {
      isUser: false,
      message: '',
    },
  ],
  storage,
  {
    getOnInit: true,
  },
);

type QuestionResponse = {
  item: number;
  answer: string;
  specify: string;
};
export const healthDeclarationAtom = atomWithStorage<QuestionResponse[]>(
  'healthDeclaration',
  [],
);
