"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [validated, setValidated] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    // In a real app, this would call an API to authenticate the user
    console.log("Login submitted:", formData)

    // Simulate successful login
    if (formData.email === "test@example.com" && formData.password === "password") {
      navigate("/")
    } else {
      setLoginError(true)
    }
  }

  return (
    <div className="login-page py-5" style={{ marginTop: "56px" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-heart-pulse fs-1 text-primary"></i>
                  <h1 className="fw-bold text-primary mt-2">Welcome Back</h1>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {loginError && (
                  <Alert variant="danger" onClose={() => setLoginError(false)} dismissible>
                    Invalid email or password. Please try again.
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide your password.</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">
                      Sign In
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-decoration-none">
                        Sign Up
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
  )
}

export default Login

