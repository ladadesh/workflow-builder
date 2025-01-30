import React, { useState } from "react";
import WorkflowEditor from "./components/WorkflowEditor";
import WorkflowTable from "./components/WorkflowTable";

const sampleWorkflows = [
  {
    id: "1",
    name: "Approval Process",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Email Notification",
    status: "Inactive",
    createdAt: "2024-01-10",
  },
];

function App() {
  const [workflows, setWorkflows] = useState(sampleWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workflow Automation Builder</h1>

      <h2>Available Workflows</h2>
      <WorkflowTable workflows={workflows} onSelect={setSelectedWorkflow} />

      <WorkflowEditor key={selectedWorkflow?.id} />
    </div>
  );
}

export default App;
