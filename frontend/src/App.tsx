import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { PackingForm } from "./PackingForm";
import { ViewPacking } from "./ViewPacking";
import { PreviousTripLog } from "./PreviousTripLog";
import TripContext from "./tripContext/TripContext";
import "./SearchForm.css";
import "./App.css";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";

function App() {
  const { trips, handleEdit } = useContext(TripContext);
  return (
    <BrowserRouter>
      <Header />
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

        <Route path="/previoustrips" element={<PreviousTripLog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
