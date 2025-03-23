import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CareTracking = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  
  // Mock data for care sessions
  const careSessions = {
    ongoing: [
      {
        id: 1,
        nurse: "Dr. Emma Wilson",
        service: "Post-Surgery Care",
        startDate: "2023-06-10",
        endDate: "2023-06-30",
        nextAppointment: "2023-06-15",
        progress: 40,
        status: "in-progress"
      },
      {
        id: 2,
        nurse: "Dr. James Miller",
        service: "Wound Care",
        startDate: "2023-06-05",
        endDate: "2023-06-20",
        nextAppointment: "2023-06-16",
        progress: 60,
        status: "in-progress"
      }
    ],
    completed: [
      {
        id: 3,
        nurse: "Dr. Sophia Garcia",
        service: "General Care",
        startDate: "2023-05-01",
        endDate: "2023-05-15",
        progress: 100,
        status: "completed"
      },
      {
        id: 4,
        nurse: "Dr. Michael Johnson",
        service: "Medication Management",
        startDate: "2023-04-10",
        endDate: "2023-04-25",
        progress: 100,
        status: "completed"
      }
    ]
  };
  
  // Mock data for care details
  const careDetails = {
    1: {
      vitals: [
        { date: "2023-06-10", bp: "120/80", pulse: 72, temp: "98.6°F", notes: "Patient recovering well" },
        { date: "2023-06-12", bp: "118/78", pulse: 70, temp: "98.4°F", notes: "Continued improvement" }
      ],
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily", startDate: "2023-06-10", endDate: "2023-06-20" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", startDate: "2023-06-10", endDate: "2023-06-30" }
      ],
      notes: [
        { date: "2023-06-10", author: "Dr. Emma Wilson", content: "Initial assessment completed. Patient is recovering well from surgery. Wound site looks clean with no signs of infection." },
        { date: "2023-06-12", author: "Dr. Emma Wilson", content: "Follow-up visit. Changed dressing and cleaned wound. Patient reports less pain and improved mobility." }
      ]
    }
  };
  
  const [selectedCare, setSelectedCare] = useState(null);
  
  const handleCareSelect = (careId) => {
    setSelectedCare(careId);
  };

  return (
    <div className="care-tracking-page py-5" style={{ marginTop: '56px' }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Care Tracking</h1>
        
        <Row>
          {/* Left Column - Care Sessions */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-0">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav variant="tabs" className="nav-fill">
                    <Nav.Item>
                      <Nav.Link eventKey="ongoing">Ongoing Care</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="completed">Completed</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  <Tab.Content>
                    <Tab.Pane eventKey="ongoing" className="p-3">
                      {careSessions.ongoing.length > 0 ? (
                        careSessions.ongoing.map((care) => (
                          <Card 
                            key={care.id} 
                            className={`border-0 shadow-sm mb-3 cursor-pointer ${selectedCare === care.id ? 'border-primary' : ''}`}
                            onClick={() => handleCareSelect(care.id)}
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="fw-bold mb-0">{care.service}</h6>
                                <Badge bg={care.status === 'in-progress' ? 'primary' : 'success'} pill>
                                  {care.status === 'in-progress' ? 'In Progress' : 'Completed'}
                                </Badge>
                              </div>
                              <p className="text-muted mb-2">Nurse: {care.nurse}</p>
                              <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">Started: {care.startDate}</small>
                                <small className="text-muted">Ends: {care.endDate}</small>
                              </div>
                              <div className="mb-2">
                                <small className="d-block mb-1">Progress</small>
                                <ProgressBar now={care.progress} variant="primary" style={{ height: '8px' }} />
                              </div>
                              {care.nextAppointment && (
                                <div className="bg-light p-2 rounded">
                                  <small className="d-flex align-items-center">
                                    <i className="bi bi-calendar-event text-primary me-2"></i>
                                    Next appointment: {care.nextAppointment}
                                  </small>
                                </div>
                              )}
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No ongoing care sessions</p>
                        </div>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="completed" className="p-3">
                      {careSessions.completed.length > 0 ? (
                        careSessions.completed.map((care) => (
                          <Card 
                            key={care.id} 
                            className="border-0 shadow-sm mb-3 cursor-pointer"
                            onClick={() => handleCareSelect(care.id)}
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="fw-bold mb-0">{care.service}</h6>
                                <Badge bg="success" pill>Completed</Badge>
                              </div>
                              <p className="text-muted mb-2">Nurse: {care.nurse}</p>
                              <div className="d-flex justify-content-between mb-2">
                                <small className="text-muted">Started: {care.startDate}</small>
                                <small className="text-muted">Ended: {care.endDate}</small>
                              </div>
                              <div className="mb-0">
                                <small className="d-block mb-1">Progress</small>
                                <ProgressBar now={100} variant="success" style={{ height: '8px' }} />
                              </div>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No completed care sessions</p>
                        </div>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
            
            <div className="d-grid">
              <Button variant="primary" as={Link} to="/search">
                <i className="bi bi-plus-lg me-2"></i> Book New Care
              </Button>
            </div>
          </Col>
          
          {/* Right Column - Care Details */}
          <Col lg={8}>
            {selectedCare && careDetails[selectedCare] ? (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">
                      {careSessions.ongoing.find(c => c.id === selectedCare)?.service || 
                       careSessions.completed.find(c => c.id === selectedCare)?.service} Details
                    </h5>
                    <div>
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <i className="bi bi-printer"></i>
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <i className="bi bi-download"></i>
                      </Button>
                    </div>
                  </div>
                  
                  <Tab.Container defaultActiveKey="vitals">
                    <Nav variant="pills" className="mb-4">
                      <Nav.Item>
                        <Nav.Link eventKey="vitals">Vitals</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="medications">Medications</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="notes">Notes</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content>
                      <Tab.Pane eventKey="vitals">
                        <Table responsive bordered hover className="mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th>Date</th>
                              <th>Blood Pressure</th>
                              <th>Pulse</th>
                              <th>Temperature</th>
                              <th>Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {careDetails[selectedCare].vitals.map((vital, index) => (
                              <tr key={index}>
                                <td>{vital.date}</td>
                                <td>{vital.bp}</td>
                                <td>{vital.pulse} bpm</td>
                                <td>{vital.temp}</td>
                                <td>{vital.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="medications">
                        <Table responsive bordered hover className="mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th>Medication</th>
                              <th>Dosage</th>
                              <th>Frequency</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {careDetails[selectedCare].medications.map((med, index) => (
                              <tr key={index}>
                                <td>{med.name}</td>
                                <td>{med.dosage}</td>
                                <td>{med.frequency}</td>
                                <td>{med.startDate}</td>
                                <td>{med.endDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="notes">
                        {careDetails[selectedCare].notes.map((note, index) => (
                          <Card key={index} className="border-0 shadow-sm mb-3">
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between mb-2">
                                <h6 className="fw-bold mb-0">{note.author}</h6>
                                <small className="text-muted">{note.date}</small>
                              </div>
                              <p className="mb-0">{note.content}</p>
                            </Card.Body>
                          </Card>
                        ))}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <Card.Body className="text-center p-5">
                  <div className="mb-4">
                    <i className="bi bi-clipboard-pulse text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h4 className="fw-bold mb-3">Select a Care Session</h4>
                  <p className="text-muted mb-0">
                    Select a care session from the left panel to view detailed information about your healthcare progress.
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CareTracking;
