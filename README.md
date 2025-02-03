# Workflow Builder

A workflow automation builder built with React that lets users visually create, edit, update, and manage workflows. The application leverages a variety of modern libraries including React Flow, React Table, Material UI, and React Hook Form to provide an intuitive and interactive experience.

## Features

- **Visual Workflow Editor**:  
  Create and manage workflow nodes using a drag-and-drop interface powered by [React Flow](https://reactflow.dev/).

- **Node Management**:

  - **Add Nodes**: Add new nodes of different types (Task, Condition, Notification) to your workflow.
  - **Edit Nodes**: Update node details (name, description, etc.) via an inline editing interface.
  - **Delete Nodes**: Remove unwanted nodes along with their associated edges.
  - **Update Nodes via Table**: Edit node data directly from a table view powered by [React Table](https://tanstack.com/table).
  - **Undo Changes**: Revert the last changes with an undo feature.

- **Form Handling**:  
  Use [React Hook Form](https://react-hook-form.com/) to manage form state and validation for node details.

- **Responsive Design**:  
  Built with [Material UI](https://mui.com/) components ensuring a responsive and modern user interface.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **React Flow Renderer**: Library for creating node-based UIs.
- **React Table**: Headless UI for building powerful tables.
- **Material UI**: React UI framework for building responsive layouts and components.
- **React Hook Form**: Library for managing forms and validations.
- **Redux Toolkit**: State management using Redux best practices.
- **Other Libraries**:
  - @mui/x-date-pickers
  - @emotion/react & @emotion/styled

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/workflow-builder.git
   cd workflow-builder
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**

   ```bash
   npm start
   # or
   yarn start
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

A sample project structure might look like this:

```
workflow-builder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WorkflowCanvas.js       // React Flow based workflow editor
│   │   ├── WorkflowTable.js        // Editable React Table for node management
│   │   ├── AddNodeButtons.js
│   │   ├── Header.js
│   │   ├── Node.js
│   │   ├── Forms/
│   │   │   ├── TaskForm.js         // Form for Task nodes using react-hook-form
│   │   │   ├── ConditionForm.js    // Form for Condition nodes
│   │   │   └── NotificationForm.js // Form for Notification nodes
│   │   └── DrawerForm.js           // Drawer to show forms when a node is clicked
│   ├── redux/
│   │   └── workflowSlice.js         // Redux slice with undo, add, update, and remove logic
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Usage

- **Adding a Node**:  
  Click on the appropriate button or menu item to add a new node (e.g., Task, Condition, Notification).

- **Editing a Node**:  
  Click on a node to open its detail form in a drawer. Edit the node’s properties (name, description, etc.) and submit the form.

- **Updating via React Table**:  
  Use the inline editable table to update node details directly.

- **Undo Changes**:  
  Click the Undo button (positioned at the bottom of the screen) to revert the last change.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React Flow](https://reactflow.dev/)
- [React Table](https://tanstack.com/table)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
