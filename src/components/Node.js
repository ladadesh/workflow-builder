import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeNode } from "../redux/workflowSlice";

export default function Node(props) {
  const dispatch = useDispatch();
  let nodeDetails = useSelector((state) => state.workflow.nodesType);
  nodeDetails = nodeDetails?.find((item) => item?.value === props.type);

  return (
    <Card
      sx={{
        backgroundColor: "",
        width: "200px",
        position: "relative",
        height: "80px",
        borderLeft: `5px solid ${nodeDetails?.color}`,
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: "#d26868",
          "&:hover": {
            color: "red",
          },
          position: "absolute",
          top: "-5px",
          right: "-5px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeNode(props?.id));
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: nodeDetails?.color,
            alignSelf: "center",
          }}
        >
          {nodeDetails?.icon}
        </IconButton>

        <CardContent sx={{ padding: "5px 0 0 5px" }}>
          <Typography align="left" gutterBottom variant="h6" component="div">
            {props?.data?.name ? props?.data?.name : nodeDetails?.name}
          </Typography>
        </CardContent>
        {nodeDetails?.nodeType &&
          nodeDetails?.nodeType.map((item, index) => (
            <Handle
              key={index}
              type={item.type}
              position={Position?.[item?.position]}
              style={{
                backgroundColor: "#c6c6c6", // Custom background color for the handle
                // border: "2px solid black", // Custom border styling
                width: "25px",
                height: "10px",
                borderRadius: "5px",
              }}
            />
          ))}
      </Box>
    </Card>
  );
}
