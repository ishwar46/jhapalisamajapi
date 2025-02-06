const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Creates a multer instance configured to store files in a specific subfolder.
 */
function createUploader(subfolderName) {
    // Ensure the folder exists
    const uploadPath = path.join(__dirname, '..', 'uploads', subfolderName);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext);
            const uniqueSuffix = Date.now();
            cb(null, `${baseName}-${req.userId}-${uniqueSuffix}${ext}`);
        },
    });

    return multer({
        storage,
        // Limit file size (2 MB = 2 * 1024 * 1024)
        limits: { fileSize: 2 * 1024 * 1024 },
    });
}

module.exports = createUploader;
