import React, { useState } from 'react';
import { ChevronLeft, Bell, Users, CheckCircle2, XCircle, Clock, AlertTriangle, Send } from 'lucide-react';
import { Avatar, Button, Badge } from './UIComponents';
import { useApp } from '../context/AppContext';

interface MakerModeProps {
  onClose: () => void;
}

const MakerMode: React.FC<MakerModeProps> = ({ onClose }) => {
  const { showToast } = useApp();
  const [selectedGroup, setSelectedGroup] = useState('A-3');
  
  const members = [
    { id: '1', name: '김열정', history: [1, 1, 1, 0, 1, 1, 0], rate: 85, img: '1' },
    { id: '2', name: '이꾸준', history: [1, 1, 1, 1, 1, 1, 1], rate: 100, img: '2' },
    { id: '3', name: '박루틴', history: [1, 0, 1, 0, 1, 0, 0], rate: 42, img: '3' },
    { id: '4', name: '최몰입', history: [0, 0, 0, 1, 1, 1, 0], rate: 30, img: '4' },
  ];

  const handleSendAlarm = (name: string) => {
    showToast(`${name}님에게 인증 독려 알림톡을 보냈습니다.`);
  };

  return (
    <div className="absolute inset-0 z-[170] bg-[#FAFAFA] flex flex-col animate-slide-up overflow-hidden">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:bg-gray-100 rounded-full"><ChevronLeft size={24} /></button>
          <h2 className="text-xl font-black text-secondary">메이커 스튜디오</h2>
        </div>
        <Badge type="motimaker" className="px-3 py-1">Admin</Badge>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
         {/* Group Selector */}
         <div className="flex gap-2 mb-8">
            {['A-1', 'A-2', 'A-3'].map(g => (
                <button 
                  key={g} 
                  onClick={() => setSelectedGroup(g)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
                    ${selectedGroup === g ? 'bg-[#333333] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                >
                  {g}조 관리
                </button>
            ))}
         </div>

         {/* Stats Summary */}
         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users size={14} /> <span className="text-[10px] font-bold">현재 조원</span>
               </div>
               <p className="text-xl font-black text-secondary">12명</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <AlertTriangle size={14} /> <span className="text-[10px] font-bold">미인증</span>
               </div>
               <p className="text-xl font-black text-orange-500">3명</p>
            </div>
         </div>

         {/* Member Status List */}
         <h3 className="text-xs font-black text-gray-400 uppercase mb-4 px-1">조원 주간 현황</h3>
         <div className="space-y-4">
            {members.map(m => (
                <div key={m.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.img}`} size="sm" />
                            <div>
                                <h4 className="text-sm font-bold text-secondary">{m.name}</h4>
                                <span className={`text-[10px] font-bold ${m.rate < 50 ? 'text-red-500' : 'text-green-500'}`}>달성률 {m.rate}%</span>
                            </div>
                        </div>
                        {m.history[new Date().getDay()] === 0 && (
                            <button 
                              onClick={() => handleSendAlarm(m.name)}
                              className="px-3 py-1.5 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold flex items-center gap-1 active:scale-95"
                            >
                                <Bell size={10} /> 알림톡 발송
                            </button>
                        )}
                    </div>
                    
                    {/* Progress Grid */}
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                        {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                            <div key={day} className="flex flex-col items-center gap-1.5">
                                <span className="text-[8px] font-bold text-gray-300">{day}</span>
                                {m.history[i] === 1 ? (
                                    <CheckCircle2 size={14} className="text-[#FFD046]" />
                                ) : (
                                    <XCircle size={14} className="text-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
         </div>
      </div>

      <div className="p-6 safe-area-bottom">
         <button className="w-full py-4 bg-[#333333] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
            <Send size={16} /> 조 전체 공지 알림톡 보내기
         </button>
      </div>
    </div>
  );
};

export default MakerMode;