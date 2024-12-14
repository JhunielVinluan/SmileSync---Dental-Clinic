type PrintableTableProps = {
  head: string[]; // Array for table headers
  data: string[][]; // 2D array for table rows
};

const PrintableTable = ({ data, head }: PrintableTableProps) => (
  <div id="printable-table">
    <table
      style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}
    >
      <thead>
        <tr
          style={{
            borderBottom: '1px solid black',
            backgroundColor: '#f4f4f4',
          }}
        >
          {head.map((header, index) => (
            <th
              key={index}
              style={{ padding: '8px', border: '1px solid black' }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{ padding: '8px', border: '1px solid black' }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PrintableTable;
