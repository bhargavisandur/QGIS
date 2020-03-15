// To add images to the server storage
const multer = require('multer');

const storage = multer.diskStorage({
	destination: './Images',
	filename: (req, file, callback) =>
		callback(
			null,
			file.fieldname + '_' + Date.now() + '_' + file.originalname
		)
});
const multerObject = multer({ storage: storage }).single('upload');

module.exports = multerObject