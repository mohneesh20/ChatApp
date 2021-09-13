const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const morgan=require('morgan');
const helmet=require('helmet');
const cors=require('cors');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const path=require('path');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan('common'));
const userRoute=require('./Routes/user.js');
const authRoute=require('./Routes/auth.js');
const postRoute=require('./Routes/post.js');
mongoose.connect(process.env.DB_STRING, {useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
    console.log("CONNECTED");
}).catch((err)=>{
    console.log(err);
});
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.listen(process.env.PORT,()=>{
    console.log("SERVER STARTED");
});