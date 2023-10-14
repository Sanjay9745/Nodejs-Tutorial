require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
    }  )
    .once('open', () => {
        console.log('Connected to MongoDB');
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post("/api/register",async(req,res)=>{
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
        res.status(200).json({message:"User created Successfully",user:user});
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/api/users",async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error) 
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})