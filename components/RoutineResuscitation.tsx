import React from 'react';
import { Calendar, X, ShieldCheck } from 'lucide-react';

interface RoutineResuscitationProps {
  missedDay: string;
  shieldCount: number;
  onUseShield: () => void;
  onSkip: () => void;
}

const RoutineResuscitation: React.FC<RoutineResuscitationProps> = ({ missedDay, shieldCount, onUseShield, onSkip }) => {
  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in px-6">
      <div className="bg-white w-full max-w-sm rounded-[40px] p-8 text-center animate-slide-up shadow-2xl relative">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Calendar size={32} className="text-red-400" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-red-100">
            <X size={16} className="text-red-500" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#333333] mb-2">어제 루틴을 놓치셨네요!</h2>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          어제의 실패로 공들여 쌓은 <span className="text-orange-500 font-bold">12일 연속 기록</span>이<br/>
          초기화될 위기에 처해 있습니다.
        </p>

        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-500">보유한 실패 방어권</span>
            <span className="text-sm font-black text-[#FFD046]">{shieldCount}개</span>
          </div>
          
          <button 
            onClick={onUseShield}
            disabled={shieldCount === 0}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all
              ${shieldCount > 0 
                ? 'bg-[#333333] text-white shadow-lg shadow-black/10 active:scale-95 hover:bg-black' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <ShieldCheck size={18} />
            {shieldCount > 0 ? '방어권 사용해서 복구하기' : '사용 가능한 방어권 없음'}
          </button>
        </div>

        <button onClick={onSkip} className="text-xs text-gray-300 underline font-medium hover:text-gray-500 transition-colors">
          아쉽지만 처음부터 다시 시작할게요
        </button>
      </div>
    </div>
  );
};

export default RoutineResuscitation;
