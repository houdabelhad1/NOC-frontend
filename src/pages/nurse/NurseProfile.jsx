import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tab, Nav, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const NurseProfile = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch nurse data based on id
  const nurse = {
    id: id || 1,
    name: "Dr. Emma Wilson",
    specialty: "General Care",
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    location: "New York, NY",
    experience: "8 years",
    price: "$45/hour",
    availability: ["Monday", "Wednesday", "Friday"],
    certifications: ["RN", "BSN"],
    bio: "Dr. Emma Wilson is a highly experienced registered nurse with over 8 years of practice in various healthcare settings. She specializes in general care and has extensive experience working with elderly patients. Dr. Wilson is known for her compassionate approach and dedication to providing personalized care.",
    education: [
      { degree: "Bachelor of Science in Nursing", institution: "Columbia University", year: "2015" },
      { degree: "Master of Science in Nursing", institution: "New York University", year: "2018" }
    ],
    services: [
      { name: "General Check-up", price: "$45/hour" },
      { name: "Medication Management", price: "$50/hour" },
      { name: "Wound Care", price: "$55/hour" },
      { name: "Post-Surgery Care", price: "$60/hour" }
    ]
  };
  
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="nurse-profile-page py-5" style={{ marginTop: '56px' }}>
      <Container>
        <div className="mb-4">
          <Link to="/search" className="text-decoration-none">
            <i className="bi bi-arrow-left me-2"></i> Back to Search Results
          </Link>
        </div>
        
        <Row>
          {/* Left Column - Profile Info */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img 
                    src={nurse.image || "/placeholder.svg"} 
                    alt={nurse.name} 
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h3 className="fw-bold mb-1">{nurse.name}</h3>
                  <p className="text-primary mb-2">{nurse.specialty}</p>
                  
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="me-2">
                      <i className="bi bi-star-fill text-warning"></i>
                      <span className="ms-1 fw-semibold">{nurse.rating}</span>
                    </div>
                    <span className="text-muted">({nurse.reviews} reviews)</span>
                  </div>
                  
                  <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
                    {nurse.certifications.map((cert, index) => (
                      <Badge key={index} bg="light" text="dark" className="py-2 px-3">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" as={Link} to={`/booking?nurse=${nurse.id}`}>
                      Book Appointment
                    </Button>
                    <Button variant="outline-primary">
                      <i className="bi bi-chat-dots me-2"></i> Contact
                    </Button>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Details</h5>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt text-primary me-2"></i>
                      <span className="fw-semibold">Location</span>
                    </div>
                    <p className="ms-4 mb-0">{nurse.location}</p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-briefcase text-primary me-2"></i>
                      <span className="fw-semibold">Experience</span>
                    </div>
                    <p className="ms-4 mb-0">{nurse.experience}</p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-currency-dollar text-primary me-2"></i>
                      <span className="fw-semibold">Starting Price</span>
                    </div>
                    <p className="ms-4 mb-0">{nurse.price}</p>
                  </div>
                  
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-check text-primary me-2"></i>
                      <span className="fw-semibold">Availability</span>
                    </div>
                    <p className="ms-4 mb-0">{nurse.availability.join(', ')}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column - Tabs */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                      <Nav.Link eventKey="about">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="services">Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  <Tab.Content>
                    <Tab.Pane eventKey="about">
                      <h5 className="fw-bold mb-3">Biography</h5>
                      <p className="text-muted mb-4">{nurse.bio}</p>
                      
                      <h5 className="fw-bold mb-3">Education</h5>
                      <div className="mb-4">
                        {nurse.education.map((edu, index) => (
                          <div key={index} className="mb-3">
                            <div className="d-flex align-items-center">
                              <div className="me-3 bg-primary bg-opacity-10 rounded-circle p-2">
                                <i className="bi bi-mortarboard text-primary"></i>
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold">{edu.degree}</h6>
                                <p className="mb-0 text-muted">{edu.institution} • {edu.year}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <h5 className="fw-bold mb-3">Certifications</h5>
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {nurse.certifications.map((cert, index) => (
                          <Badge key={index} bg="light" text="dark" className="py-2 px-3">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="services">
                      <h5 className="fw-bold mb-4">Services Offered</h5>
                      
                      <Table responsive className="border-0">
                        <thead className="bg-light">
                          <tr>
                            <th>Service</th>
                            <th className="text-end">Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {nurse.services.map((service, index) => (
                            <tr key={index}>
                              <td>{service.name}</td>
                              <td className="text-end fw-semibold">{service.price}</td>
                              <td className="text-end">
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  as={Link}
                                  to={`/booking?nurse=${nurse.id}&service=${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  Book
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      
                      <div className="bg-light p-4 rounded-3 mt-4">
                        <h6 className="fw-bold mb-3">Additional Information</h6>
                        <p className="text-muted mb-0">
                          Prices may vary based on specific patient needs and duration of care. 
                          A detailed quote will be provided after the initial consultation.
                        </p>
                      </div>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="reviews">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Patient Reviews</h5>
                        <div>
                          <span className="me-2">
                            <i className="bi bi-star-fill text-warning"></i>
                            <span className="ms-1 fw-semibold">{nurse.rating}</span>
                          </span>
                          <span className="text-muted">({nurse.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      {/* Sample reviews */}
                      {[
                        {
                          name: "John Smith",
                          date: "May 15, 2023",
                          rating: 5,
                          comment: "Dr. Wilson was extremely professional and caring. She explained everything clearly and made my mother feel comfortable during her recovery."
                        },
                        {
                          name: "Sarah Johnson",
                          date: "April 28, 2023",
                          rating: 5,
                          comment: "Excellent care provided. Very knowledgeable and patient. Would definitely recommend to anyone needing post-surgery care."
                        },
                        {
                          name: "Michael Brown",
                          date: "April 10, 2023",
                          rating: 4,
                          comment: "Very good experience overall. Dr. Wilson was punctual and thorough with her care. The only reason for 4 stars is that scheduling was a bit difficult."
                        }
                      ].map((review, index) => (
                        <Card key={index} className="border-0 shadow-sm mb-3">
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between mb-2">
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <img 
                                    src="/placeholder.svg?height=50&width=50" 
                                    alt={review.name} 
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                  />
                                </div>
                                <div>
                                  <h6 className="mb-0 fw-bold">{review.name}</h6>
                                  <small className="text-muted">{review.date}</small>
                                </div>
                              </div>
                              <div>
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
                                  ></i>
                                ))}
                              </div>
                            </div>
                            <p className="mb-0 text-muted">{review.comment}</p>
                          </Card.Body>
                        </Card>
                      ))}
                      
                      <div className="text-center mt-4">
                        <Button variant="outline-primary">
                          Load More Reviews
                        </Button>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NurseProfile;
