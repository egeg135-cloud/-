import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from './UIComponents';

interface RescheduleModalProps {
  onClose: () => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ onClose }) => {
  const [reason, setReason] = useState('');
  const [newDate, setNewDate] = useState('tomorrow'); // tomorrow, weekend, custom
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
    }, 2000);
  };

  if (isSubmitted) {
      return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-6">
            <div className="bg-white w-full max-w-sm rounded-[32px] p-8 text-center animate-slide-up">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">변경이 완료되었어요!</h3>
                <p className="text-xs text-gray-400">약속한 시간에 다시 알림을 보내드릴게요.<br/>포기하지 않은 모습이 멋져요! 👍</p>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-sm rounded-t-[32px] sm:rounded-[32px] p-6 h-[85vh] sm:h-auto flex flex-col animate-slide-up relative">
        
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-bold text-[#333333]">루틴 일정 변경</h2>
           <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100"><X size={20}/></button>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6">
            {/* 1. Reason Selection */}
            <div>
                <label className="text-xs font-bold text-gray-400 mb-3 block">변경 사유 (선택)</label>
                <div className="flex flex-wrap gap-2">
                    {['야근/학업', '몸살/컨디션', '약속/모임', '단순 귀차니즘 😅'].map((r) => (
                        <button 
                            key={r}
                            onClick={() => setReason(r)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${reason === r ? 'bg-[#333333] text-white border-[#333333]' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. New Schedule */}
            <div>
                <label className="text-xs font-bold text-gray-400 mb-3 block">언제로 미룰까요?</label>
                <div className="space-y-3">
                    <button 
                        onClick={() => setNewDate('tomorrow')}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${newDate === 'tomorrow' ? 'border-[#FFD046] bg-[#FFF9E6]' : 'border-gray-100 bg-white'}`}
                    >
                        <div>
                            <p className="text-sm font-bold text-[#333333]">내일 이 시간에 할게요</p>
                            <p className="text-[10px] text-gray-400">연속 달성 기록은 유지됩니다 (유예)</p>
                        </div>
                        {newDate === 'tomorrow' && <div className="w-4 h-4 bg-[#FFD046] rounded-full" />}
                    </button>

                    <button 
                        onClick={() => setNewDate('weekend')}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${newDate === 'weekend' ? 'border-[#FFD046] bg-[#FFF9E6]' : 'border-gray-100 bg-white'}`}
                    >
                        <div>
                            <p className="text-sm font-bold text-[#333333]">이번 주말에 몰아서 할게요</p>
                            <p className="text-[10px] text-gray-400">주말 보충 미션이 생성됩니다</p>
                        </div>
                        {newDate === 'weekend' && <div className="w-4 h-4 bg-[#FFD046] rounded-full" />}
                    </button>
                </div>
            </div>

            {/* 3. Commitment Message */}
            <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-[#FFD046]" />
                    <span className="text-xs font-bold text-[#333333]">약속해주세요!</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                    미루는 것은 실패가 아닙니다. <br/>
                    하지만 포기하지 않고 <strong>{newDate === 'tomorrow' ? '내일' : '주말'}</strong>에는 꼭 돌아오겠다고 약속해요. 🤙
                </p>
            </div>
        </div>

        <div className="mt-6">
            <Button onClick={handleSubmit}>일정 변경 확정하기</Button>
        </div>

      </div>
    </div>
  );
};

export default RescheduleModal;
