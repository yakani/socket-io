import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from "socket.io-client"
export const useAuthStore = create((set,get) => ({
  user: null,
  isLoggedIn: false,
  isSigningUp: false,
  isUpdatingpic:false,
  isLoggingout:false,
  islogging:false,
  isCheckingAuth:true,
  isuploadingprofile:false,
  onlineusers:[],
  socket:null,
  checkAuth: async()=>{
    try {
        const res = await axiosInstance.get('/auth/check');
        set({user:res.data,isLoggedIn:true});
        get().connectsocket();
    } catch (error) {
        set({user:null,isLoggedIn:false});
    }finally{
        set({isCheckingAuth:false});
    }
  },
  signup : async(data)=>{
    set({isSigningUp:true});
    try {
      const res = await axiosInstance.post('/auth/signup',data);
      set({user:res.data});
      get().connectsocket();
      toast.success("Account created succesfully");
      
    } catch (error) {
        toast.error(error.message);
    }finally{
        set({isSigningUp:false});
    }
  },
  logout: async()=>{
    try {
      set({isLoggingout: true});
      const res = await axiosInstance.post('/auth/logout');
      set({user:null});
      get().disconnectsocket();
      toast.success("logout succesfully");
    } catch (error) {
      toast.error(error.message);
    }finally{
      set({isLoggingout:false});
    }
  },
  login:async(data)=>{
    try {
      const res = await axiosInstance.post('auth/login',data);
      set({user:res.data});
      get().connectsocket();
      toast.success("login");
    } catch (error) {
      toast.error(error.message);
    }finally{
      set({islogging:false});
    }
  },
  updateprofile:async(data)=>{
    try {
      set({isuploadingprofile:true});
      const res = await axiosInstance.put('auth/avatar',data);
      set({user:res.data});
      toast.success("save");
    } catch (error) {
      toast.error(error.message);
    }finally{
      set({isuploadingprofile:false});
    }
  },
  connectsocket:()=>{
    const {user} = get()
    if(!user || get().socket?.connected)return;
    const sock = io(import.meta.env.VITE_Api,{
      query:{
        userID:user._id
      }
    });
    sock.connect();
    sock.on("onlineusers",(ids)=>{
      set({onlineusers:ids});
    });
    set({socket : sock});
  },
  disconnectsocket:()=>{
    if(get().socket?.connected){

    get().socket.disconnect();
    set({socket:null});
    } 
  }
}));