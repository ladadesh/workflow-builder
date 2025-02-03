import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { updateNode, removeNode } from "../redux/workflowSlice";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const WorkflowTable = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.workflow.nodes);
  const [data, setData] = useState(nodes);

  useEffect(() => {
    setData(nodes);
  }, [nodes]);

  // Update Redux state onBlur rather than on every change
  const updateData = (rowIndex, columnId, value) => {
    // Create the updated row
    let currUpdateRow = {};
    const updatedData = data.map((row, index) =>
      index === rowIndex
        ? { ...row, data: (currUpdateRow = { ...row.data, [columnId]: value }) }
        : row
    );
    setData(updatedData);
    // Dispatch the update with the updated row's data and its id
    dispatch(updateNode({ ...currUpdateRow, id: nodes[rowIndex].id }));
  };

  const columns = [
    {
      header: "Node Type",
      accessorKey: "type",
      cell: ({ getValue }) => <span>{getValue()}</span>,
    },
    {
      header: "Node Name",
      accessorKey: "data.name",
      cell: ({ getValue, row }) => (
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          defaultValue={getValue() || ""}
          onBlur={(e) => updateData(row.index, "name", e.target.value)}
        />
      ),
    },
    {
      header: "Node Description",
      accessorKey: "data.description",
      cell: ({ getValue, row }) => (
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Enter description"
          defaultValue={getValue() || ""}
          onBlur={(e) => updateData(row.index, "description", e.target.value)}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <IconButton
          color="error"
          onClick={() => dispatch(removeNode(row.original.id))}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 2, p: 2 }}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} sx={{ fontWeight: "bold" }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkflowTable;
