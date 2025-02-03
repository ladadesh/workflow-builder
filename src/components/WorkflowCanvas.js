import React, { useMemo, useCallback } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import NodeComponent from "./Node"; // Import your custom Node component
import {
  nodesChanged,
  edgesChanged,
  connect,
  nodeClicked,
} from "../redux/workflowSlice";
import DrawerForm from "./DrawerForm";
import { Box } from "@mui/material";

export function WorkflowCanvas() {
  const dispatch = useDispatch();

  // Get state values from Redux
  const nodesList = useSelector((state) => state.workflow.nodesType);
  const nodes = useSelector((state) => state.workflow.nodes);
  const edges = useSelector((state) => state.workflow.edges);

  // Styling for React Flow container
  const styles = {
    background: "#cfdeed",
    width: "100%",
    height: "100%",
    marginTop: "20px",
    border: "1px solid #555",
    borderRadius: "5px",
  };

  // Build nodeTypes mapping from nodesList. Each key is the node type,
  // and the value is the component to render that node.
  const nodeTypes = useMemo(() => {
    return nodesList.reduce((acc, item) => {
      acc[item.value] = NodeComponent;
      return acc;
    }, {});
  }, [nodesList]);

  // Dispatch node changes from React Flow
  const handleNodesChange = useCallback(
    (changes) => {
      dispatch(nodesChanged(changes));
    },
    [dispatch]
  );

  // Dispatch edge changes from React Flow
  const handleEdgesChange = useCallback(
    (changes) => {
      dispatch(edgesChanged(changes));
    },
    [dispatch]
  );

  // Dispatch new edge connections
  const handleConnect = useCallback(
    (params) => {
      dispatch(connect(params));
    },
    [dispatch]
  );

  // Dispatch a node click action
  const handleNodeClick = useCallback(
    (event, node) => {
      dispatch(nodeClicked(node));
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        height: { xs: "70vh", sm: "80vh" },
        width: "80%",
        margin: { xs: "40px 0 0 0", sm: "0 auto" },
      }}
    >
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <DrawerForm />
    </Box>
  );
}
