require("dotenv").config()
const express = require('express')
const User =require('../models/data')
const route=express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const done =require('../Third /compare')


route.post('/register',async(req,res)=>
{
     try{
        const{name,username,password,phone,email} = req.body
        if (!(email && password && name && username)) {
            res.status(400).send("All input is required");
     }
     const before = await User.findOne({ email });

     if (before) {
       return res.status(409).send("it Already Exist Login");
     }
     encryptedUserPassword = await bcrypt.hash(password, 15);
    console.log(encryptedUserPassword);

     
     
     const newuser = await User.create({
              name: name,
              username: username,
              phone:phone,
              email: email.toLowerCase(), // sanitize: convert email to lowercase
              password: encryptedUserPassword,
     });
     console.log(newuser)

// token 
     const token=jwt.sign(
        {user:newuser.id,email},
        process.env.TOKEN_KEY,
        {
            expiresIn: "1h",
        }
     );
     newuser.token=token;

     res.status(201).json(newuser)
    
     } 
     catch (err) {
       console.log(err);
     }
})


route.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!(email,password)){
            res.status(400).send("All input is required");
        }
        const newuser = await User.findOne({ email });
        if (newuser && (await bcrypt.compare(password, newuser.password))){
            const token=jwt.sign(
                {user:newuser.id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
             );
             newuser.token=token;
        
             res.status(200).json(newuser)
            
             } 
            return res.status(400).send("Invalid Credentials");
    }
             catch (err) {
               console.log(err);
             
        
    }
})

route.get("/use",done, (req, res) => {
    res.status(200).send("Welcome to mypage");
    console.log("vikram")
});
route.use("*", (req, res) => {
    res.status(404).json({
      success: "not token is applied in body",
      message: "Page is not evolate",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  });



module.exports=route
