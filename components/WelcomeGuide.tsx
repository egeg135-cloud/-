
import React, { useState, useEffect } from 'react';
import { Search, Camera, Gift, ArrowRight, Check, Sparkles, UserPlus, Dumbbell } from 'lucide-react';

const WelcomeGuide = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('motiday_welcome_seen');
    if (!hasSeenGuide) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem('motiday_welcome_seen', 'true');
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  const slides = [
    {
      icon: <Sparkles size={40} className="text-[#FFD046]" />,
      title: "함께 운동해서\n더 즐거운 MOTIPEOPLE",
      desc: "혼자하면 외롭지만 함께하면 한계를 넘어서는\n운동인들의 성지, 모티피플에 오신 것을 환영해요.",
      bg: "from-[#1A1A1A] to-[#333333]"
    },
    {
      icon: <Dumbbell size={40} className="text-[#FFD046]" />,
      title: "나만의 운동 루틴 찾기",
      desc: "헬스, 필라테스, 러닝, 크로스핏...\n나와 같은 목표를 가진 동료들과 함께\n건강한 신체를 설계하세요.",
      bg: "from-blue-600 to-indigo-700"
    },
    {
      icon: <Camera size={40} className="text-[#FFD046]" />,
      title: "기록이 자산이 되는 곳",
      desc: "인증 횟수만큼 쌓이는 포인트로\n운동 장비를 구매하거나,\n내일의 오운완에 배팅해보세요.",
      bg: "from-orange-500 to-red-600"
    },
    {
      icon: <UserPlus size={40} className="text-[#FFD046]" />,
      title: "당신도 메이커가\n될 수 있어요",
      desc: "인증 50회를 달성하면 '메이커'로 전환,\n나만의 고강도 루틴을 판매하고\n운동 수익을 창출할 수 있습니다.",
      bg: "from-emerald-600 to-teal-700"
    }
  ];

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col animate-fade-in">
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[step].bg} transition-colors duration-700`}></div>
      
      {/* Noise Overlay for mood */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center p-10 text-white">
        <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border border-white/20 animate-bounce-in">
           {slides[step].icon}
        </div>
        
        <h1 className="text-3xl font-black mb-6 leading-tight whitespace-pre-wrap animate-slide-up">
          {slides[step].title}
        </h1>
        <p className="text-sm font-medium opacity-70 whitespace-pre-wrap leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {slides[step].desc}
        </p>

        <div className="flex gap-2 mt-12">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#FFD046]' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-8 pb-12 safe-area-bottom">
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-white text-[#1A1A1A] rounded-[24px] font-black text-lg shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {step === 3 ? (
            <>MOTIPEOPLE 시작하기 <Check size={20} strokeWidth={3} /></>
          ) : (
            <>다음 <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default WelcomeGuide;
