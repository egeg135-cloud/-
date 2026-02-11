
import React, { useState } from 'react';
import { X, PiggyBank, TrendingUp, Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './UIComponents';

const RoutineSavings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { points, startSavings, activeSavings } = useApp();
  const [amount, setAmount] = useState(500);

  const handleSavings = () => {
    if (startSavings(amount)) {
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 z-[160] bg-[#FAFAFA] flex flex-col animate-slide-up h-full">
      <header className="p-6 flex justify-between items-center bg-white border-b border-gray-100">
        <h2 className="text-xl font-black text-secondary flex items-center gap-2">
          <PiggyBank size={24} className="text-primary" /> 모티 루틴 적금
        </h2>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
      </header>

      <div className="p-6 flex-1 overflow-y-auto">
        {activeSavings ? (
          <div className="bg-white rounded-[40px] p-10 text-center border border-gray-100 shadow-xl mt-10">
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary animate-pulse">
                <PiggyBank size={40} />
             </div>
             <h3 className="text-xl font-black text-secondary mb-4">적금 진행 중!</h3>
             <p className="text-sm text-gray-500 mb-8 leading-relaxed">
               일주일간 완벽하게 인증하면<br/>
               <span className="text-primary font-black text-lg">{activeSavings.goal} P</span>를 돌려받아요.
             </p>
             <div className="bg-gray-50 p-5 rounded-3xl">
                <div className="flex justify-between text-xs font-bold mb-2">
                   <span className="text-gray-400">예치 포인트</span>
                   <span className="text-secondary">{activeSavings.amount} P</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-gray-400">목표 보상</span>
                   <span className="text-emerald-500">+{activeSavings.goal - activeSavings.amount} P (이자)</span>
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
               <h3 className="text-lg font-black text-secondary mb-2">당신의 의지를 예치하세요</h3>
               <p className="text-xs text-gray-400 break-keep leading-relaxed mb-8">
                  도박이 아닙니다. 자신과의 약속입니다.<br/>
                  일주일간의 성공을 담보로 루틴 수익을 창출하세요.
               </p>
               <div className="grid grid-cols-3 gap-3 mb-6">
                  {[500, 1000, 2000].map(v => (
                    <button key={v} onClick={() => setAmount(v)} className={`py-4 rounded-2xl font-black text-xs transition-all ${amount === v ? 'bg-secondary text-primary shadow-lg scale-105' : 'bg-gray-50 text-gray-300'}`}>{v} P</button>
                  ))}
               </div>
               <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-emerald-600">성공 시 이자 포함 총</p>
                    <p className="text-lg font-black text-emerald-600">{Math.floor(amount * 1.1)} P</p>
                  </div>
                  <TrendingUp size={24} className="text-emerald-500" />
               </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100">
               <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-blue-500" />
                  <span className="text-xs font-bold text-blue-700">안내 사항</span>
               </div>
               <ul className="text-[11px] text-blue-600/80 space-y-1 font-medium">
                  <li>• 적금 기간 중 1회라도 미인증 시 예치금은 소멸됩니다.</li>
                  <li>• 성공 시 익일 자정에 이자가 포함되어 자동 정산됩니다.</li>
               </ul>
            </div>

            <Button onClick={handleSavings} disabled={points < amount}>루틴 적금 시작하기</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutineSavings;
