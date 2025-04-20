import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema= new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Please add a name'],
        unique:true,
		
	},
  email:{
		type:String,
		required:[true,'Please add  an email'],
		unique:true
	},
	password:{
		type:String,
        minlength:[6,'Password must be at least 6 characters'],
		required:[true,'Please enetr a password'],
		
		
	},
pic:{
        type:String,
        default:"/avatar.png"
},

},{timestamps:true});
userSchema.pre('save',async function(next){
	if(!this.isModified('password')){
		return next();  
     }
	const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});
userSchema.methods.matchPasswords = async function (params) {
    try {

	return await bcrypt.compare(params,this.password);
}catch (error) {
    throw new Error('Password comparison failed');
    }
}
const User = mongoose.model('User',userSchema);
export  default User;