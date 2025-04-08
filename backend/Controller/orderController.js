const orderSchema = require("../Schema/OrderSchema");
const mongoose = require("mongoose");
// const Mens = require("../Schema/menProductSchema");

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // console.log('order');
  const { userId, orders } = req.body;

  try {
    const createOrder = await orderSchema.updateOne(
      { userId },
      { $push: { purchaseHistory: orders } },
      { upsert: true }
    );
    console.log(createOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.getOrder = async (req, res) => {
  console.log(req.params);
  const id = new mongoose.Types.ObjectId(req.params.id);
  console.log(id);

  try {
    const orders = await orderSchema.aggregate([
      { $match: { userId: id } },
      { $unwind: "$purchaseHistory" },
      { $unwind: "$purchaseHistory.items" },

      {
        $lookup: {
          from: "mens",
          let: {
            menId: { $toObjectId: "$purchaseHistory.items.productId" },
            subCategoryId: {
              $toObjectId: "$purchaseHistory.items.subCategoryId",
            },
            subCategoryProductId: {
              $toObjectId: "$purchaseHistory.items.subCategoryProductId",
            },
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$menId"] },
              },
            },

            { $unwind: "$subCategory" },
            { $unwind: "$subCategory.products" },

            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$subCategory._id", "$$subCategoryId"] },
                    {
                      $eq: [
                        "$subCategory.products._id",
                        "$$subCategoryProductId",
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "menDetails",
        },
      },

      {
        $project: {
          _id: 1,
          userId: 1,
          "purchaseHistory.items.productId": 1,
          "purchaseHistory.items.subCategoryId": 1,
          "purchaseHistory.items.subCategoryProductId": 1,
          menDetails: 1, 
        },
      },

      {
        $addFields: {
          productDetails: {
            $cond: {
              if: { $eq: ["$purchaseHistory.items.refModel", "Mens"] },
              then: { $arrayElemAt: ["$menDetails", 0] },
              else: {
                $cond: {
                  if: { $eq: ["$purchaseHistory.items.refModel", "Womens"] },
                  then: { $arrayElemAt: ["$womenDetails", 0] },
                  else: { $arrayElemAt: ["$kidsDetails", 0] },
                },
              },
            },
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          purchaseHistory: {
            $push: {
              total: "$purchaseHistory.total",
              orderId: "$purchaseHistory.orderId",
              paymentId: "$purchaseHistory.paymentId",
              items: [
                {
                  productId: "$purchaseHistory.items.productId",
                  refModel: "$purchaseHistory.items.refModel",
                  quantity: "$purchaseHistory.items.quantity",
                  deliveryStatus: "$purchaseHistory.items.deliveryStatus",
                  productDetails: ["$menDetails","$womenDetails","$kidsDetails"],
                },
              ],
            },
          },
        },
      },
    ]);
 
    console.log(JSON.stringify(orders, null, 2));

    console.log("order:", orders);
  } catch (error) {}
};
