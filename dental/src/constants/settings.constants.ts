export const SETTINGS = {
  URL: {
    ENVIRONMENT: {
      DEV: 'http://localhost:3000',
      PROD: 'https://com-dental-backend.onrender.com',
    },
    API: {
      GET_ALL_REPORTS: '/reports',
      GET_NOTIFICATIONS: '/notifications',
      GET_NOTIFICATIONS_BY_ID: (id: string) => `/notifications/${id}`,
      GET_PATIENT_INFO_BY_ID: (id: string) => `/patient/${id}`,
      GET_USER: '/user',
      UPDATE_USER: (id: string) => `/user/${id}`,
      GET_LOGIN: '/user/auth/login',
      GET_REGISTER: '/user/auth/register',
      GET_USER_BY_ID: (id: string) => `/user/${id}`,
      CREATE_PATIENT_APPOINTMENT: '/appointment',
      GET_ALL_APPOINTMENT: '/appointment',
      DELETE_APPOINTMENT: (id: string) => `/appointment/${id}`,
      EDIT_APPOINTMENT: (id: string) => `/appointment/${id}`,
      GET_WALKIN_APPOINTMENT: '/appointment/type/walk-in',
      GET_FORMATTED_APPOINTMENT: '/appointmentFormatted',
      GET_ONLINE_APPOINTMENT: '/appointment/type/online',
      GET_USER_ACCOUNTS: '/account/validation',
      VERIFY_USER_ACCOUNT: (id: string) => `/account/validation/${id}`,
      GET_APPOINTMENT_INFO: '/appointmentFormatted/calendar',
      GET_APPOINTMENT_ID: (id: string) => `/appointment/${id}`,
      GET_PATIENT: '/patient',
      CREATE_PATIENT: '/patient',
      EDIT_PATIENT: (id: string) => `/patient/${id}`,
      DELETE_PATIENT: (id: string) => `/patient/${id}`,
      GET_SURGICAL: '/surgical',
      CREATE_SURGICAL: '/surgical',
      EDIT_SURGICAL: (id: string) => `/surgical/${id}`,
      DELETE_SURGICAL: (id: string) => `/surgical/${id}`,
      GET_TREATMENT: '/treatment',
      GET_TREATMENT_BY_ID: (id: string) => `/treatment/${id}`,
      DELETE_TREATMENT: (id: string) => `/treatment/${id}`,
      CREATE_TREATMENT: '/treatment',
      EDIT_TREATMENT: (id: string) => `/treatment/${id}`,
      GET_SCHEDULE: '/schedule',
      DELETE_SCHEDULE: (id: string) => `/schedule/${id}`,
      CREATE_SCHEDULE: '/schedule',
      EDIT_SCHEDULE: (id: string) => `/schedule/${id}`,
      GET_PRESCRIPTION: '/prescription',
      GET_PRESCRIPTION_BY_ID: (id: string) => `/prescription/${id}`,
      DELETE_PRESCRIPTION: (id: string) => `/prescription/${id}`,
      CREATE_PRESCRIPTION: '/prescription',
      EDIT_PRESCRIPTION: (id: string) => `/prescription/${id}`,
    },
  },
};
