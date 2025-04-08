import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Caro1 from "../../../../assets/images/carousel/caro1.jpg"
import Caro2 from "../../../../assets/images/carousel/caro1.jpg"
import Caro3 from "../../../../assets/images/carousel/caro3.jpg"

import "./carousel.css"


const Carousels = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img src={Caro1} alt="carousel1"/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Caro2} alt="carousel1"/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Caro3} alt="carousel1"/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carousels;
