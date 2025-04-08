import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <footer className="text-center text-lg-start text-black">
        <section className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="social-icons-container d-flex justify-content-center mb-4">
            <a href="https://www.facebook.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="bi bi-facebook footer-icon"></i>
            </a>
            <a href="https://twitter.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="bi bi-twitter footer-icon"></i>
            </a>
            <a href="https://www.instagram.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="bi bi-instagram footer-icon"></i>
            </a>
            <a href="https://www.linkedin.com/company/leafworldfashion" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="bi bi-linkedin footer-icon"></i>
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-4">
            <div className="row justify-content-center gy-4">
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <h6 className="footer-title" data-text="Leaf World Fashion">
                  Leaf World Fashion
                </h6>
                <p className='abouts-footer-left'>
                  Welcome to our store, where we pride ourselves on providing exceptional products and unparalleled customer service our store is a haven for those who appreciate quality, style, and innovation.
                </p>
              </div>

              <div className="col-6 col-md-6 col-lg-2 mb-4">
                <h6 className="footer-title" data-text="CATEGORIES">
                  CATEGORIES
                </h6>
                {['Men\'s Wear', 'Women\'s Wear', 'Kids\' Collection', 'Eco Accessories'].map((item, index) => (
                  <p key={index} className="mb-2">
                    <a href="#!" className="footer-link">{item}</a>
                  </p>
                ))}
              </div>

              <div className="col-6 col-md-6 col-lg-2 mb-4">
                <h6 className="footer-title" data-text="Quick Links">
                  Quick Links
                </h6>
                {['Home', 'Shop', 'Offers', 'Contact Us'].map((item, index) => (
                  <p key={index} className="mb-2">
                    <a href="#!" className="footer-link">{item}</a>
                  </p>
                ))}
              </div>

              <div className="col-12 col-md-6 col-lg-2 mb-4 footer-contact">
                <h6 className="footer-title" data-text="HELP & CONTACTS">
                  HELP & CONTACTS
                </h6>
                <p><i className="bi bi-house-door me-3"></i>FAQ</p>
                <p><i className="bi bi-envelope me-3"></i>BY EMAIL</p>
                <p><i className="bi bi-telephone me-3"></i>BY PHONE</p>
                <p><i className="bi bi-printer me-3"></i> +91 12345 67890 *</p>
              </div>
              
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <h6 className="footer-title" data-text="FOLLOW US">
                  FOLLOW US
                </h6>
                <div className="footer-social-links">
                  <a href="https://www.facebook.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <i className="bi bi-facebook footer-icon"></i> Facebook
                  </a>
                  <a href="https://twitter.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <i className="bi bi-twitter footer-icon"></i> Twitter
                  </a>
                  <a href="https://www.instagram.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <i className="bi bi-instagram footer-icon"></i> Instagram
                  </a>
                  <a href="https://www.youtube.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <i className="bi bi-youtube footer-icon"></i> YouTube
                  </a>
                  <a href="https://www.pinterest.com/LeafWorldFashion" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <i className="bi bi-pinterest footer-icon"></i> Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Leaf World Fashion. All rights reserved.
          <div className="footer-doneby">
            Hello Technologies
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;