import React, { useState } from "react";
import {
  Container, Typography, Card, 
  CardContent, Button, Box, 
  Collapse, IconButton, Grid
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import Header from "../../../common/layout/header/Header";
import Footer from "../../../common/layout/footer/Footer";

// FAQ Data
const faqData = [
  { question: "How do I place an order?", answer: "To place an order, browse the products, add items to your cart, and proceed to checkout.", category: "Order" },
  { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, UPI, net banking, and cash on delivery (COD).", category: "Payment" },
  { question: "How can I track my order?", answer: "You can track your order from the 'My Orders' section after logging into your account.", category: "Shipping" },
  { question: "What is the return policy?", answer: "You can return products within 7 days of delivery if they meet the return conditions.", category: "Refund" },
  { question: "How do I update my account details?", answer: "You can update your name, email, and password in the 'My Account' section.", category: "My Account" },
  { question: "Do you offer discounts on bulk purchases?", answer: "Yes, we offer discounts on bulk purchases. Contact support for more details.", category: "Product Info" },
  { question: "How can I contact customer support?", answer: "You can reach out via email or call our helpline.", category: "General Queries" }
];

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  textTransform: "none",
  fontWeight: "bold",
  padding: "8px 16px",
  minWidth: "120px",
  transition: "0.3s ease-in-out",
  background: "linear-gradient(135deg, #2E7D32, #81C784)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(135deg, #1B5E20, #66BB6A)",
  },
}));

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Categories list
  const categories = ["All", "Product Info", "General Queries", "My Account", "Refund", "Shipping", "Order", "Payment"];

  // Filter FAQs based on category
  const filteredFaqs = selectedCategory === "All" ? faqData : faqData.filter(faq => faq.category === selectedCategory);

  // Toggle Expand/Collapse
  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <Box sx={{ background: "linear-gradient(135deg,rgba(21, 26, 22, 0.39), #C8E6C9)", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Frequently Asked Questions
          </Typography>

          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            How can we help you?
          </Typography>

          {/* Category Buttons */}
          <Grid container spacing={1} justifyContent="center" sx={{ mb: 4 }}>
            {categories.map((category) => (
              <Grid item key={category}>
                <Button
                  variant={selectedCategory === category ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "30px",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    background: selectedCategory === category ? "linear-gradient(135deg, #2E7D32, #81C784)" : "transparent",
                    color: selectedCategory === category ? "black" : "#1B5E20",
                    border: "2px solid #2E7D32",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1B5E20, #66BB6A)",
                      color: "white",
                    }
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Display Filtered FAQs */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <StyledCard key={index} elevation={3}>
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {faq.question}
                  </Typography>
                  <IconButton onClick={() => handleExpand(index)}>
                    <ExpandMoreIcon
                      sx={{
                        transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "0.3s"
                      }}
                    />
                  </IconButton>
                </CardContent>
                <Collapse in={expandedIndex === index}>
                  <CardContent sx={{ bgcolor: "#F1F8E9", borderRadius: "8px" }}>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Collapse>
              </StyledCard>
            ))
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No FAQs available for this category.
            </Typography>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Faq;
