"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, ListGroup } from "react-bootstrap"
import { useSearchParams, Link } from "react-router-dom"

const BookingSystem = () => {
  const [searchParams] = useSearchParams()
  const nurseId = searchParams.get("nurse")

  // In a real app, you would fetch nurse data based on nurseId
  const nurse = {
    id: nurseId || 1,
    name: "Dr. Emma Wilson",
    specialty: "General Care",
    image: "/placeholder.svg?height=300&width=300",
    price: "$45/hour",
  }

  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    serviceType: "",
    date: "",
    time: "",
    duration: "1",
    address: "",
    notes: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData({
      ...bookingData,
      [name]: value,
    })
  }

  const handleNextStep = () => {
    setBookingStep(bookingStep + 1)
  }

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit the booking to an API
    setBookingStep(4) // Move to confirmation step
  }

  // Available time slots (would come from API in real app)
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  return (
    <div className="booking-system-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <h1 className="fw-bold mb-4 text-center text-primary">Book an Appointment</h1>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                {/* Progress Steps */}
                <div className="booking-progress mb-5">
                  <div className="d-flex justify-content-between position-relative">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="text-center position-relative z-1">
                        <div
                          className={`progress-step rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${bookingStep >= step ? "bg-primary text-white" : "bg-light text-muted"}`}
                          style={{ width: "40px", height: "40px" }}
                        >
                          {bookingStep > step ? <i className="bi bi-check-lg"></i> : step}
                        </div>
                        <div className={`small ${bookingStep >= step ? "text-primary fw-semibold" : "text-muted"}`}>
                          {step === 1 && "Service Details"}
                          {step === 2 && "Date & Time"}
                          {step === 3 && "Your Information"}
                          {step === 4 && "Confirmation"}
                        </div>
                      </div>
                    ))}

                    {/* Progress Bar */}
                    <div
                      className="position-absolute top-50 start-0 end-0 z-0"
                      style={{ height: "2px", transform: "translateY(-20px)" }}
                    >
                      <div className="bg-light w-100 h-100 position-absolute"></div>
                      <div
                        className="bg-primary h-100 position-absolute"
                        style={{ width: `${(bookingStep - 1) * 33.33}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Step 1: Service Details */}
                {bookingStep === 1 && (
                  <div className="booking-step">
                    <h4 className="fw-bold mb-4">Service Details</h4>

                    <Row className="mb-4">
                      <Col md={4}>
                        <div className="selected-nurse mb-3 mb-md-0">
                          <div className="d-flex align-items-center">
                            <img
                              src={nurse.image || "/placeholder.svg"}
                              alt={nurse.name}
                              className="rounded-circle me-3"
                              width="60"
                              height="60"
                            />
                            <div>
                              <h6 className="mb-0 fw-bold">{nurse.name}</h6>
                              <p className="text-muted mb-0">{nurse.specialty}</p>
                              <p className="text-primary mb-0">{nurse.price}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Service Type</Form.Label>
                          <Form.Select
                            name="serviceType"
                            value={bookingData.serviceType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="general-checkup">General Check-up</option>
                            <option value="wound-care">Wound Care</option>
                            <option value="medication-management">Medication Management</option>
                            <option value="post-surgery">Post-Surgery Care</option>
                            <option value="elderly-care">Elderly Care</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Duration</Form.Label>
                          <Form.Select
                            name="duration"
                            value={bookingData.duration}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" onClick={handleNextStep} disabled={!bookingData.serviceType}>
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {bookingStep === 2 && (
                  <div className="booking-step">
                    <h4 className="fw-bold mb-4">Select Date & Time</h4>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Available Time Slots</Form.Label>
                      <div className="time-slots-grid">
                        <Row className="g-2">
                          {timeSlots.map((time, index) => (
                            <Col xs={6} md={4} key={index}>
                              <div
                                className={`time-slot p-2 border rounded text-center cursor-pointer ${bookingData.time === time ? "border-primary bg-primary bg-opacity-10 text-primary" : ""}`}
                                onClick={() => setBookingData({ ...bookingData, time })}
                              >
                                {time}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="outline-secondary" onClick={handlePrevStep}>
                        Previous
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleNextStep}
                        disabled={!bookingData.date || !bookingData.time}
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Your Information */}
                {bookingStep === 3 && (
                  <div className="booking-step">
                    <h4 className="fw-bold mb-4">Your Information</h4>

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={bookingData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your full address"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Additional Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          value={bookingData.notes}
                          onChange={handleInputChange}
                          placeholder="Any specific requirements or information the nurse should know"
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={handlePrevStep}>
                          Previous
                        </Button>
                        <Button variant="primary" type="submit" disabled={!bookingData.address}>
                          Confirm Booking
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {bookingStep === 4 && (
                  <div className="booking-step text-center">
                    <div className="confirmation-icon mb-4">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
                    </div>

                    <h4 className="fw-bold mb-3">Booking Confirmed!</h4>
                    <p className="text-muted mb-4">
                      Your appointment with {nurse.name} has been successfully booked. You will receive a confirmation
                      email shortly.
                    </p>

                    <Card className="border-0 bg-light mb-4">
                      <Card.Body>
                        <h5 className="fw-bold mb-3">Booking Details</h5>
                        <ListGroup variant="flush" className="text-start">
                          <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between">
                            <span className="text-muted">Service:</span>
                            <span className="fw-semibold">{bookingData.serviceType.replace("-", " ")}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between">
                            <span className="text-muted">Date:</span>
                            <span className="fw-semibold">{bookingData.date}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between">
                            <span className="text-muted">Time:</span>
                            <span className="fw-semibold">{bookingData.time}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between">
                            <span className="text-muted">Duration:</span>
                            <span className="fw-semibold">{bookingData.duration} hour(s)</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between">
                            <span className="text-muted">Total:</span>
                            <span className="fw-bold text-primary">
                              $
                              {Number.parseInt(nurse.price.replace("$", "").replace("/hour", "")) *
                                Number.parseInt(bookingData.duration)}
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-center gap-3">
                      <Button variant="primary" as={Link} to="/care-tracking">
                        Track Your Care
                      </Button>
                      <Button variant="outline-primary" as={Link} to="/">
                        Back to Home
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BookingSystem

