const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nodejs");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connection Successful!");
});

// Create Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
});

// Create Model
const User = mongoose.model("User", userSchema);

app.get("/create",async (req,res)=>{
    const user = new User({
        name: "sanjay",
        age: 23,
        email: "sanjay@gmail.com",
        password: "john@123",
    });
    await user.save();
    res.send(user);
});
app.get("/users",(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})
app.get("/update",(req,res)=>{
    User.updateOne({name:"sanjay"},{name:"sanjay santhosh"}).then((user)=>{
        res.send(user)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})
app.get("/delete",(req,res)=>{
    User.deleteOne({name:"sanjay santhosh"}).then((user)=>{
        res.send(user)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})


app.listen(3000,()=>{
    console.log("Listening on port 3000")
})