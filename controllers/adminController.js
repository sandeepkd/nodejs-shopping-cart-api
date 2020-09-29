const Admin = require('../models/admin');
const body = require('body-parser');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../helpers/secret');
const salt = bcrypt.genSaltSync(10);

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
 * Logout Controller
 *  
 * */ 
exports.test = (req, res)=>{

    res.send("test route works");

}

exports.authCheck = (req, res)=>{

    res.send("Authcheck works");

}