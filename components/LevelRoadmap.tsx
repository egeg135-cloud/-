
import React from 'react';
// Added TrendingUp to imports
import { X, Trophy, ChevronRight, Star, Lock, CheckCircle2, Sparkles, Wand2, TrendingUp } from 'lucide-react';
import { LEVEL_CONFIG } from '../constants';
// Added Button to imports
import { Button } from './UIComponents';

interface LevelRoadmapProps {
  currentCount: number;
  onClose: () => void;
}

const LevelRoadmap: React.FC<LevelRoadmapProps> = ({ currentCount, onClose }) => {
  const currentLevel = [...LEVEL_CONFIG].reverse().find(l => currentCount >= l.min) || LEVEL_CONFIG[0];
  const nextLevel = LEVEL_CONFIG[LEVEL_CONFIG.indexOf(currentLevel) + 1];

  return (
    <div className="fixed inset-0 z-[300] bg-white overflow-y-auto animate-slide-up hide-scrollbar flex flex-col">
      <header className="p-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div>
            <h2 className="text-xl font-black text-secondary">성장 로드맵</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Growth Journey</p>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors">
          <X size={20} className="text-secondary" />
        </button>
      </header>

      <div className="p-6 pb-20 space-y-10">
        {/* Current Status Hero */}
        <section className="bg-secondary rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD046] rounded-full blur-[80px] opacity-20"></div>
            <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 border border-white/20 shadow-xl">
                    {currentLevel.icon}
                </div>
                <h3 className="text-2xl font-black mb-1">현재 <span className="text-[#FFD046]">{currentLevel.name}</span> 등급</h3>
                <p className="text-xs text-gray-400 font-medium mb-6">"{currentLevel.desc}"</p>
                
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Progress to {nextLevel?.name || 'MAX'}</span>
                        <span className="text-xs font-black text-[#FFD046]">{currentCount} / {nextLevel?.min || currentCount}회</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FFD046] rounded-full transition-all duration-1000 shadow-[0_0_10px_#FFD046]" 
                          style={{ width: `${nextLevel ? (currentCount / nextLevel.min) * 100 : 100}%` }}
                        ></div>
                    </div>
                    {nextLevel && (
                        <p className="text-[10px] text-gray-400 mt-3 font-medium">
                            다음 등급까지 <span className="text-white font-black">{nextLevel.min - currentCount}번</span>의 인증이 더 필요해요!
                        </p>
                    )}
                </div>
            </div>
        </section>

        {/* Roadmap Path */}
        <section className="space-y-6 px-2">
            <h4 className="font-black text-secondary text-sm flex items-center gap-2">
                <TrendingUp size={16} className="text-[#FFD046]" /> 갓생 진화 단계
            </h4>
            
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-100 rounded-full"></div>
                
                <div className="space-y-8 relative z-10">
                    {LEVEL_CONFIG.map((level, i) => {
                        const isReached = currentCount >= level.min;
                        const isCurrent = currentLevel.name === level.name;
                        
                        return (
                            <div key={level.name} className={`flex items-start gap-6 transition-all duration-500 ${isReached ? 'opacity-100' : 'opacity-40'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg border-2
                                    ${isReached ? 'bg-white border-[#FFD046]' : 'bg-gray-100 border-gray-200'}`}>
                                    {isReached ? level.icon : <Lock size={18} className="text-gray-300" />}
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-black text-secondary text-sm">{level.name}</h5>
                                        {isCurrent && <span className="bg-[#FFD046] text-[8px] font-black px-1.5 py-0.5 rounded-md">CURRENT</span>}
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-2">{level.min}회 인증 달성 시</p>
                                    
                                    <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Sparkles size={10} className="text-[#FFD046]" />
                                            <span className="text-[10px] font-black text-gray-500">잠금 해제 혜택</span>
                                        </div>
                                        <p className="text-[10px] text-secondary font-medium leading-relaxed">
                                            {level.name === '네온' ? '상점 전 품목 20% 할인 & 전용 프로필 네온 효과' :
                                             level.name === '마스터' ? '모티메이커(루틴 판매) 권한 획득 & 프라이빗 클럽 개설' :
                                             level.name === '개화' ? '루틴 방어권 +1 & 포인트 적립률 1.2배 상승' : '기본 멤버십 권한 부여'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>

        {/* Action Button */}
        <section className="bg-yellow-50 p-6 rounded-[32px] border border-yellow-100 text-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Wand2 size={24} className="text-[#FFD046]" />
            </div>
            <h4 className="font-bold text-[#8A7000] text-sm mb-2">루틴 전문가가 되어보세요!</h4>
            <p className="text-[10px] text-[#8A7000]/70 leading-relaxed mb-6">
                '마스터' 등급에 도달하면 나만의 성공 노하우를<br/>
                유료 챌린지로 만들어 수익을 창출할 수 있습니다.
            </p>
            <Button onClick={onClose} variant="primary">계속해서 달리기</Button>
        </section>
      </div>
    </div>
  );
};

export default LevelRoadmap;
