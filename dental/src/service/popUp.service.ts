import { actionDataAtom } from '@/store/store';
import { ActionType } from '@/types/app.types';
import { useAtom } from 'jotai';

const usePopUpService = () => {
  const [action, setAction] = useAtom(actionDataAtom);

  const handleCloseForms = () => {
    setAction({
      type: null,
      data: {},
    });
  };

  const handleAction = (type: ActionType, data: any) => {
    setAction({
      type,
      data,
    });
  };

  return {
    handleCloseForms,
    handleAction,
    action,
  };
};

export default usePopUpService;
