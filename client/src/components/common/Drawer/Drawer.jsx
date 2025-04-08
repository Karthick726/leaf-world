import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { LocalShipping, Lock, SupportAgent, Close } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./Drawer.css";

const InfoDrawer = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [heading, setHeading] = useState("");

  const handleOpen = (text, head) => {
    setHeading(head);
    setContent(text);
    setOpen(true);
  };
  return (
    <div
      style={{
        display: "flex",
        color: "white",
        justifyContent: "space-evenly",
        gap: "20px",
        padding: "70px",
        backgroundColor: "#002D18",
      }}
    >
      <div
        onClick={() =>
          handleOpen(
            [
              "We offer free returns within 30 days for all purchases.",
              "Return process is simple and hassle-free.",
            ],
            "Free Return"
          )
        }
        className="div-info"
      >
        <LocalShipping style={styles.icon} />
        <Typography>Free Return</Typography>
      </div>

      <div
        onClick={() => {
          handleOpen(
            [
              "100% Secure Payment with end-to-end encryption.",
              "Multiple payment options available.",
            ],
            "Safe and Secure Payment"
          );
        }}
        className="div-info"
      >
        <Lock style={styles.icon} />
        <Typography>Safe and Secure Payment</Typography>
      </div>

      <div
        onClick={() =>
          handleOpen(
            [
              "24/7 Customer Support available for all queries.",
              "Chat, email, and phone support options.",
            ],
            "Customer Service"
          )
        }
        className="div-info"
      >
        <SupportAgent style={styles.icon} />
        <Typography>Customer Service</Typography>
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ padding: 2, position: "relative" }} className="Drawer-Open">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2 }}
            className="heading-drawer"
          >
            {heading}
          </Typography>
          <Typography>
            <ul>
              {content.map((point, index) => (
                <li key={index} className="li-drawer">
                  <ArrowCircleRightIcon className="icons-drawer" />
                  <Typography className="point-drawer">{point}</Typography>
                </li>
              ))}
            </ul>
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
};

const styles = {
  icon: {
    fontSize: "30px",
    marginBottom: "5px",
  },
};

export default InfoDrawer;
