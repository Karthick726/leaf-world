import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import "./Contact.css";
import Header from "../common/layout/header/Header";
import Footer from "../common/layout/footer/Footer";

function Contact() {
  return (
    <>
    <Header/>
      <div className="contact-container">
        <div className="row">
          {/* Google Maps Section */}
          <div className="col-md-8 contact-map-container">
            <iframe
              className="contact-map"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              loading="lazy"
              width="100%"
              height="500"
              style={{ borderRadius: "20px", border: "3px solid #2E8B57" }}
            ></iframe>
          </div>

          {/* Contact Details Section */}
          <div className="col-md-4 contact-details">
            <h2>Get In Touch With Us</h2>

            <p style={{ color: "gray" }}>
              If you wish to directly reach us, Please fill out the form below -
            </p>
            <hr />
            <br />
            {[
              {
                icon: <FaMapMarkerAlt />,
                text: "60 29th San Francisco, 507\nUnion Trade Center",
              },
              { icon: <FaPhoneAlt />, text: "Call us :\n+00 123-456-789" },
              { icon: <MdEmail />, text: "Mail us :\ndemo@example.com" },
              {
                icon: <AiOutlineClockCircle />,
                text: "Open time :\n10:00AM – 6:00PM",
              },
            ].map((item, index) => (
              <div className="contact-item" key={index}>
                <span className="contact-icon">{item.icon}</span>
                <p className="contact-info-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Contact;