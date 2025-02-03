import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { nodeClosed } from "../redux/workflowSlice";
import TaskForm from "./forms/TaskForm";
import ConditionForm from "./forms/ConditionForm";
import NotificationForm from "./forms/NotificationForm";

export default function DrawerForm() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.workflow.selectedNode);

  const toggleDrawer = () => () => {
    dispatch(nodeClosed());
  };

  const renderForm = () => {
    switch (open?.type) {
      case "task":
        return <TaskForm />;
      case "condition":
        return <ConditionForm />;
      case "notification":
        return <NotificationForm />;
      default:
        return null;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      {renderForm()}
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
