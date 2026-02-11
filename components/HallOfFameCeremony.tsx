import React, { useEffect, useState } from 'react';
import { Trophy, Crown, Share2, X } from 'lucide-react';
import { User } from '../types';

interface HallOfFameCeremonyProps {
  userData: User;
  onClose: () => void;
}

const HallOfFameCeremony: React.FC<HallOfFameCeremonyProps> = ({ userData, onClose }) => {
  const [stage, setStage] = useState(0); // 애니메이션 단계 제어

  useEffect(() => {
    // 단계별 애니메이션 트리거
    setTimeout(() => setStage(1), 500); // 스포트라이트 ON
    setTimeout(() => setStage(2), 1500); // 트로피 등장
    setTimeout(() => setStage(3), 2500); // 텍스트 및 버튼 등장
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center overflow-hidden animate-fade-in">
      {/* 닫기 버튼 (마지막 단계에서만 노출) */}
      {stage >= 3 && (
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 animate-fade-in z-50">
          <X size={24} />
        </button>
      )}

      {/* 배경 효과: 스포트라이트 & 파티클 */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,208,70,0.3)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
      </div>

      {/* 중앙 오브젝트: 황금 트로피 */}
      <div className={`relative z-10 mb-8 transition-all duration-1000 transform ${stage >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}>
        <div className="relative">
          <Crown size={40} className="text-[#FFD046] absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="w-48 h-48 bg-gradient-to-br from-[#FFD046] to-[#F5B800] rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,208,70,0.6)] p-1">
            <div className="w-full h-full bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-[#FFD046]/50">
               <Trophy size={100} className="text-[#FFD046] drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* 텍스트 및 액션 버튼 */}
      <div className={`text-center relative z-10 transition-all duration-1000 delay-300 ${stage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-[#FFD046] font-black tracking-[0.2em] text-sm uppercase mb-2 animate-pulse">Legendary Achievement</h2>
        <h1 className="text-4xl font-black text-white mb-4 leading-tight">
          축하합니다!<br/>
          <span className="text-[#FFD046]">명예의 전당</span> 입성!
        </h1>
        <p className="text-gray-300 text-sm mb-12 leading-relaxed">
          상위 0.1%의 꾸준함으로 증명해낸<br/>
          <span className="font-bold text-white">{userData.nickname}</span>님의 이름을 영원히 기록합니다.
        </p>

        <div className="flex flex-col gap-4 px-8 w-full max-w-sm mx-auto">
          <button className="w-full py-4 bg-[#FFD046] text-[#333333] rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all">
            내 이름 확인하러 가기
          </button>
          <button className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/20">
            <Share2 size={18} /> 이 영광을 공유하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameCeremony;