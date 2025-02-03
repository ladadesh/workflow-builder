import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { addNode } from "../redux/workflowSlice";
import { Typography } from "@mui/material";

export default function AddNodeButtons() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.workflow.nodesType);

  return (
    <Stack
      direction="column"
      spacing={1}
      alignSelf="flex-start"
      sx={{ padding: "100px 50px", position: "relative" }}
    >
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Add Node
      </Typography>
      {nodes?.map((item, index) => (
        <Button
          key={index}
          variant="outlined"
          endIcon={React.cloneElement(item?.icon, {
            sx: { color: item?.color },
          })}
          onClick={() => dispatch(addNode(item?.value))}
        >
          {item?.name}
        </Button>
      ))}
    </Stack>
  );
}
