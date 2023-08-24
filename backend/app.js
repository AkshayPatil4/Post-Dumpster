const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');

const Post = require('./models/post');
const app = express();

mongoose.connect("mongodb+srv://akshay:29kJCnZReMzmqWRr@cluster0.uybdzcj.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('Connected to Database');
}).catch(()=>{
    console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

app.post('/api/posts', (req,res,next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message:'Post Added Successfully'
    });

});

//29kJCnZReMzmqWRr
app.get('/api/posts',(req , res, next)=>{
    const posts=[
        {
            id: "sadafgafa",
            title: "first server side post",
            content: "this post is comming form server side"
        },
        {
            id: "gsegsgsdg",
            title: "Second server side post",
            content: "this post is comming form server side"
        },
    ]

 res.status(200).json({
        message: 'Posts fetched succefully',
        posts: posts
    });
});

module.exports = app;