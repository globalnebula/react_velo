import React, { useState } from 'react';
import ScooterImage from './assets/scoot-front.png'; // Import the image with a named import
import './App.css';
import './styles/nav.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="buttons">
        <a href="signup.html">
          <button>Sign Up</button>
        </a>
        <button>Log In</button> {/* Log In button without onClick handler */}
      </div>
      <div className={`menu-toggler ${menuOpen? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`nav-overlay ${menuOpen? 'open' : ''}`} id="navOverlay">
        <div className="nav-links">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#booknow">Book Now</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#contact">Logout</a></li>
          </ul>
        </div>
      </div>
      <div className="playfair-display" id="text-container">
        <span id="text"></span><span id="cursor"></span>
      </div>
      <img className="vehicle" id="scoot" src={ScooterImage} alt="Scooter" />
      <div className="playfair-display" style={{ width: '300px' }} id="about">
        <p style={{ color: 'white', fontSize: '30px' }}>
          Welcome to the Bike Rental System, where convenience meets sustainability! Our platform is dedicated to providing an innovative solution for eco-friendly transportation and promoting healthy living through bicycle rentals.<br /><br />
          At the heart of our mission is a commitment to offering convenient and efficient rental services to individuals seeking alternative modes of travel. Whether you're a daily commuter, a leisure cyclist, or a tourist exploring a new city, our system is designed to cater to your needs with ease and accessibility.<br /><br />
          <strong>Our Vision</strong><br />
          We envision a world where sustainable transportation options are readily available and easily accessible to all. Through our platform, we strive to contribute to a cleaner and greener environment by encouraging the use of bicycles as a sustainable means of transportation.<br /><br />
          <strong>What We Offer</strong><br />
          The Bike Rental System is a comprehensive platform that offers a diverse range of bicycles for short-term rentals. Our user-friendly interface allows you to browse through available bikes, select your preferred type, and reserve it for your desired duration. With options for pickup and return locations, planning your biking adventures has never been easier.<br /><br />
          <strong>Why Choose Us</strong><br />
          - <strong>Convenience:</strong> Our platform offers a seamless rental experience, allowing you to book bikes online with just a few clicks. Whether you're planning a spontaneous ride or scheduling in advance, we've got you covered.<br />
          - <strong>Sustainability:</strong> By choosing to rent a bike through our platform, you're not just getting from point A to point B – you're making a positive impact on the environment. Cycling reduces carbon emissions, promotes cleaner air, and contributes to a healthier planet.<br />
          - <strong>Quality Assurance:</strong> We take pride in offering high-quality bicycles that are well-maintained and regularly serviced to ensure your safety and comfort during your rides.<br /><br />
          <strong>Our Commitment</strong><br />
          At the Bike Rental System, we are dedicated to continuous improvement and innovation. We actively seek feedback from our users to enhance our services and provide an exceptional rental experience. Our team is committed to promoting sustainable transportation solutions and making biking accessible to all.<br /><br />
          Join us in our mission to embrace eco-friendly transportation and enjoy the freedom of cycling with the Bike Rental System.
        </p>
      </div>
    </div>
  );
}

export default App;