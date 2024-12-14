import { generateCSVData } from '@/utils/common.utils';
import { CSVLink } from 'react-csv';

const CSVDownloader = ({
  data,
  fileName,
}: {
  data: Record<string, any>[];
  fileName: string;
}) => {
  return (
    <CSVLink
      data={generateCSVData(data)}
      target="_blank"
      className="bg-primaryColor p-2 h-10 rounded-md text-center text-white w-[10em]"
      filename={`${fileName}.csv`}
    >
      Download CSV
    </CSVLink>
  );
};

export default CSVDownloader;