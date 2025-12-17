const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads"); // folder upload
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

// filter hanya image
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error("File harus berupa gambar (jpg, jpeg, png)"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
