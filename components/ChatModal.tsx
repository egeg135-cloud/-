
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, Search, MoreHorizontal, MessageCircle, Plus, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar } from './UIComponents';
import { ChatRoom, Message } from '../types';

const ChatModal: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chats, activeChatId, setActiveChatId, sendMessage, user } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    if (activeChatId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatId, activeChat?.messages]);

  if (!isChatOpen) return null;

  const handleSend = () => {
    if (activeChatId && inputText.trim()) {
      sendMessage(activeChatId, inputText);
      setInputText('');
    }
  };

  // Render: Chat Room (1:1 DM)
  if (activeChatId && activeChat) {
    return (
      <div className="absolute inset-0 z-[250] bg-white animate-slide-up flex flex-col h-full overflow-hidden">
        {/* Chat Room Header */}
        <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveChatId(null)} 
              className="p-1 -ml-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Avatar src={activeChat.partnerImg} size="sm" border />
              <div className="flex flex-col">
                  <span className="font-bold text-[#333333] text-sm leading-tight">{activeChat.partnerName}</span>
                  <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full">
            <MoreHorizontal size={20} />
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#FAFAFA] hide-scrollbar">
           <div className="text-center text-[10px] text-gray-400 my-8 py-2 px-4 bg-gray-100/50 rounded-full w-fit mx-auto font-bold">
             {activeChat.partnerName}님과 대화가 시작되었습니다.
           </div>
           
           {activeChat.messages.map((msg: Message, idx) => {
             const isMe = msg.senderId === user?.id;
             const prevMsg = activeChat.messages[idx - 1];
             const nextMsg = activeChat.messages[idx + 1];

             const isFirstOfSequence = !prevMsg || prevMsg.senderId !== msg.senderId;
             const isLastOfMinute = !nextMsg || nextMsg.senderId !== msg.senderId || nextMsg.timestamp !== msg.timestamp;

             return (
               <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isFirstOfSequence ? 'mt-4' : 'mt-0.5'} animate-fade-in`}>
                 {!isMe && (
                   <div className="w-9 mr-2 shrink-0">
                     {isFirstOfSequence ? <Avatar src={activeChat.partnerImg} size="sm" border /> : null}
                   </div>
                 )}
                 <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <div className={`flex items-end gap-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div 
                          className={`px-4 py-2.5 rounded-[20px] text-sm leading-relaxed shadow-sm
                            ${isMe 
                              ? 'bg-[#1A1A1A] text-white rounded-tr-none' 
                              : 'bg-white border border-gray-100 text-[#333333] rounded-tl-none'}`}
                        >
                          {msg.text}
                        </div>
                        {isLastOfMinute && (
                            <span className="text-[8px] text-gray-400 font-medium mb-1 shrink-0">
                                {msg.timestamp}
                            </span>
                        )}
                    </div>
                 </div>
               </div>
             );
           })}
           <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area (1:1 DM) */}
        <div className="p-3 pb-8 bg-white border-t border-gray-100 safe-area-bottom">
           <div className="flex items-center gap-2">
              <button className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 active:scale-95 transition-all">
                  <Plus size={22} />
              </button>
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-1 border border-transparent focus-within:border-[#FFD046] focus-within:bg-white transition-all shadow-inner">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                            handleSend();
                        }
                    }}
                    placeholder="메시지 입력..."
                    className="flex-1 bg-transparent py-3 text-sm outline-none placeholder-gray-400 font-medium"
                />
                <button 
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className={`p-1.5 rounded-lg transition-all ${inputText.trim() ? 'bg-[#1A1A1A] text-white shadow-md' : 'text-gray-300 grayscale opacity-30'}`}
                >
                    <Send size={18} />
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Render: Chat List
  return (
    <div className="absolute inset-0 z-[250] bg-white animate-slide-up flex flex-col h-full overflow-hidden">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h2 className="text-xl font-black text-secondary">다이렉트 메시지</h2>
        <button onClick={() => setIsChatOpen(false)} className="text-xs font-bold text-gray-400 px-3 py-1.5 hover:bg-gray-50 rounded-full border border-gray-100 transition-colors">
          닫기
        </button>
      </header>

      <div className="px-6 py-4">
        <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-3 gap-2 border border-gray-100 transition-all focus-within:bg-white focus-within:border-[#FFD046]">
           <Search size={18} className="text-gray-400" />
           <input type="text" placeholder="대화 상대 또는 메시지 검색" className="bg-transparent text-sm outline-none w-full font-medium" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
         {chats.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-400 px-10">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={32} className="opacity-20" />
             </div>
             <p className="text-sm font-bold mb-1 text-secondary">주고받은 메시지가 없어요</p>
             <p className="text-xs leading-relaxed">클럽원들의 프로필을 눌러<br/>개인적인 응원의 메시지를 보내보세요!</p>
           </div>
         ) : (
           chats.map((chat) => (
             <div 
               key={chat.id} 
               onClick={() => setActiveChatId(chat.id)}
               className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer border-b border-gray-50/50"
             >
                <div className="relative">
                    <Avatar src={chat.partnerImg} size="md" border />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-sm text-[#333333]">{chat.partnerName}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">{chat.lastTime}</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate font-medium">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-black text-white shadow-sm animate-pulse">
                    {chat.unreadCount}
                  </div>
                )}
             </div>
           ))
         )}
      </div>
    </div>
  );
};

export default ChatModal;
