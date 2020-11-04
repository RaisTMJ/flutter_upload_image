const express = require('express');
const multer = require('multer');
const app = express();
const router = express.Router();
const path = require('path');

const storage: any = multer.diskStorage({
    destination: './public/images',
    filename: (req: any, file: any, cb: any) => {
        const fileName =
            file.originalname.split('.')[0] +
            '-' +
            Date.now() +
            path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({
    limits: 10 * 1024 * 1024,
    storage: storage
}).single('image');

router.get('/', (req: any, res: any) => {
    console.log('asi');
    res.end('GET');
});

router.post('/upload', (req: any, res: any) => {
    console.log("test");
    console.log(req);
    upload(req, res, (err:any) => {

        console.log(req);
        console.log(res);
        if (err) {
            return res.status(500).json({message: err.message});
        }

        const p = req.file.path
            .split(path.sep)
            .slice(1)
            .join('/');
        res.status(200).json({path: p});
    });
});
app.use(require('morgan')('combined'));
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.listen(3000, () => console.log('Listening at port 3000'));
