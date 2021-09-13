const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        max:50,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        default:"",
        max:50
    },
    city:{
        type:String,
        max:50
    }
  },
  {
      timestamps:true,
  }
);
module.exports=mongoose.model("users",UserSchema);