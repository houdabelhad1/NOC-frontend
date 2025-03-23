"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap"

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm py-2"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-heart-pulse fs-3 me-2 text-primary"></i>
          <span className="fw-bold text-primary">MediCare</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`mx-2 ${isActive("/") ? "active fw-bold" : ""}`}
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>

            <NavDropdown title="For Patients" id="patient-dropdown" className="mx-2">
              <NavDropdown.Item as={Link} to="/search" onClick={() => setExpanded(false)}>
                Find a Nurse
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/booking" onClick={() => setExpanded(false)}>
                Book Appointment
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/care-tracking" onClick={() => setExpanded(false)}>
                Track Care
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/payment" onClick={() => setExpanded(false)}>
                Payment
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="For Nurses" id="nurse-dropdown" className="mx-2">
              <NavDropdown.Item as={Link} to="/nurse-dashboard" onClick={() => setExpanded(false)}>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/nurse-calendar" onClick={() => setExpanded(false)}>
                Calendar
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/care-reports" onClick={() => setExpanded(false)}>
                Care Reports
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/payment-history" onClick={() => setExpanded(false)}>
                Payments
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              as={Link}
              to="/about"
              className={`mx-2 ${isActive("/about") ? "active fw-bold" : ""}`}
              onClick={() => setExpanded(false)}
            >
              About
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contact"
              className={`mx-2 ${isActive("/contact") ? "active fw-bold" : ""}`}
              onClick={() => setExpanded(false)}
            >
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex ms-lg-3 mt-3 mt-lg-0">
            <Button variant="outline-primary" className="me-2" as={Link} to="/login" onClick={() => setExpanded(false)}>
              Login
            </Button>
            <Button variant="primary" as={Link} to="/signup" onClick={() => setExpanded(false)}>
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

