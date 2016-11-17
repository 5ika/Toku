const multer = require('multer');
const crypto = require('crypto');
const hash = (text) => crypto.createHash('md5').update(text).digest('hex');

// Configuration de Multer
const multerFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else {
        console.log('Fichier uploadé invalide');
        cb(null, false);
    }
}
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname + '/../images'),
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, hash(file.originalname + Date.now()) + '.' + ext);
    }
});

const upload = multer({fileFilter: multerFilter, storage: multerStorage});

module.exports = upload;
