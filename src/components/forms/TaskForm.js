import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "../../redux/workflowSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.workflow.selectedNode);
  const nodes = useSelector((state) => state.workflow.nodes);
  const selectedNodeValue = nodes?.find(
    (item) => item.id === selectedNode?.id
  )?.data;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: selectedNodeValue?.name ? selectedNodeValue?.name : "",
      assignee: selectedNodeValue?.assignee ? selectedNodeValue?.assignee : "",
      dueDate: selectedNodeValue?.dueDate ? selectedNodeValue?.dueDate : "",
      description: selectedNodeValue?.description
        ? selectedNodeValue?.description
        : "",
    },
  });

  const onSubmit = (data) => {
    dispatch(updateNode({ ...data, id: selectedNode.id }));
  };

  const stopPropagation = (event) => event.stopPropagation();

  return (
    <Box
      component="form"
      onClick={stopPropagation}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <Typography variant="h4" sx={{ alignSelf: "center" }}>
        Task Form
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Task Name"
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="assignee"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Assignee"
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default TaskForm;
