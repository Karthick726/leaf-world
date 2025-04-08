import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../../../assets/images/logo1.png";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie"

const DesktopMeni = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsAuthenticated(true);
      setOpen(false);
    }
  }, [document.cookie]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="logo">
        <img src={logo1} alt="logo" />
      </div>
      <div className="leafname">
        <p>Leaf World</p>
      </div>
      <div className="loginmenu">
        <div
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <AccountCircleIcon fontSize="large" />
        </div>

        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: { xs: 280, sm: 350, md: 400 },
              backgroundColor: "#f5f5f5",
              color: "#333",
              padding: "25px",
              borderRadius: "10px 0 0 10px",
            },
          }}
        >
          {isMobile && (
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "red",
              }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )}

          <List sx={{ textAlign: "center" }}>
            <ListItem>
              <ListItemText
                primary="Welcome to Leaf World!"
                primaryTypographyProps={{
                  fontSize: { xs: 22, sm: 25 },
                  fontWeight: "bold",
                  color: "#004d40",
                }}
              />
            </ListItem>
            <Divider sx={{ marginBottom: 2 }} />

            {isAuthenticated ? (
              <>
                <ListItem
                  button
                  onClick={() => navigate("/home-profile")}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#e0f2f1",
                    marginBottom: 1,
                  }}
                >
                  <ListItemText
                    primary="My Profile"
                    primaryTypographyProps={{ fontSize: 18 }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => navigate("/home-Online-orders")}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#e0f2f1",
                    marginBottom: 1,
                  }}
                >
                  <ListItemText
                    primary="My Orders & Returns"
                    primaryTypographyProps={{ fontSize: 18 }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => navigate("/customer-service")}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#e0f2f1",
                    marginBottom: 1,
                  }}
                >
                  <ListItemText
                    primary="Customer Service"
                    primaryTypographyProps={{ fontSize: 18 }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#ffebee",
                    marginTop: 1,
                  }}
                >
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#d32f2f",
                    }}
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/register")}
                    sx={{
                      backgroundColor: "#002D18",
                      color: "white",
                      fontSize: 18,
                      padding: "10px",
                      borderRadius: 3,
                    }}
                  >
                    Login
                  </Button>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="New here? Create an account to explore our collections!"
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#666",
                    }}
                  />
                </ListItem>

                <ListItem>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/register")}
                    sx={{
                      backgroundColor: "#7A8D71",
                      color: "white",
                      fontSize: 18,
                      padding: "10px",
                      borderRadius: 3,
                    }}
                  >
                    Register
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>

        <Badge badgeContent={4} color="success">
          <FavoriteBorderIcon />
        </Badge>
        <Badge badgeContent={4} color="success">
          <ShoppingCartIcon />
        </Badge>
      </div>
    </>
  );
};

export default DesktopMeni;
