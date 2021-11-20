const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const morgan=require('morgan');
const helmet=require('helmet');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
// const path=require('path');
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
app.use("/images", express.static(path.join(__dirname, "..","chat_app","public","images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../chat_app/public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});  
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
    console.log("FILE UPLOADED");
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.listen(process.env.PORT,()=>{
    console.log("SERVER STARTED");
});