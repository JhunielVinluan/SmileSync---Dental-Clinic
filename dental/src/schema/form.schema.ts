import { z } from 'zod';

export const PatientSchema = z.object({
  firstName: z.string().min(3, 'Should be at least 3 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  age: z.number().min(1, 'Age is required'),
  gender: z.string().min(1, 'Last name is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
  civilStatus: z.string().min(1, 'Civil status is required'),
  linkUserId: z.string().optional(),
  birthdate: z.string().min(1, 'Birthdate is required'),
  email: z.string().email('Invalid email format'),
});
export const AppointmentSchema = z.object({
  userId: z.string().min(3, 'User is Required'),
  doctorId: z.string().min(3, 'Doctor is Required'),
  service: z.string().min(1, 'Service is Required'),
  appointmentStatus: z.string().min(1, 'Status is Required'),
  appointmentType: z.string().min(1, 'Type is Required'),
  timeEnd: z.string().min(1, 'Time End is Required'),
  timeStart: z.string().min(1, 'Time Start is Required'),
});

export const TreatmentSchema = z.object({
  userId: z.string().min(3, 'UserId is Required'),
  appointmentId: z.string().min(3, 'Appointment is Required'),
  treatment: z.string().min(1, 'Treatment is Required'),
  teethNo: z.string().min(1, 'Teeth No is Required'),
  description: z.string().min(1, 'description is Required'),
  fees: z.string().min(1, 'Fees is Required'),
  remarks: z.string().min(1, 'Remarks is Required'),
});

export const PrescriptionSchema = z.object({
  userId: z.string().min(3, 'UserId is Required'),
  appointmentId: z.string().min(3, 'Appointment is Required'),
  dateVisit: z.date(),
  notes: z.string().min(1, 'Notes is Required'),
  medicine: z.string().min(1, 'Medicine is Required'),
});

export const ScheduleSchema = z.object({
  doctorId: z.string().min(3, 'Doctor is Required'),
  day: z.date(),
  startTime: z.string().min(1, 'Start Time is Required'),
  duration: z.string().min(1, 'Duration Number is Required'),
});

export const SurgicalSchema = z.object({
  name: z.string().min(3, 'Should be at least 3 characters'),
  status: z.string().min(3, 'Status is Required'),
  description: z.string().min(1, 'Description is Required'),
});

export const UserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().min(1, 'Last name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    age: z.number().min(1, 'age is required'),
    gender: z.string().min(1, 'Gender is required'),
    civilStatus: z.string().min(1, 'Civil status is required'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    address: z.string().min(1, 'Address is required'), // Assuming address should be a string
    email: z.string().email('Invalid email format'),
    userImage: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    birthdate: z.string().min(1, 'Birthdate is required'),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Confirm password must match the new password',
    },
  );
