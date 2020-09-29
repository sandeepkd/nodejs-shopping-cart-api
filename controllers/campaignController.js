const Campaign = require('../models/campaigns');
const body = require('body-parser');

exports.create = (req, res)=>{
    
    if(req.body.title!=="" && req.body.short_description!=="" && req.body.user_id!==""){
        
        Campaign.findOne({ title: req.body.title}).then(function(campaign){
                
            if(campaign) { 

                res.json({ "code":"1000", "message":"Already exist!" });

            }else{

                const campaign = new Campaign({
                        title: req.body.title,
                        short_description: req.body.short_description,
                        user_id: req.body.user_id,
                        status: "draft",
                        created_at: new Date()
                });
                
                campaign.save(function (err, results) {
                    
                    if (err) return res.status(500).send("There was a problem saving the campaign.")
                    res.status(200).send({ auth: true, result: "Successfully Inserted!" });
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
    var campaign_id = req.body.campaign_id;
    Campaign.find({}).then(function(campaign){ 
        if(campaign) { 
                res.json(campaign);
        }else{
                res.json({"status":"No Data found!"});
        }
    });
}