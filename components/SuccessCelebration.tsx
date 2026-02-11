
import React from 'react';
import { Flame, Sparkles, X, Share2, Download, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SuccessCelebration = () => {
  const { showCelebration, setShowCelebration, user, checkInCount } = useApp();

  if (!showCelebration || !user) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in p-6">
      
      <div className="w-full max-w-sm flex flex-col items-center animate-slide-up">
        
        {/* 인증 카드 (한국어 적용 및 디자인 정돈) */}
        <div 
          id="instagram-share-card" 
          className="aspect-[9/16] w-full bg-[#1A1A1A] text-white rounded-[40px] p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10"
        >
          {/* 장식 요소 */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FFD046] rounded-full blur-[100px] opacity-20"></div>

          {/* 헤더 */}
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[#FFD046] font-black italic tracking-tighter text-3xl">MOTIPEOPLE.</p>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1 font-black">오늘의 루틴 성공</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
               <Sparkles size={12} className="text-[#FFD046]" />
               <span className="text-[10px] font-black tracking-wide">인증됨</span>
            </div>
          </div>

          {/* 메인 스트릭 표시 */}
          <div className="relative z-10 text-center mt-4">
            <div className="inline-block relative">
               <Flame size={56} className="text-[#FFD046] fill-current absolute -top-10 -right-10 animate-bounce-in" />
               <h1 className="text-[140px] font-black leading-none text-[#FFD046] tracking-tighter drop-shadow-[0_10px_30px_rgba(255,208,70,0.3)]">
                 {checkInCount}
               </h1>
            </div>
            <p className="text-2xl font-black uppercase tracking-[0.2em] mt-4 text-white">연속 인증 일수</p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Check size={14} className="text-green-400" strokeWidth={3} />
                <p className="text-xs text-gray-300 font-bold leading-relaxed">
                  오늘도 해냈습니다!
                </p>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="relative z-10 border-t border-white/10 pt-8 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold tracking-widest">루틴 메이커</p>
              <p className="font-black text-xl text-white">@{user.nickname || user.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#FFD046] font-bold mb-1 uppercase tracking-widest">커뮤니티</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">#모티피플 #오운완</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3 mt-8 w-full">
            <button className="flex-1 bg-[#FFD046] text-[#1A1A1A] py-4.5 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl">
                <Share2 size={20} />
                <span>공유하기</span>
            </button>
            <button className="bg-white/10 text-white p-4.5 rounded-2xl active:scale-95 transition-transform backdrop-blur-md">
                <Download size={22} />
            </button>
        </div>
        
        <button 
            onClick={() => setShowCelebration(false)}
            className="mt-8 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white active:scale-90"
        >
            <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default SuccessCelebration;
