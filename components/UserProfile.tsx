import React from 'react';
import { X, Trophy, Flame, Calendar, Award, UserPlus, MessageCircle, UserCheck, Clock } from 'lucide-react';
import { Avatar, Badge, LevelBadge } from './UIComponents';
import { useApp } from '../context/AppContext';

interface UserProfileProps {
  userId: string;
  nickname: string;
  profileImg?: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, nickname, profileImg, onClose }) => {
  const { friends, sentRequests, sendFriendRequest, startChat, user } = useApp();
  
  // Mock data simulation based on props
  const streak = Math.floor(Math.random() * 50) + 1;
  const successRate = 85 + Math.floor(Math.random() * 15);
  const totalCheckIns = streak * 3 + Math.floor(Math.random() * 20);

  const isFriend = friends.includes(userId);
  const isSent = sentRequests.includes(userId);
  const isMe = user?.id === userId;

  return (
    <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in p-0 sm:p-6">
      <div className="bg-white w-full max-w-sm h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col animate-slide-up relative shadow-2xl">
        
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-br from-[#FFD046] to-orange-300 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white backdrop-blur-sm transition-colors z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 -mt-12 flex-1 overflow-y-auto hide-scrollbar">
          <div className="flex flex-col items-center mb-6">
             <div className="p-1.5 bg-white rounded-full shadow-sm mb-3">
               <Avatar src={profileImg} alt={nickname} size="lg" />
             </div>
             <div className="flex items-center gap-2 mb-1">
               <h2 className="text-xl font-black text-[#333333]">{nickname}</h2>
               <LevelBadge count={totalCheckIns} />
             </div>
             <p className="text-xs text-gray-400 font-medium">@{userId} · Routine Enthusiast</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
             <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <div className="w-8 h-8 mx-auto bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-2">
                   <Flame size={16} className="fill-current" />
                </div>
                <p className="text-[10px] text-gray-400 font-bold mb-0.5">Current Streak</p>
                <p className="text-lg font-black text-[#333333]">{streak}일</p>
             </div>
             <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <div className="w-8 h-8 mx-auto bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-2">
                   <Trophy size={16} className="fill-current" />
                </div>
                <p className="text-[10px] text-gray-400 font-bold mb-0.5">Success Rate</p>
                <p className="text-lg font-black text-[#333333]">{successRate}%</p>
             </div>
             <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                <div className="w-8 h-8 mx-auto bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                   <Calendar size={16} />
                </div>
                <p className="text-[10px] text-gray-400 font-bold mb-0.5">Total Days</p>
                <p className="text-lg font-black text-[#333333]">{totalCheckIns}회</p>
             </div>
          </div>

          {/* Badges / Achievements */}
          <div className="mb-8">
             <h3 className="font-bold text-sm text-[#333333] mb-3 flex items-center gap-2">
               <Award size={16} className="text-[#FFD046]" /> 획득한 뱃지
             </h3>
             <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="shrink-0 w-16 flex flex-col items-center gap-1 opacity-100">
                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl grayscale hover:grayscale-0 transition-all cursor-pointer">
                        {i === 1 ? '🏃‍♂️' : i === 2 ? '🔥' : '⏰'}
                     </div>
                     <span className="text-[9px] text-gray-400 font-medium">
                        {i === 1 ? '러닝 마스터' : i === 2 ? '3주 연속' : '얼리버드'}
                     </span>
                  </div>
                ))}
             </div>
          </div>

          {/* Recent Activity Mock */}
          <div>
            <h3 className="font-bold text-sm text-[#333333] mb-3">최근 활동</h3>
            <div className="space-y-3">
               {[1, 2].map((i) => (
                 <div key={i} className="flex gap-3 p-3 rounded-2xl border border-gray-50 bg-white shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl shrink-0 overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-${i === 1 ? '1484480974693-6ca0a78fb36b' : '1517836357463-d25dfeac3438'}?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-800 line-clamp-1 mb-1">오늘도 미라클 모닝 성공! 🔥</p>
                       <p className="text-[10px] text-gray-400">{i}일 전</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 safe-area-bottom w-full">
           {!isMe && (
             <div className="flex gap-3">
               {isFriend ? (
                 <>
                   <button 
                     onClick={() => startChat(userId, nickname, profileImg)}
                     className="flex-1 py-4 bg-[#333333] text-white rounded-2xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     <MessageCircle size={18} /> 메시지
                   </button>
                   <button className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 cursor-default">
                     <UserCheck size={18} /> 친구
                   </button>
                 </>
               ) : isSent ? (
                 <button 
                    disabled
                    className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                 >
                   <Clock size={18} /> 신청 보냄
                 </button>
               ) : (
                 <button 
                    onClick={() => sendFriendRequest(userId)}
                    className="w-full py-4 bg-[#FFD046] text-[#333333] rounded-2xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-100"
                 >
                   <UserPlus size={18} /> 친구 신청하기
                 </button>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
