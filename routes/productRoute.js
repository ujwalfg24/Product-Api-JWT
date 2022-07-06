
const path=require("path")

const multer =require("multer");
const upload = multer({ dest: 'uploads/' })

const express = require('express')
const router =express.Router()
const productControllers =require('../controller/productControllers')
const {verifyToken} =require('../controller/controllers')

const {getProducts, createProduct, deleteProduct ,updateProduct,getProduct} =require('../controller/productControllers')

 const storage = multer.diskStorage({
 destination: (req, file, cb) => {
        cb(null, "Uploads");
    },
     filename: (req, file, cb) => {
         cb(null, "image-" + Date.now() + path.extname(file.originalname));
     },
 });
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.post(
    "/add",
    fileUpload.single("image"),
    productControllers.createProduct
);


router.post('/', getProducts,verifyToken)

//router.post('/add', createProduct)


router.get('/:id', getProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

module.exports= router