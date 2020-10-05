const Admin = require('../models/admin');
const body = require('body-parser');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../helpers/secret');
const salt = bcrypt.genSaltSync(10);


exports.register = (req, res)=>{
    
    if(req.body.fullname!=="" && req.body.email!=="" && req.body.username!=="" && req.body.password!==""){
        
        console.log(req.body.fullname);

        Admin.findOne({ username: req.body.username}).then(function(admin){
                
            if(admin) { 

                res.json({ "code":"1000", "message":"Already Registered, Please login!" });

            }else{

                console.log(salt);
                var hash = bcrypt.hashSync(req.body.password, salt);
                const admin = new Admin({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        role: 'Admin',
                        created_at: new Date()
                });
                
                admin.save(function (err, results) {
                    if (err) return res.status(500).send("There was a problem registering the user.")
                    res.status(200).send({ auth: true, result: "You are successfully Registered!" });
                });

            }

        });

    }else{
            res.status(500).send({ auth: false, result:"Something went wrong!" });
    }
}


/**
 * 
 * Login Controller
 *  
 * */ 
exports.login = (req, res)=>{

    var uname = req.body.username;
    var pwd = req.body.password;

    Admin.findOne({ username: uname}).then(function(admin){
                
        if(admin) { 

            if(bcrypt.compareSync(pwd, admin.password)) {
                let data = {
                                id: admin._id,
                                name: admin.fullname,
                                email: admin.email,
                                username: admin.username,
                                role: admin.role,
                                auth: true
                            }

                let token = jwt.sign(data, config.secret, { expiresIn: "12h" });
                res.json(token);

              } else {
                
                var data = { auth: false, message: "Wrong Password" };
                var token = jwt.sign(data, config.secret, { expiresIn: "12h" });
                res.json(token);
                
              }      

        }else{

                var data = { auth: false, message: "Please register first!" };
                var token = jwt.sign(data, config.secret, { expiresIn: "12h" });
                res.json(token);
        }
    });

}

/**
 * 
 * Logout Controller
 *  
 * */ 
exports.logout = (req, res)=>{

    res.send("logout route works");

}


/**
 * 
 * Add Category Controller
 *  
 * */ 
exports.addCategory = (req, res)=>{

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send(decoded);
    });
}
