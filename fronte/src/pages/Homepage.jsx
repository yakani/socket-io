import React from 'react'
import { useChatStore } from '../store/ChatStore'
import Sidebar from '../component/Sidebar'
import Chatcontainer from "../component/Chatcontainer"
import Nochat from "../component/Nochat"
const Homepage = () => {
  const { Selecteuser } =useChatStore();
  return (
    <div className='h-full bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[cal(100vh-8rem)]'>
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar/>
            { Selecteuser ? <Chatcontainer/>:<Nochat/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
