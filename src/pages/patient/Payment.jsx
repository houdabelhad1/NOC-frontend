import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Tab, Nav } from 'react-bootstrap';

const Payment = () => {
  const [activeTab, setActiveTab] = useState('payment');
  
  // Mock data for payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'credit', last4: '4242', expiry: '04/25', default: true },
    { id: 2, type: 'credit', last4: '5555', expiry: '07/24', default: false }
  ]);
  
  // Mock data for invoices
  const invoices = [
    { id: 'INV-2023-001', date: '2023-06-10', amount: 135.00, status: 'paid', service: 'Post-Surgery Care', nurse: 'Dr. Emma Wilson' },
    { id: 'INV-2023-002', date: '2023-06-05', amount: 90.00, status: 'paid', service: 'Wound Care', nurse: 'Dr. James Miller' },
    { id: 'INV-2023-003', date: '2023-05-20', amount: 180.00, status: 'paid', service: 'General Care', nurse: 'Dr. Sophia Garcia' },
    { id: 'INV-2023-004', date: '2023-05-15', amount: 45.00, status: 'paid', service: 'Medication Management', nurse: 'Dr. Michael Johnson' }
  ];
  
  // Mock data for upcoming payments
  const upcomingPayments = [
    { id: 'INV-2023-005', dueDate: '2023-06-20', amount: 90.00, status: 'pending', service: 'Post-Surgery Care', nurse: 'Dr. Emma Wilson' }
  ];
  
  // State for new payment method form
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    setDefault: false
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPaymentMethod({
      ...newPaymentMethod,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the payment method
    console.log('Adding payment method:', newPaymentMethod);
    
    // Reset form
    setNewPaymentMethod({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      setDefault: false
    });
    
    // Switch back to payment methods tab
    setActiveTab('payment');
  };
  
  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        default: method.id === id
      }))
    );
  };
  
  const handleRemovePaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.filter(method => method.id !== id)
    );
  };

  return (
    <div className="payment-page py-5" style={{ marginTop: '56px' }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Payments</h1>
        
        <Row>
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav variant="tabs" className="nav-fill">
                    <Nav.Item>
                      <Nav.Link eventKey="payment">Payment Methods</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="history">Payment History</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  <Tab.Content>
                    <Tab.Pane eventKey="payment" className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Your Payment Methods</h5>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => setActiveTab('add-payment')}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add New
                        </Button>
                      </div>
                      
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((method) => (
                          <Card key={method.id} className="border-0 shadow-sm mb-3">
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <div className="me-3">
                                    <i className={`bi bi-credit-card${method.type === 'credit' ? '' : '-2-front'} fs-3 text-primary`}></i>
                                  </div>
                                  <div>
                                    <h6 className="mb-0 fw-bold">
                                      {method.type === 'credit' ? 'Credit Card' : 'Debit Card'} 
                                      <span className="ms-2 text-muted">•••• {method.last4}</span>
                                    </h6>
                                    <small className="text-muted">Expires: {method.expiry}</small>
                                    {method.default && (
                                      <Badge bg="success" className="ms-2">Default</Badge>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  {!method.default && (
                                    <Button 
                                      variant="link" 
                                      className="text-decoration-none p-0 me-3"
                                      onClick={() => handleSetDefault(method.id)}
                                    >
                                      Set Default
                                    </Button>
                                  )}
                                  <Button 
                                    variant="link" 
                                    className="text-danger text-decoration-none p-0"
                                    onClick={() => handleRemovePaymentMethod(method.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No payment methods added yet</p>
                        </div>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="history" className="p-3">
                      <h5 className="fw-bold mb-3">Payment History</h5>
                      
                      {invoices.length > 0 ? (
                        <div className="table-responsive">
                          <Table hover className="align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th>Invoice</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                  <td>
                                    <span className="fw-semibold">{invoice.id}</span>
                                    <br />
                                    <small className="text-muted">{invoice.service}</small>
                                  </td>
                                  <td>{invoice.date}</td>
                                  <td className="fw-semibold">${invoice.amount.toFixed(2)}</td>
                                  <td>
                                    <Badge bg={invoice.status === 'paid' ? 'success' : 'warning'} pill>
                                      {invoice.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <Button variant="outline-primary" size="sm">
                                      <i className="bi bi-download"></i>
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No payment history available</p>
                        </div>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="upcoming" className="p-3">
                      <h5 className="fw-bold mb-3">Upcoming Payments</h5>
                      
                      {upcomingPayments.length > 0 ? (
                        <div className="table-responsive">
                          <Table hover className="align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th>Invoice</th>
                                <th>Due Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {upcomingPayments.map((invoice) => (
                                <tr key={invoice.id}>
                                  <td>
                                    <span className="fw-semibold">{invoice.id}</span>
                                    <br />
                                    <small className="text-muted">{invoice.service}</small>
                                  </td>
                                  <td>{invoice.dueDate}</td>
                                  <td className="fw-semibold">${invoice.amount.toFixed(2)}</td>
                                  <td>
                                    <Badge bg={invoice.status === 'paid' ? 'success' : 'warning'} pill>
                                      {invoice.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <Button variant="primary" size="sm">
                                      Pay Now
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No upcoming payments</p>
                        </div>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="add-payment" className="p-3">
                      <div className="d-flex align-items-center mb-4">
                        <Button 
                          variant="link" 
                          className="text-decoration-none p-0 me-2"
                          onClick={() => setActiveTab('payment')}
                        >
                          <i className="bi bi-arrow-left"></i>
                        </Button>
                        <h5 className="fw-bold mb-0">Add Payment Method</h5>
                      </div>
                      
                      <Form onSubmit={handleAddPaymentMethod}>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={newPaymentMethod.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Cardholder Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardHolder"
                            value={newPaymentMethod.cardHolder}
                            onChange={handleInputChange}
                            placeholder="John Smith"
                            required
                          />
                        </Form.Group>
                        
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Expiry Date</Form.Label>
                              <Form.Control
                                type="text"
                                name="expiryDate"
                                value={newPaymentMethod.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>CVV</Form.Label>
                              <Form.Control
                                type="text"
                                name="cvv"
                                value={newPaymentMethod.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-4">
                          <Form.Check
                            type="checkbox"
                            label="Set as default payment method"
                            name="setDefault"
                            checked={newPaymentMethod.setDefault}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Add Payment Method
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Billing Summary</h5>
                
                <Row className="g-4 mb-4">
                  <Col md={4}>
                    <Card className="border-0 bg-light h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-credit-card text-primary me-2 fs-4"></i>
                          <h6 className="fw-bold mb-0">Total Paid</h6>
                        </div>
                        <h3 className="fw-bold mb-0">$450.00</h3>
                        <small className="text-muted">Last 30 days</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4}>
                    <Card className="border-0 bg-light h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-hourglass-split text-warning me-2 fs-4"></i>
                          <h6 className="fw-bold mb-0">Pending</h6>
                        </div>
                        <h3 className="fw-bold mb-0">$90.00</h3>
                        <small className="text-muted">Due in 5 days</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4}>
                    <Card className="border-0 bg-light h-100">
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-receipt text-success me-2 fs-4"></i>
                          <h6 className="fw-bold mb-0">Invoices</h6>
                        </div>
                        <h3 className="fw-bold mb-0">5</h3>
                        <small className="text-muted">Total invoices</small>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <div className="bg-light p-4 rounded-3 mb-4">
                  <h6 className="fw-bold mb-3">Payment Information</h6>
                  <p className="text-muted mb-0">
                    All payments are processed securely through our payment gateway. Your card information is encrypted and never stored on our servers.
                    For any billing inquiries, please contact our support team at <a href="mailto:support@medicare.com" className="text-decoration-none">support@medicare.com</a>.
                  </p>
                </div>
                
                <h5 className="fw-bold mb-3">Recent Transactions</h5>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.slice(0, 3).map((invoice) => (
                        <tr key={invoice.id}>
                          <td>{invoice.date}</td>
                          <td>
                            <span className="fw-semibold">{invoice.service}</span>
                            <br />
                            <small className="text-muted">with {invoice.nurse}</small>
                          </td>
                          <td className="fw-semibold">${invoice.amount.toFixed(2)}</td>
                          <td>
                            <Badge bg={invoice.status === 'paid' ? 'success' : 'warning'} pill>
                              {invoice.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
