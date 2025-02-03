import React from "react";
import Header from "./components/Header";
import AddNodeButtons from "./components/AddNodeButtons";
import { WorkflowCanvas } from "./components/WorkflowCanvas";
import { Box, Button } from "@mui/material";
import WorkflowTable from "./components/WorkflowTable";
import { useDispatch, useSelector } from "react-redux";
import { undo } from "./redux/workflowSlice";

function App() {
  const nodes = useSelector((state) => state.workflow.nodes);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <Box sx={{ margin: 0, padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // Row direction on mobile
              sm: "row", // Column direction on tablets and larger screens
            },
            justifyContent: "start",
            alignItems: "center",
            height: "80%",
            position: "relative",
          }}
        >
          <AddNodeButtons />

          {nodes?.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: { xs: "90px", sm: "auto" }, // xs: use 90px from top; sm: disable top positioning
                bottom: { xs: "auto", sm: "0" }, // xs: no bottom offset; sm: stick to bottom
                right: { xs: "40%" },
                left: { sm: "0" },
                padding: "0 0 0 90px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(undo());
                  dispatch(undo());
                }}
              >
                Undo
              </Button>
            </Box>
          )}
          <WorkflowCanvas />
        </Box>
        {nodes?.length > 0 && (
          <div
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ paddingTop: "10px" }}>Workflow Summary</h2>
            <WorkflowTable />
          </div>
        )}
      </Box>
    </>
  );
}

export default App;
