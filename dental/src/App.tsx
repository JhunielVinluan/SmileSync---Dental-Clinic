import Prescription from '@/app/pages/Prescription';
import Schedule from '@/app/pages/Schedule';
import SettingsUser from '@/app/pages/SettingsUser';
import Treatment from '@/app/pages/Treatment';
import UserValidation from '@/app/pages/UserValidation';
import DentalClinicApp from '@/landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Appointment } from './app/pages/Appointment';
import CalendarRequest from './app/pages/Calendar';
import { Dashboard } from './app/pages/Dashboard';
import DashboardUser from './app/pages/Dashboarduser';
import ForgotPassword from './app/pages/ForgotPassword';
import Login from './app/pages/Login';
import OnlineRequest from './app/pages/OnlineRequest';
import OTP from './app/pages/OTP';
import Patient from './app/pages/Patient';
import Register from './app/pages/Register';
import ResetPassword from './app/pages/ResetPassword';
import Service from './app/pages/Service';
import Settings from './app/pages/Settings';
import UserHomePage from './app/pages/UserHomePage';
import WalkInRequest from './app/pages/WalkInRequest';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DentalClinicApp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/otp" element={<OTP />} />

      <Route path="/user" element={<UserValidation />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboarduser" element={<DashboardUser />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/service" element={<Service />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settingsuser" element={<SettingsUser />} />
      <Route path="/home" element={<UserHomePage />} />
      <Route path="/walk-in-request" element={<WalkInRequest />} />
      <Route path="/online-request" element={<OnlineRequest />} />
      <Route path="/treatment" element={<Treatment />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/prescription" element={<Prescription />} />
      <Route path="/calendar" element={<CalendarRequest />} />
    </Routes>
  </BrowserRouter>
);

export default App;
