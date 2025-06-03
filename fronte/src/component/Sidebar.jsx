import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/ChatStore';
import Sidebarskeleton from './skeleton/sidebarsckeleting';
import { Users } from "lucide-react";
import { useAuthStore } from '../store/Authstore';

const Sidebar = () => {
  const { users, isuserloading, setSelecteuser, Selecteuser, getusers } = useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { onlineusers } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getusers();
  }, [getusers]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Always show sidebar on desktop
      } else {
        setIsOpen(false); // Hide sidebar on mobile by default
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineusers.includes(user._id))
    : users;

  if (isuserloading) return <Sidebarskeleton />;

  return (
    <>
      {/* Mobile menu button - only shows on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 p-2 rounded-md bg-gray-800 text-white md:hidden"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40 top-0 left-0  ${isMobile ? 'max-h-[600px]' : 'max-h-screen overflow-y-auto'} 
          ${isMobile ? 'w-full' : 'w-72'}
          ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0 md:w-20'} 
          border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100
        `}
      >
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
              onClick={() => {
                setSelecteuser(user);
                if (isMobile) setIsOpen(false); // Close sidebar on mobile when selecting a user
              }}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${Selecteuser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative  lg:mx-0">
                
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
              <div className={` text-left min-w-0`}>
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

      {/* Overlay - only shows on mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;