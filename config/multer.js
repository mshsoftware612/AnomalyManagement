import multer from 'multer';
import path from 'path';

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Save files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create unique file name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use the original file extension
    },
});

// Create the upload middleware with file size limit and file filter if needed
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
}).fields([
    { name: 'Document1Name', maxCount: 1 },
    { name: 'Document2Name', maxCount: 1 },
    { name: 'Document3Name', maxCount: 1 },
    { name: 'Document4Name', maxCount: 1 },
]);

export default upload;
