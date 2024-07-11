import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { PackingForm } from "./PackingForm";
import { ViewPacking } from "./ViewPacking";
import { PreviousTripLog } from "./PreviousTripLog";
import TripContext from "./tripContext/TripContext";
import "./SearchForm.css";
import "./App.css";

function App() {
  const { trips, handleEdit } = useContext(TripContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/packing/:id"
          element={<PackingForm onEdit={handleEdit} />}
        />
        <Route path="/viewpacklist/:id" element={<ViewPacking />} />
        <Route
          path="/previoustrips/viewpacklist/:id"
          element={<ViewPacking />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/previoustrips" element={<PreviousTripLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;