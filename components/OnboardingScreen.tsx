
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Rocket, Dumbbell, Briefcase, GraduationCap, Flame, Heart, Zap, Clock, ChevronRight, Camera, Check, Sparkles, User, Calendar, Trash2, Activity, Timer } from 'lucide-react';
import { useApp } from '../context/AppContext';

const OnboardingScreen: React.FC = () => {
  const { user, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [job, setJob] = useState('대학생');
  const [category, setCategory] = useState('헬스');
  const [pushStyle, setPushStyle] = useState<'soft' | 'hard'>('soft');
  const [checkInTime, setCheckInTime] = useState('22:00');
  const [days, setDays] = useState<string[]>(['월', '수', '금']);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "당신의 하루가 누군가의 동기가 됩니다.",
    "함께 만드는 건강루틴, 모티피플",
    "어제보다 나은 오늘의 당신을 기록하세요.",
    "포기하지 않는 마음, 모티피플이 함께합니다."
  ];

  useEffect(() => {
    if (step === 6) {
      const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (day: string) => {
    setDays(prev => {
        const sorted = prev.includes(day) 
            ? prev.filter(d => d !== day) 
            : [...prev, day].sort((a, b) => weekDays.indexOf(a) - weekDays.indexOf(b));
        return sorted;
    });
  };

  const handleNext = () => setStep(prev => prev + 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      birthDate,
      job,
      category,
      pushStyle,
      checkInTime,
      checkInDays: days
    }, profileImg || undefined);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-slide-up space-y-12">
            <div className="space-y-4">
              <BadgeText>기본 정보</BadgeText>
              <h2 className="text-[40px] font-black text-secondary leading-[1.1] tracking-tighter">
                반가워요!<br/>
                <span className="text-primary">생년월일을</span> 알려주세요.
              </h2>
              <p className="text-sm text-gray-400 font-medium">나이대에 맞는 가장 핫한 운동 루틴을 추천해드릴게요.</p>
            </div>
            
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Calendar size={24} className="text-gray-300 group-focus-within:text-primary transition-colors" />
               </div>
               <input 
                 type="date" 
                 value={birthDate}
                 onChange={(e) => setBirthDate(e.target.value)}
                 className="w-full h-24 pl-16 pr-6 bg-gray-50 rounded-[32px] border-2 border-transparent focus:border-secondary focus:bg-white text-2xl font-black text-secondary outline-none transition-all appearance-none"
               />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-slide-up space-y-10">
             <div className="space-y-4">
              <BadgeText>직업군 선택</BadgeText>
              <h2 className="text-[40px] font-black text-secondary leading-[1.1] tracking-tighter">
                현재 어떤<br/>
                <span className="text-primary">일을 하시나요?</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: '대학생', icon: <GraduationCap size={28}/> },
                { id: '직장인', icon: <Briefcase size={28}/> },
                { id: '프리랜서', icon: <Zap size={28}/> },
                { id: '기타', icon: <Sparkles size={28}/> }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setJob(item.id)} 
                  className={`h-36 rounded-[40px] flex flex-col items-center justify-center gap-3 border-2 transition-all active:scale-95
                    ${job === item.id ? 'border-secondary bg-secondary text-primary shadow-xl' : 'border-gray-50 bg-white text-gray-300'}`}
                >
                  <div className={`${job === item.id ? 'text-primary' : 'text-gray-100'}`}>{item.icon}</div>
                  <span className="font-black text-sm">{item.id}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-slide-up space-y-10">
            <div className="space-y-4">
              <BadgeText>운동 카테고리</BadgeText>
              <h2 className="text-[40px] font-black text-secondary leading-[1.1] tracking-tighter">
                어떤 <span className="text-primary">운동에</span><br/>몰입하고 싶나요?
              </h2>
            </div>

            <div className="space-y-3">
              {[
                { id: '헬스', icon: <Dumbbell size={24}/>, desc: '웨이트 트레이닝, 오운완 인증' },
                { id: '필라테스', icon: <Activity size={24}/>, desc: '체형 교정, 유연성 및 근력 향상' },
                { id: '러닝', icon: <Timer size={24}/>, desc: '런데이, 마라톤 준비, 유산소 몰입' },
                { id: '크로스핏', icon: <Flame size={24}/>, desc: '고강도 와드(WOD) 완료 인증' }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setCategory(item.id)} 
                  className={`w-full p-6 rounded-[36px] text-left transition-all border-2 flex items-center justify-between active:scale-[0.98]
                    ${category === item.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-gray-50 bg-white'}`}
                >
                   <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category === item.id ? 'bg-primary text-secondary' : 'bg-gray-50 text-gray-300'}`}>{item.icon}</div>
                      <div>
                        <p className={`font-black text-base ${category === item.id ? 'text-secondary' : 'text-gray-300'}`}>{item.id}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{item.desc}</p>
                      </div>
                   </div>
                   {category === item.id && <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md"><Check size={14} className="text-secondary" strokeWidth={4} /></div>}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-slide-up space-y-10">
            <div className="space-y-4">
              <BadgeText>인증 일정</BadgeText>
              <h2 className="text-[40px] font-black text-secondary leading-[1.1] tracking-tighter">
                나만의<br/>
                <span className="text-primary">인증 스케줄</span> 설정
              </h2>
            </div>

            <div className="space-y-12">
               <div className="space-y-4">
                  <div className="flex justify-between items-center pl-1">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">요일 선택</p>
                    <p className="text-[10px] font-black text-primary">주 {days.length}회 실천</p>
                  </div>
                  <div className="flex justify-between items-center gap-1.5 p-2 bg-gray-50 rounded-[28px] border border-gray-100">
                    {weekDays.map((day) => {
                      const isSelected = days.includes(day);
                      return (
                        <button 
                          key={day} 
                          onClick={() => toggleDay(day)}
                          className={`flex-1 aspect-square rounded-[20px] flex items-center justify-center transition-all text-xs font-black
                            ${isSelected ? 'bg-secondary text-primary shadow-xl scale-105' : 'bg-white text-gray-300 hover:text-gray-400'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">인증 마감 시간</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['07:00', '18:00', '22:00', '24:00'].map(t => (
                      <button 
                        key={t} 
                        onClick={() => setCheckInTime(t)} 
                        className={`py-6 rounded-[24px] font-black text-sm transition-all border-2
                          ${checkInTime === t ? 'bg-white border-secondary text-secondary shadow-lg' : 'bg-gray-50 border-transparent text-gray-400'}`}
                      >
                        {t} {t === '07:00' ? '(다음날)' : ''}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-[11px] font-black text-secondary uppercase tracking-widest">나의 약속</span>
                  </div>
                  <p className="text-base font-black text-secondary leading-relaxed">
                    "{days.length > 0 ? `주 ${days.length}회 : ${days.join(', ')} / ${checkInTime}까지` : '스케줄을 선택해주세요'} 인증할게요!"
                  </p>
               </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-slide-up space-y-12">
            <div className="space-y-4">
              <BadgeText>프로필 설정</BadgeText>
              <h2 className="text-[40px] font-black text-secondary leading-[1.1] tracking-tighter">
                거의 다 왔어요!<br/>
                <span className="text-primary">프로필 사진</span> 등록
              </h2>
              <p className="text-sm text-gray-400 font-medium">자신을 가장 잘 나타낼 수 있는 사진을 올려주세요.</p>
            </div>

            <div className="flex flex-col items-center">
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-56 h-56 rounded-[64px] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-inner transition-all hover:bg-gray-100"
                >
                    {profileImg ? (
                        <>
                            <img src={profileImg} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera size={40} className="text-white" />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg text-gray-200">
                                <User size={32} />
                            </div>
                            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">사진 업로드</span>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
                {profileImg && (
                    <button onClick={() => setProfileImg(null)} className="mt-8 flex items-center gap-2 text-red-400 font-bold text-xs bg-red-50 px-4 py-2 rounded-full">
                        <Trash2 size={14} /> 다시 선택하기
                    </button>
                )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="animate-slide-up flex flex-col items-center justify-center py-6 space-y-12">
             <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="w-56 h-56 bg-secondary rounded-[64px] flex items-center justify-center relative shadow-2xl overflow-hidden rotate-3 border-4 border-white">
                   {profileImg ? <img src={profileImg} className="w-full h-full object-cover" /> : <Rocket size={80} className="text-primary" />}
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <Sparkles size={28} className="text-secondary" />
                </div>
             </div>
             
             <div className="space-y-6 text-center px-4">
               <div className="h-20 flex flex-col justify-center">
                  <h2 key={quoteIndex} className="text-[28px] font-black text-secondary leading-tight tracking-tighter animate-fade-in break-keep">
                    {quotes[quoteIndex]}
                  </h2>
               </div>
               
               <div className="p-8 bg-gray-50 rounded-[44px] text-left border border-gray-100 shadow-inner w-full max-w-sm space-y-5">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">가입 정보 확인</span>
                     <span className="text-[10px] font-black text-primary bg-secondary px-2 py-0.5 rounded">MOTIPEOPLE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                     <div>
                        <p className="text-[9px] font-black text-gray-400 mb-1 uppercase">생일</p>
                        <p className="text-sm font-black text-secondary">{birthDate}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 mb-1 uppercase">관심 운동</p>
                        <p className="text-sm font-black text-secondary">{category}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 mb-1 uppercase">마감 시간</p>
                        <p className="text-sm font-black text-secondary">{checkInTime}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 mb-1 uppercase">횟수</p>
                        <p className="text-sm font-black text-secondary">주 {days.length}회</p>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[600] bg-white flex flex-col animate-fade-in overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="px-8 pt-16 pb-12 flex gap-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-secondary' : 'bg-gray-100'}`} />
        ))}
      </div>

      <div className="flex-1 px-8 overflow-y-auto hide-scrollbar">
        {renderStep()}
      </div>

      <div className="p-8 pb-12 safe-area-bottom">
        {step < 6 ? (
          <button 
            onClick={handleNext}
            className="w-full py-6 bg-secondary text-white rounded-[32px] font-black text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            다음 단계 <ArrowRight size={24} className="text-primary" />
          </button>
        ) : (
          <button 
            onClick={handleFinish}
            className="w-full py-6 bg-primary text-secondary rounded-[32px] font-black text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            모티피플 여정 시작하기 <Check size={24} strokeWidth={4} />
          </button>
        )}
      </div>
    </div>
  );
};

const BadgeText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-[11px] font-black text-primary bg-secondary px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3">
        {children}
    </span>
);

export default OnboardingScreen;
