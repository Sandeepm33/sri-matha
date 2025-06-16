import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Index.css';

const Index = () => {
  const navigate = useNavigate();

  // Add useEffect to initialize Bootstrap components
  useEffect(() => {
    // Initialize Bootstrap components
    if (typeof window !== 'undefined' && window.bootstrap) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, []);

  const services = [
    {
      id: 1,
      title: "Sri Matha Catering",
      description: "Premium catering services for all occasions - weddings, corporate events, and special celebrations",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      route: "/catering",
      features: ["Wedding Catering", "Corporate Events", "Party Planning", "Custom Menus"]
    },
    {
      id: 2,
      title: "Sri Matha Restaurant",
      description: "Fine dining experience with authentic South Indian cuisine and modern ambiance",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      route: "/restaurant",
      features: ["Fine Dining", "South Indian Cuisine", "Family Restaurant", "Private Dining"]
    },
    {
      id: 3,
      title: "Sri Matha Food Court",
      description: "Quick service food court with variety of cuisines and fast delivery options",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      route: "/foodcourt",
      features: ["Quick Service", "Multiple Cuisines", "Online Ordering", "Fast Delivery"]
    }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="Logo" width="40" height="40" className="me-2 rounded" />
            Sri Matha Group
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay">
          <div className="container text-center text-white">
            <h1 className="display-2 fw-bold mb-4 fade-in">Sri Matha Group</h1>
            <p className="lead fs-3 mb-5">Experience Excellence in Every Bite</p>
            <a href="#services" className="btn btn-warning btn-lg px-5 py-3 rounded-pill">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-dark mb-3">Our Services</h2>
            <p className="lead text-muted">Choose from our premium food services</p>
          </div>
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div className="service-card card h-100 shadow-lg border-0" onClick={() => navigate(service.route)}>
                  <div className="card-img-container">
                    <img src={service.image} className="card-img-top" alt={service.title} />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="text-center text-white">
                        <h3 className="card-title fw-bold">{service.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text text-muted mb-4">{service.description}</p>
                    <div className="features mb-4">
                      {service.features.map((feature, index) => (
                        <span key={index} className="badge bg-warning text-dark me-2 mb-2">{feature}</span>
                      ))}
                    </div>
                    <button className="btn btn-dark mt-auto rounded-pill">
                      Explore Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">About Sri Matha Group</h2>
              <p className="lead mb-4">
                With over 25 years of experience in the food industry, Sri Matha Group has been serving 
                authentic South Indian cuisine with a commitment to quality and tradition.
              </p>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-warning">25+</h3>
                    <p className="text-muted">Years Experience</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-warning">50K+</h3>
                    <p className="text-muted">Happy Customers</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-warning">100+</h3>
                    <p className="text-muted">Menu Items</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-warning">24/7</h3>
                    <p className="text-muted">Service</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="About Us" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Contact Us</h2>
            <p className="lead">Get in touch for bookings and inquiries</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="text-center">
                <div className="contact-icon mb-3">📍</div>
                <h5>Address</h5>
                <p>123 Main Street<br />Chennai, Tamil Nadu 600001</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div className="contact-icon mb-3">📞</div>
                <h5>Phone</h5>
                <p>+91 98765 43210<br />+91 87654 32109</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center">
                <div className="contact-icon mb-3">✉️</div>
                <h5>Email</h5>
                <p>info@srimatha.com<br />booking@srimatha.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warning text-dark py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Sri Matha Group. All rights reserved. | Serving Excellence Since 1999</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
