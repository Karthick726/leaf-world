import React, { useEffect, useState } from 'react';
import Header from '../../../common/layout/header/Header';
import Footer from '../../../common/layout/footer/Footer';
import client from '../../../common/Client/Client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import './HomeCaursol.css';
import InfoDrawer from '../../../common/Drawer/Drawer';

function HomeCaursol() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  useEffect(() => {
    if (carouselItems.length > 0) {
      const carousel = new window.bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: 2000,
        wrap: true,
        keyboard: true,
        direction: 'vertical'
      });
    }
  }, [carouselItems]);

  const fetchCarouselData = async () => {
    try {
      const response = await client.get('coursel');
      if (response.status === 200) {
        setCarouselItems(response.data);
      }
    } catch (err) {
      setError('Failed to load carousel images');
      console.error('Error fetching carousel data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <div className="carousel-wrapper">
        <div className="carousel-container">
          {carouselItems.length > 0 ? (
            <div 
              id="carouselExampleIndicators" 
              className="carousel slide vertical"    
                  // updated
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {carouselItems.map((item, index) => (
                  <div 
                    key={`slide-${index}`}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={item.image}
                      className="d-block w-100"
                      alt={item.title || `Slide ${index + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                    {(item.title || item.description) && (
                      <div className="carousel-caption d-md-block">
                        {item.title && <h1>{item.title}</h1>}
                        {item.description && <p>{item.description}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <div>No carousel items available</div>
          )}
        </div>
      </div>
      {/* <InfoDrawer /> */}
      <Footer />
    </>
  );
}

export default HomeCaursol;