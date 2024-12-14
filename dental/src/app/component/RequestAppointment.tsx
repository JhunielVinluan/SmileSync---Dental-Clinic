import { $httpPost } from '@/api/_api';
import DatePicker from '@/app/component/DatePicker';
import Selection from '@/app/component/Selection';
import { Button } from '@/components/ui/button';
import {
  appointmentTypeConstant,
  dentalServicesConstant,
  dentistConstant,
} from '@/constants/common.constants';
import { SETTINGS } from '@/constants/settings.constants';
import useConfirmActionService from '@/service/confirmAction.service';
import { userInfoAtom } from '@/store/store';
import { MINUTE_DURATION_60 } from '@/types/appointment';
import { useAtom } from 'jotai';
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
const RequestAppointment = ({ onClose }: { onClose: () => void }) => {
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
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [dentist, setDentist] = useState('64dca2f0c5a63f001b5e4c8a');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [service, setService] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [userInfo] = useAtom(userInfoAtom);
  const { confirmAction, resultAction } = useConfirmActionService();
  const handleSubmit = async () => {
    try {
      const data = {
        userId: userInfo?.id,
        doctorId: dentist,
        appointmentDate: preferredDate,
        timeStart: startTime,
        timeEnd: endTime,
        service: service,
        description: 'No description',
        appointmentType: appointmentType,
        appointmentStatus: 'Pending',
        minutesDuration: 60,
        healthDeclaration: Object.values(responses),
      };

      // TODO: make the minutes duration reflect
      console.log({ data });
      const confirm = await confirmAction('Creating Appointment...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_PATIENT_APPOINTMENT,
          data,
        );
        if (response.status === 200) {
          resultAction('Appointment successfully created', 'Successful');
          onClose();
        } else if (response.status === 234) {
          resultAction(
            'User has an existing appointment at the scheduled date',
            'Error',
          );
        } else if (response.status === 235) {
          resultAction(
            'You have Pending appointments, please check your schedule',
            'Error',
          );
        }
      } else {
        resultAction('Appointment failed to create', 'Error');
      }
    } catch (error) {
      resultAction('Network failed', 'Error');
      console.log(error);
    }
  };

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
      setCounter(10);
    }
  };

  const handleSpecifyChange = (id: number, specify: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: { ...prevResponses[id], specify },
    }));
  };

  const handleSelectChange = (setter: string, value: string) => {
    switch (setter) {
      case 'dentist':
        setDentist(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      case 'service':
        setService(value);
        break;
      case 'appointmentType':
        setAppointmentType(value);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <div className="w-full border">
        <div className="bg-primaryColor w-full rounded-t-full h-4" />
        <div className="p-4 border-b-1">
          <p className="font-bold text-3xl text-primaryColor">
            Set an Appointment
          </p>
        </div>
        <div className="p-4 w-full gap-2 flex flex-col">
          <div className="h-24 flex flex-row  rounded-2xl border">
            <div className="w-4 h-full rounded-tl-xl rounded-bl-xl bg-red-700"></div>
            <div className="p-4">
              <p className="text-2xl">
                Please be advised that this is not yet confirmed appointment.
                Our Clinic will email or call you to sent your schedule.{' '}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-gray-400 text-xl">
              Thank you for choosing SMILESYNC for your oral health care. To
              ensure we provide the best possible treatment suited to your
              needs, we ask that you complete this health declaration form. The
              information you provide we help us understand your current heath
              status and any specific dental concerns you may have. This allows
              us to deliver safe, effective and personalized care during your
              visit. Please answer the following questions accurately. Your
              responses are confidential and will ony used for your dental care.
            </p>
          </div>
          <div className="flex flex-row justify-between gap-4 w-full ">
            <div className="gap-2 flex flex-col w-full">
              <p className="text-xl ">Preferred Dentist *</p>
              <Selection
                name="exportBtn"
                className="w-full"
                onChange={(item: any) => {
                  handleSelectChange('dentist', item.target.value);
                  console.log('dentist', item.target.value);
                }}
                options={dentistConstant}
              />
            </div>

            <div className="gap-2 flex flex-col w-full">
              <p className="text-xl ">Available Date *</p>
              <DatePicker
                disablePastDates={true}
                date={preferredDate}
                setDate={setPreferredDate}
              />
            </div>
            <div className="gap-2 flex flex-col w-full">
              <p className="text-xl ">Available Start Time *</p>
              <Selection
                name="exportBtn"
                className="w-full"
                defaultValue={''}
                onChange={(item: any) =>
                  handleSelectChange('startTime', item.target.value)
                }
                options={MINUTE_DURATION_60}
              />
            </div>
            <div className="gap-2 flex flex-col w-full">
              <p className="text-xl ">End Time *</p>
              <Selection
                name="exportBtn"
                className="w-full"
                defaultValue={''}
                onChange={(item: any) =>
                  handleSelectChange('endTime', item.target.value)
                }
                options={MINUTE_DURATION_60}
              />
            </div>
          </div>
          <div className="flex flex-row items-center w-full">
            <div className="w-full">
              <p className="text-xl ">Appointment Type *</p>
              <Selection
                name="Services"
                className="w-full"
                defaultValue={''}
                onChange={(item: any) =>
                  handleSelectChange('appointmentType', item.target.value)
                }
                options={appointmentTypeConstant}
              />
            </div>
            <div className="w-full">
              <p className="text-xl ">Services *</p>
              <Selection
                name="Services"
                className="w-full"
                defaultValue={''}
                onChange={(item: any) =>
                  handleSelectChange('service', item.target.value)
                }
                options={dentalServicesConstant}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-xl">
        <div className="p-4 border-b-1">
          <p className="text-2xl text-gray-400">Set an Appointment</p>
        </div>
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
      </div>
      <Button
        className="bg-primaryColor text-lg w-1/4 h-16"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};

export default RequestAppointment;
