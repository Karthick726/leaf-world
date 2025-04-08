const menProdcts = require("../Schema/menProductSchema");
const kidsProdcts = require("../Schema/kidsProductSchema");
const womenProdcts = require("../Schema/womenProductSchema");

const cloudinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.addCategory = async (req, res) => {
  try {
    const { gender, category } = req.body;

    if (!gender) {
      return res.status(400).json({ error: "Please select a gender." });
    }
    if (!category || category.trim().length < 3) {
      return res.status(400).json({ error: "Please enter a valid category." });
    }

    let ProductModel;
    let categorytrim = category.toLowerCase().trim();
    console.log(categorytrim);
    switch (gender.toLowerCase()) {
      case "men":
        ProductModel = menProdcts;
        break;
      case "kids":
        ProductModel = kidsProdcts;
        break;
      case "women":
        ProductModel = womenProdcts;
        break;
      default:
        return res.status(400).json({ error: "Invalid gender selected." });
    }

    const existingCategory = await ProductModel.findOne({
      category: categorytrim,
    });
    console.log(existingCategory);
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists." });
    }

    const newCategory = new ProductModel({ category: categorytrim });
    await newCategory.save();

    res.status(201).json({
      message: `Category added successfully to ${gender} collection.`,
      data: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.menProducts = async (req, res) => {
  try {
    const menProducts = await menProdcts.find();

    if (!menProducts) {
      return res.status(404).json({ error: "No products found." });
    }
    res.status(200).json(menProducts);
  } catch (err) {
    console.error("Error fetching men products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.womenProducts = async (req, res) => {
  try {
    const womenProducts = await womenProdcts.find();

    if (!womenProducts) {
      return res.status(404).json({ error: "No products found." });
    }
    res.status(200).json(womenProducts);
  } catch (err) {
    console.error("Error fetching men products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.kidProducts = async (req, res) => {
  try {
    const kidProdcts = await kidsProdcts.find();

    if (!kidProdcts) {
      return res.status(404).json({ error: "No products found." });
    }
    res.status(200).json(kidProdcts);
  } catch (err) {
    console.error("Error fetching men products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { gender, category, subCategory } = req.body;

    let Collection;
    if (gender === "men") {
      Collection = menProdcts;
    } else if (gender === "women") {
      Collection = womenProdcts;
    } else if (gender === "kids") {
      Collection = kidsProdcts;
    } else {
      return res.status(400).json({ error: "Invalid gender specified" });
    }

    const existingCategory = await Collection.findOne({ category });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const isSubCategoryExists = existingCategory.subCategory.some(
      (sub) => sub.subCategoryName.toLowerCase() === subCategory.toLowerCase()
    );

    if (isSubCategoryExists) {
      return res.status(400).json({ error: "Subcategory already exists" });
    }

    existingCategory.subCategory.push({
      subCategoryName: subCategory.toLowerCase().trim(),
    });
    await existingCategory.save();

    res.status(200).json({
      message: "Subcategory added successfully",
      data: existingCategory,
    });
  } catch (err) {
    console.error("Error adding subcategory:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addProducts = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const {
      category,
      gender,
      subCategoryId,
      productName,
      productDescription,
      productPrice,
      sizeStock,
      color
    } = req.body;
    const images = req.files;

    // console.log(sizeStock);

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    let Collection;
    if (gender === "men") {
      Collection = menProdcts;
    } else if (gender === "women") {
      Collection = womenProdcts;
    } else if (gender === "kids") {
      Collection = kidsProdcts;
    } else {
      return res.status(400).json({ error: "Invalid gender specified" });
    }

    const existingCategory = await Collection.findOne({ category });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const searchWithSubCategory = await existingCategory.subCategory.find(
      (value) => value._id.toString() === subCategoryId
    );

    const parsedSizeStock = Array.isArray(sizeStock)
      ? sizeStock.map((item) => JSON.parse(item))
      : [JSON.parse(sizeStock)];

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageString = image.buffer.toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${imageString}`,
          {
            folder: "Products",
            resource_type: "image",
          }
        );
        return {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      })
    );

    searchWithSubCategory.products.push({
      productName: productName.toLowerCase().trim(),
      description: productDescription.toLowerCase().trim(),
      price: productPrice,
      sizeStock: parsedSizeStock,
      image: imageUrls,
      color:color
    });

    await existingCategory.save();

    res
      .status(200)
      .json({ message: "Products added successfully", data: existingCategory });
  } catch (err) {
    console.error("Error add  products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const {
      category,
      gender,
      subCategoryId,
      productName,
      productDescription,
      productPrice,
      sizeStock,
      productId,
      images,
    } = req.body;

    let image;

    let Collection;
    if (gender === "men") {
      Collection = menProdcts;
    } else if (gender === "women") {
      Collection = womenProdcts;
    } else if (gender === "kids") {
      Collection = kidsProdcts;
    } else {
      return res.status(400).json({ error: "Invalid gender specified" });
    }

    const existingCategory = await Collection.findOne({ category });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const searchWithSubCategory = await existingCategory.subCategory.find(
      (value) => value._id.toString() === subCategoryId
    );
    const products = await searchWithSubCategory.products.find(
      (value) => value._id.toString() === productId
    );
    const parsedSizeStock = Array.isArray(sizeStock)
      ? sizeStock.map((item) => JSON.parse(item))
      : [JSON.parse(sizeStock)];

    if (req.files && req.files.length > 0) {
      console.log("hiii");
      image = req.files;
      const imageUrls = await Promise.all(
        image.map(async (img) => {
          const imageString = img.buffer.toString("base64");
          const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${imageString}`,
            {
              folder: "Products",
              resource_type: "image",
              timeout: 90000,
            }
          );
          return {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        })
      );

      // Decide whether to replace or append images
      if (products.image && products.image.length > 0) {
        // If you want to delete old images from Cloudinary before updating
        await Promise.all(
          products.image.map(async (img) => {
            await cloudinary.uploader.destroy(img.public_id);
          })
        );
      }

      products.image = imageUrls;
    } else {
      products.image = products.image || [];
    }

    products.productName = productName.toLowerCase().trim();
    products.description = productDescription.toLowerCase().trim();
    products.price = productPrice;
    products.sizeStock = parsedSizeStock;

    console.log("products", products);
    await existingCategory.save();

    res
      .status(200)
      .json({
        message: "Products update successfully",
        data: existingCategory,
      });
  } catch (err) {
    console.error("Error update products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProducts=async(req,res)=>{
  try{
    const {
      category,
      gender,
      subCategoryId,
      productId,
    } = req.body;

    let image;

    let Collection;
    if (gender === "men") {
      Collection = menProdcts;
    } else if (gender === "women") {
      Collection = womenProdcts;
    } else if (gender === "kids") {
      Collection = kidsProdcts;
    } else {
      return res.status(400).json({ error: "Invalid gender specified" });
    }

    const existingCategory = await Collection.findOne({ category });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const searchWithSubCategory = await existingCategory.subCategory.find(
      (value) => value._id.toString() === subCategoryId
    );
    const products = await searchWithSubCategory.products.filter(
      (value) => value._id.toString() !== productId
    );

    searchWithSubCategory.products=products
    await existingCategory.save();
    res.status(200).json({ message: "Product deleted successfully" });
  }catch(err){
    console.error("Error delete products:", err);
    res.status(500).json({ error: "Internal Server Error" });

  }
}
