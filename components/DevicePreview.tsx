
import React from 'react';
import { Camera, X, Smartphone, Watch, Brain, Zap, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './UIComponents';

interface DevicePreviewProps {
    onClose: () => void;
}

const DevicePreview: React.FC<DevicePreviewProps> = ({ onClose }) => {
  const { checkInCount, totalFocusTime } = useApp();

  const hours = Math.floor(totalFocusTime / 3600);
  const mins = Math.floor((totalFocusTime % 3600) / 60);

  return (
    <div className="absolute inset-0 z-[300] bg-white overflow-y-auto animate-slide-up hide-scrollbar pb-10">
      <header className="p-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div>
            <h2 className="text-xl font-black text-secondary">기기 연동 미리보기</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">스마트 기기 연동</p>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors">
          <X size={20} className="text-secondary" />
        </button>
      </header>

      <div className="p-6 space-y-12 pb-20">
        {/* iOS Widget */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Smartphone size={20} className="text-gray-400" />
            <h4 className="text-sm font-black text-[#333333]">아이폰 홈 화면 위젯</h4>
          </div>
          <div className="w-full bg-[#F2F2F7] rounded-[40px] p-8 flex justify-center shadow-inner">
            <div className="w-full max-w-[320px] bg-[#1C1C1E] rounded-[28px] p-5 shadow-2xl flex gap-4 relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
                
                <div className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-4 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20"><Brain size={32}/></div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-200">딥 포커스 몰입</span>
                    <div>
                        <p className="text-2xl font-black leading-none mb-1">{hours}시간 {mins}분</p>
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
                    <div>
                        <div className="flex items-center gap-1 mb-1">
                            <Flame size={10} className="text-orange-500 fill-current" />
                            <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">연속 달성</span>
                        </div>
                        <p className="text-xl font-black text-white">{checkInCount}일째</p>
                    </div>
                    <div className="w-full py-2 bg-white/10 rounded-xl text-[9px] font-black text-white border border-white/10 text-center">
                        인증샷 촬영
                    </div>
                </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed font-medium">
             홈 화면 위젯을 통해 앱을 열지 않고도<br/>
             나의 몰입 현황을 실시간으로 확인하세요.
          </p>
        </section>

        {/* Apple Watch */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Watch size={20} className="text-gray-400" />
            <h4 className="text-sm font-black text-[#333333]">애플워치 연동</h4>
          </div>
          <div className="w-full bg-[#000] rounded-[48px] p-10 flex justify-center relative overflow-hidden">
             <div className="w-40 h-48 bg-black rounded-[44px] border-[4px] border-[#3A3A3C] p-4 flex flex-col items-center justify-between text-center relative z-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-[#FFD046]"></div>
                
                <div className="mt-1">
                    <p className="text-[8px] text-gray-500 font-black tracking-[0.2em] uppercase">모티피플</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="w-14 h-14 bg-[#FFD046] rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,208,70,0.4)] animate-pulse">
                        <Camera size={20} className="text-[#333333] fill-current" />
                    </div>
                    <p className="text-[9px] text-white font-black leading-tight">
                        지금 바로<br/>인증하기
                    </p>
                </div>

                <div className="w-full flex items-center justify-center gap-1 mb-1">
                    <Zap size={10} className="text-emerald-400 fill-current" />
                    <span className="text-[9px] text-emerald-400 font-black">{hours}시간 {mins}분</span>
                </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed font-medium">
             손목 위에서 원터치로 간편하게!<br/>
             몰입의 흐름을 방해받지 않고 인증하세요.
          </p>
        </section>
      </div>
      
      <div className="p-6 safe-area-bottom">
         <Button onClick={onClose} variant="secondary">확인했습니다</Button>
      </div>
    </div>
  );
};
export default DevicePreview;
