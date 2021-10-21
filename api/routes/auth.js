const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//Register
router.post("/register", async(req, res)=>{
    try{
        //generate new password and the encrypts 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        //create new user
        const newUser = await User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
        //save user new
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(e){
        res.status(500).json(e)
    }
});

//login user
router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    }catch(e){
        res.status(500).json(e)
    }

})

module.exports = router