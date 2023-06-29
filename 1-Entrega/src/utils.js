import multer from "multer"; // Multer to upload files

const storage = multer.diskStorage({ // Multer disk storage settings
    destination: (req, file, cb) => { // Folder to save uploaded files
        cb(null, "uploads/"); // Folder to save uploaded files
    },
    filename: (req, file, cb) => { // File name to save
        cb(null, file.originalname); // File name to save
    }
});

const upload = multer({ storage }); // Multer settings

export default upload; // Export multer object