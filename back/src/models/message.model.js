import mongoose from "mongoose";
const messageschema = new  mongoose.Schema({
senderId:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},
receiverId:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
Text:
{
    type:String,
   default:"",
},
Image:
{
    type:String,
    default:"",
}

},{timestamps:true});
const Message = mongoose.model('Message',messageschema);
export default Message;