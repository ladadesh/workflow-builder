import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "../../redux/workflowSlice";

const NotificationForm = () => {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.workflow.selectedNode);
  const nodes = useSelector((state) => state.workflow.nodes);
  const selectedNodeValue = nodes?.find(
    (item) => item.id === selectedNode?.id
  )?.data;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: selectedNodeValue?.name ? selectedNodeValue?.name : "",
      recipient: selectedNodeValue?.recipient
        ? selectedNodeValue?.recipient
        : "",
      description: selectedNodeValue?.description
        ? selectedNodeValue?.description
        : "",
      triggerEvent: selectedNodeValue?.triggerEvent
        ? selectedNodeValue?.triggerEvent
        : "",
      priorityLevel: selectedNodeValue?.priorityLevel
        ? selectedNodeValue?.priorityLevel
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
        Notification Form
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Notification Name"
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="recipient"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Recipient"
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
            required
          />
        )}
      />
      <Controller
        name="triggerEvent"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Trigger Event"
            select
            variant="outlined"
            fullWidth
            required
          >
            {["Task Completion", "Condition Met", "Manual Trigger"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>
        )}
      />
      <Controller
        name="priorityLevel"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Priority Level"
            select
            variant="outlined"
            fullWidth
            required
          >
            {["Info", "Warning", "Critical"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default NotificationForm;
