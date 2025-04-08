import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal as AntdModal } from "antd";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import client from "../../../Common/Client/Client";

function ManageCarousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      const response = await client.get("/coursel");
      setCarouselItems(response.data);
    } catch (error) {
      console.error("Error fetching carousel:", error);
    }
  };

  const handleEdit = (item) => {
    if (!item || !(item.id || item._id)) {
      setSnackbar({ open: true, message: "Invalid item selected for update", severity: "error" });
      return;
    }
    setEditItem({ ...item, id: item.id || item._id });
    setSelectedImage(item.image);
    setOpenModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setEditItem((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = async () => {
    if (!editItem || !editItem.id) {
      setSnackbar({ open: true, message: "Invalid item selected for update", severity: "error" });
      return;
    }
  
    const letterRegex = /^[A-Za-z\s]+$/;
  
    if (!letterRegex.test(editItem.title) || editItem.title.length > 30) {
      setSnackbar({ open: true, message: "Title should contain only letters and be max 30 characters!", severity: "error" });
      return;
    }
  
    if (!letterRegex.test(editItem.description) || editItem.description.length > 30) {
      setSnackbar({ open: true, message: "Description should contain only letters and be max 30 characters!", severity: "error" });
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", editItem.title);
      formData.append("description", editItem.description);
      if (editItem.image instanceof File) {
        formData.append("image", editItem.image);
      }
  
      await client.put(`/coursel/${editItem.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setOpenModal(false);
      setSnackbar({ open: true, message: "Carousel updated successfully!", severity: "success" });
      fetchCarousel();
    } catch (error) {
      setSnackbar({ open: true, message: "Update failed!", severity: "error" });
    }
  };
  
  
  const handleDelete = (id) => {
    if (!id) {
      setSnackbar({ open: true, message: "Invalid item ID", severity: "error" });
      return;
    }
  
    AntdModal.confirm({
      title: "Are you sure?",
      content: "Do you really want to delete this carousel item? This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await client.delete(`/coursel/${id}`);
          if (response.status === 200) {
            setSnackbar({ open: true, message: "Carousel deleted successfully!", severity: "success" });
            fetchCarousel();
          } else {
            throw new Error("Delete failed!");
          }
        } catch (error) {
          console.error("Error deleting carousel:", error);
          setSnackbar({ open: true, message: "Delete failed!", severity: "error" });
        }
      },
    });
  };
  
  
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <nav style={{ marginTop: "10px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage Carousel</li>
          </ol>
        </nav>
      </div>

      {/* Responsive Table */}
      <Table sx={{ minWidth: 650, mt: 3, borderRadius: "8px", boxShadow: 3 }}>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Image</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carouselItems.map((item) => (
            <TableRow key={item.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}>
              <TableCell>
                <img src={item.image} alt={item.title} style={{ width: 200, height: 200, borderRadius: "40px" }} />
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>{item.title}</TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>{item.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(item)} color="primary">
                  <Edit fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id || item._id)} color="error">
  <Delete fontSize="large" />
</IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
    
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Edit Carousel
          </Typography>

          {/* Image Preview */}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 200,
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
          )}

          {/* File Upload */}
          <Button variant="contained" component="label" style={{color:"#002D18", backgroundColor:"#7A8D71"}}>
            Upload New Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          {/* Title Input */}
          <TextField
  fullWidth
  margin="normal"
  label="Title"
  value={editItem?.title || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setEditItem({ ...editItem, title: value });
    }
  }}
  sx={{ fontSize: "1rem" }}
/>

<TextField
  fullWidth
  margin="normal"
  label="Description"
  value={editItem?.description || ""}
  onChange={(e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setEditItem({ ...editItem, description: value });
    }
  }}
  sx={{ fontSize: "1rem" }}
/>


          {/* Save and Close Buttons */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleSave} variant="contained" color="primary" sx={{ fontSize: "1rem" }}>
              Save Changes
            </Button>
            <Button onClick={() => setOpenModal(false)} variant="outlined" color="secondary" sx={{ fontSize: "1rem" }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar Notification */}
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    severity={snackbar.severity}
    variant="filled"
  >
    {snackbar.message}
  </Alert>
</Snackbar>

    </main>
  );
}

export default ManageCarousel;