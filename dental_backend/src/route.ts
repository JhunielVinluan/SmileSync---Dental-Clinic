import {
  createPatientController,
  deleteOnePatientController,
  getOnePatientController,
  getPatientController,
  updatePatientController,
} from '@/controllers/patient';
import { Router } from 'express';
import {
  createAppointmentController,
  deleteAllAppointmentController,
  deleteOneAppointmentController,
  getAppointmentByTypeController,
  getAppointmentController,
  getCalendarController,
  getFormattedAppointmentController,
  getLatestAppointmentController,
  getOneAppointmentController,
  getUserAppointmentController,
  updateAppointmentController,
} from './controllers/appointment';
import { getAllRecords, getNotifications, getNotificationsByUser } from './controllers/report';
import {
  createSurgicalController,
  deleteOneSurgicalController,
  getOneSurgicalController,
  getSurgicalController,
  updateSurgicalController,
} from './controllers/surgical';
import {
  createTreatmentController,
  deleteTreatmentController,
  getTreatmentController,
  getOneTreatmentController,
  updateTreatmentController,
} from './controllers/treatment';
import {
  createPrescriptionController,
  deletePrescriptionController,
  getPrescriptionController,
  getOnePrescriptionController,
  updatePrescriptionController,
} from './controllers/prescription';
import {
  createScheduleController,
  deleteScheduleController,
  getScheduleController,
  getOneScheduleController,
  updateScheduleController,
} from './controllers/schedule';
import { testController } from './controllers/test';
import {
  createUserController,
  deleteOneUserController,
  forgotPasswordController,
  getAccountController,
  getOneUserController,
  getUserController,
  loginController,
  updateOneUserController,
  updatePasswordController,
  updateUserPassword,
  userAccountController,
  verifyTokenController,
} from './controllers/user';
import { deleteAllDataController } from '@/controllers/notifications';

const route = () => {
  const router: Router = Router();

  router.get('/', testController);

  // User routes
  router.get('/user', getUserController);
  router.get('/account/validation', getAccountController);
  router.post('/account/validation/:id', userAccountController);
  router.post('/user/:id', getOneUserController);
  router.patch('/user/:id', updateOneUserController);
  router.post('/user', createUserController);
  router.delete('/user/:id', deleteOneUserController);
  router.post('/auth/forgot', forgotPasswordController);
  router.get('/auth/verify/:token', verifyTokenController);
  router.post('/auth/resetPassword', updatePasswordController);
  router.post('/auth/password/:id', updateUserPassword);
  router.post('/user/auth/login', loginController);
  router.post('/user/auth/register', createUserController);

  // Appointment routes
  router.get('/appointment', getAppointmentController);
  router.get('/user/appointment/:id', getUserAppointmentController);
  router.get('/appointmentFormatted', getFormattedAppointmentController);
  router.get('/appointmentFormatted/calendar', getCalendarController);
  router.get('/appointment/type/:type', getAppointmentByTypeController);
  router.get('/appointment/:id', getOneAppointmentController);
  router.post('/appointment/latest/latest/:id', getLatestAppointmentController);
  router.delete('/appointment/:id', deleteOneAppointmentController);
  router.delete('/appointment/all/delete', deleteAllAppointmentController);
  router.patch('/appointment/:id', updateAppointmentController);
  router.post('/appointment', createAppointmentController);

  // Patient routes
  router.get('/patient', getPatientController);
  router.get('/patient/:id', getOnePatientController);
  router.patch('/patient/:id', updatePatientController);
  router.delete('/patient/:id', deleteOnePatientController);
  router.post('/patient', createPatientController);

  // Surgical routes
  router.get('/surgical', getSurgicalController);
  router.get('/surgical/:id', getOneSurgicalController);
  router.patch('/surgical/:id', updateSurgicalController);
  router.delete('/surgical/:id', deleteOneSurgicalController);
  router.post('/surgical', createSurgicalController);

  // Report routes
  router.get('/reports', getAllRecords);
  router.get('/notifications', getNotifications);
  router.get('/notifications/:id', getNotificationsByUser);

  // Treatment routes
  router.get('/treatment', getTreatmentController);
  router.get('/treatment/:id', getOneTreatmentController);
  router.post('/treatment', createTreatmentController);
  router.patch('/treatment/:id', updateTreatmentController);
  router.delete('/treatment/:id', deleteTreatmentController);

  // Prescription routes
  router.get('/prescription', getPrescriptionController);
  router.get('/prescription/:id', getOnePrescriptionController);
  router.post('/prescription', createPrescriptionController);
  router.patch('/prescription/:id', updatePrescriptionController);
  router.delete('/prescription/:id', deletePrescriptionController);

  // Schedule routes
  router.get('/schedule', getScheduleController);
  router.get('/schedule/:id', getOneScheduleController);
  router.post('/schedule', createScheduleController);
  router.patch('/schedule/:id', updateScheduleController);
  router.delete('/schedule/:id', deleteScheduleController);
  router.delete('/allData', deleteAllDataController);
  return router;
};

export default route;
