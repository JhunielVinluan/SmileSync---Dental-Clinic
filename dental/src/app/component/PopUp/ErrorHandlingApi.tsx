import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { errorApiAtom, errorApiMessageAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai';

interface ErrorHandlingApiProps {
  isOpen: boolean;
  details?: string;
}
const ErrorHandlingApi = ({ isOpen }: ErrorHandlingApiProps) => {
  const setErrorApi = useSetAtom(errorApiAtom);
  const [errorApiMessage] = useAtom(errorApiMessageAtom);
  return (
    <Dialog open={isOpen} onOpenChange={() => setErrorApi(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm to Delete</DialogTitle>
          <DialogDescription>{errorApiMessage}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-destructive"
            onClick={() => {
              setErrorApi(false);
              console.log('false');
            }}
          >
            Okay
          </Button>
          <Button type="submit" className="bg-primaryColor">
            Refresh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorHandlingApi;
