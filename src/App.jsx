import React from "react";
import "./App.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import HomePage from "./assets/components/HomePage/HomePage";
import Dashboard from "./Cogs Dashboard/components/Dashboard/Dashboard";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <div>
      {/* <HomePage /> */}
      <Dashboard />
    </div>
  );
}

export default App;
