import { DataStructure } from '@/types/appointment';

export const dentistConstant = [
  {
    value: 'Dr. Siyo Ronald Vallao',
    label: 'Dr. Vallao',
    valuesFake: 'Dr. Vallao',
    email: 'Vallao.Vallao@Vallao.com',
  },
];

export const dentalServicesConstant = [
  {
    label: 'Routine Cleaning',
    value: 'Routine Cleaning',
    duration: '60 min',
  },
  { label: 'Teeth Whitening', value: 'Teeth Whitening', duration: '90 min' },
  { label: 'Root Canal', value: 'Root Canal', duration: '120 min' },
  { label: 'Dental Implants', value: 'Dental Implants', duration: '180 min' },
  {
    label: 'Orthodontics (Braces)',
    value: 'Orthodontics-Braces',
    duration: '45 min',
  },
  {
    label: 'Tooth Extraction',
    value: 'Tooth Extraction',
    duration: '30 min',
  },
  { label: 'Dental Crowns', value: 'Dental Crowns', duration: '90 min' },
  {
    label: 'Wisdom Teeth Removal',
    value: 'Wisdom Teeth Removal',
    duration: '60 min',
  },
  { label: 'Dental Fillings', value: 'Dental Fillings', duration: '45 min' },
  {
    label: 'Periodontal Treatment',
    value: 'Periodontal-Treatment',
    duration: '60 min',
  },
];

export const appointmentDummyData: DataStructure = {
  '07:00 AM': [
    {
      status: 'Pending',
      description: 'Checkup: Orthodontics',
      time: 30,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Root Canal',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Crowns',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Fillings',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Veneers',
      time: 60,
      date: 'Fri',
    },
  ],
  '08:00 AM': [
    {
      status: 'Pending',
      description: 'Checkup: Extractions',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dentures',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Bridges',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Gum Surgery',
      time: 60,
      date: 'Fri',
    },
  ],
  '09:00 AM': [
    {
      status: 'Pending',
      description: 'Checkup: Oral Hygiene',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Pediatric Dentistry',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Orthodontic Follow-up',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Implant Consultation',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'None',
      description: 'Checkup: TMJ Therapy',
      time: 60,
      date: 'Fri',
    },
  ],
  '10:00 AM': [
    {
      status: 'Pending',
      description: 'Checkup: Invisalign Consultation',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Oral Surgery Prep',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Routine Checkup',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Cosmetic Dentistry',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Emergency Care',
      time: 60,
      date: 'Fri',
    },
  ],
  '11:00 AM': [
    {
      status: 'Pending',
      description: 'Checkup: Periodontal Treatment',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Full Mouth Restoration',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Orthodontic Assessment',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Smile Design',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Implant Follow-up',
      time: 60,
      date: 'Fri',
    },
  ],
  '12:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Dental Bridges',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: TMJ Pain Management',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Teeth Whitening',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Pediatric Exam',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Crown Placement',
      time: 60,
      date: 'Fri',
    },
  ],
  '01:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Gum Recession Therapy',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Full Mouth X-Ray',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Implant Prep',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Veneers',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Surgery',
      time: 60,
      date: 'Fri',
    },
  ],
  '02:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Invisalign Fitting',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Cavity Filling',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Tooth Extraction',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Root Canal Follow-up',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Hygiene Education',
      time: 60,
      date: 'Fri',
    },
  ],
  '03:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Oral Cancer Screening',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Denture Fitting',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Orthodontic Adjustment',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Sealants',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Oral Surgery',
      time: 60,
      date: 'Fri',
    },
  ],
  '04:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Night Guard Fitting',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Invisalign Checkup',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Pediatric Orthodontics',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Dental Bridge Fitting',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Oral Hygiene Follow-up',
      time: 60,
      date: 'Fri',
    },
  ],
  '05:00 PM': [
    {
      status: 'Pending',
      description: 'Checkup: Emergency Dental Care',
      time: 60,
      date: 'Mon',
    },
    {
      status: 'Pending',
      description: 'Checkup: Implant Assessment',
      time: 60,
      date: 'Tue',
    },
    {
      status: 'Pending',
      description: 'Checkup: Tooth Whitening Consultation',
      time: 60,
      date: 'Wed',
    },
    {
      status: 'Pending',
      description: 'Checkup: Gum Disease Treatment',
      time: 60,
      date: 'Thu',
    },
    {
      status: 'Pending',
      description: 'Checkup: Pediatric Dental Care',
      time: 60,
      date: 'Fri',
    },
  ],
};

export const appointmentTypeConstant = [
  {
    label: 'Online',
    value: 'online',
  },
  {
    label: 'Walk-In',
    value: 'walk-in',
  },
];
