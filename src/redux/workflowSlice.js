import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges } from "react-flow-renderer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CalculateIcon from "@mui/icons-material/Calculate";

const initialState = {
  nodesType: [
    {
      name: "Task",
      icon: <AddTaskIcon />,
      nodeType: [{ type: "source", position: "Bottom" }],
      value: "task",
      color: "#52c41a",
    },
    {
      name: "Condition",
      icon: <CalculateIcon />,
      nodeType: [
        { type: "source", position: "Bottom" },
        { type: "target", position: "Top" },
      ],
      value: "condition",
      color: "#1890ff",
    },
    {
      name: "Notification",
      icon: <NotificationsIcon />,
      nodeType: [{ type: "target", position: "Top" }],
      value: "notification",
      color: "#FAAD15",
    },
  ],
  loading: false,
  error: null,
  isDrawerOpen: false,
  nodes: [],
  edges: [],
  selectedNode: null,
  // Stack to keep previous snapshots for undo
  past: [],
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    // Set the selected node (handleNodeClick)
    nodeClicked: (state, action) => {
      state.selectedNode = action.payload;
    },

    nodeClosed: (state, action) => {
      state.selectedNode = null;
    },

    // Helper: push current nodes and edges into history before modifying them
    pushHistory: (state) => {
      // Store shallow copies of the current nodes and edges
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
    },

    // Add a new node based on the provided type (addNode)
    addNode: (state, action) => {
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      const type = action.payload;
      const newNode = {
        id: `${state.nodes.length + 1}`,
        type: type,
        position: { x: 300, y: state.nodes.length * 140 + 10 },
        data: { label: `${type} Node` },
      };
      state.nodes.push(newNode);
    },

    // Update nodes when changes occur (onNodesChange)
    nodesChanged: (state, action) => {
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },

    // Update edges when changes occur (onEdgesChange)
    edgesChanged: (state, action) => {
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },

    // Add an edge connection (onConnect)
    connect: (state, action) => {
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      state.edges.push({ ...action.payload, animated: true });
    },

    // Update a node's field (updateNode)
    updateNode: (state, action) => {
      // action.payload should include the id of the node along with its updated data
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      const updatedData = action.payload;
      state.nodes = state.nodes.map((node) =>
        node.id === updatedData.id
          ? {
              ...node,
              data: { ...node.data, ...updatedData },
            }
          : node
      );
    },

    // Remove a node and its associated edges (removeNode)
    removeNode: (state, action) => {
      state.past.push({
        nodes: [...state.nodes],
        edges: [...state.edges],
      });
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
    },

    // Undo the last change by popping from the history stack
    undo: (state, action) => {
      console.log(state.past);
      if (state.past.length > 0) {
        const previous = state.past.pop();
        state.nodes = previous.nodes;
        state.edges = previous.edges;
      }
    },
  },
});

export const {
  nodeClicked,
  addNode,
  nodesChanged,
  edgesChanged,
  connect,
  updateNode,
  removeNode,
  nodeClosed,
  undo,
} = workflowSlice.actions;

export default workflowSlice.reducer;
