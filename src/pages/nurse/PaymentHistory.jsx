"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Table, Badge, Form, Dropdown, ProgressBar } from "react-bootstrap"

const PaymentHistory = () => {
  // State for date range filter
  const [dateRange, setDateRange] = useState("all")

  // Mock data for payments
  const [payments, setPayments] = useState([
    {
      id: "PMT-2023-001",
      date: "2023-06-10",
      amount: 135.0,
      status: "completed",
      patient: "John Smith",
      service: "Post-Surgery Care",
      invoice: "INV-2023-001",
    },
    {
      id: "PMT-2023-002",
      date: "2023-06-05",
      amount: 90.0,
      status: "completed",
      patient: "Sarah Johnson",
      service: "Wound Care",
      invoice: "INV-2023-002",
    },
    {
      id: "PMT-2023-003",
      date: "2023-05-20",
      amount: 180.0,
      status: "completed",
      patient: "Michael Brown",
      service: "General Care",
      invoice: "INV-2023-003",
    },
    {
      id: "PMT-2023-004",
      date: "2023-05-15",
      amount: 45.0,
      status: "completed",
      patient: "Emily Davis",
      service: "Medication Management",
      invoice: "INV-2023-004",
    },
    {
      id: "PMT-2023-005",
      date: "2023-06-20",
      amount: 90.0,
      status: "pending",
      patient: "John Smith",
      service: "Post-Surgery Care",
      invoice: "INV-2023-005",
    },
  ])

  // Filter payments based on date range
  const filteredPayments = payments.filter((payment) => {
    if (dateRange === "all") return true
    if (dateRange === "thisMonth") {
      const paymentDate = new Date(payment.date)
      const today = new Date()
      return paymentDate.getMonth() === today.getMonth() && paymentDate.getFullYear() === today.getFullYear()
    }
    if (dateRange === "lastMonth") {
      const paymentDate = new Date(payment.date)
      const today = new Date()
      const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1
      const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()
      return paymentDate.getMonth() === lastMonth && paymentDate.getFullYear() === lastMonthYear
    }
    return true
  })

  // Calculate total earnings
  const totalEarnings = filteredPayments
    .filter((payment) => payment.status === "completed")
    .reduce((total, payment) => total + payment.amount, 0)

  // Calculate pending earnings
  const pendingEarnings = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((total, payment) => total + payment.amount, 0)

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // Filter payments based on search query
  const searchedPayments = filteredPayments.filter((payment) => {
    const query = searchQuery.toLowerCase()
    return (
      payment.patient.toLowerCase().includes(query) ||
      payment.service.toLowerCase().includes(query) ||
      payment.id.toLowerCase().includes(query) ||
      payment.invoice.toLowerCase().includes(query)
    )
  })

  return (
    <div className="payment-history-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Payment History</h1>

        <Row>
          {/* Earnings Summary Cards */}
          <Col lg={12} className="mb-4">
            <Row className="g-4">
              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <i className="bi bi-wallet2 text-primary fs-4"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Total Earnings</h6>
                        <small className="text-muted">
                          {dateRange === "all" ? "All Time" : dateRange === "thisMonth" ? "This Month" : "Last Month"}
                        </small>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-0">${totalEarnings.toFixed(2)}</h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                        <i className="bi bi-hourglass-split text-warning fs-4"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Pending</h6>
                        <small className="text-muted">Awaiting payment</small>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-0">${pendingEarnings.toFixed(2)}</h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <i className="bi bi-graph-up-arrow text-success fs-4"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Monthly Average</h6>
                        <small className="text-muted">Based on last 3 months</small>
                      </div>
                    </div>
                    <h3 className="fw-bold mb-0">$150.00</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Monthly Earnings Chart */}
          <Col lg={12} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Monthly Earnings</h5>
                  <Form.Select className="w-auto" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value="all">All Time</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                  </Form.Select>
                </div>

                {/* Simple chart representation using progress bars */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>January</span>
                    <span className="fw-semibold">$120.00</span>
                  </div>
                  <ProgressBar now={40} variant="primary" style={{ height: "10px" }} className="mb-3" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>February</span>
                    <span className="fw-semibold">$180.00</span>
                  </div>
                  <ProgressBar now={60} variant="primary" style={{ height: "10px" }} className="mb-3" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>March</span>
                    <span className="fw-semibold">$150.00</span>
                  </div>
                  <ProgressBar now={50} variant="primary" style={{ height: "10px" }} className="mb-3" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>April</span>
                    <span className="fw-semibold">$225.00</span>
                  </div>
                  <ProgressBar now={75} variant="primary" style={{ height: "10px" }} className="mb-3" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>May</span>
                    <span className="fw-semibold">$270.00</span>
                  </div>
                  <ProgressBar now={90} variant="primary" style={{ height: "10px" }} className="mb-3" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>June</span>
                    <span className="fw-semibold">$225.00</span>
                  </div>
                  <ProgressBar now={75} variant="primary" style={{ height: "10px" }} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Payment History Table */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Payment Transactions</h5>
                  <div className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search payments..."
                      className="me-2"
                      style={{ width: "250px" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-export">
                        Export
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Export as CSV</Dropdown.Item>
                        <Dropdown.Item href="#">Export as PDF</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedPayments.length > 0 ? (
                        searchedPayments.map((payment) => (
                          <tr key={payment.id}>
                            <td>
                              <span className="fw-semibold">{payment.id}</span>
                              <br />
                              <small className="text-muted">Invoice: {payment.invoice}</small>
                            </td>
                            <td>{payment.date}</td>
                            <td>{payment.patient}</td>
                            <td>{payment.service}</td>
                            <td className="fw-semibold">${payment.amount.toFixed(2)}</td>
                            <td>
                              <Badge bg={payment.status === "completed" ? "success" : "warning"} pill>
                                {payment.status}
                              </Badge>
                            </td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-2">
                                <i className="bi bi-eye"></i>
                              </Button>
                              <Button variant="outline-secondary" size="sm">
                                <i className="bi bi-download"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <p className="text-muted mb-0">No payment transactions found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <small className="text-muted">
                      Showing {searchedPayments.length} of {filteredPayments.length} transactions
                    </small>
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Payment Settings */}
        <Row className="mt-4">
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Payment Settings</h5>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Payment Method</Form.Label>
                      <div className="d-flex align-items-center p-3 border rounded">
                        <div className="me-3">
                          <i className="bi bi-bank fs-4 text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">Direct Deposit</h6>
                          <p className="mb-0 text-muted">Payments are sent directly to your bank account</p>
                        </div>
                        <Button variant="outline-primary" size="sm" className="ms-auto">
                          Update
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Payment Schedule</Form.Label>
                      <Form.Select>
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option selected>Monthly</option>
                      </Form.Select>
                      <Form.Text className="text-muted">Payments are processed according to this schedule</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Tax Information</Form.Label>
                      <div className="d-flex align-items-center p-3 border rounded">
                        <div className="me-3">
                          <i className="bi bi-file-earmark-text fs-4 text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">Tax Documents</h6>
                          <p className="mb-0 text-muted">Access your tax forms and documents</p>
                        </div>
                        <Button variant="outline-primary" size="sm" className="ms-auto">
                          View
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Automatic Invoicing</Form.Label>
                      <Form.Check
                        type="switch"
                        id="auto-invoice-switch"
                        label="Generate invoices automatically after appointments"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        When enabled, invoices will be created automatically after each appointment
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button variant="primary">Save Settings</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PaymentHistory

