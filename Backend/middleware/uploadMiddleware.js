const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Use relative path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Added missing comma
    }
});

const fileFilter = (req, file, cb) => { // Renamed to match usage below
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Fixed MIME types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only selected formats are available"), false);
    }
};

const upload = multer({ 
    storage, 
    fileFilter // Now matches the variable name
});

module.exports = upload;