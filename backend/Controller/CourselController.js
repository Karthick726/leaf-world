const CourselSchema = require("../Schema/CourselSchema");
const cloudinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");
const streamifier = require("streamifier");



const addCoursel = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file) return res.status(400).json({ message: "Image is required" });

        // Convert Buffer to Readable Stream and Upload to Cloudinary
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "coursel" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req.file.buffer);

        const newCoursel = new CourselSchema({
            title,
            description,
            image: result.secure_url,
            public_id: result.public_id
        });

        await newCoursel.save();
        res.status(201).json({ message: "Coursel added successfully!", coursel: newCoursel });

    } catch (error) {
        console.error("Error adding coursel:", error);
        res.status(500).json({ error: error.message });
    }
};

// ✅ **Get All Coursels**
const getCoursels = async (req, res) => {
    try {
        const coursels = await CourselSchema.find();
        res.status(200).json(coursels);
    } catch (error) {
        console.error("Error fetching coursels:", error);
        res.status(500).json({ error: error.message });
    }
};

const getCourselById = async (req, res) => {
    try {
        const { id } = req.params;
        const coursel = await CourselSchema.findById(id);
        if (!coursel) return res.status(404).json({ message: "Coursel not found" });

        res.status(200).json(coursel);
    } catch (error) {
        console.error("Error fetching coursel:", error);
        res.status(500).json({ error: error.message });
    }
};


// ✅ **Update a Coursel**
const updateCoursel = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const coursel = await CourselSchema.findById(id);
        if (!coursel) return res.status(404).json({ message: "Coursel not found" });

        // ✅ If there's a new image, delete the old one and upload the new one
        if (req.file) {
            if (coursel.public_id) {
                await cloudinary.uploader.destroy(coursel.public_id);
            }
            
            // ✅ Upload new image using `upload_stream`
            const uploadPromise = new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "coursel" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer); // ✅ Pass buffer instead of file path
            });

            const result = await uploadPromise;

            coursel.image = result.secure_url;
            coursel.public_id = result.public_id;
        }

        // ✅ Update other details
        coursel.title = title || coursel.title;
        coursel.description = description || coursel.description;

        await coursel.save();
        res.status(200).json({ message: "Coursel updated successfully!", coursel });

    } catch (error) {
        console.error("Error updating coursel:", error);
        res.status(500).json({ error: error.message });
    }
};



// ✅ **Delete a Coursel**
const deleteCoursel = async (req, res) => {
    try {
        const { id } = req.params;

        const coursel = await CourselSchema.findById(id);
        if (!coursel) return res.status(404).json({ message: "Coursel not found" });

        // ✅ Delete image from Cloudinary before removing from MongoDB
        if (coursel.public_id) {
            await cloudinary.uploader.destroy(coursel.public_id);
        }

        // ✅ Now delete the coursel from MongoDB
        await CourselSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Coursel deleted successfully!" });

    } catch (error) {
        console.error("Error deleting coursel:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addCoursel,
    getCoursels,
    getCourselById,
    updateCoursel,
    deleteCoursel
};
