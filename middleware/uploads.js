// const multer = require("multer");
// const fs = require("fs");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDirectory = "public/services/";
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory);
//             console.log(`Directory '${uploadDirectory}' created.`);
//         }
//         cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const uploads = multer({
//     storage: storage,
//     limits: {
//         fileSize: 20 * 1024 * 1024
//     }
// });

// const portfolioStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDirectory = "public/portfolio/";
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory);
//             console.log(`Directory '${uploadDirectory}' created.`);
//         }
//         cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const portfolioUploads = multer({
//     storage: portfolioStorage,
//     limits: {
//         fileSize: 10 * 1024 * 1024
//     }
// });

// const technologyStorage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         const uploadDirectory = "public/technology";
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory);
//         }
//         cb(null, uploadDirectory)
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// })

// const technologyUploads = multer({
//     storage: technologyStorage,
//     limits: {
//         fieldSize: 10 * 1024 * 1024
//     }
// })

// const trustedStorage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         const uploadDirectory = "public/trusted"
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory)
//         }
//         cb(null, uploadDirectory)
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const trustedUploads = multer({
//     storage: trustedStorage,
//     limits: {
//         fieldSize: 10 * 1024 * 1024
//     }

// })

// const staffStorage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         const uploadDirectory = "public/staff"
//         if (!fs.existsSync(uploadDirectory)) {
//             fs.mkdirSync(uploadDirectory)
//         }
//         cb(null, uploadDirectory)
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const staffUploads = multer({
//     storage: staffStorage,
//     limits: {
//         fileSize: 10 * 1024 * 1024
//     }
// })


// module.exports = {
//     uploads,
//     portfolioUploads,
//     technologyUploads,
//     trustedUploads,
//     staffUploads
// };
