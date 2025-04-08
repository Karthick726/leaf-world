import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import client from "../../Common/Client/Client";
import toast from "react-hot-toast";
import Loader from "../../Common/Layout/Loader/Loader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const initalData={
    gender:"",
    category:"",
    subCategory:""
}

const Products = () => {
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [product,setProduct]=useState([])
  const [error, setError] = useState({
    category: "",
    gender: "",
  });

  const [subCategory,setSubCategory]=useState(initalData)

  const [errors, setErrors] = useState({
    category: "",
    gender: "",
    subCategory:""
  });


  //Category form 
  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "category") {
      if (fieldValue.length < 3) {
        message = "Please enter a valid Category";
      } else {
        message = "";
      }
    }

    return { message: message };
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `Category is required`,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setCategory(value);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!category.trim()) {
      newErrors.category = "Fill category for a products";
    } else if (category.length < 3) {
      newErrors.category = "Please enter a valid category";
    }

    if (!gender) {
      newErrors.gender = "Select gender for a products";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    toast.dismiss();

    e.preventDefault();

    if (!validateForm()) return;

    const formData = { gender, category };
    setLoading(true);
    try {
      const response = await client.post("/products/product-name", formData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setLoading(false);
        toast.success("Products category added successfully");
        setCategory("")
        setGender("")
        setError({
            category: "",
            gender: "",
        })
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      }if (err.response && err.response.status === 400) {
        toast.error("Category already done for this gender");
      } else {
        console.log(err);
      }
    }
  };


  //subCategory
  const fetchProducts = async (gender) => {
    console.log("Fetching products for:", gender);
  
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

  const handlesubBlur=(e)=>{
    const { name, value } = e.target;
    if (value === "") {
      setErrors((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  }


  const handlesubChange=(e)=>{
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setErrors((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setSubCategory({
        ...subCategory,
        [name]: value
    });
  }


  const subvalidateForm = () => {
    let newErrors = {};
  
    if (!subCategory.category.trim()) {
      newErrors.category = "Please select a category for the product";
    } else if (subCategory.category.length < 3) {
      newErrors.category = "Category name must be at least 3 characters long";
    }
  
    if (!subCategory.gender.trim()) {
      newErrors.gender = "Please select a gender for the product";
    }
  
    if (!subCategory.subCategory.trim()) {
      newErrors.subCategory = "Subcategory cannot be empty";
    } else if (subCategory.subCategory.length < 3) {
      newErrors.subCategory = "Subcategory name must be at least 3 characters long";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handlesubSubmit=async(e)=>{
    e.preventDefault();
    toast.dismiss();
    if (!subvalidateForm()) return;
    
    setLoading(true);


    try {
      const response = await client.post("/products/add-subCategory", subCategory, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success(" sub-category added successfully");
         setSubCategory(initalData)
        setErrors({
            category: "",
            gender: "",
            subCategory: "",
        })
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      }if (err.response && err.response.status === 400) {
        toast.error("sub Category already done for this gender");
      } else {
        console.log(err);
      }
    }
    

  }
  



  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav style={{ marginTop: "10px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Products-category</li>
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
                Add Product Category
              </h5>

              <Grid container spacing={2}>
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <FormControl error={!!error.gender}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender *
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={gender}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setGender(e.target.value)
                        setError({
                          ...error,
                          gender: "",
                        })
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
                    {error.gender && (
                      <FormHelperText>{error.gender}</FormHelperText>
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
                  <TextField
                    label="Product Category"
                    fullWidth
                    required
                    name="category"
                    value={category}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[A-Za-z.,_-]$/;

                      if (category.length === 0 && e.key === " ") {
                        e.preventDefault();
                        return;
                      }

                      // Check if the pressed key is not allowed
                   
                    }}
                    onChange={handleChange}
                    error={!!error.category}
                    onBlur={handleBlur}
                    helperText={error.category}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 20,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </section>

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
                Add Product sub-Category
              </h5>

              <Grid container spacing={2}>
                <Grid
                  item
                  size={{
                    xs: 12,
                  }}
                  style={{
                    marginTop:"17px"
                  }}
                >
                  <FormControl error={!!errors.gender} >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender *
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={subCategory.gender}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        const selectedGender = e.target.value;
                        setSubCategory({ ...subCategory, gender: selectedGender });
                        setErrors({
                          ...errors,
                          gender: "",
                        })
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
  <InputLabel id="category-select-label">Category *</InputLabel>
  <Select
    labelId="category-select-label"
    id="category-select"
    value={subCategory.category || ""}
    onChange={(e) => {
      setSubCategory({ ...subCategory, category: e.target.value })
      setErrors({
        ...errors,
        category: "",
      })
    }} // Update state
    label="Category"
   
  >
    {product.length===0 &&
    <MenuItem>
    Just select the Gender to get category
    </MenuItem>
    }
    {product.map((product) => (
      <MenuItem key={product._id} value={product.category}>
        {product.category}
      </MenuItem>
    ))}
  </Select>
  {errors.category && (
                      <FormHelperText style={{
                        color:"red"
                      }}>{errors.category}</FormHelperText>
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
                  <TextField
                    label="Product Sub-Category"
                    fullWidth
                    required
                    name="subCategory"
                    value={subCategory.subCategory}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[A-Za-z.,_-]$/;

                      if (subCategory.subCategory.length === 0 && e.key === " ") {
                        e.preventDefault();
                        return;
                      }

                      // Check if the pressed key is not allowed
                    //   if (
                    //     !allowedKeys.includes(e.key) &&
                    //     !allowedCharPattern.test(e.key)
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    }}
                    onChange={handlesubChange}
                    error={!!errors.subCategory}
                    onBlur={handlesubBlur}
                    helperText={errors.subCategory}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 20,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={handlesubSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </section>
      </main>
      {loading && <Loader />}
    </Fragment>
  );
};

export default Products;
