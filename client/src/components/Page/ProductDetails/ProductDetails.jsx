import React, { Fragment, useState } from "react";
import "./ProductDetails.css";
import { MdAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Header from "../../common/layout/header/Header";
import Footer from "../../common/layout/footer/Footer";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { LocalShipping, Lock, SupportAgent, Close } from "@mui/icons-material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import InfoDrawer from "../../common/Drawer/Drawer";

const ProductDetails = () => {
  const product = {
    productName: "stylish formal shirts for mens",
    price: "277",
    description:
      "A casual shirt is a relaxed, versatile garment designed for everyday wear.\r\n often featuring softer fabrics, looser fits, and a variety of styles and patterns, unlike the more formal and fitted dress shirt. ",
    color: "lightgreen,gray,black,brown",
    sizeStock: [
      { size: "M", stock: "3" },
      { size: "L", stock: "0" },
      { size: "XL", stock: "12" },
    ],
    image: [
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/ek6yuffheqwiyaggdjhl.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675732/Products/emqs5cuwxmzaj07as8tw.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/ek6yuffheqwiyaggdjhl.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675732/Products/emqs5cuwxmzaj07as8tw.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
      "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
    ],
  };

  const customerReviews = [
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "Jane Doe",
      rating: 4,
      review:
        "Good fitting, tailored perfect to slim body time , rich color even after 3 washes",
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 5,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
    {
      reviewer: "John Doe",
      rating: 1,
      review: "This product is amazing",
      image: [
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/xqu7drmbo58mkxu4h2kl.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675735/Products/mvdlg5puvbvh3ebpgrin.png",
        "https://res.cloudinary.com/dw7dowck7/image/upload/v1743675731/Products/klyhysy4qdjeghb8rhfa.png",
      ],
      date: "jan 1 2025",
    },
  ];
  const description = product.description.split("\r\n");
  const colors = product.color.split(",");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const reviewImage = customerReviews.flatMap((value) => value.image || []);
  const handleImageClick = () => {
    setIsOpen(true);
  };
  const imagesPerPage = 6;
  const nextImage = 1;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - nextImage);
    }
  };

  const handleNext = () => {
    if (startIndex + imagesPerPage < product.image.length) {
      setStartIndex((prev) => prev + nextImage);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Fragment>
      <Header />
      <main className="main">
        <div className="row hello-row">
          <div className="column small-centered">
            <div className="productCard_block">
              <div className="row product-row">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <div className="productCard_leftSide clearfix">
                    <div className="sliderBlock">
                      <img
                        src={selectedImage}
                        alt={product.productName}
                        className="main-image"
                      />
                    </div>
                    <div className="thumbnails">
                      <button
                        className="prev-btn"
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                      >
                        <FaArrowLeft />
                      </button>

                      <div className="thumbnail-container">
                        {product.image
                          .slice(startIndex, startIndex + imagesPerPage)
                          .map((img, index) => (
                            <img
                              key={`${img}-${index}`}
                              src={img}
                              alt={`Thumbnail ${index}`}
                              className={`thumbnail-img ${
                                selectedImage === img ? "active" : ""
                              }`}
                              onClick={() => setSelectedImage(img)}
                            />
                          ))}
                      </div>

                      <button
                        className="next-btn"
                        onClick={handleNext}
                        disabled={
                          startIndex + imagesPerPage >= product.image.length
                        }
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                    <div className="buttons-id">
                      <button className="add-to-cart">
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button className="buy-now">
                        <BsLightningFill /> Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6">
                  <div className="productCard_rightSide">
                    <div className="block_product">
                      <h2 className="block_name block_name__mainName">
                        {product.productName}
                      </h2>
                      <p class="block_product__advantagesProduct">
                        Wireless headphones with integrated microphone
                      </p>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid lightgray",
                        padding: "10px 0px",
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 left-align">
                          <div className="block_price">
                            <p className="block_price__currency">
                              ₹ {product.price}
                            </p>
                            <p className="block_price__shipping">
                              Inclusive of all Taxes
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 end">
                          <div className="block_goodColor">
                            <span className="text_specification">
                              Choose your colors:
                            </span>
                            <div className="block_goodColor__allColors">
                              {colors.map((color, index) => (
                                <Fragment key={index}>
                                  <input
                                    type="radio"
                                    name="colorOfItem"
                                    className="radio_button"
                                    id={`radioColor${index}`}
                                    defaultChecked={index === 0}
                                    checked={selectedColor === color} // Controlled input
                                    onChange={() => setSelectedColor(color)} // Update state on change
                                  />
                                  <label
                                    htmlFor={`radioColor${index}`}
                                    className={`block_goodColor__radio block_goodColor__${color
                                      .trim()
                                      .toLowerCase()}`}
                                    style={{ backgroundColor: color }}
                                  />
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="size-selector">
                        <div className="size-header">
                          <span className="text_specification">
                            Select Size :{" "}
                          </span>
                          {/* <span className="size-chart">SIZE CHART ➤</span> */}
                        </div>
                        <div className="size-options">
                          {product.sizeStock.map(({ size, stock }) => (
                            <div
                              key={size}
                              className={`size-circle ${
                                selectedSize === size ? "selected" : ""
                              } ${stock === 0 ? "out-of-stock" : ""}`}
                              onClick={() => stock > 0 && setSelectedSize(size)}
                            >
                              <span className="size-text">{size}</span>

                              {/* Diagonal Line for Out of Stock */}
                              {stock == 0 && (
                                <div className="diagonal-line"></div>
                              )}

                              {stock >= 3 && (
                                <span
                                  className="low-stock-warning green"
                                  style={{
                                    background: "green",
                                  }}
                                >
                                  {stock} left
                                </span>
                              )}
                              {stock > 0 && stock <= 3 && (
                                <span className="low-stock-warning">
                                  {stock} left
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="block_quantity clearfix">
                        <div className="quantity">
                          <span className="text_specification">Quantity :</span>
                          <div className="block_quantity__chooseBlock">
                            <input
                              className="block_quantity__number"
                              name="quantityNumber"
                              type="text"
                              value={quantity}
                              max={5}
                              min={1}
                              readOnly
                            />
                          </div>
                          <div className="button-id">
                            <button
                              className="block_quantity__button s"
                              onClick={increaseQuantity}
                            >
                              <MdAddCircle />
                            </button>
                            <button
                              className="block_quantity__button d"
                              onClick={decreaseQuantity}
                            >
                              <FaCircleMinus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="desci"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        borderBottom: "1px solid lightgray",
                      }}
                    >
                      <span
                        className="block_product__advantagesProduct"
                        style={{
                          fontWeight: "bolder",
                        }}
                      >
                        Description :
                      </span>
                      <div className="block_descriptionInformation">
                        {description.map((text, index) => (
                          <p key={index}>
                            <span className="about-us-listicons">
                              <svg
                                aria-hidden="true"
                                className="svg-inline--fa fa-check fa-w-14"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path>
                              </svg>
                            </span>
                            <span style={{ marginTop: "10px" }}>{text}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                    <div
                      className="desci"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <span
                          className="block_product__advantagesProduct"
                          style={{
                            fontWeight: "bolder",
                          }}
                        >
                          Rating :
                        </span>
                        <p className="text_specifications">
                          <span
                            style={{
                              color: "black",
                            }}
                          >
                            Customer Reviews ({customerReviews.length}){" "}
                          </span>
                        </p>
                        <div className="review-section">
                          {customerReviews.slice(-5).map((review, index) => (
                            <div key={index} className="review-card">
                              <div className="review-card__header">
                                <div className="review-header">
                                  <span
                                    className={`rating ${
                                      review.rating >= 4.5
                                        ? "high"
                                        : review.rating >= 3
                                        ? "medium"
                                        : "low"
                                    }`}
                                  >
                                    ⭐ {review.rating}
                                  </span>
                                </div>
                                <p className="review-text">{review.review}</p>
                              </div>
                              {review.image && (
                                <div className="review-images">
                                  {review.image.map((img, i) => (
                                    <img
                                      key={i}
                                      src={img}
                                      alt="review"
                                      className="review-img"
                                      onClick={() => handleImageClick()}
                                    />
                                  ))}
                                </div>
                              )}
                              <div className="review-footer">
                                <span className="reviewer-name">
                                  {review.reviewer}
                                </span>
                                |
                                <span className="review-date">
                                  {review.date}
                                </span>
                              </div>
                          
                            </div>
                          ))}
                        </div>
                        <div>
                          <p
                            style={{
                              color: "blue",
                              textAlign: "center",
                              marginTop: "20px",
                            }}
                            onClick={() => setOpen(true)}
                          >
                            View All
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{ padding: 2, position: "relative" }}
            className="Drawer-Open"
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 10, top: 10 }}
            >
              <Close />
            </IconButton>
            <div
              className="desci"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div>
                <span
                  className="block_product__advantagesProduct"
                  style={{
                    fontWeight: "bolder",
                  }}
                >
                  Rating :
                </span>
                <p className="text_specifications">
                  <span
                    style={{
                      color: "black",
                    }}
                  >
                    Customer Reviews ({customerReviews.length}){" "}
                  </span>
                </p>
                <div className="review-section">
                  {customerReviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-card__header">
                        <div className="review-header">
                          <span
                            className={`rating ${
                              review.rating >= 4.5
                                ? "high"
                                : review.rating >= 3
                                ? "medium"
                                : "low"
                            }`}
                          >
                            ⭐ {review.rating}
                          </span>
                        </div>
                        <p className="review-text">{review.review}</p>
                      </div>

                      {review.image && (
                        <div className="review-images">
                          {review.image.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt="review"
                              className="review-img"
                              onClick={() => handleImageClick()}
                            />
                          ))}
                        </div>
                      )}
                      <div className="review-footer">
                        <span className="reviewer-name">{review.reviewer}</span>
                        |<span className="review-date">{review.date}</span>
                      </div>
                   
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </Drawer>
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={reviewImage.map((item) => ({ src: item }))}
          />
        )}
      </main>
    
      <Footer />

    </Fragment>
  );
};

export default ProductDetails;
