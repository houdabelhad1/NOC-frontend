import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section py-5 d-flex align-items-center"
        style={{
          minHeight: "90vh",
          marginTop: "56px",
          background: "linear-gradient(135deg, rgba(232, 244, 248, 0.95) 0%, rgba(226, 245, 237, 0.95) 100%)",
          position: "relative",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 text-primary">Professional Healthcare at Your Doorstep</h1>
              <p className="lead mb-4 text-secondary">
                Connect with qualified nurses for personalized care in the comfort of your home. Our platform makes it
                easy to find, book, and manage healthcare services.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="primary" size="lg" as={Link} to="/search" className="me-2 mb-2 mb-md-0">
                  Find a Nurse
                </Button>
                <Button variant="outline-primary" size="lg" as={Link} to="/signup" className="me-2 mb-2 mb-md-0">
                  Sign Up Now
                </Button>
                <Button variant="success" size="lg" as={Link} to="/nurse-dashboard">
                  I'm a Nurse
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Healthcare professional with patient"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="position-absolute top-0 start-0 translate-middle bg-white p-3 rounded-3 shadow-sm d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                    <span className="fw-bold">Verified Professionals</span>
                  </div>
                </div>
                <div className="position-absolute bottom-0 end-0 translate-middle bg-white p-3 rounded-3 shadow-sm d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock-fill text-primary fs-4 me-2"></i>
                    <span className="fw-bold">24/7 Availability</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Our Services</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              We offer a wide range of healthcare services to meet your needs, delivered by qualified professionals.
            </p>
          </div>

          <Row>
            {[
              {
                icon: "bi-heart-pulse",
                title: "General Care",
                description: "Regular health check-ups and monitoring of vital signs.",
              },
              {
                icon: "bi-bandaid",
                title: "Wound Care",
                description: "Professional treatment and dressing of wounds.",
              },
              {
                icon: "bi-capsule",
                title: "Medication Management",
                description: "Assistance with medication schedules and administration.",
              },
              {
                icon: "bi-activity",
                title: "Post-Surgery Care",
                description: "Specialized care for patients recovering from surgery.",
              },
            ].map((service, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm hover-card">
                  <Card.Body className="text-center p-4">
                    <div className="service-icon mb-3 mx-auto">
                      <i className={`bi ${service.icon} fs-1 text-primary`}></i>
                    </div>
                    <Card.Title className="fw-bold mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted">{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Our platform makes it easy to connect with healthcare professionals in just a few steps.
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                step: "01",
                title: "Search for Nurses",
                description: "Browse profiles of qualified nurses based on your location and requirements.",
              },
              {
                step: "02",
                title: "Book an Appointment",
                description: "Select a convenient time slot and book your appointment online.",
              },
              {
                step: "03",
                title: "Receive Care",
                description: "Get professional healthcare services in the comfort of your home.",
              },
              {
                step: "04",
                title: "Track & Pay",
                description: "Monitor your care progress and make secure payments through our platform.",
              },
            ].map((item, index) => (
              <Col md={6} lg={3} key={index}>
                <div className="process-card p-4 bg-white rounded-4 shadow-sm h-100">
                  <div className="step-number mb-3 d-inline-block px-3 py-2 rounded-pill bg-primary bg-opacity-10 text-primary fw-bold">
                    {item.step}
                  </div>
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Button variant="primary" size="lg" as={Link} to="/signup" className="me-3">
              Sign Up Now
            </Button>
            <Button variant="outline-primary" size="lg" as={Link} to="/search">
              Find a Nurse
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What Our Clients Say</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Read testimonials from patients who have experienced our healthcare services.
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                name: "Sarah Johnson",
                role: "Patient",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The nurse assigned to my mother was incredibly professional and caring. The booking process was seamless, and we could track all the care details easily.",
              },
              {
                name: "Michael Brown",
                role: "Patient",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "After my surgery, I needed regular wound care. The platform made it easy to find a qualified nurse who could visit me at home. Excellent service!",
              },
              {
                name: "Emily Davis",
                role: "Registered Nurse",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "As a nurse, this platform has helped me connect with patients who need my services. The scheduling system is flexible and the payment process is transparent.",
              },
            ].map((testimonial, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 border-0 shadow-sm testimonial-card">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h5 className="mb-0 fw-bold">{testimonial.name}</h5>
                        <p className="text-muted mb-0">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                      ))}
                    </div>
                    <p className="text-muted mb-0">"{testimonial.quote}"</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
              <p className="lead mb-0">
                Join our platform today and experience quality healthcare services at your convenience.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button
                variant="light"
                size="lg"
                className="me-2 mb-2 mb-md-0 text-primary fw-bold"
                as={Link}
                to="/signup"
              >
                Sign Up Now
              </Button>
              <Button variant="outline-light" size="lg" as={Link} to="/nurse-dashboard">
                Register as a Nurse
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default HomePage

