
import React, { useState } from 'react';
import { Star, Plus, Wand2, ArrowLeft, Check, ChevronRight, ShieldCheck, Coins, MessageSquare, Info, Loader2, Calendar, Users, Target, Activity } from 'lucide-react';
import { Button, Avatar, Badge } from './UIComponents';
import { MOCK_MARKETPLACE_MAKERS } from '../constants';
import { Club } from '../types';
import { useApp } from '../context/AppContext';

interface MakerMarketplaceProps {
  checkInCount: number;
  onClose: () => void;
}

const ClubCreationForm = ({ 
  type, 
  onBack, 
  onSuccess 
}: { 
  type: 'free' | 'paid', 
  onBack: () => void, 
  onSuccess: (data: any) => void 
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    category: '운동', 
    price: type === 'free' ? '0' : '9900',
    description: '',
    icon: '🔥',
    startDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    minMembers: 4,
    durationWeeks: 4
  });

  const emojis = ['🔥', '💪', '☀️', '🧘‍♀️', '📚', '💻', '🏃‍♂️', '💧', '🥗'];

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({ ...formData, price: parseInt(formData.price), type });
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-[120] bg-white animate-fade-in flex flex-col">
       <header className="p-6 border-b border-gray-100 flex items-center gap-5">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={28} /></button>
          <h2 className="text-2xl font-black text-secondary">{type === 'free' ? '무료 루틴방 개설' : '프리미엄 챌린지 개설'}</h2>
       </header>

       <div className="p-8 space-y-10 flex-1 overflow-y-auto hide-scrollbar">
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-secondary' : 'bg-gray-100'}`} />)}
          </div>

          {step === 1 && (
             <div className="animate-slide-up space-y-8">
                <div className="space-y-3">
                   <p className="text-[12px] font-black text-primary uppercase tracking-widest">Step 01</p>
                   <h3 className="text-3xl font-black break-keep text-secondary leading-tight">클럽을 대표할<br/>아이콘을 골라주세요.</h3>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {emojis.map(e => (
                    <button 
                      key={e} 
                      onClick={() => setFormData({...formData, icon: e})}
                      className={`aspect-square text-4xl rounded-[32px] transition-all flex items-center justify-center border-2 
                        ${formData.icon === e ? 'border-primary bg-primary/10 shadow-2xl scale-105' : 'border-gray-50 bg-white opacity-40'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
             </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up space-y-8">
               <div className="space-y-3">
                  <p className="text-[12px] font-black text-primary uppercase tracking-widest">Step 02</p>
                  <h3 className="text-3xl font-black break-keep text-secondary leading-tight">사람들의 마음을 끌<br/>클럽 이름은 무엇인가요?</h3>
               </div>
               <input 
                 type="text" 
                 placeholder="예) 미라클 모닝 100일 챌린지" 
                 className="w-full text-2xl font-black border-b-4 border-gray-100 focus:border-secondary outline-none py-5 transition-colors placeholder:text-gray-200"
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
               />
               <div className="grid grid-cols-2 gap-3 pt-6">
                 {['운동', '미라클모닝', '독서', '자기계발'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`py-4 rounded-2xl font-black text-[14px] transition-all border-2 ${formData.category === cat ? 'bg-secondary text-primary border-secondary shadow-lg' : 'bg-white text-gray-300 border-gray-100'}`}
                    >
                      {cat}
                    </button>
                 ))}
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-up space-y-8">
               <div className="space-y-3">
                  <p className="text-[12px] font-black text-primary uppercase tracking-widest">Step 03</p>
                  <h3 className="text-3xl font-black break-keep text-secondary leading-tight">어떤 루틴 활동인지<br/>자세히 알려주세요.</h3>
               </div>
               <textarea 
                 rows={6}
                 placeholder="활동 내용, 인증 방법 등을 입력해주세요." 
                 className="w-full p-6 bg-gray-50 rounded-[32px] text-[16px] font-bold border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all resize-none shadow-inner"
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
               />
            </div>
          )}

          {step === 4 && (
            <div className="animate-slide-up space-y-8">
               <div className="space-y-3">
                  <p className="text-[12px] font-black text-primary uppercase tracking-widest">Step 04</p>
                  <h3 className="text-3xl font-black break-keep text-secondary leading-tight">언제부터 시작하고<br/>몇 명과 함께할까요?</h3>
               </div>
               
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[13px] font-black text-gray-400 flex items-center gap-2.5 px-1 uppercase tracking-widest"><Calendar size={18}/> 시작 예정일</label>
                    <input 
                      type="date" 
                      className="w-full p-5 bg-gray-50 rounded-[22px] font-black text-secondary outline-none border-2 border-transparent focus:border-primary shadow-sm"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[13px] font-black text-gray-400 flex items-center gap-2.5 px-1 uppercase tracking-widest"><Users size={18}/> 최소 모집 인원</label>
                    <div className="flex items-center gap-5 bg-gray-50 p-3 rounded-[28px] border-2 border-gray-100">
                       <button onClick={() => setFormData(prev => ({...prev, minMembers: Math.max(4, prev.minMembers - 1)}))} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm">-</button>
                       <span className="text-2xl font-black text-secondary flex-1 text-center">{formData.minMembers}명</span>
                       <button onClick={() => setFormData(prev => ({...prev, minMembers: prev.minMembers + 1}))} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm">+</button>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-slide-up space-y-8">
               <div className="space-y-3">
                  <p className="text-[12px] font-black text-primary uppercase tracking-widest">Step 05</p>
                  <h3 className="text-3xl font-black break-keep text-secondary leading-tight">마지막으로 참여<br/>조건을 확정합니다.</h3>
               </div>
               
               <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-gray-100 space-y-6 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold text-gray-400">참여 비용</span>
                    {type === 'free' ? (
                       <span className="text-lg font-black text-emerald-500">무료 루틴방</span>
                    ) : (
                       <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            className="w-28 text-right text-xl font-black text-secondary bg-transparent outline-none border-b-2 border-gray-300 focus:border-secondary" 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                          />
                          <span className="text-[15px] font-bold text-gray-400">원</span>
                       </div>
                    )}
                  </div>
                  <div className="pt-6 border-t border-gray-200 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[15px] font-bold text-gray-400">진행 기간</span>
                        <span className="text-[15px] font-black text-secondary">4주 (28일 고정)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[15px] font-bold text-gray-400">심사 프로세스</span>
                        <span className="text-[15px] font-black text-secondary">{type === 'free' ? '즉시 개설' : '24시간 내 승인'}</span>
                      </div>
                  </div>
               </div>

               {type === 'paid' && (
                 <div className="bg-yellow-50 p-6 rounded-[32px] border-2 border-yellow-100 flex items-start gap-4">
                    <Info size={22} className="text-primary mt-1 shrink-0" />
                    <p className="text-[13px] text-[#8A7000] font-bold leading-relaxed">
                      유료 클럽은 메이커의 신뢰도를 위해 관리자 승인 절차를 거칩니다. 부적절한 내용은 거절될 수 있습니다.
                    </p>
                 </div>
               )}
            </div>
          )}
       </div>

       <div className="p-8 pb-12 safe-area-bottom">
          <button 
            onClick={() => step < 5 ? setStep(step + 1) : handleFinish()} 
            disabled={isSubmitting || (step === 2 && !formData.title) || (step === 3 && !formData.description)}
            className="w-full py-6 bg-secondary text-white rounded-[28px] font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
          >
             {isSubmitting ? <Loader2 className="animate-spin" /> : step === 5 ? (type === 'free' ? '클럽 개설 완료' : '심사 요청하기') : '다음 단계로'}
          </button>
       </div>
    </div>
  );
};

const MakerMarketplace: React.FC<MakerMarketplaceProps> = ({ checkInCount, onClose }) => {
  const { joinClub, showToast } = useApp();
  const [selectedType, setSelectedType] = useState<'free' | 'paid' | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showApprovalPending, setShowApprovalPending] = useState(false);
  
  const canDebut = checkInCount >= 50;

  const handleStartCreation = (type: 'free' | 'paid') => {
    if (type === 'paid' && !canDebut) {
      showToast('유료 클럽은 나무 등급부터 가능합니다!', 'error');
      return;
    }
    setSelectedType(type);
    setShowForm(true);
  };

  const handleCreationSuccess = (clubData: any) => {
    setShowForm(false);
    if (clubData.type === 'free') {
      const newClub: any = {
        id: `free-${Date.now()}`,
        title: clubData.title,
        category: clubData.category,
        description: clubData.description,
        price: 0,
        memberCount: 1,
        makerName: '나',
        icon: clubData.icon,
        curriculum: [],
        startDate: clubData.startDate,
        minMembers: clubData.minMembers,
        durationWeeks: 4
      };
      joinClub(newClub);
      showToast('클럽이 개설되었습니다! 축하드려요 ✨');
      onClose();
    } else {
      setShowApprovalPending(true);
    }
  };

  return (
    <div className="absolute inset-0 z-[110] flex flex-col h-full bg-white animate-slide-up overflow-hidden">
       {showApprovalPending && (
          <div className="absolute inset-0 z-[150] bg-white flex flex-col items-center justify-center p-10 text-center animate-fade-in">
             <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mb-8">
                <ShieldCheck size={56} className="text-blue-500 animate-pulse" />
             </div>
             <h3 className="text-[28px] font-black text-secondary mb-4 leading-tight">심사 요청이<br/>성공적으로 전달됐어요!</h3>
             <p className="text-[16px] text-gray-400 mb-12 leading-relaxed">
               메이커님의 정성이 담긴 챌린지를 검토 중입니다.<br/>
               최대 24시간 내에 결과를 알려드릴게요.
             </p>
             <button onClick={onClose} className="w-full py-6 bg-secondary text-white rounded-3xl font-black text-lg shadow-xl">확인</button>
          </div>
       )}

       <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 shadow-sm">
         <h2 className="text-2xl font-black text-secondary">메이커 스튜디오</h2>
         <button onClick={onClose} className="text-[14px] font-black text-gray-400 p-3 hover:bg-gray-100 rounded-2xl border border-gray-100 transition-all">닫기</button>
       </div>

       <div className="p-6 overflow-y-auto hide-scrollbar pb-32 flex-1 space-y-12">
         <section>
            <div className="space-y-3 mb-8">
               <h3 className="text-3xl font-black text-secondary leading-tight">나만의 노하우를<br/>성장으로 연결하세요.</h3>
               <p className="text-[15px] text-gray-400 font-bold">인증으로 증명된 당신의 루틴을 전파하세요.</p>
            </div>

            <div className="grid grid-cols-1 gap-5">
               <button 
                  onClick={() => handleStartCreation('free')}
                  className="p-8 rounded-[40px] border-2 border-gray-50 bg-gray-50 text-left hover:border-secondary transition-all group shadow-sm active:scale-[0.98]"
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-[22px] flex items-center justify-center shadow-inner">
                        <MessageSquare size={32} />
                     </div>
                     <Badge type="default" className="px-3 py-1 text-[11px]">Everyone</Badge>
                  </div>
                  <h4 className="text-2xl font-black text-secondary mb-2">무료 루틴방</h4>
                  <p className="text-[14px] text-gray-400 font-bold leading-relaxed">가벼운 습관 형성 및 자유 소통용.<br/>즉시 개설하여 멤버를 모을 수 있습니다.</p>
               </button>

               <button 
                  onClick={() => handleStartCreation('paid')}
                  className={`p-8 rounded-[40px] border-2 text-left transition-all relative overflow-hidden group shadow-xl active:scale-[0.98]
                    ${canDebut ? 'border-primary bg-primary/5 shadow-primary/10' : 'border-gray-50 bg-gray-50 opacity-60'}`}
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center shadow-inner ${canDebut ? 'bg-primary text-secondary' : 'bg-gray-200 text-gray-400'}`}>
                        <Coins size={32} />
                     </div>
                     {!canDebut && <Badge className="bg-gray-200 text-gray-500 px-3 py-1 text-[11px]">Locked</Badge>}
                  </div>
                  <h4 className={`text-2xl font-black mb-2 ${canDebut ? 'text-secondary' : 'text-gray-400'}`}>프리미엄 챌린지</h4>
                  <p className="text-[14px] text-gray-400 font-bold leading-relaxed">수익 창출이 가능한 정식 챌린지 룸.<br/>메이커의 독점 커리큘럼이 제공됩니다.</p>
                  
                  {!canDebut && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                       <div className="glass-card px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                          <Target size={18} className="text-gray-400" />
                          <span className="text-[13px] font-black text-gray-500">인증 50회 달성 시 오픈</span>
                       </div>
                    </div>
                  )}
               </button>
            </div>
         </section>

         <section className="pb-10">
            <div className="flex items-center gap-3 mb-6">
               <h4 className="font-black text-secondary text-xl">다른 메이커의 활동</h4>
               <div className="px-2.5 py-0.5 bg-red-500 text-white rounded-lg text-[10px] font-black animate-pulse">LIVE</div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                {MOCK_MARKETPLACE_MAKERS.map((club) => (
                <div key={club.id} className="glass-card p-5 rounded-[32px] border border-white/40 active:scale-95 transition-all cursor-pointer hover:shadow-xl">
                    <div className="w-full aspect-square bg-white/50 rounded-[24px] mb-4 flex items-center justify-center text-4xl shadow-inner border border-white/20">{club.icon}</div>
                    <h5 className="text-[15px] font-black text-secondary truncate mb-1">{club.title}</h5>
                    <div className="flex items-center gap-1.5 mb-3">
                        <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${club.makerName}`} />
                        <span className="text-[11px] text-gray-400 font-bold">{club.makerName}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/40 pt-3">
                      <span className="text-[12px] font-black text-primary">{club.price === 0 ? '무료' : `${club.price.toLocaleString()}원`}</span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-300 font-bold"><Users size={10} /> {club.memberCount}</div>
                    </div>
                </div>
                ))}
            </div>
         </section>
       </div>

       {showForm && selectedType && (
          <ClubCreationForm 
            type={selectedType} 
            onBack={() => setShowForm(false)} 
            onSuccess={handleCreationSuccess}
          />
       )}
    </div>
  );
};
export default MakerMarketplace;
