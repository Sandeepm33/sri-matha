import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './FoodCourt.css';

const FoodCourt = () => {
  const navigate = useNavigate();
  const [activeStall, setActiveStall] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '', phone: '', address: '', paymentMethod: ''
  });
  const [orders, setOrders] = useState([]);

  const foodStalls = {
    all: [],
    northindian: [
      { id: 1, name: "Butter Naan", price: 40, stall: "North Indian Corner", time: "10 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 2, name: "Chicken Curry", price: 180, stall: "North Indian Corner", time: "15 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 3, name: "Paneer Makhani", price: 160, stall: "North Indian Corner", time: "12 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    southindian: [
      { id: 4, name: "Masala Dosa", price: 80, stall: "South Spice", time: "8 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 5, name: "Idli Sambhar", price: 60, stall: "South Spice", time: "5 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 6, name: "Vada Pav", price: 35, stall: "South Spice", time: "3 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    chinese: [
      { id: 7, name: "Hakka Noodles", price: 120, stall: "Dragon Wok", time: "12 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 8, name: "Fried Rice", price: 110, stall: "Dragon Wok", time: "10 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 9, name: "Manchurian", price: 140, stall: "Dragon Wok", time: "15 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    fastfood: [
      { id: 10, name: "Burger", price: 90, stall: "Quick Bites", time: "8 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 11, name: "Pizza Slice", price: 70, stall: "Quick Bites", time: "5 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 12, name: "French Fries", price: 50, stall: "Quick Bites", time: "5 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ],
    beverages: [
      { id: 13, name: "Fresh Lime", price: 30, stall: "Juice Corner", time: "2 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 14, name: "Masala Chai", price: 25, stall: "Juice Corner", time: "3 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" },
      { id: 15, name: "Cold Coffee", price: 60, stall: "Juice Corner", time: "4 mins", image: "/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" }
    ]
  };

  // Combine all items for 'all' category
  useEffect(() => {
    const allItems = Object.values(foodStalls).flat().filter(item => item.id);
    foodStalls.all = allItems;
  }, []);

  // Add useEffect to initialize Bootstrap components and cart functionality
  useEffect(() => {
    // Initialize Bootstrap components
    if (typeof window !== 'undefined' && window.bootstrap) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, []);

  const getCurrentItems = () => {
    if (activeStall === 'all') {
      return Object.values(foodStalls).flat().filter(item => item.id);
    }
    return foodStalls[activeStall] || [];
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

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getTotalPrice(),
      customerInfo: {...orderForm},
      status: 'preparing',
      time: new Date().toLocaleTimeString()
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    setShowCart(false);
    alert('Order placed successfully! You will receive updates shortly.');
    setOrderForm({ name: '', phone: '', address: '', paymentMethod: '' });
  };

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="foodcourt-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <button className="btn btn-outline-warning me-3" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <a className="navbar-brand fw-bold" href="#">
            <img src="/lovable-uploads/5e6c1c4f-5c6a-4ea2-8dc3-b75be2d011b1.png" alt="Logo" width="40" height="40" className="me-2 rounded" />
            Sri Matha Food Court
          </a>
          <div className="navbar-nav ms-auto d-none d-lg-flex">
            <a className="nav-link" href="#hero">Home</a>
            <a className="nav-link" href="#stalls">Food Stalls</a>
            <a className="nav-link" href="#menu">Menu</a>
            <a className="nav-link" href="#orders">Track Order</a>
            <button className="btn btn-warning ms-2" onClick={() => setShowCart(true)}>
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-overlay">
          <div className="container text-center text-white">
            <h1 className="display-3 fw-bold mb-4">Sri Matha Food Court</h1>
            <p className="lead fs-4 mb-5">Multiple Cuisines • Quick Service • Fast Delivery</p>
            <div className="row text-center mt-5">
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">⚡ 15min</h3>
                <p>Average Delivery</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">🏪 5</h3>
                <p>Food Stalls</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">🍽️ 50+</h3>
                <p>Menu Items</p>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <h3 className="fw-bold">📱 Online</h3>
                <p>Ordering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Stalls Section */}
      <section id="stalls" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Food Stalls</h2>
            <p className="lead text-muted">Variety of cuisines under one roof</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="stall-card text-center p-4 bg-white rounded shadow h-100">
                <div className="stall-icon mb-3">🍛</div>
                <h5 className="fw-bold">North Indian Corner</h5>
                <p className="text-muted">Authentic North Indian cuisine with rich flavors</p>
                <span className="badge bg-success">Open</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stall-card text-center p-4 bg-white rounded shadow h-100">
                <div className="stall-icon mb-3">🥥</div>
                <h5 className="fw-bold">South Spice</h5>
                <p className="text-muted">Traditional South Indian breakfast and meals</p>
                <span className="badge bg-success">Open</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stall-card text-center p-4 bg-white rounded shadow h-100">
                <div className="stall-icon mb-3">🥢</div>
                <h5 className="fw-bold">Dragon Wok</h5>
                <p className="text-muted">Fresh Chinese and Indo-Chinese dishes</p>
                <span className="badge bg-success">Open</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stall-card text-center p-4 bg-white rounded shadow h-100">
                <div className="stall-icon mb-3">🍔</div>
                <h5 className="fw-bold">Quick Bites</h5>
                <p className="text-muted">Fast food and continental snacks</p>
                <span className="badge bg-success">Open</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Food Menu</h2>
            <p className="lead text-muted">Quick ordering from multiple cuisines</p>
          </div>
          
          {/* Food Category Filters */}
          <div className="menu-filters text-center mb-5">
            <div className="btn-group flex-wrap" role="group">
              <button 
                className={`btn ${activeStall === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('all')}
              >
                All Items
              </button>
              <button 
                className={`btn ${activeStall === 'northindian' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('northindian')}
              >
                North Indian
              </button>
              <button 
                className={`btn ${activeStall === 'southindian' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('southindian')}
              >
                South Indian
              </button>
              <button 
                className={`btn ${activeStall === 'chinese' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('chinese')}
              >
                Chinese
              </button>
              <button 
                className={`btn ${activeStall === 'fastfood' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('fastfood')}
              >
                Fast Food
              </button>
              <button 
                className={`btn ${activeStall === 'beverages' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setActiveStall('beverages')}
              >
                Beverages
              </button>
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="row g-4">
            {getCurrentItems().map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6">
                <div className="food-item card h-100 shadow border-0">
                  <img src={item.image} className="card-img-top food-img" alt={item.name} />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title fw-bold">{item.name}</h6>
                      <span className="price-tag bg-warning text-dark px-2 py-1 rounded">₹{item.price}</span>
                    </div>
                    <p className="card-text text-muted small mb-2">
                      <strong>Stall:</strong> {item.stall}
                    </p>
                    <p className="card-text text-success small mb-3">
                      <strong>Time:</strong> {item.time}
                    </p>
                    <button 
                      className="btn btn-warning btn-sm mt-auto"
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

      {/* Order Tracking Section */}
      <section id="orders" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Track Your Orders</h2>
            <p className="lead text-muted">Real-time order status updates</p>
          </div>
          {orders.length === 0 ? (
            <div className="text-center">
              <p className="text-muted">No active orders</p>
            </div>
          ) : (
            <div className="row g-4">
              {orders.map((order) => (
                <div key={order.id} className="col-lg-6">
                  <div className="order-card bg-white p-4 rounded shadow">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold">Order #{order.id}</h6>
                      <span className="badge bg-warning">Preparing</span>
                    </div>
                    <p className="text-muted small">Ordered at: {order.time}</p>
                    <p className="text-muted small">Customer: {order.customerInfo.name}</p>
                    <p className="fw-bold">Total: ₹{order.total}</p>
                    <div className="progress">
                      <div className="progress-bar bg-warning" style={{width: '60%'}}></div>
                    </div>
                    <small className="text-muted">Estimated delivery: 15 minutes</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Your Cart</h5>
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
                          <small className="text-muted">{item.stall} • ₹{item.price}</small>
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
                    <div className="text-end mb-4">
                      <h5 className="fw-bold">Total: ₹{getTotalPrice()}</h5>
                    </div>
                    
                    {/* Order Form */}
                    <form onSubmit={handleOrderSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Name *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={orderForm.name}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Phone *</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            name="phone"
                            value={orderForm.phone}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Delivery Address *</label>
                          <textarea 
                            className="form-control" 
                            name="address"
                            value={orderForm.address}
                            onChange={handleInputChange}
                            rows="2"
                            required 
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Payment Method *</label>
                          <select 
                            className="form-select" 
                            name="paymentMethod"
                            value={orderForm.paymentMethod}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Payment Method</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="upi">UPI Payment</option>
                            <option value="card">Credit/Debit Card</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
                {cart.length > 0 && (
                  <button type="submit" className="btn btn-warning" onClick={handleOrderSubmit}>
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
              <h5 className="fw-bold mb-3">Sri Matha Food Court</h5>
              <p>Your one-stop destination for quick, delicious food from multiple cuisines. Fast service, great taste!</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Contact Info</h5>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> foodcourt@srimatha.com</p>
              <p><strong>Address:</strong> 123 Main St, Chennai</p>
            </div>
            <div className="col-lg-4 mb-4">
              <h5 className="fw-bold mb-3">Operating Hours</h5>
              <p><strong>All Days:</strong> 10:00 AM - 10:00 PM</p>
              <p><strong>Delivery:</strong> 11:00 AM - 9:30 PM</p>
              <p><strong>Online Order:</strong> 24/7</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p>&copy; 2024 Sri Matha Food Court. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodCourt;
