import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Catering.css';

const Catering = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    date: '',
    guests: '',
    package: '',
    message: ''
  });

  const packages = [
    {
      id: 1,
      name: "Premium Wedding Package",
      price: "₹1,500 per person",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      features: ["Welcome Drinks", "Full Course Meals", "Dessert Station", "Live Counters", "Service Staff"],
      menu: ["Appetizers (6 varieties)", "Main Course (8 items)", "Rice & Breads", "Desserts (4 types)", "Beverages"]
    },
    {
      id: 2,
      name: "Corporate Event Package",
      price: "₹800 per person",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      features: ["Business Lunch", "Coffee Breaks", "Presentation Setup", "Professional Service"],
      menu: ["Continental Breakfast", "Lunch Buffet", "Snacks & Tea", "Fresh Fruits", "Beverages"]
    },
    {
      id: 3,
      name: "Birthday Celebration",
      price: "₹600 per person",
      image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
      features: ["Custom Cake", "Party Decorations", "Kid-Friendly Menu", "Entertainment"],
      menu: ["Party Snacks", "Main Course", "Birthday Cake", "Ice Cream", "Soft Drinks"]
    }
  ];

  const services = [
    { icon: "🍽️", title: "Menu Planning", desc: "Customized menus for your event" },
    { icon: "👥", title: "Professional Staff", desc: "Experienced service team" },
    { icon: "🚚", title: "Equipment Rental", desc: "Tables, chairs, and serving equipment" },
    { icon: "🎨", title: "Event Decoration", desc: "Beautiful decoration services" }
  ];

  const gallery = [
    "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
    "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
    "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png",
    "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png"
  ];

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted successfully! We will contact you soon.');
    setBookingForm({
      name: '', email: '', phone: '', event: '', date: '', guests: '', package: '', message: ''
    });
  };

  // Add useEffect to initialize Bootstrap components
  useEffect(() => {
    // Initialize Bootstrap tooltips and modals
    if (typeof window !== 'undefined' && window.bootstrap) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, []);

  return (
    <div className="catering-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
         
          <a className="navbar-brand fw-bold" href="#">
            <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="Logo" width="40" height="40" className="me-2 rounded" />
            Sri Matha Catering
          </a>
          <div className="navbar-nav ms-auto d-none d-lg-flex">
            <a className="nav-link" href="#hero">Home</a>
            <a className="nav-link" href="#packages">Packages</a>
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#gallery">Gallery</a>
            <a className="nav-link" href="#booking">Booking</a>
            
          </div>
           <button className="btn btn-outline-warning me-3" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-overlay">
          <div className="container text-center text-white">
            <h1 className="display-3 fw-bold mb-4">Sri Matha Catering</h1>
            <p className="lead fs-4 mb-5">Making Your Special Occasions Unforgettable</p>
            <div className="row text-center mt-5">
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">1000+</h3>
                <p>Events Catered</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">25+</h3>
                <p>Years Experience</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">50+</h3>
                <p>Menu Varieties</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Services</h2>
            <p className="lead text-muted">Complete catering solutions for all your needs</p>
          </div>
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="service-item text-center p-4 h-100 bg-white rounded shadow">
                  <div className="service-icon mb-3">{service.icon}</div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Catering Packages</h2>
            <p className="lead text-muted">Choose the perfect package for your event</p>
          </div>
          <div className="row g-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="col-lg-4">
                <div className="package-card card h-100 shadow-lg border-0">
                  <img src={pkg.image} className="card-img-top package-img" alt={pkg.name} />
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title fw-bold">{pkg.name}</h4>
                    <h5 className="text-warning mb-3">{pkg.price}</h5>
                    <div className="features mb-3">
                      <h6 className="fw-bold">Features:</h6>
                      <ul className="list-unstyled">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="mb-1">✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="menu mb-4">
                      <h6 className="fw-bold">Menu Highlights:</h6>
                      <ul className="list-unstyled">
                        {pkg.menu.map((item, index) => (
                          <li key={index} className="mb-1 text-muted">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="btn btn-warning mt-auto"
                      onClick={() => setSelectedPackage(pkg)}
                      data-bs-toggle="modal" 
                      data-bs-target="#packageModal"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Work Gallery</h2>
            <p className="lead text-muted">See our beautiful catering setups</p>
          </div>
          <div className="row g-3">
            {gallery.map((image, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="gallery-item">
                  <img src={image} alt={`Gallery ${index + 1}`} className="img-fluid rounded shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Book Your Event</h2>
            <p className="lead text-muted">Let us make your event memorable</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="booking-form bg-white p-4 rounded shadow">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        value={bookingForm.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        name="phone"
                        value={bookingForm.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Event Type *</label>
                      <select 
                        className="form-select" 
                        name="event"
                        value={bookingForm.event}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Event Type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Event Date *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="date"
                        value={bookingForm.date}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Number of Guests *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="guests"
                        value={bookingForm.guests}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Preferred Package</label>
                      <select 
                        className="form-select" 
                        name="package"
                        value={bookingForm.package}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Package</option>
                        <option value="premium">Premium Wedding Package</option>
                        <option value="corporate">Corporate Event Package</option>
                        <option value="birthday">Birthday Celebration</option>
                        <option value="custom">Custom Package</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Requirements</label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        name="message"
                        value={bookingForm.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about any special requirements..."
                      ></textarea>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-warning btn-lg px-5">
                        Submit Booking Request
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Modal */}
      <div className="modal fade" id="packageModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedPackage && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{selectedPackage.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <img src={selectedPackage.image} alt={selectedPackage.name} className="img-fluid rounded mb-3" />
                  <h4 className="text-warning">{selectedPackage.price}</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Package Features:</h6>
                      <ul>
                        {selectedPackage.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Menu Items:</h6>
                      <ul>
                        {selectedPackage.menu.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => document.getElementById('booking').scrollIntoView()}>
                    Book This Package
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Sri Matha Catering</h5>
              <p>Premium catering services for all your special occasions. We bring taste and elegance to your events.</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Contact Info</h5>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> catering@srimatha.com</p>
              <p><strong>Address:</strong> 123 Main St, Chennai</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Business Hours</h5>
              <p><strong>Mon-Fri:</strong> 9:00 AM - 8:00 PM</p>
              <p><strong>Sat-Sun:</strong> 8:00 AM - 9:00 PM</p>
              <p><strong>Emergency:</strong> 24/7 Available</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p>&copy; 2024 Sri Matha Catering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Catering;
