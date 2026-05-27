import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import ItineraryDetail
  from "./pages/ItineraryDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import Upload from "./pages/Upload";
import SharePage
  from "./pages/SharePage";
import Navbar
  from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>}
        />
        <Route
          path="/itineraries/:id"
          element={
            <ProtectedRoute>
              <ItineraryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share/:shareId"
          element={<SharePage />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;