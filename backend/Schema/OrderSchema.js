const mongoose = require("mongoose");

const purchaseHistory = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      subCategoryProductId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      refModel: {
        type: String,
        enum: ["Mens", "Womens", "Kids"],
      },
      quantity: {
        type: Number,
        required: true,
      },
      deliveryStatus: {
        type: String,
        required: true,
      },
    },
  ],
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  purchaseHistory: [purchaseHistory],
});

module.exports = mongoose.model("Order", orderSchema);
