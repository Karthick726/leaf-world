const express = require("express");
const router = express.Router();
const userContactController = require("../Controller/userContactsenquController");

router.post("/create", userContactController.createContactEnquiry);
router.get("/get", userContactController.getAllcontactenquiry);
router.get("/:id", userContactController.getContactById);
router.put("/update/:id", userContactController.updatecontactenquiry);
router.delete("/delete/:id", userContactController.deleteContact);

module.exports = router;
