    const router = require('express').Router();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const User = require("../models/user.model");

    router.get("/", async(req, res) => {
        try{
            res.json(123)
        }
        catch(err){
            res.status(500).json({err: err.message})
        }
    })

    router.post("/login", async(req, res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password)
                return res.status(400).json({msg: "Not all fields have been entered!"});

            const user = await User.findOne({email: email});

            if(!user)
                return res.status(400).json({msg: "No account with this email has been registered!"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)
                return res.status(400).json({msg: "Invalid credentials"});

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            res.json({
                token,
                user:{
                    name: user.name,
                    email: user.email
                }
            })
        }
        catch(err){
            res.status(500).json({err: err.message});
        }
    });

    router.post('/register', async(req, res) => {
        try {
            let {name, email, password, passwordCheck} = req.body

            if(!name || !email || !password || !passwordCheck)
                return res.status(400).json({msg: "All fields are required!"});
            if(password.length < 5)
                return res.status(400).json({msg: "The password need to have atleast 5 characters long"});
            if(password != passwordCheck)
                return res.status(400).json({msg: "Enter the same password twice for verification"});
            const existingUser = await User.findOne({email: email})
            if(existingUser)
                return res.status(400).json({msg: "An account with email address exists"})

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            
            const newUser = new User({
                name,
                password: passwordHash,
                email
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
            conn.close();
        }
        catch(err){
            res.status(500).json({err: err.message});
        }
    })

    module.exports = router;