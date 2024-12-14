import { healthDeclarationAtom } from '@/store/store';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
type Question = {
  id: number;
  text: string;
};

type Response = {
  item: number;
  answer: 'yes' | 'no' | '';
  specify: string;
};

const questions: Question[] = [
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
const HDQuestion = () => {
  const setHealthDeclaration = useSetAtom(healthDeclarationAtom);
  const [counter, setCounter] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, Response>>(
    questions.reduce(
      (acc, question) => {
        acc[question.id] = { item: question.id, answer: '', specify: '' };
        return acc;
      },
      {} as Record<number, Response>,
    ),
  );

  const handleAnswerChange = (id: number, answer: 'yes' | 'no') => {
    if (answer === 'no') {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [id]: { ...prevResponses[id], answer, specify: '' },
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [id]: { ...prevResponses[id], answer },
      }));
    }
    console.log({ counter });
    if (counter < 10) {
      setCounter(counter + 1);
    } else {
      setHealthDeclaration(Object.values(responses));
      setCounter(10);
    }
  };

  const handleSpecifyChange = (id: number, specify: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: { ...prevResponses[id], specify },
    }));
  };

  return (
    <div className="p-8 ">
      {questions.map((question, index) => (
        <div className="flex flex-col gap-2 mb-4" key={question.id}>
          <p className="font-bold text-xl ">
            {index + 1}. {question.text}*
          </p>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              onChange={() => handleAnswerChange(question.id, 'yes')}
              checked={responses[question.id].answer === 'yes'}
            />
            <p className="text-gray-500">Yes</p>
          </div>
          {responses[question.id].answer === 'yes' && (
            <div className="flex flex-row gap-2 text-gray-400 ml-6">
              <p>Please specify :</p>
              <input
                className="border-b-1 border-gray-400 w-1/3 focus:outline-none"
                value={responses[question.id].specify}
                onChange={(e) =>
                  handleSpecifyChange(question.id, e.target.value)
                }
              />
            </div>
          )}
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              onChange={() => handleAnswerChange(question.id, 'no')}
              checked={responses[question.id].answer === 'no'}
            />
            <p className="text-gray-500">No</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HDQuestion;
