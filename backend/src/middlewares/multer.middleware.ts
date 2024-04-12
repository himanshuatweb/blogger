import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationDir: string;
        // Check the file type and set the destination directory accordingly
        if (file.mimetype.startsWith('image')) {
            if (req.originalUrl.includes('upload'))
                destinationDir = "uploads/images";
            else
                destinationDir = "uploads/user-images"
        } else if (file.mimetype.startsWith('video')) {
            destinationDir = "uploads/videos";
        } else {
            destinationDir = "uploads/others";
        }
        cb(null, destinationDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Set the file size limit upto 50MB 
})
