
import React, { useState } from 'react';
import { X, Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './UIComponents';

const RoutineSettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userSettings, updateSettings, myClubs } = useApp();
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (clubId: string, day: string) => {
    const newRoutineSchedules = { ...userSettings.routineSchedules };
    if (!newRoutineSchedules[clubId]) {
        newRoutineSchedules[clubId] = {
            '월': { active: false, time: '22:00' },
            '화': { active: false, time: '22:00' },
            '수': { active: false, time: '22:00' },
            '목': { active: false, time: '22:00' },
            '금': { active: false, time: '22:00' },
            '토': { active: false, time: '22:00' },
            '일': { active: false, time: '22:00' },
        };
    }
    
    newRoutineSchedules[clubId][day].active = !newRoutineSchedules[clubId][day].active;
    updateSettings({ routineSchedules: newRoutineSchedules });
  };

  const updateTime = (clubId: string, day: string, time: string) => {
    const newRoutineSchedules = { ...userSettings.routineSchedules };
    newRoutineSchedules[clubId][day].time = time;
    updateSettings({ routineSchedules: newRoutineSchedules });
  };

  const selectedClub = myClubs.find(c => c.id === selectedClubId);

  return (
    <div className="absolute inset-0 z-[160] bg-white flex flex-col animate-slide-up h-full overflow-hidden">
      <header className="p-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
            {selectedClubId && (
                <button onClick={() => setSelectedClubId(null)} className="p-1 -ml-1 text-gray-400 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={20} />
                </button>
            )}
            <h2 className="text-xl font-black text-secondary">
                {selectedClubId ? '개별 인증 설정' : '요일별 마감 시간'}
            </h2>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!selectedClubId ? (
            <>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    인증 스케줄을 변경할 루틴을 선택해주세요.
                </p>
                <div className="space-y-3">
                    {myClubs.map(club => (
                        <button 
                            key={club.id}
                            onClick={() => setSelectedClubId(club.id)}
                            className="w-full p-6 rounded-[28px] border border-gray-100 bg-white flex items-center justify-between hover:border-primary group transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    {club.icon}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-sm text-secondary">{club.title}</h4>
                                    <p className="text-[10px] text-gray-400">설정 변경하기</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-200 group-hover:text-primary" />
                        </button>
                    ))}
                </div>
            </>
        ) : (
            <>
                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100">
                        {selectedClub?.icon}
                    </div>
                    <div>
                        <h4 className="font-black text-secondary text-base">{selectedClub?.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Individual Schedule</p>
                    </div>
                </div>

                <div className="space-y-3">
                {days.map(day => {
                    const clubSchedule = userSettings.routineSchedules[selectedClubId] || {};
                    const config = clubSchedule[day] || { active: false, time: '22:00' };
                    
                    return (
                    <div key={day} className={`p-5 rounded-[28px] border transition-all flex items-center justify-between ${config.active ? 'border-primary bg-[#FFF9E6]' : 'border-gray-100 bg-white'}`}>
                        <div className="flex items-center gap-4">
                        <button 
                            onClick={() => toggleDay(selectedClubId, day)}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${config.active ? 'bg-secondary text-primary' : 'bg-gray-100 text-gray-300'}`}
                        >
                            <span className="font-black text-sm">{day}</span>
                        </button>
                        {config.active && (
                            <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">마감 시간</span>
                            <select 
                                value={config.time}
                                onChange={(e) => updateTime(selectedClubId, day, e.target.value)}
                                className="bg-transparent text-sm font-black text-secondary outline-none"
                            >
                                {['07:00', '12:00', '18:00', '20:00', '22:00', '24:00'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            </div>
                        )}
                        </div>
                        
                        <div 
                        onClick={() => toggleDay(selectedClubId, day)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${config.active ? 'bg-primary' : 'bg-gray-200'}`}
                        >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.active ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                    </div>
                    );
                })}
                </div>
            </>
        )}
      </div>

      <div className="p-6 safe-area-bottom">
         <Button onClick={selectedClubId ? () => setSelectedClubId(null) : onClose}>
            {selectedClubId ? '확인' : '설정 저장하기'}
         </Button>
      </div>
    </div>
  );
};

export default RoutineSettingsModal;
