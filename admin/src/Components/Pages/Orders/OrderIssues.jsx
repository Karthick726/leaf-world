import React, { useEffect, useState } from "react";
import {
  Snackbar,
  SnackbarContent,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "antd"; // Ant Design Modal
import client from "../../Common/Client/Client";

function OrderIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    setLoading(true);
    client
      .get("/usercontactenquiry/get")
      .then((response) => {
        console.log("API Response:", response.data);
        const data = response.data.data;
        setIssues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch issues");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you really want to delete this issue?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        client
          .delete(`/usercontactenquiry/delete/${id}`)
          .then(() => {
            setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));
            setSnackbar({ open: true, message: "Issue cleared successfully!" });
          })
          .catch(() => {
            setSnackbar({ open: true, message: "Failed to delete issue!" });
          });
      },
    });
  };

  // Handle Pagination Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              <li className="breadcrumb-item active">User Issues</li>
            </ol>
          </nav>
        </div>

        {loading ? (
          <CircularProgress style={{ display: "block", margin: "20px auto" }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : issues.length === 0 ? (
          <Alert severity="info">No issues found</Alert>
        ) : (
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#7A8D71", color: "white" }}>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Title</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Name</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Email</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Phone</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Order #</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Subject</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Message</TableCell>
                  <TableCell style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issues
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
                  .map((issue) => (
                    <TableRow key={issue._id}>
                      <TableCell style={{ fontSize: "18px", color: "grey" }}>{issue.title}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>{issue.name}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "grey" }}>{issue.email}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>{issue.phoneNumber}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "grey" }}>{issue.ordernumber}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>{issue.subject}</TableCell>
                      <TableCell style={{ fontSize: "18px", color: "grey" }}>{issue.message}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(issue._id)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        {issues.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 7, 10]}
            component="div"
            count={issues.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}

       
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <SnackbarContent
            style={{
              backgroundColor: snackbar.message.includes("success") ? "#7A8D71" : "#F44336",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
            message={snackbar.message}
          />
        </Snackbar>
      </main>
    </>
  );
}

export default OrderIssues;
