import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Tab, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CareReports = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('reports');
  
  // State for new report modal
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  
  // State for new report form
  const [newReport, setNewReport] = useState({
    patient: '',
    service: '',
    date: '',
    vitals: {
      bloodPressure: '',
      pulse: '',
      temperature: '',
      respiratoryRate: '',
      oxygenSaturation: ''
    },
    medications: [],
    observations: '',
    recommendations: ''
  });
  
  // Mock data for patients
  const patients = [
    { id: 1, name: 'John Smith', service: 'Post-Surgery Care' },
    { id: 2, name: 'Sarah Johnson', service: 'Wound Care' },
    { id: 3, name: 'Michael Brown', service: 'Medication Management' },
    { id: 4, name: 'Emily Davis', service: 'General Care' }
  ];
  
  // Mock data for reports
  const [reports, setReports] = useState([
    {
      id: 1,
      patient: 'John Smith',
      service: 'Post-Surgery Care',
      date: '2023-06-12',
      status: 'completed'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      service: 'Wound Care',
      date: '2023-06-10',
      status: 'completed'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      service: 'Medication Management',
      date: '2023-06-05',
      status: 'completed'
    }
  ]);
  
  // Mock data for report templates
  const reportTemplates = [
    { id: 1, name: 'Post-Surgery Care', description: 'Template for post-surgery care reports' },
    { id: 2, name: 'Wound Care', description: 'Template for wound care reports' },
    { id: 3, name: 'Medication Management', description: 'Template for medication management reports' },
    { id: 4, name: 'General Care', description: 'Template for general care reports' }
  ];
  
  // Handle input change for new report form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('vitals.')) {
      const vitalName = name.split('.')[1];
      setNewReport({
        ...newReport,
        vitals: {
          ...newReport.vitals,
          [vitalName]: value
        }
      });
    } else {
      setNewReport({
        ...newReport,
        [name]: value
      });
    }
  };
  
  // Handle patient selection
  const handlePatientSelect = (e) => {
    const patientId = parseInt(e.target.value);
    const selectedPatient = patients.find(p => p.id === patientId);
    
    if (selectedPatient) {
      setNewReport({
        ...newReport,
        patient: selectedPatient.name,
        service: selectedPatient.service
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would call an API to save the report
    const newReportObj = {
      id: reports.length + 1,
      patient: newReport.patient,
      service: newReport.service,
      date: newReport.date,
      status: 'completed'
    };
    
    setReports([...reports, newReportObj]);
    
    // Reset form and close modal
    setNewReport({
      patient: '',
      service: '',
      date: '',
      vitals: {
        bloodPressure: '',
        pulse: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: ''
      },
      medications: [],
      observations: '',
      recommendations: ''
    });
    
    setShowNewReportModal(false);
  };
  
  // State for selected report
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Handle report selection
  const handleReportSelect = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
  };

  return (
    <div className="care-reports-page py-5" style={{ marginTop: '56px' }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Care Reports</h1>
        
        <Row>
          {/* Left Column - Reports List */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav variant="tabs" className="nav-fill">
                    <Nav.Item>
                      <Nav.Link eventKey="reports">Reports</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="templates">Templates</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  <Tab.Content>
                    <Tab.Pane eventKey="reports" className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Your Reports</h5>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => setShowNewReportModal(true)}
                        >
                          <i className="bi bi-plus-lg me-1"></i> New Report
                        </Button>
                      </div>
                      
                      {reports.length > 0 ? (
                        reports.map((report) => (
                          <Card 
                            key={report.id} 
                            className={`border-0 shadow-sm mb-3 cursor-pointer ${selectedReport?.id === report.id ? 'border-primary' : ''}`}
                            onClick={() => handleReportSelect(report.id)}
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="fw-bold mb-0">{report.patient}</h6>
                                <Badge bg={report.status === 'completed' ? 'success' : 'warning'} pill>
                                  {report.status}
                                </Badge>
                              </div>
                              <p className="text-muted mb-2">{report.service}</p>
                              <small className="text-muted">Date: {report.date}</small>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted mb-0">No reports available</p>
                        </div>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="templates" className="p-3">
                      <h5 className="fw-bold mb-3">Report Templates</h5>
                      
                      {reportTemplates.map((template) => (
                        <Card key={template.id} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <h6 className="fw-bold mb-1">{template.name}</h6>
                            <p className="text-muted mb-2">{template.description}</p>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => {
                                setNewReport({
                                  ...newReport,
                                  service: template.name
                                });
                                setShowNewReportModal(true);
                              }}
                            >
                              Use Template
                            </Button>
                          </Card.Body>
                        </Card>
                      ))}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column - Report Details */}
          <Col lg={8}>
            {selectedReport ? (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">
                      Report for {selectedReport.patient}
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
                  
                  <div className="mb-4">
                    <Row className="mb-3">
                      <Col md={4}>
                        <p className="text-muted mb-1">Patient</p>
                        <p className="fw-semibold mb-0">{selectedReport.patient}</p>
                      </Col>
                      <Col md={4}>
                        <p className="text-muted mb-1">Service</p>
                        <p className="fw-semibold mb-0">{selectedReport.service}</p>
                      </Col>
                      <Col md={4}>
                        <p className="text-muted mb-1">Date</p>
                        <p className="fw-semibold mb-0">{selectedReport.date}</p>
                      </Col>
                    </Row>
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
                        <Nav.Link eventKey="observations">Observations</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content>
                      <Tab.Pane eventKey="vitals">
                        <Table bordered className="mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th>Vital Sign</th>
                              <th>Value</th>
                              <th>Normal Range</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Blood Pressure</td>
                              <td>120/80 mmHg</td>
                              <td>90/60 - 120/80 mmHg</td>
                              <td><Badge bg="success">Normal</Badge></td>
                            </tr>
                            <tr>
                              <td>Pulse</td>
                              <td>72 bpm</td>
                              <td>60 - 100 bpm</td>
                              <td><Badge bg="success">Normal</Badge></td>
                            </tr>
                            <tr>
                              <td>Temperature</td>
                              <td>98.6°F</td>
                              <td>97.8 - 99.1°F</td>
                              <td><Badge bg="success">Normal</Badge></td>
                            </tr>
                            <tr>
                              <td>Respiratory Rate</td>
                              <td>16 breaths/min</td>
                              <td>12 - 20 breaths/min</td>
                              <td><Badge bg="success">Normal</Badge></td>
                            </tr>
                            <tr>
                              <td>Oxygen Saturation</td>
                              <td>98%</td>
                              <td>95 - 100%</td>
                              <td><Badge bg="success">Normal</Badge></td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="medications">
                        <Table bordered className="mb-0">
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
                            <tr>
                              <td>Amoxicillin</td>
                              <td>500mg</td>
                              <td>3x daily</td>
                              <td>2023-06-10</td>
                              <td>2023-06-20</td>
                            </tr>
                            <tr>
                              <td>Ibuprofen</td>
                              <td>400mg</td>
                              <td>As needed</td>
                              <td>2023-06-10</td>
                              <td>2023-06-30</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="observations">
                        <Card className="border-0 bg-light mb-4">
                          <Card.Body className="p-3">
                            <h6 className="fw-bold mb-2">Observations</h6>
                            <p className="mb-0">
                              Patient is recovering well from surgery. Wound site looks clean with no signs of infection. 
                              Patient reports less pain and improved mobility compared to previous visit. 
                              Patient is following medication schedule as prescribed.
                            </p>
                          </Card.Body>
                        </Card>
                        
                        <Card className="border-0 bg-light">
                          <Card.Body className="p-3">
                            <h6 className="fw-bold mb-2">Recommendations</h6>
                            <p className="mb-0">
                              Continue with current medication regimen. Encourage light physical activity as tolerated. 
                              Maintain wound care protocol with dressing changes every 48 hours. 
                              Schedule follow-up appointment in one week to assess progress.
                            </p>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <Card.Body className="text-center p-5">
                  <div className="mb-4">
                    <i className="bi bi-file-earmark-text text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h4 className="fw-bold mb-3">Select a Report</h4>
                  <p className="text-muted mb-4">
                    Select a report from the left panel to view detailed information or create a new report.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setShowNewReportModal(true)}
                  >
                    <i className="bi bi-plus-lg me-2"></i> Create New Report
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      
      {/* New Report Modal */}
      <Modal
        show={showNewReportModal}
        onHide={() => setShowNewReportModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Care Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h6 className="fw-bold mb-3">Patient Information</h6>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Patient</Form.Label>
                  <Form.Select 
                    onChange={handlePatientSelect}
                    required
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.service}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newReport.date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <h6 className="fw-bold mb-3">Vital Signs</h6>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Pressure (mmHg)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vitals.bloodPressure"
                    value={newReport.vitals.bloodPressure}
                    onChange={handleInputChange}
                    placeholder="e.g., 120/80"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pulse (bpm)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vitals.pulse"
                    value={newReport.vitals.pulse}
                    onChange={handleInputChange}
                    placeholder="e.g., 72"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Temperature (°F)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vitals.temperature"
                    value={newReport.vitals.temperature}
                    onChange={handleInputChange}
                    placeholder="e.g., 98.6"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Respiratory Rate</Form.Label>
                  <Form.Control
                    type="text"
                    name="vitals.respiratoryRate"
                    value={newReport.vitals.respiratoryRate}
                    onChange={handleInputChange}
                    placeholder="e.g., 16"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Oxygen Saturation (%)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vitals.oxygenSaturation"
                    value={newReport.vitals.oxygenSaturation}
                    onChange={handleInputChange}
                    placeholder="e.g., 98"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <h6 className="fw-bold mb-3">Observations & Recommendations</h6>
            <Form.Group className="mb-3">
              <Form.Label>Observations</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observations"
                value={newReport.observations}
                onChange={handleInputChange}
                placeholder="Enter your observations about the patient's condition"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Recommendations</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="recommendations"
                value={newReport.recommendations}
                onChange={handleInputChange}
                placeholder="Enter your recommendations for the patient's care"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewReportModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CareReports;
