// To add images to the server storage
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        return crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) {
                return cb(err);
            }
            return cb(
                null,
                '' + raw.toString('hex') + path.extname(file.originalname)
            );
        });
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const multerObject = multer({
    storage: storage,
    fileFilter: fileFilter,
}).single('image');

module.exports = multerObject;
