import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./ProductManage.css";
import toast from "react-hot-toast";
import { Modal, Form, FormLabel } from "react-bootstrap";
import { Popconfirm } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import client from "../../../Common/Client/Client";
import Loader from "../../../Common/Layout/Loader/Loader";

const initalData = {
  gender: "",
  category: "",
  subCategory: "",
  productName: "",
  productDescription: "",
  productPrice: "",
  color: "",
};

const ProductsManage = () => {
  const [loading, setLoading] = useState(false);
  const [productsId, setProductsId] = useState("");
  const [singleProducts, setSingleProducts] = useState(false);
  const [subCategory, setSubCategory] = useState(initalData);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [sizeStock, setSizeStock] = useState([]);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [showAddImage, setShowAddImage] = useState(0);
  const [showImage, setShowImage] = useState([]);
  const [errors, setErrors] = useState({
    category: "",
    gender: "",
    subCategory: "",
    size: "",
    stock: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    images: "",
    color: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  console.log(
    sizeStock.map((value) => {
      return value;
    })
  );

  const handleUpdate = (product) => {
    setSubCategory((pre) => {
      return {
        ...pre,
        productName: product.productName,
        productDescription: product.description,
        productPrice: product.price,
        color: product.color,
      };
    });
    setProductsId(product._id);
    setImages(product.image);
    setSizeStock(product.sizeStock);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchProducts = async (gender) => {
    const endpoint =
      gender === "men"
        ? "/products/get-menProducts"
        : gender === "women"
        ? "/products/get-womenProducts"
        : "/products/get-kidsProducts";

    try {
      const response = await client.get(endpoint, { withCredentials: true });

      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  const fetchParticular = async () => {
    console.log(subCategory);
    setSingleProducts(true);
  };

  const handleAddSize = () => {
    setSizeStock((pre) => {
      return [...pre, { size: "", stock: "" }];
    });
  };

  const isAddDisabled = () => {
    return sizeStock.some(
      (sizeStock) => sizeStock.size === "" || sizeStock.stock === ""
    );
  };

  const handleRemoveSize = (index) => {
    if (sizeStock.length > 1) {
      const newSize = sizeStock.filter((_, i) => i !== index);
      setSizeStock(newSize);
      setErrors((pre) => {
        return { ...pre, size: "", stock: "" };
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setErrors((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };

  const cancel = (e) => {
    toast.error("You Cancle delete");
  };

  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "productName") {
      if (fieldValue.length < 3) {
        message = "Product name must be at least 3 characters long";
      } else {
        message = "";
      }
    }

    if (fieldName === "color") {
      if (fieldValue.length < 3) {
        message = "color must be at least 3 characters long";
      } else {
        message = "";
      }
    }

    if (fieldName === "productPrice") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 2) {
        message = "Product Price needs at least 2 characters";
      } else if (numericValue.length > 10) {
        message = "Product Price is too long";
      } else if (/^0/.test(numericValue)) {
        message = "Product Price cannot start with 0";
      } else {
        message = "";
      }
    }

    if (fieldName === "productDescription") {
      if (fieldValue.length < 10) {
        message = "Product description must be at least 10 characters long";
      } else {
        message = "";
      }
    }

    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setErrors((prevError) => ({
      ...prevError,
      [name]: err,
    }));

    setSubCategory((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const imageChange = (event) => {
    setImages([]);
    const files = Array.from(event.target.files);
    let totalSize = images.reduce((acc, img) => acc + img.size, 0);

    files.forEach((selectedFile) => {
      if (selectedFile) {
        const fileType = selectedFile.type;
        if (fileType.startsWith("image/")) {
          if (totalSize + selectedFile.size > 5 * 1024 * 1024) {
            // 5MB limit
            setErrors((prev) => ({
              ...prev,
              images: "Total image size should not exceed 5MB",
            }));
            return;
          }

          totalSize += selectedFile.size;

          const reader = new FileReader();
          reader.onload = function () {
            setImages((prev) => [...prev, selectedFile]);
          };
          reader.readAsDataURL(selectedFile);

          setErrors((prev) => ({ ...prev, images: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            images: "Please select an image file",
          }));
        }
      }
    });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;
    setErrors((prevError) => ({
      ...prevError,
      [name]: err,
    }));

    if (name === "size") {
      setSizeStock(
        sizeStock.map((item, i) =>
          i === index ? { ...item, size: e.target.value } : item
        )
      );
    } else {
      setSizeStock(
        sizeStock.map((item, i) =>
          i === index ? { ...item, stock: e.target.value } : item
        )
      );
    }
  };

  const validateProductsForm = () => {
    let newErrors = {};
    if (!subCategory.category.trim()) {
      newErrors.category = "Select category for a products";
    } else if (subCategory.category.length < 3) {
      newErrors.category = "Please enter a valid category";
    }

    if (!subCategory.color.trim()) {
      newErrors.color = "Fill color for a products";
    } else if (subCategory.color.length < 3) {
      newErrors.productName = "Please enter a valid color";
    }

    if (!subCategory.subCategory.subCategoryName) {
      newErrors.subCategory = "Select sub category for a products";
    } else if (subCategory.subCategory.subCategoryName.length < 3) {
      newErrors.subCategory = "Please enter a valid sub category";
    }
    if (!subCategory.productDescription.trim()) {
      newErrors.productDescription = "Fill description for a products";
    } else if (subCategory.productDescription.length < 10) {
      newErrors.productDescription = "Please enter a valid description";
    }

    if (!subCategory.productName.trim()) {
      newErrors.productName = "Fill productName for a products";
    } else if (subCategory.productName.length < 3) {
      newErrors.productName = "Please enter a valid productName";
    }

    if (images.length === 0) {
      newErrors.images = "Please select images for a products";
    }

    if (!subCategory.gender) {
      newErrors.gender = "Select gender for a products";
    }

    if (!subCategory.productPrice.trim()) {
      newErrors.productPrice = "Fill price for a products";
    } else if (subCategory.productPrice < 0) {
      newErrors.productPrice = "Please enter a valid price";
    }

    if (sizeStock.some((value) => value.size === "")) {
      newErrors.size = "Please  fill size  for a products";
    }

    if (sizeStock.some((value) => value.stock === "")) {
      newErrors.stock = "Please fill stock for a products";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!validateProductsForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("category", subCategory.category);
    formData.append("gender", subCategory.gender);
    formData.append("subCategoryId", subCategory.subCategory._id);
    formData.append("productId", productsId);
    formData.append("color", subCategory.color);
    formData.append("productName", subCategory.productName);
    formData.append("productDescription", subCategory.productDescription);
    formData.append("productPrice", subCategory.productPrice);
    images.forEach((value) => {
      formData.append("images", value);
    });
    sizeStock.forEach((value) => {
      formData.append("sizeStock", JSON.stringify(value));
    });
    try {
      const response = await client.post(
        "/products/update-products",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        toast.success("Product update successfully");
        setSubCategory(initalData);
        setImages([]);
        setSizeStock([[]]);
        setSubCategoryList([]);
        setSingleProducts(false);
        setShowPopup(false);
        setShowAddImage(0);
        setShowImage([]);
        setErrors({
          category: "",
          gender: "",
          subCategory: "",
          size: "",
          stock: "",
          productName: "",
          productDescription: "",
          productPrice: "",
          images: "",
        });
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      }
      if (err.response && err.response.status === 400) {
        toast.error("sub Category already done for this gender");
      } else {
        console.log(err);
      }
    }
  };

  const handleDelete = async (value) => {
    setProductsId(value._id);
    toast.dismiss();
    setLoading(true);
    try {
      const response = await client.post(
        "/products/delete-products",
        {
          category: subCategory.category,
          gender: subCategory.gender,
          subCategoryId: subCategory.subCategory._id,
          productId: productsId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast.success("Product delete successfully");
        setSingleProducts(false);
        setSubCategory(initalData);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      }
    }
  };

  console.log(productsId);
  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav style={{ marginTop: "10px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Manage/Products</li>
            </ol>
          </nav>
        </div>
        <section
          className="section dashboard"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
            <div className="card-body" style={{ padding: "20px" }}>
              <h5
                className="card-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Update Product Details
              </h5>

              <Grid container spacing={0}>
                <h6 className="card-title" style={{ textAlign: "center" }}>
                  Select Product Categroy and sub-categroy
                </h6>
                <Grid
                  item
                  size={{
                    xs: 12,
                  }}
                >
                  <FormControl error={!!errors.gender}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender *
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={subCategory.gender}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        const selectedGender = e.target.value;
                        setSubCategory({
                          ...subCategory,
                          gender: selectedGender,
                        });
                        setErrors({
                          ...errors,
                          gender: "",
                        });
                        fetchProducts(selectedGender);
                      }}
                    >
                      <FormControlLabel
                        value="kids"
                        control={<Radio />}
                        label="Kids"
                      />
                      <FormControlLabel
                        value="men"
                        control={<Radio />}
                        label="Men"
                      />
                      <FormControlLabel
                        value="women"
                        control={<Radio />}
                        label="Women"
                      />
                    </RadioGroup>
                    {errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="category-select-label">
                      Category *
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={subCategory.category || ""}
                      onChange={(e) => {
                        const selectedCategory = e.target.value;

                        const selectedProduct = product.find(
                          (p) => p.category === selectedCategory
                        );

                        setSubCategoryList(selectedProduct?.subCategory || []);

                        setSubCategory({
                          ...subCategory,
                          category: selectedCategory,
                          subCategory: "",
                        });

                        setErrors({
                          ...errors,
                          category: "",
                        });
                      }}
                      label="Category"
                    >
                      {product.length === 0 && (
                        <MenuItem disabled>
                          Just select the Gender to get category
                        </MenuItem>
                      )}
                      {product.map((product) => (
                        <MenuItem key={product._id} value={product.category}>
                          {product.category}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category && (
                      <FormHelperText
                        style={{
                          color: "red",
                        }}
                      >
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="subcategory-select-label">
                      Sub-Category *
                    </InputLabel>
                    <Select
                      labelId="subcategory-select-label"
                      id="subcategory-select"
                      value={subCategory.subCategory || ""}
                      onChange={(e) => {
                        setSubCategory({
                          ...subCategory,
                          subCategory: e.target.value,
                        });
                        setErrors({
                          ...errors,
                          subCategory: "",
                        });
                      }}
                      label="Sub-Category"
                    >
                      {subCategoryList.length === 0 && (
                        <MenuItem disabled>Select a category first</MenuItem>
                      )}
                      {subCategoryList.map((sub) => (
                        <MenuItem key={sub} value={sub}>
                          {sub.subCategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.subCategory && (
                      <FormHelperText style={{ color: "red" }}>
                        {errors.subCategory}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={fetchParticular}
              >
                Submit
              </Button>
            </div>
          </div>
        </section>

        {singleProducts && (
          <section
            className="section dashboard"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "70px",
            }}
          >
            <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
              <div className="card-body" style={{ padding: "20px" }}>
                <h5
                  className="card-title"
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Filter Product Details
                </h5>
                <div className="product-update">
                  {subCategory?.subCategory?.products?.map((value) => (
                    <div
                      key={value.id}
                      className="product-card"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          className="products-update-image"
                          src={value.image[0]?.secure_url}
                          alt="Product"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                      </div>
                      <div
                        style={{ marginLeft: "10px" }}
                        className="price-update"
                      >
                        <p
                          style={{
                            marginBottom: "10px",
                            textAlign: "left",
                            fontSize: "18px",
                            color: "#787878",
                          }}
                        >
                          {value.productName}
                        </p>
                        <p
                          style={{
                            marginBottom: "10px",
                            textAlign: "left",
                            color: "green",
                          }}
                        >
                          ₹ {value.price}
                        </p>
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdate(value)}
                          className="table-button button-table"
                          style={{
                            marginRight: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          Update
                        </Button>

                        <Popconfirm
                          title="Delete the products Details"
                          description="Are you sure to delete this products Details?"
                          onConfirm={() => handleDelete(value)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          className="table-button"
                        >
                          <Button
                            variant="contained"
                            color="error"
                            className="table-button"
                            style={{
                              marginBottom: "5px",
                            }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                        {/* <button
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleDelete(value)}
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <div>
          <Modal
            show={showPopup}
            onHide={() => {
              setShowPopup(false);
              setSubCategory((pre) => {
                return {
                  ...pre,
                  productName: "",
                  productDescription: "",
                  productPrice: "",
                };
              });
              setSizeStock([]);
              setImages([]);
              setLoading(false);
              setShowImage([]);
              setShowAddImage(0);
              setErrors((pre) => {
                return {
                  ...pre,
                  category: "",
                  gender: "",
                  subCategory: "",
                  size: "",
                  stock: "",
                  productName: "",
                  productDescription: "",
                  productPrice: "",
                  images: "",
                };
              });
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update products Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <div className="mt-2">
                    <div className="mt-1 p-3">
                      <TextField
                        label="Product name"
                        required
                        fullWidth
                        value={subCategory.productName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!errors.productName}
                        helperText={errors.productName}
                        name="productName"
                        variant="outlined"
                        margin="normal"
                        slotProps={{
                          htmlInput: {
                            maxLength: 100,
                          },
                        }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="mt-2">
                    <div className="mt-1 p-3">
                      <TextField
                        label="Product Price"
                        value={subCategory.productPrice}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!errors.productPrice}
                        helperText={errors.productPrice}
                        required
                        fullWidth
                        name="productPrice"
                        variant="outlined"
                        margin="normal"
                        slotProps={{
                          htmlInput: {
                            maxLength: 5,
                          },
                        }}
                        onKeyDown={(e) => {
                          const allowedKeys = [
                            "Backspace",
                            "ArrowLeft",
                            "ArrowRight",
                            "Delete",
                            "Tab",
                          ];
                          const allowedCharPattern = /^[0-9+]$/;

                          // Check if the pressed key is not allowed
                          if (
                            !allowedKeys.includes(e.key) &&
                            !allowedCharPattern.test(e.key)
                          ) {
                            e.preventDefault(); // Prevent the default action of the disallowed key
                          }
                        }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="mt-2">
                    <div className="mt-1 p-3">
                      <TextField
                        label="color"
                        required
                        fullWidth
                        value={subCategory.color}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!errors.color}
                        helperText={errors.color}
                        name="color"
                        variant="outlined"
                        margin="normal"
                        slotProps={{
                          htmlInput: {
                            maxLength: 100,
                          },
                        }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="mb-2" style={{ width: "100%" }}>
                    <div>
                      <p>Image</p>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      {showAddImage === 1 ? (
                        <>
                          <div className="mt-2">
                            <div className="mt-1 p-3">
                              <div className="mb-3">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="pdfFileInput"
                                  onChange={imageChange}
                                  multiple
                                  name="images"
                                  accept="image/jpeg, image/png, image/jpg"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            {showImage?.length === 0 ? (
                              <></>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-evenly",
                                  alignItems: "center",
                                  marginTop: "10px",
                                }}
                              >
                                {showImage.map((image, index) => (
                                  <div key={index}>
                                    <img
                                      src={image}
                                      alt=""
                                      width="100px"
                                      height="100px"
                                    />
                                  </div>
                                ))}
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => {
                                    setShowImage([]);
                                    setImages([]);
                                    setShowAddImage(1);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="image-delete-button">
                          {images.map((image, index) => (
                            <div key={index}>
                              <img
                                src={image.secure_url}
                                alt=""
                                width="100px"
                                height="100px"
                              />
                            </div>
                          ))}
                          <Button
                            variant="contained"
                            color="error"
                            className="button-update-delete"
                            onClick={() => {
                              setShowAddImage(1);
                              setImages([]);
                              setShowImage([]);
                            }}
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                      {errors.images && (
                        <div
                          style={{
                            color: "red",
                            marginLeft: "20px",
                            fontSize: "13px",
                          }}
                        >
                          {errors.images}
                        </div>
                      )}
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="mt-2">
                    <div className="mt-1 p-3">
                      <TextField
                        label="Product Description"
                        value={subCategory.productDescription}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.productDescription}
                        helperText={errors.productDescription}
                        name="productDescription"
                        variant="outlined"
                        margin="normal"
                        slotProps={{
                          htmlInput: {
                            maxLength: 200,
                          },
                        }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="mt-2">
                    <div className="mt-1 p-3">
                      <Grid container textAlign="left" spacing={2}>
                        <Grid
                          item
                          size={{
                            sm: 6,
                          }}
                        >
                          <FormLabel>
                            <span>Size and Stock</span>
                          </FormLabel>
                        </Grid>
                        <Grid
                          size={{
                            sm: 6,
                          }}
                          style={{ justifyContent: "flex-end" }}
                          item
                          container
                        >
                          <Button
                            variant="contained"
                            color="success"
                            style={{ marginRight: "10px", textAlign: "right" }}
                            onClick={handleAddSize}
                            disabled={isAddDisabled()}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                      {sizeStock.map((sizeStock, index) => (
                        <Grid
                          container
                          alignItems="center"
                          spacing={2}
                          key={index}
                        >
                          <Grid item size={{ xs: 12, sm: 5 }}>
                            <TextField
                              label="Size"
                              variant="outlined"
                              fullWidth
                              required
                              margin="normal"
                              value={sizeStock.size}
                              name="size"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleSizeChange(index, e);
                              }}
                              slotProps={{
                                htmlInput: {
                                  maxLength: 5,
                                },
                              }}
                              onKeyDown={(e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ];
                                const allowedCharPattern = /^[A-Za-z0-9()._-]$/;

                                // Check if the pressed key is not allowed
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
                                  e.preventDefault(); // Prevent the default action of the disallowed key
                                }

                                // Prevent spaces as the first character
                                if (
                                  sizeStock.size.length === 0 &&
                                  e.key === " "
                                ) {
                                  e.preventDefault();
                                  return;
                                }

                                // Check if the pressed key is not allowed
                              }}
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, sm: 5 }}>
                            <TextField
                              label="Stock"
                              variant="outlined"
                              fullWidth
                              required
                              margin="normal"
                              name="stock"
                              value={sizeStock.stock}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                handleSizeChange(index, e);
                              }}
                              slotProps={{
                                htmlInput: {
                                  maxLength: 4,
                                },
                              }}
                              onKeyDown={(e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ];
                                const allowedCharPattern = /^[0-9()._-]$/;

                                // Check if the pressed key is not allowed
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
                                  e.preventDefault(); // Prevent the default action of the disallowed key
                                }

                                // Prevent spaces as the first character
                                if (
                                  sizeStock.stock.length === 0 &&
                                  e.key === " "
                                ) {
                                  e.preventDefault();
                                  return;
                                }

                                // Check if the pressed key is not allowed
                              }}
                            />
                          </Grid>

                          <Grid
                            item
                            size={{ xs: 12, sm: 2 }}
                            justifyContent="flex-end"
                          >
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleRemoveSize(index)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      <FormHelperText error>{errors.size}</FormHelperText>
                      <FormHelperText error>{errors.stock}</FormHelperText>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="primary"
                onClick={handleProductSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
      {loading && <Loader />}
    </Fragment>
  );
};

export default ProductsManage;
