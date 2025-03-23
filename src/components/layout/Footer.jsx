import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-heart-pulse fs-3 me-2 text-primary"></i>
              <h5 className="mb-0 fw-bold text-primary">MediCare</h5>
            </div>
            <p className="text-muted">
              Connecting patients with qualified healthcare professionals for personalized care at home.
            </p>
            <div className="d-flex mt-4">
              <a href="#" className="me-3 text-primary fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="me-3 text-primary fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="me-3 text-primary fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-primary fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-3">For Patients</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/search" className="text-muted text-decoration-none">
                  Find a Nurse
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/booking" className="text-muted text-decoration-none">
                  Book Appointment
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/care-tracking" className="text-muted text-decoration-none">
                  Track Care
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/payment" className="text-muted text-decoration-none">
                  Payment
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h6 className="text-uppercase fw-bold mb-3">For Nurses</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/nurse-dashboard" className="text-muted text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/nurse-calendar" className="text-muted text-decoration-none">
                  Calendar
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/care-reports" className="text-muted text-decoration-none">
                  Care Reports
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/payment-history" className="text-muted text-decoration-none">
                  Payments
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="text-uppercase fw-bold mb-3">Newsletter</h6>
            <p className="text-muted mb-3">Subscribe to our newsletter for the latest updates and health tips.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" />
              <Button variant="primary" id="button-addon2">
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted mb-0">&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/terms" className="text-muted text-decoration-none">
                  Terms
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/privacy" className="text-muted text-decoration-none">
                  Privacy
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/cookies" className="text-muted text-decoration-none">
                  Cookies
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

