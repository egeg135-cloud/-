
import React, { useState } from 'react';
import { Calendar, Bell, Settings, ChevronRight, Check, LogOut, BarChart2, Zap, ShoppingBag, Coins, Share2, Info, MessageSquare, Flame, Beaker, Timer, Brain, PiggyBank, FileText, Download, Sparkles } from 'lucide-react';
import { Avatar, BaseModal, Button, LevelBadge } from './UIComponents';
import { useApp } from '../context/AppContext';
import AccountSettings from './AccountSettings';
import CheckInCalendar from './CheckInCalendar';
import PointShop from './PointShop';
import RoutineSavings from './RoutineSavings';
import RoutineSettingsModal from './RoutineSettingsModal';

const MyScreen: React.FC = () => {
  const { user, checkInCount, logout, points, myClubs, totalFocusTime, activeSavings } = useApp();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showRoutineSettings, setShowRoutineSettings] = useState(false);

  if (!user) return null;

  const totalHours = Math.floor(totalFocusTime / 3600);
  const totalMins = Math.floor((totalFocusTime % 3600) / 60);

  const downloadFunctionalSpec = () => {
    const specContent = `...기능 명세서 데이터...`;
    const blob = new Blob([specContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '모티피플_명세서.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className="flex flex-col h-full bg-[#F4F7FB] pb-28 overflow-y-auto hide-scrollbar">
      <header className="px-6 pt-16 pb-8 bg-white/40 backdrop-blur-2xl border-b border-white/20 rounded-b-[48px] relative z-10 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-5">
              <div className="relative group cursor-pointer" onClick={() => setShowAccount(true)}>
                <Avatar size="lg" src={user.profileImg} border />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Sparkles size={13} className="text-secondary" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-secondary tracking-tight">{user.nickname}</h1>
                    <LevelBadge count={checkInCount} />
                </div>
                <p className="text-[11px] text-gray-400 font-black mt-1 tracking-widest uppercase opacity-60">루틴 마스터</p>
              </div>
           </div>
           <button onClick={() => setShowAccount(true)} className="p-4 bg-white/60 rounded-[22px] text-gray-400 active:scale-90 transition-all border border-white/40 shadow-sm"><Settings size={22}/></button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="glass-dark p-6 rounded-[34px] shadow-2xl flex flex-col items-center active:scale-95 transition-all">
              <div className="w-10 h-10 bg-white/10 text-primary rounded-xl flex items-center justify-center mb-3 border border-white/10"><Brain size={20} /></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">총 몰입 시간</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{totalHours}</span>
                <span className="text-[11px] text-gray-400 font-black uppercase">시간</span>
                <span className="text-2xl font-black text-white ml-1.5">{totalMins}</span>
                <span className="text-[11px] text-gray-400 font-black uppercase">분</span>
              </div>
           </div>
           <div className="glass-card p-6 rounded-[34px] shadow-xl flex flex-col items-center active:scale-95 transition-all">
              <div className="w-10 h-10 bg-orange-50/50 text-orange-500 rounded-xl flex items-center justify-center mb-3 border border-white/40"><Flame size={20} className="fill-current" /></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">누적 인증 횟수</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-secondary">{checkInCount}</span>
                <span className="text-[11px] text-gray-300 font-black uppercase tracking-widest">회</span>
              </div>
           </div>
        </div>

        <section className="bg-white/40 backdrop-blur-md rounded-[38px] p-6 border border-white/40 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">보유 모티포인트</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-black text-secondary tabular-nums">{points.toLocaleString()}</span>
                            <span className="text-[13px] font-bold text-primary mb-1.5">P</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowShop(true)}
                        className="bg-white/90 text-secondary px-5 py-3 rounded-2xl font-black text-[12px] flex items-center gap-2 shadow-lg active:scale-95 transition-all border border-white/50"
                    >
                        <ShoppingBag size={14} /> 포인트 상점
                    </button>
                </div>

                <button 
                   onClick={() => setShowSavings(true)}
                   className="w-full bg-white/60 border border-white/50 p-4.5 rounded-2xl flex items-center justify-between group active:scale-95 transition-all shadow-inner"
                >
                   <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-sm"><PiggyBank size={20} /></div>
                      <div className="text-left">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">성장 자산</p>
                        <h4 className="text-[13px] font-black text-secondary">{activeSavings ? '루틴 적금 진행 중 💰' : '루틴 펀딩으로 보너스 획득'}</h4>
                      </div>
                   </div>
                   <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                </button>
            </div>
        </section>
      </header>

      <div className="p-6 space-y-8 mt-4 pb-20">
         <div className="space-y-4">
            <h3 className="text-[11px] font-black text-gray-400 px-3 uppercase tracking-[0.3em]">기능 관리</h3>
            <div className="glass-card rounded-[40px] overflow-hidden shadow-xl border border-white/40">
                <button onClick={() => setShowRoutineSettings(true)} className="w-full p-6 flex items-center justify-between hover:bg-black/5 transition-all border-b border-white/20 group">
                    <div className="flex items-center gap-5">
                        <div className="w-11 h-11 bg-blue-50/50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/40 shadow-sm"><Calendar size={20} /></div>
                        <span className="text-[16px] font-black text-secondary">요일별 마감 시간 설정</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-200" />
                </button>
                <button onClick={() => setShowCalendar(true)} className="w-full p-6 flex items-center justify-between hover:bg-black/5 transition-all group">
                    <div className="flex items-center gap-5">
                        <div className="w-11 h-11 bg-purple-50/50 text-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/40 shadow-sm"><BarChart2 size={20} /></div>
                        <span className="text-[16px] font-black text-secondary">인증 현황 리포트</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-200" />
                </button>
            </div>
         </div>

         <div className="space-y-4 pt-2">
            <h3 className="text-[11px] font-black text-gray-400 px-3 uppercase tracking-[0.3em]">서비스 리소스</h3>
            <button 
                onClick={downloadFunctionalSpec}
                className="w-full glass-card p-6 rounded-[40px] flex items-center justify-between transition-all group active:scale-95 shadow-xl border border-white/40"
            >
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50/50 rounded-2xl flex items-center justify-center text-secondary border border-white/40 shadow-inner"><FileText size={24} /></div>
                    <div className="text-left">
                        <h4 className="font-black text-[16px] text-secondary mb-1 uppercase tracking-tight">기능 명세서</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">명세서 파일 저장하기</p>
                    </div>
                </div>
                <Download size={22} className="text-gray-200" />
            </button>
         </div>

         <div className="py-12 text-center">
            <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.5em] opacity-40">모티피플 글래스 에디션 v1.1.2</p>
         </div>
      </div>
    </div>

    {showAccount && <AccountSettings onClose={() => setShowAccount(false)} />}
    {showCalendar && <BaseModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} title="인증 캘린더"><CheckInCalendar onClose={() => setShowCalendar(false)} /></BaseModal>}
    {showShop && <PointShop onClose={() => setShowShop(false)} />}
    {showSavings && <RoutineSavings onClose={() => setShowSavings(false)} />}
    {showRoutineSettings && <RoutineSettingsModal onClose={() => setShowRoutineSettings(false)} />}
    </>
  );
};

export default MyScreen;
