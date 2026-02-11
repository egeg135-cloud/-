
import React, { useState, useRef, useEffect } from 'react';
// Added ArrowRight to the imports from lucide-react
import { Bell, Flame, MessageCircle, MoreHorizontal, Camera, Send, ChevronLeft, MessageSquare, Image as ImageIcon, Users, Plus, Zap, Heart, CheckCircle2, ChevronRight, TrendingUp, Sparkles, Clock, X as XIcon, Trophy, Hand, ArrowRight } from 'lucide-react';
import { Avatar, BaseModal, HeartParticle, ImageWithSkeleton, Badge } from './UIComponents';
import { useApp } from '../context/AppContext';
import { MOCK_COMPLETED_CLUBS } from '../constants';

const FeedScreen: React.FC = () => {
  const { feed, handleReaction, setIsChatOpen, chats, myClubs, user, clubChats, sendClubMessage, activeClubId, setActiveClubId, showToast, openCheckInModal } = useApp();
  const [viewMode, setViewMode] = useState<'chat' | 'feed'>('chat');
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [chatInput, setChatInput] = useState('');
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{id: number, x: number, y: number}[]>([]);

  const activePost = feed.find(f => f.id === activeCommentId);
  const activeClub = myClubs.find(c => c.id === activeClubId);
  const activeClubMessages = activeClubId ? (clubChats[activeClubId] || []) : [];
  const currentFeed = activeClubId ? feed.filter(item => item.clubId === activeClubId) : [];
  const unreadChatTotal = chats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  const [membersStatus] = useState([
    { id: 'm1', name: '김열정', status: 'DONE', img: '1' },
    { id: 'm2', name: '이꾸준', status: 'PENDING', img: '2' },
    { id: 'm3', name: '최몰입', status: 'NONE', img: '3' },
    { id: 'm4', name: '박루틴', status: 'DONE', img: '4' },
  ]);

  const handlePoke = (name: string) => {
    showToast(`${name}님을 콕 찔렀습니다! 👉`, 'success');
  };

  useEffect(() => {
    if (viewMode === 'chat' && activeClubId) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeClubMessages, viewMode, activeClubId]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (viewMode === 'chat') setHeaderCollapsed(e.currentTarget.scrollTop > 30);
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    handleReaction(id);
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== newHeart.id)), 1000);
  };

  const handleSendClubMessage = () => {
      if (activeClubId && chatInput.trim()) {
          sendClubMessage(activeClubId, chatInput);
          setChatInput('');
      }
  };

  if (!activeClubId) {
    return (
      <div className="flex flex-col h-full bg-[#F4F7FB] animate-fade-in pb-28 overflow-y-auto hide-scrollbar">
        <header className="px-6 pt-16 pb-6 bg-white/40 backdrop-blur-2xl sticky top-0 z-10 flex justify-between items-center border-b border-white/20">
           <h1 className="text-xl font-black text-secondary">나의 클럽</h1>
           <div className="flex gap-2">
             <button onClick={() => setIsChatOpen(true)} className="p-3 text-gray-400 relative active:scale-90 transition-all">
               <MessageSquare size={22} />
               {unreadChatTotal > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
             </button>
             <button className="p-3 text-gray-400 active:scale-90 transition-all"><Bell size={22} /></button>
           </div>
        </header>

        <div className="px-6 space-y-6 mt-6">
           <div className="glass-card rounded-[22px] p-1.5 flex border border-white/40 shadow-lg">
              <button onClick={() => setActiveTab('active')} className={`flex-1 py-3 rounded-2xl font-black text-[13px] transition-all ${activeTab === 'active' ? 'bg-secondary text-white shadow-md' : 'text-gray-400'}`}>참여 중</button>
              <button onClick={() => setActiveTab('completed')} className={`flex-1 py-3 rounded-2xl font-black text-[13px] transition-all ${activeTab === 'completed' ? 'bg-secondary text-white shadow-md' : 'text-gray-400'}`}>완료 루틴</button>
           </div>

           {activeTab === 'active' ? (
             <div className="space-y-4">
                {myClubs.map((club) => (
                    <div 
                      key={club.id} 
                      onClick={() => { setActiveClubId(club.id); setViewMode('chat'); }} 
                      className="glass-card rounded-[36px] p-6 border border-white/40 active:scale-[0.98] transition-all group cursor-pointer shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/40">{club.icon}</div>
                            <div>
                                <h3 className="text-[16px] font-black text-secondary leading-tight">{club.title}</h3>
                                <p className="text-[11px] font-bold text-primary mt-1">{club.currentWeek}주차 진행 중</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">TEAM PROGRESS</p>
                                <p className="text-[14px] font-black text-secondary">{club.teamProgress}% 인증 완료</p>
                            </div>
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3].map(i => <Avatar key={i} size="xs" border src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Team${i}${club.id}`} />)}
                            </div>
                        </div>
                    </div>
                ))}
             </div>
           ) : (
             <div className="space-y-4 animate-fade-in">
                <div className="p-4 flex items-center gap-3 bg-yellow-50 rounded-2xl mb-2">
                    <Trophy size={18} className="text-primary" />
                    <span className="text-[12px] font-black text-[#8A7000]">성공적으로 완주한 명예의 클럽들입니다.</span>
                </div>
                {MOCK_COMPLETED_CLUBS.map((club) => (
                    <div 
                      key={club.id} 
                      className="glass-card rounded-[32px] p-6 border border-white/40 opacity-80 relative overflow-hidden"
                    >
                        <div className="absolute top-4 right-4"><Badge type="success">완주</Badge></div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-3xl border border-white/40">{club.icon}</div>
                            <div>
                                <h3 className="text-[16px] font-black text-secondary leading-tight opacity-70">{club.title}</h3>
                                <p className="text-[11px] font-bold text-gray-400 mt-1">최종 달성률 100%</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/40 rounded-2xl text-[12px] font-bold text-gray-500 italic leading-relaxed">
                            "{club.lastMessage}"
                        </div>
                    </div>
                ))}
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white hide-scrollbar animate-fade-in relative overflow-hidden">
      {hearts.map(h => <HeartParticle key={h.id} x={h.x} y={h.y} />)}
      
      <header className="px-4 py-4 bg-white/70 backdrop-blur-2xl sticky top-0 z-40 border-b border-white/40 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <button onClick={() => setActiveClubId(null)} className="p-2 -ml-1 hover:bg-black/5 rounded-full transition-all"><ChevronLeft size={22} className="text-gray-500" /></button>
            <h1 className="text-[15px] font-black text-secondary truncate max-w-[150px]">{activeClub?.title}</h1>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setViewMode(viewMode === 'chat' ? 'feed' : 'chat')} className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-black transition-all border ${viewMode === 'feed' ? 'bg-secondary text-white border-secondary' : 'bg-white/50 text-gray-500 border-gray-100'}`}>
                {viewMode === 'chat' ? <ImageIcon size={16} /> : <MessageCircle size={16} />}
                <span className="text-[12px]">{viewMode === 'chat' ? '갤러리' : '채팅'}</span>
            </button>
            <button className="p-2 text-gray-400"><MoreHorizontal size={20} /></button>
        </div>
      </header>

      {viewMode === 'chat' && (
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${headerCollapsed ? 'max-h-0 opacity-0 scale-95' : 'max-h-64 opacity-100 p-5'}`}>
            <div className="glass-dark rounded-[36px] p-6 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[70px]"></div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">함께 달리는 메이트</p>
                    <Badge className="bg-primary/20 text-primary border-none px-2.5 py-1 text-[10px] font-black">LIVE</Badge>
                </div>
                <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-1">
                    {membersStatus.map(m => (
                        <div key={m.id} className="flex flex-col items-center gap-2 min-w-[56px] relative group">
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full blur-md transition-all ${m.status === 'DONE' ? 'bg-green-500/30' : 'bg-primary/20 opacity-0 group-hover:opacity-100'}`}></div>
                                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.img}`} size="sm" border />
                                {m.status === 'DONE' ? (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#1A1A1A] animate-bounce-in shadow-lg"><CheckCircle2 size={10} className="text-white" /></div>
                                ) : (
                                    <button 
                                        onClick={() => handlePoke(m.name)} 
                                        className="absolute -bottom-1 -right-1 bg-primary text-secondary rounded-full p-1.5 border-2 border-[#1A1A1A] shadow-lg active:scale-75 transition-all"
                                    >
                                        <ArrowRight size={11} className="fill-current" />
                                    </button>
                                )}
                            </div>
                            <span className={`text-[10px] font-black ${m.status === 'DONE' ? 'text-white' : 'text-gray-500'}`}>{m.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-4 hide-scrollbar" onScroll={handleScroll}>
        {viewMode === 'chat' ? (
           <div className="p-5 pt-0">
             {activeClubMessages.map((msg, idx) => {
                 const isMe = msg.senderId === user?.id;
                 const prevMsg = activeClubMessages[idx - 1];
                 const nextMsg = activeClubMessages[idx + 1];
                 // Fix: Rename isFirstInSequence to isFirstOfSequence
                 const isFirstOfSequence = !prevMsg || prevMsg.senderId !== msg.senderId;
                 const isLastOfMinute = !nextMsg || nextMsg.senderId !== msg.senderId || nextMsg.timestamp !== msg.timestamp;

                 return (
                     <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isFirstOfSequence ? 'mt-5' : 'mt-1'}`}>
                         {!isMe && isFirstOfSequence && <div className="mr-3 shrink-0"><Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderId}`} size="xs" border /></div>}
                         {!isMe && !isFirstOfSequence && <div className="w-9"></div>}
                         <div className={`max-w-[78%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                             {msg.type === 'checkin' ? (
                                 <div onClick={() => msg.checkInId && setActiveCommentId(msg.checkInId)} className={`rounded-[24px] overflow-hidden shadow-2xl border-2 active:scale-95 transition-all cursor-pointer bg-white mb-1.5 ${isMe ? 'border-secondary' : 'border-gray-50'}`}>
                                     {msg.checkInImage && <img src={msg.checkInImage} className="w-64 aspect-square object-cover" />}
                                     <div className="p-4 bg-gray-50/80"><div className="flex items-center gap-2 mb-1.5"><Flame size={14} className="text-primary fill-current" /><span className="text-[12px] font-black text-secondary">인증 완료</span></div><p className="text-[12px] text-gray-400 line-clamp-1 font-medium">{msg.text}</p></div>
                                 </div>
                             ) : (
                                 <div className={`px-4.5 py-3 rounded-[22px] text-[15px] font-medium shadow-sm leading-relaxed ${isMe ? 'bg-secondary text-white rounded-tr-none' : 'bg-gray-100 text-secondary rounded-tl-none'}`}>{msg.text}</div>
                             )}
                             {isLastOfMinute && <span className="text-[9px] text-gray-300 font-bold mt-1.5 uppercase tracking-widest px-1">{msg.timestamp}</span>}
                         </div>
                     </div>
                 );
             })}
             <div ref={chatEndRef} className="h-4" />
           </div>
        ) : (
           <div className="p-5 grid grid-cols-2 gap-5 pb-24">
              {currentFeed.map((item) => (
                 <div key={item.id} className="glass-card rounded-[28px] overflow-hidden shadow-lg active:scale-95 transition-all cursor-pointer" onClick={() => setActiveCommentId(item.id)}>
                    <div className="relative aspect-square">
                       <ImageWithSkeleton src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                       <div className="flex items-center gap-2.5"><Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.userId}`} /><span className="text-[11px] font-black text-secondary truncate w-14">{item.nickname}</span></div>
                       <button onClick={(e) => handleLike(e, item.id)} className={`transition-colors ${item.isLiked ? 'text-orange-500' : 'text-gray-200'}`}><Flame size={14} fill={item.isLiked ? 'currentColor' : 'none'} /></button>
                    </div>
                 </div>
              ))}
           </div>
        )}
      </div>

      {viewMode === 'chat' && (
        <div className="bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-4 pb-26 shadow-2xl z-30">
           <div className="flex items-center gap-3">
              <button onClick={() => activeClubId && openCheckInModal(activeClubId)} className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 active:scale-90 transition-all"><Camera size={22} /></button>
              <div className="flex-1 bg-gray-100 rounded-[22px] flex items-center px-4.5 py-1.5 border border-transparent focus-within:border-secondary focus-within:bg-white transition-all shadow-inner">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendClubMessage()} placeholder="메시지를 입력하세요..." className="flex-1 bg-transparent py-3 text-[15px] outline-none font-medium" />
                <button onClick={handleSendClubMessage} disabled={!chatInput.trim()} className={`p-1.5 rounded-xl transition-all ${chatInput.trim() ? 'bg-secondary text-white' : 'text-gray-300'}`}><Send size={18} /></button>
              </div>
           </div>
        </div>
      )}

      <BaseModal isOpen={!!activeCommentId} onClose={() => setActiveCommentId(null)} title="인증 기록 상세">
         {activePost && <ImageWithSkeleton src={activePost.image} className="w-full aspect-square rounded-[32px] mb-4 shadow-2xl" />}
         <div className="px-1 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-4">
                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activePost?.userId}`} size="sm" />
                <span className="font-black text-secondary text-[15px]">{activePost?.nickname}</span>
            </div>
            <p className="text-[16px] font-bold text-secondary leading-relaxed glass-card p-5 rounded-[24px] border border-white/40">{activePost?.text}</p>
         </div>
      </BaseModal>
    </div>
  );
};

export default FeedScreen;
