
import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Trophy, Flame, Quote, Plus, X, Share2, Sparkles, TrendingUp, Calendar, Heart, Timer, Coins, Shield, Zap, ChevronRight, Smartphone, Clock, AlertCircle, X as XIcon, Bell, LayoutGrid } from 'lucide-react';
import { Avatar, Button, LevelBadge } from './UIComponents';
import { useApp } from '../context/AppContext';
import { LEVEL_CONFIG } from '../constants';
import CheckInCalendar from './CheckInCalendar';

export default function HomeScreen() {
  const { user, openCheckInModal, myCheckIn, checkInCount, myClubs, showToast, setIsClubSelectorOpen, setActiveTab, setIsDevicePreviewOpen, userSettings } = useApp();
  
  const [demoLevelIdx, setDemoLevelIdx] = useState(-1);
  const [randomQuote, setRandomQuote] = useState("");
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const displayCount = demoLevelIdx === -1 ? checkInCount : LEVEL_CONFIG[demoLevelIdx].min;

  const currentLevel = useMemo(() => {
    return [...LEVEL_CONFIG].reverse().find(l => displayCount >= l.min) || LEVEL_CONFIG[0];
  }, [displayCount]);

  const themeColor = useMemo(() => {
    switch(currentLevel.name) {
      case '씨앗': return 'rgba(168, 213, 186, 0.2)';
      case '새싹': return 'rgba(119, 221, 119, 0.2)';
      case '개화': return 'rgba(255, 183, 178, 0.3)';
      case '네온': return 'rgba(0, 243, 255, 0.2)';
      case '마스터': return 'rgba(255, 208, 70, 0.2)';
      default: return 'rgba(255, 208, 70, 0.2)';
    }
  }, [currentLevel]);

  useEffect(() => {
    const quotes = [
      "당신의 하루가 누군가의 동기가 됩니다. ✨",
      "오늘의 땀방울은 내일의 나를 만들어요. ⭐️",
      "페이스메이커와 함께라면 21일도 거뜬해요! 🔥"
    ];
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const today = new Date();
  const dayOfWeek = today.getDay(); 
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const getWeeklyStatus = (idx: number) => {
    const dayName = days[idx];
    const isGoalDay = userSettings.checkInDays.includes(dayName);
    const isPast = idx < dayOfWeek;
    const isToday = idx === dayOfWeek;
    const isDone = isPast ? (idx % 2 === 0) : (isToday && Object.values(myCheckIn).some(v => v));
    
    if (isDone) return isGoalDay ? 'done' : 'rescheduled';
    if (isPast && isGoalDay) return 'missed';
    return isGoalDay ? 'goal' : 'none';
  };

  const todayClub = myClubs[0];
  const isDoneToday = Object.values(myCheckIn).some(v => v);
  const isGoalToday = userSettings.checkInDays.includes(days[dayOfWeek]);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-28 hide-scrollbar transition-all duration-1000 relative bg-[#F4F7FB]">
      <div 
        className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-full h-[500px] blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: themeColor }}
      ></div>

      <header className="px-6 pt-16 pb-6 relative z-20">
        <div className="glass-card p-3.5 rounded-[32px] flex items-center justify-between shadow-xl">
           <div className="flex items-center gap-4">
              <div className="relative cursor-pointer" onClick={() => setActiveTab('my')}>
                 <Avatar src={user?.profileImg} alt="me" border size="md" />
                 <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                    <Flame size={11} className="text-orange-500 fill-current" />
                 </div>
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <h1 className="text-[17px] font-black text-secondary tracking-tight">{user?.nickname}님 <span style={{color: currentLevel.color}}>{displayCount}일째</span></h1>
                    <button onClick={() => setDemoLevelIdx((p) => (p + 1) % LEVEL_CONFIG.length)}>
                        <LevelBadge count={displayCount} />
                    </button>
                 </div>
                 <p className="text-[11px] font-bold text-gray-400">성실도 상위 0.1% 루틴 마스터</p>
              </div>
           </div>
           <button className="p-3 bg-white/50 rounded-2xl text-gray-500 active:scale-90 transition-all border border-white/50 shadow-sm"><Bell size={20} /></button>
        </div>
      </header>

      <div className="px-6 space-y-7 relative z-10">
        <section className="glass-card rounded-[40px] p-8 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Calendar size={18} /></div>
                    <span className="text-[12px] font-black tracking-widest text-gray-400 uppercase">주간 달성 현황</span>
                </div>
                <button onClick={() => setShowFullCalendar(true)} className="text-gray-300 hover:text-secondary transition-colors p-2"><LayoutGrid size={20} /></button>
            </div>

            <div className="flex justify-between items-center mb-8 px-1">
                {days.map((day, i) => {
                    const status = getWeeklyStatus(i);
                    const isToday = i === dayOfWeek;
                    return (
                        <div key={day} className="flex flex-col items-center gap-3">
                            <span className={`text-[11px] font-black ${isToday ? 'text-primary' : 'text-gray-300 uppercase'}`}>{day}</span>
                            <div className={`w-9.5 h-9.5 rounded-[20px] flex items-center justify-center transition-all border-2
                                ${status === 'done' ? 'bg-primary border-primary text-secondary shadow-lg shadow-primary/20' : 
                                  status === 'rescheduled' ? 'bg-blue-50/50 border-blue-200 border-dashed text-blue-400' :
                                  status === 'missed' ? 'bg-red-50/50 border-red-200 text-red-400' : 
                                  isToday ? 'border-primary bg-primary/5 scale-110 shadow-lg' : 'border-white/40 bg-white/20'}`}
                            >
                                {status === 'done' && <Flame size={18} className="fill-current animate-bounce-in" />}
                                {status === 'rescheduled' && <Clock size={16} strokeWidth={2.5} />}
                                {status === 'missed' && <XIcon size={16} strokeWidth={3} />}
                                {status === 'goal' && !isToday && <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-6">
                <div className="text-center px-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap size={12} className="text-primary fill-current" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">오늘의 목표 루틴</span>
                    </div>
                    <h3 className="text-[21px] font-black leading-tight text-secondary break-keep">
                       {isGoalToday ? (
                         <>오늘의 <span className="text-primary underline underline-offset-4 decoration-2 decoration-primary/30">{todayClub?.title || '주요 루틴'}</span><br/>인증을 남길 시간이에요!</>
                       ) : (
                         <>꿀같은 휴식 시간!<br/><span className="text-primary">내일의 도약</span>을 준비하세요.</>
                       )}
                    </h3>
                </div>

                <Button 
                    onClick={() => setIsClubSelectorOpen(true)}
                    disabled={isDoneToday}
                    className="py-5 rounded-[24px] shadow-2xl shadow-primary/20 text-[16px] font-black"
                >
                    <Camera size={20} strokeWidth={3} /> {isDoneToday ? '오늘의 인증 완료' : '지금 바로 인증하기'}
                </Button>
            </div>
        </section>

        <div className="grid grid-cols-2 gap-5">
          <div onClick={() => setIsClubSelectorOpen(true)} className="glass-card p-6 rounded-[32px] active:scale-95 cursor-pointer transition-all hover:shadow-xl group">
             <div className="w-11 h-11 bg-blue-50/50 text-blue-500 rounded-[18px] flex items-center justify-center mb-4 border border-white/40 group-hover:rotate-6 transition-transform"><Timer size={22} /></div>
             <h4 className="font-black text-[14px] mb-1 text-secondary uppercase tracking-tight">집중 타이머</h4>
             <p className="text-[11px] text-gray-400 font-bold">나의 몰입 기록</p>
          </div>
          <div onClick={() => setIsDevicePreviewOpen(true)} className="glass-card p-6 rounded-[32px] active:scale-95 cursor-pointer transition-all hover:shadow-xl group">
             <div className="w-11 h-11 bg-emerald-50/50 text-emerald-500 rounded-[18px] flex items-center justify-center mb-4 border border-white/40 group-hover:rotate-6 transition-transform"><Smartphone size={22} /></div>
             <h4 className="font-black text-[14px] mb-1 text-secondary uppercase tracking-tight">기기 연동</h4>
             <p className="text-[11px] text-gray-400 font-bold">위젯 & 워치</p>
          </div>
        </div>

        <div className="py-8 px-2 pb-10">
            <Quote size={24} className="text-primary/30 mb-3" />
            <p className="text-[15px] font-bold text-gray-400 leading-relaxed italic break-keep">"{randomQuote}"</p>
        </div>
      </div>
      
      {/* 플로팅 버튼 - 오른쪽 하단 고정 */}
      <button 
        onClick={() => setIsClubSelectorOpen(true)}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center z-40 active:scale-90 active:rotate-12 transition-all bg-primary text-secondary border-[3px] border-white"
      >
        <Plus size={32} strokeWidth={4} />
      </button>

      {showFullCalendar && <CheckInCalendar onClose={() => setShowFullCalendar(false)} />}
    </div>
  );
}
