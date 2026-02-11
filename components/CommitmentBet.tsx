import React, { useState } from 'react';
import { X, TrendingUp, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './UIComponents';

interface CommitmentBetProps {
  onClose: () => void;
}

const CommitmentBet: React.FC<CommitmentBetProps> = ({ onClose }) => {
  const { points, placeBet, activeBet, showToast } = useApp();
  const [amount, setAmount] = useState(500);
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');

  const handleBet = () => {
    if (placeBet(amount)) {
      setStep('success');
    } else {
      showToast('포인트가 부족합니다.', 'error');
    }
  };

  if (activeBet) {
      return (
        <div className="absolute inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-[32px] p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
                
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <TrendingUp size={28} />
                </div>
                
                <h3 className="text-xl font-black text-[#333333] mb-2">이미 배팅 진행 중!</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    내일 인증에 성공하면<br/>
                    <span className="text-purple-600 font-bold text-lg">{activeBet.potential.toLocaleString()} P</span>를 돌려받습니다.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-2xl mb-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">걸린 포인트</span>
                        <span className="font-bold">{activeBet.amount} P</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-400">성공 보상 (1.5x)</span>
                        <span className="font-bold text-green-600">+{activeBet.potential - activeBet.amount} P</span>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="absolute inset-0 z-[200] bg-[#FAFAFA] flex flex-col animate-slide-up">
      <header className="p-6 flex justify-between items-center sticky top-0 z-10">
         <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-sm"><X size={20} /></button>
         <div className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm text-xs font-bold text-gray-500">
            보유: {points.toLocaleString()} P
         </div>
      </header>

      {step === 'input' && (
          <div className="flex-1 flex flex-col px-8 pb-8 justify-center">
             <div className="text-center mb-10">
                <span className="text-[#FFD046] text-6xl mb-4 block">💸</span>
                <h2 className="text-2xl font-black text-[#333333] mb-2">내일의 나를 믿으시나요?</h2>
                <p className="text-sm text-gray-400 leading-relaxed break-keep">
                    포인트를 걸고 의지를 증명하세요.<br/>
                    성공하면 <span className="text-green-500 font-bold">1.5배</span>로 돌려드립니다!
                </p>
             </div>

             <div className="space-y-6 mb-8">
                <label className="text-xs font-bold text-gray-400 text-center block">배팅할 금액 선택</label>
                <div className="grid grid-cols-3 gap-3">
                    {[500, 1000, 2000].map((val) => (
                        <button 
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`py-4 rounded-2xl font-bold transition-all ${amount === val ? 'bg-[#333333] text-white shadow-lg scale-105' : 'bg-white border border-gray-100 text-gray-400 hover:border-gray-300'}`}
                        >
                            {val} P
                        </button>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 text-center">
                    <p className="text-xs text-gray-400 mb-1">성공 시 예상 획득</p>
                    <p className="text-3xl font-black text-green-500">+{Math.floor(amount * 1.5).toLocaleString()} P</p>
                </div>
             </div>

             <Button onClick={() => setStep('confirm')} disabled={points < amount}>
                {points < amount ? '포인트가 부족해요' : '다음 단계'}
             </Button>
          </div>
      )}

      {step === 'confirm' && (
          <div className="flex-1 flex flex-col px-8 pb-8 justify-center items-center text-center animate-fade-in">
             <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertTriangle size={32} className="text-red-500" />
             </div>
             <h3 className="text-xl font-bold text-[#333333] mb-2">정말 배팅하시겠어요?</h3>
             <p className="text-sm text-gray-400 mb-8 leading-relaxed break-keep">
                내일 자정까지 인증하지 못하면<br/>
                <span className="text-red-500 font-bold">{amount.toLocaleString()} P</span>를 잃게 됩니다.<br/>
                신중하게 결정해주세요!
             </p>
             
             <div className="w-full space-y-3">
                <Button onClick={handleBet} className="bg-red-500 text-white shadow-red-200">
                    네, 도전할게요! 🔥
                </Button>
                <button onClick={() => setStep('input')} className="w-full py-4 text-gray-400 text-sm font-bold">
                    다시 생각할게요
                </button>
             </div>
          </div>
      )}

      {step === 'success' && (
          <div className="flex-1 flex flex-col px-8 pb-8 justify-center items-center text-center animate-slide-up">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200 animate-bounce-in">
                <Check size={40} className="text-white" strokeWidth={3} />
             </div>
             <h3 className="text-2xl font-black text-[#333333] mb-2">배팅 완료!</h3>
             <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                이제 돌이킬 수 없습니다.<br/>
                내일 반드시 성공해서 보상을 챙기세요!
             </p>
             
             <Button onClick={onClose}>
                확인
             </Button>
          </div>
      )}
    </div>
  );
};

export default CommitmentBet;