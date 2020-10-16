const User = require('../models/user');
const shipppingAddress = require('../models/shipppingAddress');
const body = require('body-parser');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var aes256 = require('aes256');
var config = require('../helpers/secret');
const salt = bcrypt.genSaltSync(10);

exports.register = (req, res)=>{
    
    if(req.body.fullname!=="" && req.body.email!=="" && req.body.username!=="" && req.body.password!==""){
        
        User.findOne({ username: req.body.username}).then(function(user){
                
            if(user) { 

                res.json({ "code":"1000", "message":"Already Registered, Please login!" });

            }else{

                console.log(salt);
                var hash = bcrypt.hashSync(req.body.password, salt);
                const user = new User({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address ? req.body.address : '',
                        created_at: new Date()
                });
                
                user.save(function (err, results) {
                    
                    if (err) return res.status(500).send("There was a problem registering the user.")

                    res.status(200).send({ auth: true, result: "Successfully Registered!" });
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

    User.findOne({ username: uname}).then(function(user){
                
        if(user) { 

            if(bcrypt.compareSync(pwd, user.password)) {
                let data = {
                                id: user._id,
                                name: user.fullname,
                                email: user.email,
                                username: user.username,
                                auth: true
                            }

                let token = jwt.sign(data, config.secret, { expiresIn: "12h" });
                res.json(token);

              } else {
                
                var data = { auth: false, message: "Wrong Password, Please check and try!" };
                var token = jwt.sign(data, config.secret, { expiresIn: "12h" });
                res.json(token);
                
              }      

        }else{

                var data = { auth: false, message: "Username not found, Please register!" };
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

exports.usersList = (req, res)=>{

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send(decoded);
    });
      
}

exports.authCheck = (req, res)=>{

    var key = '123456';
    var plaintext = 'sandeep kumar dan';
    var encrypted = aes256.encrypt(key, plaintext);
    var decrypted = aes256.decrypt(key, encrypted);
    console.log("-----"+encrypted);
    console.log("-----"+decrypted);

    res.send("Authcheck works"+encrypted);
}

exports.shippingAddressList = (req, res)=>{

    res.send("Authcheck works"+encrypted);

}

