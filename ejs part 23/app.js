const express = require("express");
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// urlencoded is used to parse the data coming from the form
app.use(express.urlencoded({extended:false}));

const post = []


app.get("/",(req,res)=>{
    res.render("index",{posts:post,lastpost:post[post.length-1]});
})

app.post("/add-post",(req,res)=>{
    const {title,content} =req.body;
    post.push({title,content});
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})