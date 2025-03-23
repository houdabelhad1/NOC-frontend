"use client"

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Nav, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importer axios

const SignUp = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    // Nurse specific fields
    specialty: "",
    experience: "",
    certification: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    // Données à envoyer au backend
    const nurseData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phoneNumber: formData.phone,
      email: formData.email,
      skills: formData.specialty ? [formData.specialty] : [], // Exemple de compétences
      hourlyRate: 50.0, // Exemple de tarif horaire
      specialty: formData.specialty,
      experience: parseInt(formData.experience, 10),
      certification: formData.certification,
      bio: formData.bio,
    };
  
    try {
      // Envoyer la requête POST au backend avec axios
      const response = await axios.post("http://localhost:8081/api/nurses", nurseData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        console.log("Infirmière créée avec succès :", response.data);
        setShowSuccess(true);
  
        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
          specialty: "",
          experience: "",
          certification: "",
          bio: "",
        });
        setValidated(false);
  
        // Rediriger après 3 secondes
        setTimeout(() => {
          if (activeTab === "nurse") {
            navigate("/nurse-dashboard"); // Rediriger vers le tableau de bord de l'infirmière
          } else {
            navigate("/"); // Rediriger vers la page d'accueil pour les patients
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setErrorMessage("Erreur lors de la création de l'infirmière. Veuillez réessayer.");
    }
  };

  return (
    <div className="signup-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="text-center fw-bold text-primary mb-4">Create an Account</h1>

                {showSuccess && (
                  <Alert variant="success" className="mb-4">
                    <Alert.Heading>Registration Successful!</Alert.Heading>
                    <p>
                      Your account has been created successfully. You will be redirected to the homepage in a few
                      seconds.
                    </p>
                  </Alert>
                )}

                {errorMessage && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{errorMessage}</p>
                  </Alert>
                )}

                <Nav
                  variant="pills"
                  className="nav-justified mb-4"
                  activeKey={activeTab}
                  onSelect={(key) => setActiveTab(key)}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="patient" className="rounded-pill">
                      <i className="bi bi-person me-2"></i>
                      I'm a Patient
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="nurse" className="rounded-pill">
                      <i className="bi bi-heart-pulse me-2"></i>
                      I'm a Nurse
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide your first name.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide your last name.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          minLength={8}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password must be at least 8 characters.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          isInvalid={formData.password !== formData.confirmPassword && formData.confirmPassword !== ""}
                        />
                        <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide your phone number.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide your address.</Form.Control.Feedback>
                  </Form.Group>

                  {/* Nurse-specific fields */}
                  {activeTab === "nurse" && (
                    <>
                      <hr className="my-4" />
                      <h5 className="fw-bold mb-3">Professional Information</h5>

                      <Form.Group className="mb-3">
                        <Form.Label>Specialty</Form.Label>
                        <Form.Select name="specialty" value={formData.specialty} onChange={handleInputChange} required>
                          <option value="">Select your specialty</option>
                          <option value="general">General Care</option>
                          <option value="wound">Wound Care</option>
                          <option value="elderly">Elderly Care</option>
                          <option value="post-surgery">Post-Surgery Care</option>
                          <option value="pediatric">Pediatric Care</option>
                          <option value="mental">Mental Health</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please select your specialty.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Years of Experience</Form.Label>
                        <Form.Control
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          min={0}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your years of experience.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Certifications</Form.Label>
                        <Form.Control
                          type="text"
                          name="certification"
                          value={formData.certification}
                          onChange={handleInputChange}
                          placeholder="e.g., RN, BSN, MSN (comma separated)"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your certifications.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Professional Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about your experience and expertise"
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a professional bio.</Form.Control.Feedback>
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Check
                      required
                      label={
                        <span>
                          I agree to the{" "}
                          <Link to="/terms" className="text-decoration-none">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-decoration-none">
                            Privacy Policy
                          </Link>
                        </span>
                      }
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">
                      Create Account
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-decoration-none">
                        Log In
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;