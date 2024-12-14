import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@radix-ui/react-select';
import { Dispatch, SetStateAction } from 'react';

interface HealthDeclarationProps {
  isOpen: boolean;
  data: AnswerObject[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type AnswerObject = {
  answer: string;
  specify: string;
};

const questions = [
  {
    id: 1,
    text: 'Are you currently experiencing any dental pain or discomfort?',
  },
  {
    id: 2,
    text: 'Have you noticed any changes in your mouth, such as sores or lumps?',
  },
  { id: 3, text: 'Do you have any difficulty chewing or swallowing?' },
  {
    id: 4,
    text: 'Are you experiencing any jaw pain or clicking sounds when you open your mouth?',
  },
  { id: 5, text: 'Do you have any issues with bad breath or dry mouth?' },
  {
    id: 6,
    text: 'Are you currently using any dental appliances, such as braces, retainers, or dentures?',
  },
  {
    id: 7,
    text: 'Do you have any known allergies to dental materials or medications?',
  },
  {
    id: 8,
    text: 'Are you currently taking any medications that might affect dental treatment?',
  },
  {
    id: 9,
    text: 'Do you have any medical conditions that could impact dental care (e.g., diabetes, heart disease)?',
  },
  {
    id: 10,
    text: 'Is there anything else about your dental or medical history that we should be aware of before your appointment?',
  },
];
const HealthDeclaration = ({
  data,
  isOpen,
  setIsOpen,
}: HealthDeclarationProps) => {
  console.log({ data });
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>HEALTH DECLARATION</DialogTitle>
        </DialogHeader>
        <Separator className="bg-black h-1 w-full" />
        <div className="flex flex-col gap-2">
          {questions.map((item, index) => {
            // Safely access the corresponding answer and specify fields
            const response = data[index] || {
              answer: 'No response',
              specify: '',
            };
            const { answer, specify } = response;

            return (
              <div key={item.id || index}>
                <p>
                  {index + 1}. {item.text}
                </p>
                <p className="font-bold">Answer: {answer}</p>
                {specify && <p>Specify: {specify}</p>}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealthDeclaration;
