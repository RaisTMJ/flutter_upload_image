var express = require('express');
var multer = require('multer');
var app = express();
var router = express.Router();
var path = require('path');
var storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        var fileName = file.originalname.split('.')[0] +
            '-' +
            Date.now() +
            path.extname(file.originalname);
        cb(null, fileName);
    }
});
var upload = multer({
    limits: 10 * 1024 * 1024,
    storage: storage
}).single('image');
router.get('/', function (req, res) {
    console.log('asi');
    res.end('GET');
});
router.post('/upload', function (req, res) {
    console.log("test");
    console.log(req);
    upload(req, res, function (err) {
        console.log(req);
        console.log(res);
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        var p = req.file.path
            .split(path.sep)
            .slice(1)
            .join('/');
        res.status(200).json({ path: p });
    });
});
app.use(require('morgan')('combined'));
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.listen(3000, function () { return console.log('Listening at port 3000'); });
