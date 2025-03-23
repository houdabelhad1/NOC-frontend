"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Badge, Table, Form, ProgressBar } from "react-bootstrap"
import { Link } from "react-router-dom"

// Mock data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    patient: "John Smith",
    service: "General Check-up",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    service: "Wound Care",
    date: "2023-06-15",
    time: "02:00 PM",
    status: "confirmed",
  },
  {
    id: 3,
    patient: "Michael Brown",
    service: "Medication Management",
    date: "2023-06-16",
    time: "11:00 AM",
    status: "pending",
  },
]

// Mock data for earnings
const earningsData = {
  currentMonth: 2450,
  lastMonth: 2100,
  pending: 350,
}

const NurseDashboard = () => {
  const [profileData, setProfileData] = useState({
    name: "Dr. Emma Wilson",
    specialty: "General Care",
    bio: "Experienced registered nurse with over 8 years of practice in various healthcare settings. Specialized in general care and elderly care.",
    hourlyRate: 45,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false,
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setProfileData({
        ...profileData,
        availability: {
          ...profileData.availability,
          [name]: checked,
        },
      })
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      })
    }
  }

  const saveProfile = () => {
    // In a real app, this would save to an API
    setIsEditing(false)
  }

  return (
    <div className="nurse-dashboard-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Nurse Dashboard</h1>

        <Row>
          {/* Left Column - Profile & Stats */}
          <Col lg={4} className="mb-4">
            {/* Profile Card */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img
                    src="/placeholder.svg?height=150&width=150"
                    alt="Profile"
                    className="rounded-circle mb-3"
                    width="100"
                    height="100"
                  />

                  {!isEditing ? (
                    <>
                      <h4 className="fw-bold mb-1">{profileData.name}</h4>
                      <p className="text-primary mb-2">{profileData.specialty}</p>
                      <p className="text-muted mb-3">{profileData.bio}</p>

                      <div className="d-flex justify-content-center mb-3">
                        <Badge bg="light" text="dark" className="me-2 py-2 px-3">
                          <i className="bi bi-star-fill text-warning me-1"></i> 4.9
                        </Badge>
                        <Badge bg="light" text="dark" className="py-2 px-3">
                          <i className="bi bi-currency-dollar text-success me-1"></i> ${profileData.hourlyRate}/hr
                        </Badge>
                      </div>

                      <Button variant="outline-primary" size="sm" onClick={() => setIsEditing(true)}>
                        <i className="bi bi-pencil me-1"></i> Edit Profile
                      </Button>
                    </>
                  ) : (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Name</Form.Label>
                        <Form.Control type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Specialty</Form.Label>
                        <Form.Control
                          type="text"
                          name="specialty"
                          value={profileData.specialty}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Hourly Rate ($)</Form.Label>
                        <Form.Control
                          type="number"
                          name="hourlyRate"
                          value={profileData.hourlyRate}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={saveProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>

                {!isEditing && (
                  <>
                    <h6 className="fw-bold mb-3">Availability</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {Object.entries(profileData.availability).map(([day, isAvailable]) => (
                        <Badge
                          key={day}
                          bg={isAvailable ? "primary" : "light"}
                          text={isAvailable ? "white" : "dark"}
                          className="py-2 px-3"
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="d-grid">
                      <Button variant="outline-primary" as={Link} to="/nurse-calendar">
                        <i className="bi bi-calendar-week me-1"></i> Manage Schedule
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>

            {/* Earnings Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Earnings Overview</h5>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Current Month</span>
                    <span className="fw-bold">${earningsData.currentMonth}</span>
                  </div>
                  <ProgressBar now={80} variant="success" className="mb-3" style={{ height: "8px" }} />

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Last Month</span>
                    <span className="fw-bold">${earningsData.lastMonth}</span>
                  </div>
                  <ProgressBar now={70} variant="info" className="mb-3" style={{ height: "8px" }} />

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Pending</span>
                    <span className="fw-bold">${earningsData.pending}</span>
                  </div>
                  <ProgressBar now={20} variant="warning" style={{ height: "8px" }} />
                </div>

                <div className="d-grid">
                  <Button variant="outline-primary" as={Link} to="/payment-history">
                    <i className="bi bi-wallet2 me-1"></i> View Payment History
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Appointments & Quick Actions */}
          <Col lg={8}>
            {/* Quick Stats */}
            <Row className="g-4 mb-4">
              {[
                { title: "Today's Appointments", value: "2", icon: "bi-calendar-check", color: "primary" },
                { title: "Pending Requests", value: "3", icon: "bi-hourglass-split", color: "warning" },
                { title: "Completed This Week", value: "8", icon: "bi-check-circle", color: "success" },
                { title: "Total Patients", value: "24", icon: "bi-people", color: "info" },
              ].map((stat, index) => (
                <Col md={6} xl={3} key={index}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-3">
                      <div className={`text-${stat.color} mb-2`}>
                        <i className={`bi ${stat.icon} fs-3`}></i>
                      </div>
                      <h3 className="fw-bold mb-0">{stat.value}</h3>
                      <p className="text-muted mb-0">{stat.title}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Upcoming Appointments</h5>
                  <Button variant="outline-primary" size="sm" as={Link} to="/nurse-calendar">
                    View All
                  </Button>
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
                      {upcomingAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.patient}</td>
                          <td>{appointment.service}</td>
                          <td>
                            {appointment.date} <br />
                            <small className="text-muted">{appointment.time}</small>
                          </td>
                          <td>
                            <Badge bg={appointment.status === "confirmed" ? "success" : "warning"} pill>
                              {appointment.status}
                            </Badge>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <i className="bi bi-eye"></i>
                            </Button>
                            {appointment.status === "confirmed" && (
                              <Button variant="outline-success" size="sm" as={Link} to="/care-reports">
                                <i className="bi bi-file-earmark-text"></i>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Quick Actions</h5>

                <Row className="g-3">
                  {[
                    { title: "Update Schedule", icon: "bi-calendar-week", link: "/nurse-calendar", color: "primary" },
                    { title: "Check Notifications", icon: "bi-bell", link: "/nurse-notifications", color: "warning" },
                    {
                      title: "Write Care Report",
                      icon: "bi-file-earmark-text",
                      link: "/care-reports",
                      color: "success",
                    },
                    { title: "View Payments", icon: "bi-credit-card", link: "/payment-history", color: "info" },
                  ].map((action, index) => (
                    <Col sm={6} key={index}>
                      <Card
                        as={Link}
                        to={action.link}
                        className="border-0 shadow-sm h-100 text-decoration-none hover-card"
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex align-items-center">
                            <div
                              className={`d-flex align-items-center justify-content-center rounded-circle bg-${action.color} bg-opacity-10 me-3`}
                              style={{ width: "48px", height: "48px" }}
                            >
                              <i className={`bi ${action.icon} fs-4 text-${action.color}`}></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-semibold">{action.title}</h6>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NurseDashboard

