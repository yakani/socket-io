import React, { useEffect ,useState } from 'react'
import { useChatStore } from '../store/ChatStore'
import Sidebarskeleton from './skeleton/sidebarsckeleting';
import { Users } from "lucide-react";
import { useAuthStore } from '../store/Authstore';
const Sidebar = () => {
  const {users , isuserloading , setSelecteuser, Selecteuser , getusers} = useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const {onlineusers} = useAuthStore();
  useEffect(()=>{
    getusers();
  },[getusers])
  const filteredUsers = showOnlineOnly
  ? users.filter((user) => onlineusers.includes(user._id))
  : users;

  if(isuserloading) return <Sidebarskeleton/>
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
     
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineusers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelecteuser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${Selecteuser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.pic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineusers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineusers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  
  )
}

export default Sidebar
