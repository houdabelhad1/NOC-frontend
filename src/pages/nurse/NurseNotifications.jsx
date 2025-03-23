import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NurseNotifications = () => {
  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'John Smith has requested an appointment for Post-Surgery Care on June 20, 2023 at 10:00 AM.',
      date: '2023-06-15 09:30 AM',
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your profile has been verified. You can now receive appointment requests from patients.',
      date: '2023-06-14 02:15 PM',
      read: true,
      actionRequired: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'You have received a payment of $135.00 for services provided to Sarah Johnson.',
      date: '2023-06-13 11:45 AM',
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Reminder: You have an appointment with Michael Brown for Wound Care tomorrow at 2:00 PM.',
      date: '2023-06-12 10:00 AM',
      read: false,
      actionRequired: false
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message from Patient',
      message: 'Emily Davis has sent you a message regarding her upcoming appointment.',
      date: '2023-06-11 03:20 PM',
      read: true,
      actionRequired: true
    }
  ]);
  
  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      appointments: true,
      messages: true,
      payments: true,
      system: false
    },
    push: {
      appointments: true,
      messages: true,
      payments: false,
      system: false
    }
  });
  
  // Handle notification settings change
  const handleSettingsChange = (channel, type) => {
    setNotificationSettings({
      ...notificationSettings,
      [channel]: {
        ...notificationSettings[channel],
        [type]: !notificationSettings[channel][type]
      }
    });
  };
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };
  
  // Filter notifications
  const [filter, setFilter] = useState('all');
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === filter);
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment':
        return 'bi-calendar-check';
      case 'payment':
        return 'bi-credit-card';
      case 'message':
        return 'bi-chat-dots';
      case 'system':
        return 'bi-gear';
      default:
        return 'bi-bell';
    }
  };
  
  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch(type) {
      case 'appointment':
        return 'primary';
      case 'payment':
        return 'success';
      case 'message':
        return 'info';
      case 'system':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="nurse-notifications-page py-5" style={{ marginTop: '56px' }}>
      <Container>
        <h1 className="fw-bold mb-4 text-primary">Notifications</h1>
        
        <Row>
          {/* Left Column - Notifications List */}
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-0 me-3">Your Notifications</h5>
                    <Badge bg="danger" pill className="me-2">
                      {notifications.filter(n => !n.read).length}
                    </Badge>
                  </div>
                  
                  <div className="d-flex">
                    <Form.Select 
                      className="me-2" 
                      style={{ width: 'auto' }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Notifications</option>
                      <option value="unread">Unread</option>
                      <option value="appointment">Appointments</option>
                      <option value="payment">Payments</option>
                      <option value="message">Messages</option>
                      <option value="system">System</option>
                    </Form.Select>
                    
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-actions" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={markAllAsRead}>Mark All as Read</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Delete All</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`border-0 shadow-sm mb-3 ${!notification.read ? 'bg-light' : ''}`}
                    >
                      <Card.Body className="p-3">
                        <div className="d-flex">
                          <div 
                            className={`d-flex align-items-center justify-content-center rounded-circle bg-${getNotificationColor(notification.type)} bg-opacity-10 me-3`}
                            style={{ width: '48px', height: '48px', flexShrink: 0 }}
                          >
                            <i className={`bi ${getNotificationIcon(notification.type)} fs-4 text-${getNotificationColor(notification.type)}`}></i>
                          </div>
                          
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-1">
                              <h6 className="fw-bold mb-0">
                                {notification.title}
                                {!notification.read && (
                                  <Badge bg="danger" className="ms-2" pill>New</Badge>
                                )}
                              </h6>
                              <small className="text-muted">{notification.date}</small>
                            </div>
                            
                            <p className="mb-2">{notification.message}</p>
                            
                            <div className="d-flex justify-content-between align-items-center">
                              {notification.actionRequired ? (
                                <div>
                                  <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className="me-2"
                                    as={Link}
                                    to={notification.type === 'appointment' ? '/nurse-calendar' : notification.type === 'message' ? '/nurse-dashboard' : '#'}
                                  >
                                    {notification.type === 'appointment' ? 'View Request' : notification.type === 'message' ? 'Reply' : 'Take Action'}
                                  </Button>
                                  <Button variant="outline-secondary" size="sm">
                                    Dismiss
                                  </Button>
                                </div>
                              ) : (
                                <div></div>
                              )}
                              
                              <div>
                                {!notification.read && (
                                  <Button 
                                    variant="link" 
                                    className="text-decoration-none p-0 me-3"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    Mark as Read
                                  </Button>
                                )}
                                <Button 
                                  variant="link" 
                                  className="text-danger text-decoration-none p-0"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-bell-slash fs-1 text-muted mb-3"></i>
                    <h5 className="fw-bold">No Notifications</h5>
                    <p className="text-muted">You don't have any notifications at the moment.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column - Notification Settings */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Notification Settings</h5>
                
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Email Notifications</h6>
                  
                  <Form>
                    {['appointments', 'messages', 'payments', 'system'].map((type) => (
                      <Form.Group key={`email-${type}`} className="mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label className="mb-0">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          checked={notificationSettings.email[type]}
                          onChange={() => handleSettingsChange('email', type)}
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </div>
                
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Push Notifications</h6>
                  
                  <Form>
                    {['appointments', 'messages', 'payments', 'system'].map((type) => (
                      <Form.Group key={`push-${type}`} className="mb-2 d-flex justify-content-between align-items-center">
                        <Form.Label className="mb-0">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Form.Label>
                        <Form.Check
                          type="switch"
                          checked={notificationSettings.push[type]}
                          onChange={() => handleSettingsChange('push', type)}
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </div>
                
                <div className="d-grid">
                  <Button variant="primary">
                    Save Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NurseNotifications;
