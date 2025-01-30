import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
} from "react-flow-renderer";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
  { id: "2", data: { label: "Process" }, position: { x: 250, y: 100 } },
];

const initialEdges = [];

const WorkflowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const saveWorkflow = () => {
    const workflowData = { nodes, edges };
    localStorage.setItem("savedWorkflow", JSON.stringify(workflowData));
    alert("Workflow saved!");
  };

  const loadWorkflow = () => {
    const savedData = localStorage.getItem("savedWorkflow");
    if (savedData) {
      const { nodes, edges } = JSON.parse(savedData);
      setNodes(nodes);
      setEdges(edges);
    }
  };
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <h2>Workflow Editor</h2>
      <button onClick={saveWorkflow}>Save Workflow</button>
      <button onClick={loadWorkflow} style={{ marginLeft: "10px" }}>
        Load Workflow
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
