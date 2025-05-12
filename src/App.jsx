import React from "react";
import "./App.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import HomePage from "./assets/components/HomePage/HomePage";
import Dashboard from "./Cogs Dashboard/components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VarianceAnalysis from "./Cogs Dashboard/components/VarianceAnalysis/VarianceAnalysis";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/variance-analysis" element={<VarianceAnalysis />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
