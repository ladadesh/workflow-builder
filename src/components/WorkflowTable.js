import React from "react";
import { useTable, useSortBy } from "react-table";

const WorkflowTable = ({ workflows, onSelect }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Status", accessor: "status" },
      { Header: "Created At", accessor: "createdAt" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: workflows }, useSortBy);

  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", border: "1px solid #ddd", marginTop: "20px" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => onSelect(row.original)}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WorkflowTable;
