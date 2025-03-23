"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"

// Mock data for nurses
const nursesData = [
  {
    id: 1,
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
  },
  {
    id: 2,
    name: "Dr. James Miller",
    specialty: "Wound Care",
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
    location: "Boston, MA",
    experience: "12 years",
    price: "$50/hour",
    availability: ["Tuesday", "Thursday", "Saturday"],
    certifications: ["RN", "MSN"],
  },
  {
    id: 3,
    name: "Dr. Sophia Garcia",
    specialty: "Elderly Care",
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    location: "Chicago, IL",
    experience: "10 years",
    price: "$48/hour",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    certifications: ["RN", "PhD"],
  },
  {
    id: 4,
    name: "Dr. Michael Johnson",
    specialty: "Post-Surgery Care",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
    location: "Los Angeles, CA",
    experience: "7 years",
    price: "$52/hour",
    availability: ["Wednesday", "Thursday", "Friday", "Saturday"],
    certifications: ["RN", "BSN"],
  },
]

const SearchNurses = () => {
  const [filters, setFilters] = useState({
    specialty: "",
    location: "",
    availability: "",
    priceRange: "",
  })

  const [filteredNurses, setFilteredNurses] = useState(nursesData)

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const applyFilters = (e) => {
    e.preventDefault()
    // In a real app, this would filter based on API data
    // For now, we'll just simulate filtering
    setFilteredNurses(nursesData)
  }

  const resetFilters = () => {
    setFilters({
      specialty: "",
      location: "",
      availability: "",
      priceRange: "",
    })
    setFilteredNurses(nursesData)
  }

  return (
    <div className="search-nurses-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <h1 className="fw-bold mb-4 text-center text-primary">Find a Nurse</h1>

        <Row>
          {/* Filters Section */}
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-4">Filters</h5>

                <Form onSubmit={applyFilters}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Specialty</Form.Label>
                    <Form.Select name="specialty" value={filters.specialty} onChange={handleFilterChange}>
                      <option value="">All Specialties</option>
                      <option value="general">General Care</option>
                      <option value="wound">Wound Care</option>
                      <option value="elderly">Elderly Care</option>
                      <option value="post-surgery">Post-Surgery Care</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter zip code or city"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Availability</Form.Label>
                    <Form.Select name="availability" value={filters.availability} onChange={handleFilterChange}>
                      <option value="">Any Day</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Price Range</Form.Label>
                    <Form.Select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                      <option value="">Any Price</option>
                      <option value="0-30">$0 - $30 per hour</option>
                      <option value="30-50">$30 - $50 per hour</option>
                      <option value="50-70">$50 - $70 per hour</option>
                      <option value="70+">$70+ per hour</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Apply Filters
                    </Button>
                    <Button variant="outline-secondary" type="button" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Map Preview (would be interactive in a real app) */}
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="p-0">
                <div
                  className="bg-light rounded"
                  style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <div className="text-center">
                    <i className="bi bi-map fs-1 text-primary mb-2"></i>
                    <p className="mb-0">Interactive Map</p>
                    <small className="text-muted">Click to expand</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Results Section */}
          <Col lg={9}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">
                    <span className="fw-bold">{filteredNurses.length}</span> nurses found
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-2">Sort by:</span>
                  <Form.Select className="w-auto">
                    <option value="rating">Highest Rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="experience">Most Experienced</option>
                  </Form.Select>
                </div>
              </Card.Body>
            </Card>

            {filteredNurses.map((nurse) => (
              <Card key={nurse.id} className="border-0 shadow-sm mb-4 nurse-card">
                <Card.Body>
                  <Row>
                    <Col md={3} className="mb-3 mb-md-0">
                      <img src={nurse.image || "/placeholder.svg"} alt={nurse.name} className="img-fluid rounded-3" />
                    </Col>
                    <Col md={6}>
                      <h5 className="fw-bold mb-1">{nurse.name}</h5>
                      <p className="text-primary mb-2">{nurse.specialty}</p>

                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="ms-1 fw-semibold">{nurse.rating}</span>
                        </div>
                        <span className="text-muted">({nurse.reviews} reviews)</span>
                      </div>

                      <div className="mb-2">
                        <i className="bi bi-geo-alt text-muted me-1"></i>
                        <span>{nurse.location}</span>
                      </div>

                      <div className="mb-2">
                        <i className="bi bi-briefcase text-muted me-1"></i>
                        <span>Experience: {nurse.experience}</span>
                      </div>

                      <div className="mb-3">
                        <i className="bi bi-calendar-check text-muted me-1"></i>
                        <span>Available: </span>
                        {nurse.availability.map((day, index) => (
                          <span key={index} className="me-1">
                            {day}
                            {index < nurse.availability.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>

                      <div>
                        {nurse.certifications.map((cert, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1 mb-1 py-2 px-3">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                    <Col md={3} className="d-flex flex-column justify-content-between">
                      <div className="text-end mb-3">
                        <h5 className="fw-bold text-primary mb-0">{nurse.price}</h5>
                        <small className="text-muted">per hour</small>
                      </div>
                      <div className="d-grid gap-2">
                        <Button variant="primary" as={Link} to={`/nurse/${nurse.id}`}>
                          View Profile
                        </Button>
                        <Button variant="outline-primary" as={Link} to={`/booking?nurse=${nurse.id}`}>
                          Book Now
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SearchNurses

