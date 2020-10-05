const Category = require('../models/category');
const body = require('body-parser');

exports.create = (req, res)=>{
    
    if(req.body.cat_name!=="" && req.body.description!==""){
        
        console.log(req.body.cat_name);
        Category.findOne({ cat_name: req.body.cat_name}).then(function(categories){
                
            if(categories) { 

                res.json({ "code":"1000", "message":"Already exist!" });

            }else{

                     let cat = new Category({
                        cat_name: req.body.cat_name,
                        description: req.body.description,
                        created_at: new Date()
                });
                
                cat.save(function (err, results) {

                    if (err) return res.status(500).send("There was a problem saving the Category.");
                    
                    res.status(200).send({ auth: true, result: "Successfully Added!" });
                });

            }

        });

    }else{
            res.status(500).send({ auth: false, result:"Something went wrong!" });
    }
}

/**
 * 
 * Listing Controller
 *  
 * */ 
exports.list = (req, res)=>{

    Category.find({}).then(function(category){ 
        if(category) { 
                res.json(category);
        }else{
                res.json({"status":"No Data found!"});
        }
    });

}