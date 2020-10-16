const Product = require('../models/products');
const Category = require('../models/category');
const ProductImage = require('../models/productImage');
const productVariation = require('../models/ProductVariation');

const body = require('body-parser');

exports.create = (req, res)=>{
    
    if(req.body.prod_name!=="" && req.body.short_description!=="" && req.body.cat_id !==""){
        
        
        Product.findOne({ prod_name: req.body.prod_name}).then(function(products){
                
            if(products) { 

                res.json({ "code":"1000", "message":"Already exist!" });

            }else{
                    
                    Category.findById(req.body.cat_id).then(function(category){
                        console.log(category);
                        this.categoty = category;
                        let product_schema = new Product({
                            cat_id: req.body.cat_id,
                            prod_name: req.body.prod_name,
                            category: category,
                            short_description: req.body.short_description,
                            description: req.body.description ? req.body.description : '',
                            price_per_kg: req.body.price_per_kg ? req.body.price_per_kg : 0.00,
                            created_at: new Date()
                        });
                    
                        product_schema.save(function (err, results) {
                            if (err) return res.status(500).send("There was a problem saving the Products.");
                            res.status(200).send({ status: true, result: "Successfully Added!" });
                        });

                    });
            }
        });

    }else{
            res.status(500).send({ status: false, result:"Something went wrong!" });
    }
}

exports.uploadImages = (req, res)=>{
    
    if(req.body.prod_id!=="" && req.body.image_name!=="" && req.body.alt_tag!==""){
        
        console.log(req.body.image_name);
        ProductImage.findOne({ image_name: req.body.image_name}).then(function(productimages){
                
            if(productimages) { 

                res.json({ "code":"1000", "message":"Already exist!" });

            }else{
                     let productImage_schema = new ProductImage({
                        prod_id: req.body.prod_id,
                        image_name: req.body.image_name,
                        alt_tag: req.body.alt_tag,
                        featured: req.body.featured ? req.body.featured : false,
                        created_at: new Date()
                });
                
                productImage_schema.save(function (err, results) {

                    if (err) return res.status(500).send("There was a problem saving the Product Images.");

                    res.status(200).send({ status: true, result: "Successfully Added!" });

                });
            }
        });

    }else{
            res.status(500).send({ status: false, result:"Something went wrong!" });
    }
}


/**
 * 
 * Listing Controller
 *  
 * */ 
exports.list = (req, res)=>{

    Product.find({}).then(function(products){ 
        if(products) { 
                res.json(products);
        }else{
                res.json({"status":"No Data found!"});
        }
    });

}

/**
 * 
 * Delete Controller
 *  
 * */
exports.deleteItem = (req, res) => {
    if (req.body.prod_id !== "") {
        Product.findByIdAndDelete({ _id: req.body.prod_id }).then(function (result) {
            if (result) {
                res.json(result);
            } else {
                res.json({ "status": "No Data found!" });
            }
        });
    } else {
        res.status(500).send({ status: false, result: "Something went wrong!" });
    }

}


/**
 * 
 * Details Controller
 *  
 * */
exports.details = (req, res) => {
    console.log(req.body.prod_id);
    if (req.body.prod_id !== "") {
        Product.findById(req.body.prod_id).then(function (result) {
            if (result) {
                res.json(result);
            } else {
                res.json({ "status": "No Data found!" });
            }
        });
    } else {
        res.status(500).send({ status: false, result: "Something went wrong!" });
    }

}

/**
 * 
 * variations Controller
 *  
 * */
exports.variations = (req, res) => {
    //console.log(req.body.prod_id);
    if (req.body.prod_id !== "") {
        productVariation.find({"prod_id":req.body.prod_id}).then(function (result) {
            if (result) {
                //console.log(result);
                res.json(result);
            } else {
                res.json({ "status": "No Data found!" });
            }
        });
    } else {
        res.status(500).send({ status: false, result: "Something went wrong!" });
    }
}

exports.addVariation = (req, res)=>{
    
    if(req.body.weight!=="" && req.body.price!=="" && req.body.prod_id !==""){ 
        let productVariation_schema = new productVariation({
            prod_id: req.body.prod_id,
            weight: req.body.weight,
            price: req.body.price ? req.body.price : '',
            created_at: new Date()
        });
    
        productVariation_schema.save(function (err, results) {
            if (err) return res.status(500).send("There was a problem saving the Product Variations.");
            res.status(200).send({ status: true, result: "Successfully Added!" });
        });

    }else{
        res.status(500).send({ status: false, result:"Something went wrong!" });
    }

}

/**
 * 
 * Delete Controller
 *  
 * */
exports.deleteVariation = (req, res) => {
    if (req.body.var_id !== "") {
        productVariation.findByIdAndDelete({ _id: req.body.var_id }).then(function (result) {
            if (result) {
                res.json(result);
            } else {
                res.json({ "status": "No Data found!" });
            }
        });
    } else {
        res.status(500).send({ status: false, result: "Something went wrong!" });
    }

}
