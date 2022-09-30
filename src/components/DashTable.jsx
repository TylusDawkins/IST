import React from 'react';
import {useMemo, useState, useEffect} from 'react'
import {useTable, usePagination, useSortBy} from 'react-table'

function DashTable (props){

    const data = props.tableData

    const columns = useMemo(
      () => [
          {
              Header:"Policy #",
              accessor:"policy_number"
          },
          {
              Header:"Result",
              accessor:"result"
          },
      ], [])

      const tableInstance = useTable({ 
        columns: columns,
        data: data 
      })

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = tableInstance;

      return (
        // apply the table props
        <div className="m-5 w-full shadow-2xl rounded-lg overflow-y-auto h-full">
          <table className=" w-full m-auto relative"  {...getTableProps()}>
            <thead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider break-words text-center">
              {// Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {// Loop over the headers in each row
                  headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {// Render the header
                      column.render('Header')}
                      {column.isSortedDesc ? (column.isSortedDesc ? "▲" : "▼") : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* Apply the table body props */}
            <tbody className="bg-white divide-y divide-gray-200 break-words overflow-y-hidden" {...getTableBodyProps()}>
              {// Loop over the table rows
              rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr className="overflow-scroll
                  " {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td className="px-6 py-4 break-words text-center overflow-hidden text-sm text-gray-500" {...cell.getCellProps()}>
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
        </div>
      )
}

export default DashTable