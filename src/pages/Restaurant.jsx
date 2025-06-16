import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Restaurant.css';

const Restaurant = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '', occasion: ''
  });

  const menuCategories = {
    appetizers: [
      { id: 1, name: "Samosa", price: 45, desc: "Crispy pastry with spiced filling", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 2, name: "Paneer Tikka", price: 180, desc: "Grilled cottage cheese with spices", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 3, name: "Chicken 65", price: 220, desc: "Spicy fried chicken appetizer", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    mains: [
      { id: 4, name: "Butter Chicken", price: 280, desc: "Creamy tomato-based chicken curry", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 5, name: "Biryani", price: 320, desc: "Aromatic rice with meat/vegetables", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 6, name: "Dal Makhani", price: 200, desc: "Rich and creamy lentil curry", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    desserts: [
      { id: 7, name: "Gulab Jamun", price: 120, desc: "Sweet milk dumplings in syrup", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 8, name: "Rasmalai", price: 150, desc: "Cottage cheese in sweet milk", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 9, name: "Ice Cream", price: 100, desc: "Variety of flavors available", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    beverages: [
      { id: 10, name: "Lassi", price: 80, desc: "Traditional yogurt drink", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 11, name: "Filter Coffee", price: 60, desc: "South Indian style coffee", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 12, name: "Fresh Juice", price: 90, desc: "Seasonal fruit juices", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    alert('Reservation request submitted successfully! We will confirm your booking soon.');
    setReservationForm({
      name: '', email: '', phone: '', date: '', time: '', guests: '', occasion: ''
    });
  };

  const handleInputChange = (e) => {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <div className="restaurant-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
    
          <a className="navbar-brand fw-bold" href="#">
            <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="Logo" width="40" height="40" className="me-2 rounded" />
            Sri Matha Restaurant
          </a>
          <div className="navbar-nav ms-auto d-none d-lg-flex">
            <a className="nav-link" href="#hero">Home</a>
            <a className="nav-link" href="#menu">Menu</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#reservation">Reservation</a>
            <button className="btn btn-warning ms-2" onClick={() => setShowCart(true)}>
              Cart ({cart.length})
            </button>
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
            <h1 className="display-3 fw-bold mb-4">Sri Matha Restaurant</h1>
            <p className="lead fs-4 mb-5">Authentic South Indian Cuisine & Fine Dining Experience</p>
            <div className="row text-center mt-5">
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">⭐ 4.8</h3>
                <p>Rating</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">500+</h3>
                <p>Menu Items</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">25+</h3>
                <p>Years Serving</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">50K+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="feature-box p-4 bg-white rounded shadow">
                <div className="feature-icon mb-3">🍽️</div>
                <h5 className="fw-bold">Fine Dining</h5>
                <p className="text-muted">Elegant atmosphere with premium service</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="feature-box p-4 bg-white rounded shadow">
                <div className="feature-icon mb-3">👨‍🍳</div>
                <h5 className="fw-bold">Expert Chefs</h5>
                <p className="text-muted">Master chefs with decades of experience</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="feature-box p-4 bg-white rounded shadow">
                <div className="feature-icon mb-3">🌿</div>
                <h5 className="fw-bold">Fresh Ingredients</h5>
                <p className="text-muted">Daily fresh ingredients and spices</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="feature-box p-4 bg-white rounded shadow">
                <div className="feature-icon mb-3">🏆</div>
                <h5 className="fw-bold">Award Winning</h5>
                <p className="text-muted">Multiple culinary awards and recognition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Menu</h2>
            <p className="lead text-muted">Explore our delicious South Indian cuisine</p>
          </div>
          
          {/* Menu Categories */}
          <div className="menu-tabs text-center mb-5">
            <div className="btn-group" role="group">
              <button 
                className={`btn ${activeCategory === 'appetizers' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveCategory('appetizers')}
              >
                Appetizers
              </button>
              <button 
                className={`btn ${activeCategory === 'mains' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveCategory('mains')}
              >
                Main Course
              </button>
              <button 
                className={`btn ${activeCategory === 'desserts' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveCategory('desserts')}
              >
                Desserts
              </button>
              <button 
                className={`btn ${activeCategory === 'beverages' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveCategory('beverages')}
              >
                Beverages
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="row g-4">
            {menuCategories[activeCategory].map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="menu-item card h-100 shadow border-0">
                  <img src={item.image} className="card-img-top menu-img" alt={item.name} />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold">{item.name}</h5>
                      <span className="price-tag bg-warning text-dark px-2 py-1 rounded">₹{item.price}</span>
                    </div>
                    <p className="card-text text-muted flex-grow-1">{item.desc}</p>
                    <button 
                      className="btn btn-warning mt-auto"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">About Our Restaurant</h2>
              <p className="lead mb-4">
                Sri Matha Restaurant has been serving authentic South Indian cuisine for over 25 years. 
                Our commitment to traditional recipes and fresh ingredients has made us a favorite among food lovers.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="stat-item text-center p-3 bg-white rounded">
                    <h4 className="fw-bold text-warning">25+</h4>
                    <p className="mb-0">Years Experience</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item text-center p-3 bg-white rounded">
                    <h4 className="fw-bold text-warning">100+</h4>
                    <p className="mb-0">Menu Items</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="Restaurant Interior" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Make a Reservation</h2>
            <p className="lead text-muted">Book your table for a memorable dining experience</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="reservation-form bg-white p-4 rounded shadow">
                <form onSubmit={handleReservationSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={reservationForm.name}
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
                        value={reservationForm.email}
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
                        value={reservationForm.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Number of Guests *</label>
                      <select 
                        className="form-select" 
                        name="guests"
                        value={reservationForm.guests}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3-4">3-4 Guests</option>
                        <option value="5-8">5-8 Guests</option>
                        <option value="8+">8+ Guests</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="date"
                        value={reservationForm.date}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Time *</label>
                      <select 
                        className="form-select" 
                        name="time"
                        value={reservationForm.time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Occasion</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="occasion"
                        value={reservationForm.occasion}
                        onChange={handleInputChange}
                        placeholder="Birthday, Anniversary, etc."
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-warning btn-lg px-5">
                        Make Reservation
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Your Order</h5>
                <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <p className="text-center text-muted">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                        <div>
                          <h6 className="mb-0">{item.name}</h6>
                          <small className="text-muted">₹{item.price}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger ms-3"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-end">
                      <h5 className="fw-bold">Total: ₹{getTotalPrice()}</h5>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
                {cart.length > 0 && (
                  <button type="button" className="btn btn-warning">
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Sri Matha Restaurant</h5>
              <p>Experience the authentic taste of South India in a modern, elegant setting. We pride ourselves on quality, tradition, and exceptional service.</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Contact Info</h5>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> restaurant@srimatha.com</p>
              <p><strong>Address:</strong> 123 Main St, Chennai</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Opening Hours</h5>
              <p><strong>Lunch:</strong> 12:00 PM - 3:00 PM</p>
              <p><strong>Dinner:</strong> 7:00 PM - 11:00 PM</p>
              <p><strong>Closed:</strong> Monday</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p>&copy; 2024 Sri Matha Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Restaurant;
