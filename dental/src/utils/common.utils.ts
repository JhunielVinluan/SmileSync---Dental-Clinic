import { format, parse } from "date-fns";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

export const createItemData = <T extends { _id: string }>(
  items: T[],
  createdItem: T,
): T[] => {
  const itemExists = items.some((item) => item._id === createdItem._id);
  if (itemExists) {
    return items.map((item) =>
      item._id === createdItem._id ? { ...item, ...createdItem } : item,
    );
  } else {
    return [...items, createdItem];
  }
};
export const updateItemData = <T extends { _id: string }>(
  items: T[],
  updatedItem: T,
): T[] => {
  return items.map((item) =>
    item._id === updatedItem._id ? { ...item, ...updatedItem } : item,
  );
};

export const removeItemData = <T extends { _id?: string }>(
  items: T[],
  itemId: string,
): T[] => {
  return items.filter((item) => item._id !== itemId);
};

export const getWeekNumber = (date: Date | undefined): number => {
  if (date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const timezoneOffsetDiff =
      (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const dayOfYear =
      Math.floor(
        (date.getTime() - startOfYear.getTime() + timezoneOffsetDiff) /
        (1000 * 60 * 60 * 24),
      ) + 1;
    const weekNumber = Math.ceil(dayOfYear / 7);
    return weekNumber;
  }
  return 0;
};

export const getDateRangeOfWeek = (
  weekNumber: number,
  year: number,
): { startDate: Date; endDate: Date } => {
  const startOfYear = new Date(year, 0, 1);

  // Get the day of the week for the start of the year (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = startOfYear.getDay();

  // Calculate the number of days to the first Monday
  const daysToMonday = dayOfWeek === 0 ? 1 : dayOfWeek > 1 ? 8 - dayOfWeek : 1;
  const firstMonday = new Date(
    startOfYear.setDate(startOfYear.getDate() + daysToMonday),
  );

  // Calculate the start date of the desired week
  const daysToAdd = (weekNumber - 1) * 7;
  const startDate = new Date(firstMonday);
  startDate.setDate(startDate.getDate() - 1 + daysToAdd);

  // Adjust startDate to Monday and endDate to Friday
  const startDateMonday = new Date(startDate);
  const endDateFriday = new Date(startDateMonday);
  endDateFriday.setDate(startDateMonday.getDate() + 4);

  return { startDate: startDateMonday, endDate: endDateFriday };
};

type DataStructure = {
  [time: string]: {
    dateCode: string;
    _id: string;
    status: string;
    description: string;
    minutesDuration: string;
    date: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  }[];
};

const timeSlots = [
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];
export const generateAppointmentDataForWeek = (
  weekNumber: number,
  year: number,
  timeInterval: number,
): DataStructure => {
  const { startDate, endDate } = getDateRangeOfWeek(weekNumber, year);

  // Helper to get the weekday abbreviation from a Date object
  const getDayAbbreviation = (
    date: Date,
  ): 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' => {
    switch (date.getDay()) {
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      default:
        throw new Error('Invalid day of week');
    }
  };

  // Generate appointment data
  const appointmentData: DataStructure = {};

  // Loop through time slots
  timeSlots.forEach((time) => {
    appointmentData[time] = [];

    // Loop through weekdays (Monday to Friday)
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() >= 1 && date.getDay() <= 5) {
        // Ensure it's a weekday
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Format month as two digits
        const day = date.getDate().toString().padStart(2, '0'); // Format day as two digits
        const dateCode = `${date.getFullYear()}${month}${day}`;

        appointmentData[time].push({
          _id: '',
          dateCode: dateCode,
          status: 'none', // default value
          description: '', // default value
          minutesDuration: timeInterval.toString(), // default value
          date: getDayAbbreviation(date),
        });
      }
    }
  });

  return appointmentData;
};

export const calculateDuration = (
  startTime: string,
  endTime: string,
): number => {
  console.log({ calledHere: true })
  // Helper function to parse time strings into Date objects
  function parseTime(timeStr: string): Date {
    let [time, period] = timeStr.split(' ');

    // Default to 24-hour format conversion
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      hours += 12; // Convert PM hours to 24-hour format, except for 12 PM
    }
    if (period === 'AM' && hours === 12) {
      hours = 0; // Convert 12 AM to 00 hours
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours and minutes, ignore seconds and milliseconds
    return date;
  }

  const startDate: Date = parseTime(startTime);
  const endDate: Date = parseTime(endTime);

  // Calculate the difference in milliseconds and convert to minutes
  const diffMilliseconds: number = endDate.getTime() - startDate.getTime();
  const diffMinutes: number = diffMilliseconds / (1000 * 60); // Convert milliseconds to minutes

  return diffMinutes;
};

export const getTimeRange = (
  start: string,
  end: string,
  slots: string[],
): string[] => {
  const formatStart = formatTimeIfNeeded(start)
  const formatEnd = formatTimeIfNeeded(end)
  const startIndex = slots.indexOf(formatStart);
  const endIndex = slots.indexOf(formatEnd);

  if (startIndex === -1 || endIndex === -1) {
    console.log({
      start, end, formatStart, formatEnd
    })
    throw new Error('Invalid time range');
  }

  return slots.slice(startIndex, endIndex);
};

export function formatTimeIfNeeded(time: string): string {
  const timeRegex = /^\d{1,2}:\d{2} [AP]M$/; // Matches times like "11:00 AM"

  // Return original if already formatted
  if (timeRegex.test(time)) {
    return time;
  }

  try {
    // Parse and format the time if it's not already formatted
    const parsedTime = parse(time, 'HH:mm', new Date()); // Parse 24-hour time
    return format(parsedTime, 'h:mm a'); // Format as 12-hour time
  } catch (error) {
    console.error('Invalid time format:', error);
    return time; // Fallback to the original time if parsing fails
  }
}

export const reWriteDummyData = (data: any[], dummyData: any) => {
  let copyDummyData = { ...dummyData };
  let usedAppointments = new Set();

  data.forEach((item) => {
    const { timeStart, timeEnd, dateCode } = item;
    const timeRange = getTimeRange(timeStart, timeEnd, timeSlots);

    let appointmentPlaced = false;
    console.log({ timeRange })
    timeRange.forEach((timeSlot) => {
      if (
        copyDummyData[timeSlot] &&
        !appointmentPlaced &&
        !usedAppointments.has(item._id)
      ) {
        // Update the dummyData for this timeSlot
        copyDummyData[timeSlot] = copyDummyData[timeSlot].map(
          (appointment: any) => {
            if (appointment.dateCode === dateCode) {
              appointmentPlaced = true;
              usedAppointments.add(item._id);
              return item;
            } else {
              return appointment;
            }
          },
        );
        console.log({ dataHere: copyDummyData[timeSlot] })
      } else if (appointmentPlaced || usedAppointments.has(item._id)) {
        // If the appointment has been placed or used, reset other slots to empty

        copyDummyData[timeSlot] = copyDummyData[timeSlot].map(
          (appointment: any) => {
            if (appointment.dateCode === dateCode) {
              return {
                _id: '',
                dateCode: dateCode,
                status: 'empty',
                description: '',
                minutesDuration: '0',
                date: appointment.date,
              };
            } else {
              return appointment;
            }
          },
        );
      }
    });
  });

  return copyDummyData;
};

export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1,
          ), // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

export const toPascalCase = (str: string) =>
  str
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s+/g, '');

export const generateCSVData = (data: Record<string, any>[]) => {
  if (data.length === 0) return []; // Return an empty array if there's no data

  // Extract headers from the keys of the first entry
  const headers = Object.keys(data[0]);

  // Map the data into rows based on the headers
  const rows = data.map((entry) =>
    headers.map((header) => entry[header] ?? ''),
  );

  // Combine headers and rows
  return [headers, ...rows];
};


export const parseTime = (time: string) =>
  parse(time, "H:mm", new Date()); 

// ---------------------------------------------------------------------------------
export const generateExcelData = (data: Record<string, any>[]) => {
  if (data.length === 0) return null; // Return null if there's no data

  // Extract headers from the keys of the first entry
  const headers = Object.keys(data[0]);

  // Map the data into rows based on the headers
  const rows = data.map((entry) =>
    headers.map((header) => entry[header] ?? ''),
  );

  // Combine headers and rows into a worksheet-compatible format
  const worksheetData = [headers, ...rows];

  // Create a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  return worksheet;
};
// -----------------------------------------------------------------------------------------
export const generatePDFData = (data: Record<string, any>[]) => {
  if (data.length === 0) return null; // Return null if there's no data

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Extract headers from the keys of the first entry
  const headers = Object.keys(data[0]);

  // Set up the table position and font size
  let yOffset = 20; // Y offset for the first row (header)
  const lineHeight = 10;

  // Add headers to the PDF
  headers.forEach((header, index) => {
    doc.text(header, 10 + index * 40, yOffset);
  });

  yOffset += lineHeight;

  // Add rows to the PDF
  data.forEach((entry, rowIndex) => {
    headers.forEach((header, colIndex) => {
      doc.text(String(entry[header] ?? ''), 10 + colIndex * 40, yOffset);
    });
    yOffset += lineHeight;
  });

  return doc;
};

//--------------------------------
export const generatePrintData = (content: string) => {
  const printWindow = window.open('', '', 'width=800, height=600');
  printWindow?.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .content { margin: 20px; }
        </style>
      </head>
      <body>
        <div class="content">${content}</div>
      </body>
    </html>
  `);
  printWindow?.document.close(); // Close the document for printing
  printWindow?.print(); // Trigger the print dialog
};
