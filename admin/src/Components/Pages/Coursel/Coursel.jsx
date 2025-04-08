import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import client from "../../Common/Client/Client";

function Coursel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const maxLetters = 30; // Updated for consistency

  const handleTitleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxLetters) {
      setTitle(text);
      setTitleError("");
    } else {
      setTitleError(`Title cannot exceed ${maxLetters} characters.`);
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxLetters) {
      setDescription(text);
      setDescriptionError("");
    } else {
      setDescriptionError(`Description cannot exceed ${maxLetters} characters.`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setSnackbar({ open: true, message: "Enter all the fields", severity: "error" });
      return;
    }

    if (title.length > maxLetters || description.length > maxLetters) {
      setSnackbar({ open: true, message: "Title or Description exceeds the limit", severity: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await client.post("/coursel/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({ open: true, message: "Carousel added successfully!", severity: "success" });
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Error adding coursel", severity: "error" });
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav style={{ marginTop: "10px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Coursel</li>
            </ol>
          </nav>
        </div>

        <div className="container mt-4">
          <h2>Add Coursel</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                placeholder={`Enter a Title (Max ${maxLetters} characters)`}
                className="form-control"
                value={title}
                onChange={handleTitleChange}
                required
              />
              {titleError && <p style={{ color: "red", fontSize: "14px" }}>{titleError}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder={`Enter a Description (Max ${maxLetters} characters)`}
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
              {descriptionError && <p style={{ color: "red", fontSize: "14px" }}>{descriptionError}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={titleError || descriptionError}>
              Add Coursel
            </button>
          </form>
        </div>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </main>
    </>
  );
}

export default Coursel;