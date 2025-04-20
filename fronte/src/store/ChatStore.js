import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./Authstore";
export const useChatStore = create((set,get)=>({
message : [],
users: [],
Selecteuser:null,
isuserloading:false,
ismessageloading:false,

getusers: async()=>{
    set({isuserloading:true});
    try {
        const res = await axiosInstance.get('message/user');
        set({users : res.data});
    } catch (error) {
        toast.error(error.message);
    }finally{
        set({isuserloading:false});
    }
},
getmessages: async(id)=>{
    set({ismessageloading:true});
    try {
    const res = await axiosInstance.get(`message/${id}`);
    set({message:res.data});
    } catch (error) {
        toast.error(error.message);
    }finally{
        set({ismessageloading:false});
    }
},
sendMessage: async(params)=>{
    const { Selecteuser , message} = get();
    try {
        const res = await axiosInstance.post(`message/${Selecteuser._id}`,params);
        set({message:[...message,res.data]});

    } catch (error) {
        toast.error(error.message);
    }
},
listenmessage:()=>{
    const {Selecteuser} = get();
    if(!Selecteuser) return ;

   const sock =  useAuthStore.getState().socket;
   sock.on("msg",(msg)=>{
    if(msg.senderId != Selecteuser._id)return;
    set({message:[...get().message,msg]});
   })
},
stoplisten:()=>{
    const sock =  useAuthStore.getState().socket;
    sock.off("msg");
},

setSelecteuser: (Selecteuser)=>set({Selecteuser})
}));