import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/ChatStore'
import MessageSkeleton from './skeleton/messageskeleton';
import ChatHeader from '../component/ChatHeader'
import Messageinput from './Messageinput';
import { useAuthStore } from '../store/Authstore';
import { formatMessageTime } from '../lib/util';
const Chatcontainer = () => {
  const {ismessageloading ,message , getmessages , Selecteuser ,listenmessage,stoplisten} = useChatStore();
const { user} = useAuthStore();
const messageEndRef =useRef(null);
   useEffect(()=>{
    getmessages(Selecteuser._id);
    listenmessage();
    return ()=>stoplisten();
  },[Selecteuser._id , getmessages , stoplisten , listenmessage]);

useEffect(()=>{
  if (messageEndRef.current && message) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
},[message])
  if(ismessageloading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <Messageinput/>
    </div>
  )
 
  return (
    <div  className="flex-1 flex flex-col overflow-auto max-h-[500px]">
      <ChatHeader/>
      <div className="flex-1 overflow-y-auto space-y-4 ">
          {message.map((msg)=>
          <div key={msg._id}
          className={`chat ${msg.senderId == user._id ? "chat-end":"chat-start"}`}
          ref={messageEndRef}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={msg.senderId == user._id ? user.pic : Selecteuser.pic} alt="" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time  className="text-xs opacity-50 ml-1 ">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {
                msg.Image != "" ? <img
                  src={msg.Image}
                  className='sm:max-w-[200px] mb-2 rounded-md'
                /> :<></>
              }
              {msg.Text !="" ? <p>{msg.Text}</p> : <></>}
            </div>

          </div>)}
      </div>
      <Messageinput/>
    </div>
  )
}

export default Chatcontainer
