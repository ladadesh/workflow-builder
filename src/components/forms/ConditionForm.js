import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateNode } from "../../redux/workflowSlice";

const ConditionForm = () => {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.workflow.selectedNode);
  const nodes = useSelector((state) => state.workflow.nodes);
  const selectedNodeValue = nodes?.find(
    (item) => item.id === selectedNode?.id
  )?.data;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: selectedNodeValue?.name ? selectedNodeValue?.name : "",
      description: selectedNodeValue?.description
        ? selectedNodeValue?.description
        : "",
      operator: selectedNodeValue?.operator ? selectedNodeValue?.operator : "",
      action: selectedNodeValue?.action ? selectedNodeValue?.action : "",
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
        Condition Form
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Condition Name"
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="operator"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Operator"
            select
            variant="outlined"
            fullWidth
            required
          >
            {["Equals", "Not Equals", "Greater Than", "Less Than"].map(
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
      <Controller
        name="action"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Action"
            select
            variant="outlined"
            fullWidth
            required
          >
            {["Show Field", "Hide Field", "Trigger Notification"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default ConditionForm;
