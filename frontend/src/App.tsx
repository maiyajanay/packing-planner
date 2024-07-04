import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { PackingForm } from "./PackingForm";
import TripContext from "./tripContext/TripContext";
import "./SearchForm.css";

function App() {
  const { trips, handleEdit } = useContext(TripContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/packing/:id"
          element={<PackingForm trips={trips} onEdit={handleEdit} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
