const path = require('path');
const excelUpload = require('../middlewares/excelUpload');
const multer = require('multer'),
		storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'server/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, 'diakritiko.xlsx');
	}
}),
		upload = multer( { storage: storage } ); // Double '.' to get out of Routes folder

module.exports = (app) => {
	app.post(
			'/api/upload',
			upload.single('file'),
			excelUpload,
			(req, res) => {
				res.send('File Uploaded Successfully!');
			}
	);
};