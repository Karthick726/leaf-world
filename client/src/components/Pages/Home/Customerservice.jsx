import React, { useState } from "react";
import Header from "../../common/layout/header/Header";
import Footer from "../../common/layout/footer/Footer";
import client from "../../common/Client/Client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  Box,
  Stack,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  ordernumber: Yup.string()
    .required("Order number is required")
    .min(3, "Order number must be at least 3 characters"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover fieldset": {
      borderColor: "#4CAF50",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2E7D32",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2E7D32",
  },
  "& .MuiFormHelperText-root": {
    margin: "4px 0 0 0",
    fontSize: "0.75rem",
  },
};

function CustomerService() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      email: "",
      phoneCode: "+91",
      phoneNumber: "",
      ordernumber: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await client.post("/usercontactenquiry/create", {
          ...values,
          phoneNumber: `${values.phoneCode}${values.phoneNumber}`,
        });
        setSnackbarMessage("Form submitted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        resetForm();
      } catch (error) {
        setSnackbarMessage(
          error.response?.data?.message || "Failed to submit. Please try again."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        background: "linear-gradient(135deg, rgba(21, 26, 22, 0.39), #C8E6C9)",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          <Card
            sx={{
              flex: 2,
              p: 4,
              boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
              borderRadius: "20px",
              backgroundColor: "white",
              position: "relative",
              overflow: "hidden",
              minWidth: { md: "650px" },
              maxWidth: { md: "800px" },
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: "linear-gradient(90deg, #2E7D32, #81C784)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight="bold"
                color="#1B5E20"
                gutterBottom
                sx={{
                  position: "relative",
                  mb: 4,
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #2E7D32, #81C784)",
                    margin: "10px auto",
                    borderRadius: "2px",
                  },
                }}
              >
                Customer Support
              </Typography>

              <form onSubmit={formik.handleSubmit} noValidate>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  sx={inputStyles}
                >
                  <InputLabel>Select Title *</InputLabel>
                  <Select
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Select Title *"
                  >
                    {["Mr", "Mrs", "Miss"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.title && formik.errors.title && (
                    <FormHelperText error>{formik.errors.title}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Name *"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Email *"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={inputStyles}
                />

                <Stack direction="row" spacing={2} mt={2}>
                  <FormControl sx={{ width: "35%", ...inputStyles }}>
                    <InputLabel>Country Code *</InputLabel>
                    <Select
                      name="phoneCode"
                      value={formik.values.phoneCode}
                      onChange={formik.handleChange}
                      label="Country Code *"
                    >
                      {countryCodes.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.country} ({item.code})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    name="phoneNumber"
                    type="tel"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={inputStyles}
                  />
                </Stack>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Order Number *"
                  name="ordernumber"
                  value={formik.values.ordernumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.ordernumber &&
                    Boolean(formik.errors.ordernumber)
                  }
                  helperText={
                    formik.touched.ordernumber && formik.errors.ordernumber
                  }
                  sx={inputStyles}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  error={
                    formik.touched.subject && Boolean(formik.errors.subject)
                  }
                  sx={inputStyles}
                >
                  <InputLabel>Select Subject *</InputLabel>
                  <Select
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Select Subject *"
                  >
                    {[
                      "Order Issue",
                      "Payment Issue",
                      "Product Inquiry",
                      "Shipping Delay",
                      "Other",
                    ].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.subject && formik.errors.subject && (
                    <FormHelperText error>
                      {formik.errors.subject}
                    </FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Message *"
                  name="message"
                  multiline
                  rows={4}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                  sx={inputStyles}
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={formik.isSubmitting}
                  sx={{
                    mt: 4,
                    bgcolor: "#2E7D32",
                    "&:hover": {
                      bgcolor: "#1B5E20",
                    },
                    fontSize: "1.1rem",
                    py: 1.8,
                    fontWeight: "bold",
                    borderRadius: "10px",
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  {formik.isSubmitting ? (
                    <Stack direction="row" spacing={2} alignItems="center">
                      <CircularProgress size={20} color="inherit" />
                      <span>Submitting...</span>
                    </Stack>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              p: 4,
              boxShadow: 6,
              borderRadius: 3,
              backgroundColor: "#F1F8E9",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "130px", // Adjust size as needed

                height: "130px", // Adjust size as needed
                backgroundColor: "#1B5E20", // Dark green color
                clipPath: "polygon(100% 0, 0 0, 100% 100%)", // Creates a triangular shape
              },
            }}
          >
            <CardContent sx={{ position: "relative", zIndex: 6 }}>
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight="bold"
                color="#1B5E20"
              >
                Need Help?
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                fontSize="1.3rem"
                color="#424242"
              >
                Our Customer Service is available Monday to Friday, from 10:30
                AM to 5:30 PM.
                <br />
                <br />
                <strong style={{ fontSize: "1.2rem", color: "#2E7D32" }}>
                  +91 120 4092045*
                </strong>
                <br />
                (Charges may apply as per your service provider.)
                <br />
                <br />
                <strong>FAQ</strong>
                <br />
                Find answers in our frequently asked questions.
                <br />
                <a
                  href="/home-faq"
                  style={{
                    color: "#388E3C",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  View FAQ
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}

export default CustomerService;
