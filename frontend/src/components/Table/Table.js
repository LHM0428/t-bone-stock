import React, { useMemo } from 'react';
import { CONSTANTS } from '../../common/Constant';
import { useTable, useFilters, useSortBy} from 'react-table'


const Table = ({selectedItem, data, ...props}) => {

  const { COMPANY_NAME, PRICE, CHANGE_RATE, PER, PBR, PSR, ROA } = CONSTANTS;
  const { NAME_MAPPER } = CONSTANTS;
  const columns = useMemo(() => [
      {
        Header: selectedItem.sectorName,
        canSort: false,
        columns: [
          {
            Header: NAME_MAPPER[COMPANY_NAME],
            accessor: COMPANY_NAME, // accessor is the "key" in the data
            useFilter: true
          }
        ]
      },
      {
        Header: '종목 정보',
        canSort: false,
        columns: [
          {
            Header: PER,
            accessor: PER,
            useFilter: false,
          },
          {
            Header: PBR,
            accessor: PBR,
            useFilter: false
          },
          {
            Header: PSR,
            accessor: PSR,
            useFilter: false

          },
          {
            Header: ROA,
            accessor: ROA,
            useFilter: false

          },
          {
            Header: NAME_MAPPER[PRICE],
            accessor: PRICE,
            useFilter: false

          },
          {
            Header: NAME_MAPPER[CHANGE_RATE],
            accessor: CHANGE_RATE,
            useFilter: false
          },
        ]
      },
     
    ], []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } =  useTable(
    { columns,
      data,
      defaultColumn
    },
    useFilters,
    useSortBy,
  );

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
    return (
      <input
        className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  return (
    <table className="w-full border-collapse border" {...getTableProps()}>
      <thead>
        {// Loop over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map(column => {
              return (
              // Apply the header cell props
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {// Render the header
                column.render('Header')}
                {column.canSort ?
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ? ' ↓' : ' ↑'
                      : ' ↕'}
                  </span> : ''}
                <div className="rounded" onClick={(e) => e.stopPropagation()}>{column.useFilter ? column.render('Filter') : null}</div>
              </th>
            )})}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map(row => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
              row.cells.map(cell => {
                // Apply the cell props
                return (
                  <td className="px-4 py-0.5" {...cell.getCellProps()}>
                    {// Render the cell contents
                    cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
     </tbody>
    </table>
  )
}

export default Table;