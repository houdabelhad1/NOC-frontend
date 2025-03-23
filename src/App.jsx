import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Layout Components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Page Components
import HomePage from "./pages/HomePage"
import SearchNurses from "./pages/patient/SearchNurses"
import BookingSystem from "./pages/patient/BookingSystem"
import NurseProfile from "./pages/nurse/NurseProfile"
import CareTracking from "./pages/patient/CareTracking"
import Payment from "./pages/patient/Payment"
import NurseDashboard from "./pages/nurse/NurseDashboard"
import NurseCalendar from "./pages/nurse/NurseCalendar"
import NurseNotifications from "./pages/nurse/NurseNotifications"
import CareReports from "./pages/nurse/CareReports"
import PaymentHistory from "./pages/nurse/PaymentHistory"

// Auth Pages
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"

function App() {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Patient Routes */}
            <Route path="/search" element={<SearchNurses />} />
            <Route path="/booking" element={<BookingSystem />} />
            <Route path="/nurse/:id" element={<NurseProfile />} />
            <Route path="/care-tracking" element={<CareTracking />} />
            <Route path="/payment" element={<Payment />} />

            {/* Nurse Routes */}
            <Route path="/nurse-dashboard" element={<NurseDashboard />} />
            <Route path="/nurse-calendar" element={<NurseCalendar />} />
            <Route path="/nurse-notifications" element={<NurseNotifications />} />
            <Route path="/care-reports" element={<CareReports />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

