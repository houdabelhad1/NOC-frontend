"use client"

import { Link } from "react-router-dom"  // Remplace 'next/link' par 'react-router-dom'

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Table, Badge } from "react-bootstrap"

const NurseCalendar = () => {
  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      service: "General Check-up",
      date: "2023-06-15",
      time: "10:00 AM - 11:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      service: "Wound Care",
      date: "2023-06-15",
      time: "02:00 PM - 03:00 PM",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Michael Brown",
      service: "Medication Management",
      date: "2023-06-16",
      time: "11:00 AM - 12:00 PM",
      status: "pending",
    },
    {
      id: 4,
      patient: "Emily Davis",
      service: "Post-Surgery Care",
      date: "2023-06-17",
      time: "09:00 AM - 11:00 AM",
      status: "confirmed",
    },
    {
      id: 5,
      patient: "Robert Wilson",
      service: "Elderly Care",
      date: "2023-06-18",
      time: "01:00 PM - 02:00 PM",
      status: "pending",
    },
  ])

  // State for availability settings
  const [availability, setAvailability] = useState({
    monday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
    tuesday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
    wednesday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
    thursday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    friday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
    saturday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    sunday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  })

  // Handle availability change
  const handleAvailabilityChange = (day, field, value) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        [field]: value,
      },
    })
  }

  // Handle appointment status change
  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  // Current month and year for the calendar
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  return (
    <div className="nurse-calendar-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Schedule Management</h1>

        <Row>
          {/* Left Column - Calendar */}
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">
                    {currentMonth} {currentYear}
                  </h5>
                  <div>
                    <Button variant="outline-secondary" size="sm" className="me-2">
                      <i className="bi bi-chevron-left"></i>
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <i className="bi bi-chevron-right"></i>
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid - In a real app, this would be a full interactive calendar */}
                <div className="calendar-grid">
                  <Table bordered className="text-center">
                    <thead>
                      <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* This is a simplified calendar view */}
                      {[...Array(5)].map((_, weekIndex) => (
                        <tr key={weekIndex}>
                          {[...Array(7)].map((_, dayIndex) => {
                            const day = weekIndex * 7 + dayIndex - 3 // Adjust to start from the correct day
                            const isToday = day === currentDate.getDate()
                            const hasAppointment = appointments.some((app) => new Date(app.date).getDate() === day)

                            return (
                              <td
                                key={dayIndex}
                                className={`position-relative ${isToday ? "bg-primary bg-opacity-10" : ""}`}
                                style={{ height: "80px" }}
                              >
                                {day > 0 && day <= 31 && (
                                  <>
                                    <div className="position-absolute top-0 start-0 p-2">{day}</div>
                                    {hasAppointment && (
                                      <div className="position-absolute bottom-0 start-50 translate-middle-x p-1">
                                        <Badge bg="primary" pill>
                                          <i className="bi bi-calendar-check"></i>
                                        </Badge>
                                      </div>
                                    )}
                                  </>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Appointments List */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Upcoming Appointments</h5>
                  <Form.Select className="w-auto">
                    <option>All Appointments</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </Form.Select>
                </div>

                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Patient</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.patient}</td>
                          <td>{appointment.service}</td>
                          <td>
                            {appointment.date} <br />
                            <small className="text-muted">{appointment.time}</small>
                          </td>
                          <td>
                            <Badge
                              bg={
                                appointment.status === "confirmed"
                                  ? "success"
                                  : appointment.status === "pending"
                                    ? "warning"
                                    : "danger"
                              }
                              pill
                            >
                              {appointment.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              {appointment.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => handleStatusChange(appointment.id, "confirmed")}
                                  >
                                    <i className="bi bi-check-lg"></i>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                  >
                                    <i className="bi bi-x-lg"></i>
                                  </Button>
                                </>
                              )}
                              {appointment.status === "confirmed" && (
                                <Button variant="outline-primary" size="sm" as={Link} to="/care-reports">
                                  <i className="bi bi-file-earmark-text"></i>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Availability Settings */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm sticky-top" style={{ top: "80px" }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Weekly Availability</h5>

                <Form>
                  {Object.entries(availability).map(([day, settings]) => (
                    <div key={day} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label={`${day.charAt(0).toUpperCase() + day.slice(1)} Availability`}
                        checked={settings.isAvailable}
                        onChange={(e) => handleAvailabilityChange(day, "isAvailable", e.target.checked)}
                      />
                      {settings.isAvailable && (
                        <div className="mt-2">
                          <Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={settings.startTime}
                              onChange={(e) => handleAvailabilityChange(day, "startTime", e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={settings.endTime}
                              onChange={(e) => handleAvailabilityChange(day, "endTime", e.target.value)}
                            />
                          </Form.Group>
                        </div>
                      )}
                    </div>
                  ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NurseCalendar
