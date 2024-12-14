import { toast } from 'sonner';
const useConfirmActionService = () => {
  const confirmAction = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      let decision = true;
      toast('Processing', {
        description: message,
        action: {
          label: 'Undo',
          onClick: () => (decision = false),
        },
      });

      setTimeout(() => {
        resolve(decision);
      }, 3000);
    });
  };
  const resultAction = (message: string, status: string) => {
    toast(status, {
      description: message,
    });
  };
  return { confirmAction, resultAction };
};

export default useConfirmActionService;
