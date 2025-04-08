const mongoose = require("mongoose");

const CourselSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    public_id: {  // Store Cloudinary public ID for easy updates
        type: String,
        required: true
    }
});

module.exports = mongoose.model("corusel", CourselSchema);
