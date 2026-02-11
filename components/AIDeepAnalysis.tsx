
import React, { useState } from 'react';
import { X, Zap, Target, Sparkles, BrainCircuit, Activity, LineChart, Loader2 } from 'lucide-react';
import { Badge, BaseModal, Button } from './UIComponents';
import AIRoutineCuration from './AIRoutineCuration';
import ChemistryMatch from './ChemistryMatch';
import { RoutineType } from '../types';
import { ROUTINE_TYPE_CONFIG } from '../constants';
import { GoogleGenAI } from '@google/genai';

interface AIDeepAnalysisProps {
  onClose: () => void;
  userType?: RoutineType;
  nickname?: string;
}

const AIDeepAnalysis: React.FC<AIDeepAnalysisProps> = ({ onClose, userType = 'WEEKDAY_WARRIOR', nickname = '사용자' }) => {
  const [selectedType] = useState<RoutineType>(userType);
  const [deepThought, setDeepThought] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const config = ROUTINE_TYPE_CONFIG[selectedType];

  const handleDeepAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this user's routine persona: ${userType}. User nickname: ${nickname}. Provide a deep motivational insight in Korean about their growth potential and behavioral patterns.`,
        config: { thinkingConfig: { thinkingBudget: 32768 } }
      });
      setDeepThought(response.text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-[100] bg-[#FAFAFA] overflow-y-auto animate-slide-up hide-scrollbar flex flex-col h-full">
      <header className="px-5 py-5 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-gray-100">
        <div className="flex items-center gap-2"><BrainCircuit size={18} className="text-[#FFD046]" /><h2 className="text-sm font-black text-secondary uppercase tracking-tight">AI 심층 분석 결과</h2></div>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={18} /></button>
      </header>

      <div className="p-6 pb-24 space-y-8">
        <section className={`rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl bg-gradient-to-br ${config.color}`}>
            <h3 className="text-2xl font-black mb-4 leading-tight">{nickname}님은<br/><span className="underline decoration-white/30 text-3xl">'{config.label}'</span> 타입입니다</h3>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10 mb-6">
                {isAnalyzing ? <div className="flex items-center gap-2 text-xs font-bold"><Loader2 size={14} className="animate-spin" /> 제미나이가 분석 중입니다...</div> : deepThought ? <p className="text-xs font-bold leading-relaxed">{deepThought}</p> : <p className="text-xs font-bold opacity-80 italic">"{config.description}"</p>}
            </div>
            {!deepThought && <button onClick={handleDeepAnalysis} disabled={isAnalyzing} className="w-full py-4 bg-white text-secondary rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"><Sparkles size={14} /> AI 분석 요청하기</button>}
        </section>

        <section className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
            <h4 className="font-black text-secondary text-xs mb-6 flex items-center gap-2"><LineChart size={16} className="text-[#FFD046]" /> 생산성 골든타임 리포트</h4>
            <div className="flex items-end justify-between gap-2 h-24 px-2 border-b border-gray-50 pb-3">
                {[40, 80, 100, 70, 50, 20, 10].map((v, i) => <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"><div className={`w-full rounded-t-lg transition-all ${v > 70 ? 'bg-[#FFD046]' : 'bg-gray-100'}`} style={{ height: `${v}%` }}></div><span className="text-[8px] font-bold text-gray-300">0{i*3}시</span></div>)}
            </div>
            <p className="mt-6 text-[11px] text-gray-400 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">💡 {nickname}님은 오전 9시에 인지 능력이 최고조에 달합니다. 어려운 과업을 이 시간대에 배치하세요.</p>
        </section>

        <ChemistryMatch myType={selectedType} />
        <AIRoutineCuration />
      </div>
    </div>
  );
};

export default AIDeepAnalysis;
