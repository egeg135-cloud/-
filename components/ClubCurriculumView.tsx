import React, { useState } from 'react';
import { CreditCard, ChevronLeft, Check, Star, Trophy, Users, ShieldCheck, Zap } from 'lucide-react';
import { Club } from '../types';
import { Button, Avatar, Badge } from './UIComponents';

interface ClubCurriculumViewProps {
  club: Club;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const ClubCurriculumView: React.FC<ClubCurriculumViewProps> = ({ club, onPaymentComplete, onBack }) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-slide-up overflow-y-auto hide-scrollbar relative z-50">
      <header className="px-6 py-5 border-b border-gray-50 flex items-center gap-4 bg-white sticky top-0 z-20">
        <button onClick={step === 'info' ? onBack : () => setStep('info')} className="p-2 -ml-2 text-gray-400 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-secondary">{step === 'info' ? '챌린지 상세' : '신청하기'}</h1>
      </header>

      {step === 'info' ? (
        <div className="flex flex-col flex-1">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar size="lg" alt={club.makerName} border />
              <div>
                <h3 className="text-xl font-black text-secondary">{club.makerName} <span className="text-xs font-bold text-gray-400">메이커</span></h3>
                <p className="text-xs text-gray-500 font-medium">{club.makerBio}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar">
                <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 flex flex-col gap-1 min-w-[100px]">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">인증 자산</span>
                    <span className="text-sm font-black text-secondary">{club.makerStats?.totalCheckins}회+</span>
                </div>
                <div className="bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100 flex flex-col gap-1 min-w-[100px]">
                    <span className="text-[9px] font-bold text-[#8A7000] uppercase">상위</span>
                    <span className="text-sm font-black text-[#8A7000]">{club.makerStats?.topPercent}%</span>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex flex-col gap-1 min-w-[100px]">
                    <span className="text-[9px] font-bold text-blue-500 uppercase">만족도</span>
                    <span className="text-sm font-black text-blue-500">4.9/5.0</span>
                </div>
            </div>

            {/* Maker Career */}
            <div className="mb-8">
               <h4 className="text-sm font-bold text-secondary mb-3">메이커 이력</h4>
               <ul className="space-y-2">
                  {club.makerCareer?.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <Zap size={12} className="text-[#FFD046] mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
               </ul>
            </div>

            {/* Benefit Banner */}
            <div className="bg-[#FFF9E6] p-5 rounded-[28px] border border-[#FFD046]/30 mb-8 relative overflow-hidden">
               <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-[#8A7000] text-sm mb-1">첫 챌린지 100% 환급 이벤트</h5>
                    <p className="text-[10px] text-[#8A7000]/70 font-medium">완주 성공 시 결제금액 전액을 포인트로 돌려드려요!</p>
                  </div>
                  <ShieldCheck size={32} className="text-[#FFD046]" />
               </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
               <h4 className="text-sm font-bold text-secondary mb-3">참여자 후기</h4>
               <div className="space-y-3">
                  {club.reviews?.map((r, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-secondary">{r.user}</span>
                          <div className="flex gap-0.5"><Star size={10} className="text-[#FFD046] fill-current" /> <Star size={10} className="text-[#FFD046] fill-current" /> <Star size={10} className="text-[#FFD046] fill-current" /></div>
                       </div>
                       <p className="text-xs text-gray-500 leading-relaxed break-keep">"{r.text}"</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="mt-auto p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] safe-area-bottom">
            <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-bold text-gray-400">참가비</span>
               <div className="text-right">
                  <span className="text-lg font-black text-secondary">{club.price.toLocaleString()}원</span>
                  <p className="text-[10px] text-[#FF6B6B] font-bold">인증 보상 포인트 1,000P 적립</p>
               </div>
            </div>
            <button 
              onClick={() => setStep('payment')}
              className="w-full py-5 bg-[#1A1A1A] text-white rounded-[24px] font-black text-lg shadow-xl shadow-black/10 active:scale-95 transition-all"
            >
              챌린지 신청하기
            </button>
          </div>
        </div>
      ) : (
        <div className="p-10 flex flex-col h-full animate-fade-in items-center text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
               <ShieldCheck size={48} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-2">결제를 완료하시겠어요?</h3>
            <p className="text-sm text-gray-400 mb-10 leading-relaxed">
              성공 시 전액 포인트 환급 혜택이 적용되는<br/>
              <span className="font-bold text-secondary">{club.title}</span>입니다.
            </p>
            <div className="w-full space-y-3">
               <button className="w-full py-5 bg-[#FEE500] text-[#333333] rounded-2xl font-bold active:scale-95 transition-all">카카오페이</button>
               <button className="w-full py-5 bg-[#03C75A] text-white rounded-2xl font-bold active:scale-95 transition-all">네이버페이</button>
            </div>
            <button 
               onClick={handlePayment} 
               disabled={isProcessing}
               className="mt-10 text-xs font-bold text-gray-300 underline"
            >
               {isProcessing ? '처리 중...' : '테스트 결제 완료'}
            </button>
        </div>
      )}
    </div>
  );
};

export default ClubCurriculumView;