import { X } from "lucide-react";
import { useAuthStore } from "../store/Authstore";
import { useChatStore } from "../store/ChatStore";

const ChatHeader = () => {
  const { Selecteuser, setSelecteuser } = useChatStore();
  const { onlineusers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={Selecteuser.pic || "/avatar.png"} alt={Selecteuser.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{Selecteuser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineusers.includes(Selecteuser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelecteuser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;