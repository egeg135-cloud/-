
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, CheckCircle2, RotateCcw, Book, Dumbbell, Zap, Coffee, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FocusTimerProps {
  category?: string;
  onComplete: (timeString: string, elapsedSeconds: number) => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ category = "기타", onComplete }) => {
  const { addFocusTime } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [motivation, setMotivation] = useState("준비되셨나요? 당신의 성장을 위한 시간을 시작하세요.");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Category Configuration
  const getCategoryConfig = () => {
    const catLower = category.toLowerCase();
    if (catLower.includes('운동') || catLower.includes('헬스') || catLower.includes('러닝')) 
      return { label: "지금 흘리는 땀은 정직합니다", icon: <Dumbbell className="text-orange-500" />, action: "열심히 달리는 중" };
    if (catLower.includes('독서') || catLower.includes('공부') || catLower.includes('필사')) 
      return { label: "문장 사이에 머무르는 시간", icon: <Book className="text-blue-500" />, action: "지식을 채우는 중" };
    if (catLower.includes('기상') || catLower.includes('모닝')) 
      return { label: "남들보다 앞서가는 새벽", icon: <Zap className="text-yellow-500" />, action: "오늘을 여는 중" };
    return { label: "오직 나 자신에게 몰입하는 시간", icon: <Coffee className="text-emerald-500" />, action: "몰입하는 중" };
  };

  const config = getCategoryConfig();

  // Motivation Messages based on time
  useEffect(() => {
    if (seconds === 0) setMotivation("당신의 성장은 지금 이 순간 시작됩니다.");
    else if (seconds === 60 * 5) setMotivation("좋아요! 몰입의 입구에 들어섰습니다. 🌱");
    else if (seconds === 60 * 15) setMotivation("15분째입니다. 잡념이 사라지는 시점이에요. 🌊");
    else if (seconds === 60 * 30) setMotivation("30분 돌파! 당신의 집중력은 최고조입니다. 🔥");
    else if (seconds === 60 * 60) setMotivation("1시간의 경지... 뇌가 가장 섹시해지는 시간입니다. 💎");
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);

  const stopTimer = () => {
    setIsActive(false);
    setIsCompleted(true);
    addFocusTime(seconds); // Accumulate to total focus time in context
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-[#1A1A1A] rounded-[32px] animate-fade-in text-white p-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD046] rounded-full blur-[80px] opacity-20"></div>
         
         <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in shadow-lg shadow-green-500/30">
               <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-black mb-1">{formatTime(seconds)}</h3>
            <p className="text-sm text-gray-400 mb-8">성공적으로 몰입을 마쳤습니다.</p>
            
            <button 
              onClick={() => onComplete(formatTime(seconds), seconds)}
              className="w-full py-4 bg-[#FFD046] text-[#333333] rounded-2xl font-black text-sm active:scale-95 transition-transform"
            >
              기록하고 인증하기
            </button>
            <button onClick={resetTimer} className="mt-4 text-[11px] text-gray-500 underline font-bold uppercase tracking-widest">Retry</button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-80 bg-white rounded-[32px] border-2 border-dashed border-gray-100 relative p-8">
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full border-2 border-yellow-100 animate-[ping_3s_linear_infinite] opacity-50"></div>
        </div>
      )}

      <div className="relative z-10 text-center w-full">
        <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                {isActive ? <div className="animate-pulse">{config.icon}</div> : config.icon}
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{config.action}</p>
            <h4 className="text-sm font-black text-secondary">{isActive ? "몰입의 깊이가 깊어지는 중" : config.label}</h4>
        </div>

        <div className="text-5xl font-black text-[#333333] mb-8 font-mono tracking-tighter tabular-nums flex items-center justify-center gap-1">
          {formatTime(seconds)}
          {isActive && <span className="text-xs text-[#FFD046] animate-pulse">●</span>}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${isActive ? 'bg-white border-2 border-gray-50 text-[#333333]' : 'bg-[#FFD046] text-[#333333]'}`}
          >
            {isActive ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
          </button>
          
          {(seconds > 0 || isActive) && (
             <button 
               onClick={stopTimer}
               className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all animate-fade-in"
             >
               <Square size={16} className="fill-current" />
             </button>
          )}
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
           <Sparkles size={12} className="text-[#FFD046]" />
           <p className="text-[10px] text-gray-500 font-bold leading-none break-keep">
              {motivation}
           </p>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
