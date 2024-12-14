import useDashboardService from '@/service/dashboard.service';
import {
  CalendarArrowDown,
  CalendarCheck,
  CalendarDays,
  CalendarIcon,
  CalendarPlus2Icon,
  LucidePillBottle,
  LucideUserCircle,
  PillBottle,
  PillBottleIcon,
  Syringe,
  SyringeIcon,
  User,
  UserCheck2Icon,
  UserCircle2,
  UserSquareIcon,
} from 'lucide-react';
import DashboardCards from '../component/Dashboard/DashboardCards';
import AdminLayout from './AdminLayout';
import { DENTAL_FAQ } from '../component/ChatBot/ChatBot.response';
// import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
// import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: 'Patient',
//     color: '#2563eb',
//   },
//   mobile: {
//     label: 'Appointment',
//     color: '#60a5fa',
//   },
// } satisfies ChartConfig;

export function Dashboard() {
  const { reports } = useDashboardService();
  const {
    appointmentPendingData,
    appointmentCompletedData,
    surgicalData,
    patientData,
  } = reports;
  return (
    <AdminLayout title={false}>
      <div className="flex justify-start p-4">
          <span className="text-xl font-semibold text-gray-400">Home / Dashboard</span>
        </div>
      <div className="flex flex-col gap-6">
        <div className=" flex flex-col gap-7 ">
          <div className="flex flex-row justify-around gap-6 mr-20 ml-20 mt-20">
            <DashboardCards
              link={'/appointment'}
              page="Appointment"
              label="Appointment Completed"
              value={appointmentCompletedData}
              icon={<UserCheck2Icon className="h-36 w-36 text-slate-800" />}
              color={{ primary: '#2B4DE7FF', secondary: '#172B80FF' }}
            />
            <DashboardCards
              link={'/appointment'}
              page="Appointment"
              label="Appointment Pending"
              value={appointmentPendingData}
              icon={<CalendarPlus2Icon className="h-36 w-36 text-slate-800" />}
              color={{ primary: '#32AC13FF', secondary: '#0C4404FF' }}
            />
          </div>
          <div className="flex flex-row justify-around gap-8 mr-20 ml-20  ">
            <DashboardCards
              link={'/patient'}
              page="Patient"
              label="Patient"
              value={patientData}
              icon={<UserSquareIcon className="h-36 w-36 text-slate-800" />}
              color={{ primary: '#CE2424FF', secondary: '#911919FF' }}
            />
            <DashboardCards
              link={'/service'}
              page="Service"
              label="Surgical Equipment"
              value={surgicalData}
              icon={<Syringe className="h-36 w-36 text-slate-800" />}
              color={{ primary: '#B0B318FF', secondary: '#7C7E10FF' }}
            />
          </div>
        </div>
        {/* <ChartContainer config={chartConfig} className="max-h-[300px] border w-1/2 ">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer> */}
      </div>
    </AdminLayout>
  );
}
