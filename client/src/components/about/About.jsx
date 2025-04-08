import React, { useEffect, useRef } from "react";
import Header from "../common/layout/header/Header";
import Footer from "../common/layout/footer/Footer";
import image1 from "../../assets/images/aboutpageakka1.png";
import image2 from "../../assets/images/aboutpageakka1.png";
import image3 from "../../assets/images/aboutpageakka1.png";
import "./About.css";

function About() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50px 0px',
      threshold: [0.1, 0.5, 0.9]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const section = entry.target;
        if (entry.isIntersecting) {
          section.classList.add('fade-in', 'sticky-active');
        } else {
          if (entry.boundingClientRect.top <= 0) {
            section.classList.remove('sticky-active');
          }
        }
      });
    }, options);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <div className="about-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>About Us</h1>
            <p>Your Premier Destination for Contemporary Fashion & Style</p>
          </div>
        </section>

        <div className="sections-wrapper">
          <section className="about-section choose-us" ref={el => sectionsRef.current[0] = el}>
            <div className="content slide-right">
              <h1>Why Choose Us?</h1>
              <p>Experience fashion excellence with our curated collection that combines
                style, quality, and affordability in perfect harmony.</p>
              <ul>
                <li>🌟 Curated Designer Collections</li>
                <li>🎯 Personalized Style Recommendations</li>
                <li>✨ Premium Quality Materials</li>
                <li>🚚 Express Worldwide Shipping</li>
                <li>💫 30-Day Easy Returns</li>
              </ul>
            </div>
            <div className="image-container slide-left">
              <img src={image1} alt="Fashion Collection" />
            </div>
          </section>

          <section className="about-section mission" ref={el => sectionsRef.current[1] = el}>
            <div className="content slide-left">
              <h2>Our Mission</h2>
              <p>To revolutionize fashion accessibility by providing high-quality,
                sustainable clothing that empowers individuals to express their unique
                style with confidence.</p>
              <ul>
                <li>🎨 Creative Self-Expression</li>
                <li>♻️ Sustainable Fashion</li>
                <li>💪 Personal Confidence</li>
                <li>🤝 Fashion Community</li>
              </ul>
            </div>
            <div className="image-container slide-right">
              <img src={image2} alt="Our Mission" />
            </div>
          </section>

          <section className="about-section vision" ref={el => sectionsRef.current[2] = el}>
            <div className="content slide-right">
              <h2>Our Vision</h2>
              <p>Leading the future of fashion through innovation and sustainability,
                we envision a world where style meets responsibility.</p>
              <ul>
                <li>🌍 Global Fashion Trends</li>
                <li>💚 Environmental Care</li>
                <li>💫 Fashion Innovation</li>
                <li>🤗 Inclusive Fashion</li>
              </ul>
            </div>
            <div className="image-container slide-left">
              <img src={image3} alt="Our Vision" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;