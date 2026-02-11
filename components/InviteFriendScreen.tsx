import React from 'react';
import { Share2, ArrowRight } from 'lucide-react';

interface InviteFriendScreenProps {
  clubName: string;
  onSkip: () => void;
}

const InviteFriendScreen: React.FC<InviteFriendScreenProps> = ({ clubName, onSkip }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'MOTIDAY - 같이 갓생 살자!',
      text: `나랑 같이 '${clubName}' 챌린지 시작할래? 혼자 하긴 좀 무서워서! 인증 실패 방어권도 준대 🛡️`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback for desktop/unsupported
      alert(`[공유 링크 복사됨]\n${shareData.text}\n${shareData.url}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFF9E6] px-8 pt-12 pb-8 text-center animate-fade-in absolute inset-0 z-50">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-6xl mb-6 animate-bounce">🤝</div>
        <h2 className="text-2xl font-bold text-[#333333] mb-4 leading-snug">
          혼자 하면 작심삼일,<br/>
          <span className="text-[#8A7000]">같이 하면 진짜 습관</span>
        </h2>
        <p className="text-sm text-[#8A7000] leading-relaxed mb-8 font-medium">
          친구와 함께 가입하면 두 분 모두에게<br/>
          <span className="font-bold underline decoration-2 decoration-[#FFD046]">인증 실패 방어권 1회</span>를 드려요!
        </p>
        
        <div className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-[32px] shadow-sm mb-6 border border-white">
          <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-widest">Your Invite Link</p>
          <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-400 truncate mb-4 select-all border border-gray-100">
            motiday.io/share/u123/c456
          </div>
          <button 
            onClick={handleShare}
            className="w-full py-4 bg-[#FFD046] text-[#333333] rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-yellow-100 active:scale-95 transition-all"
          >
            <Share2 size={18} />
            친구에게 링크 보내기
          </button>
        </div>
      </div>
      
      <button 
        onClick={onSkip}
        className="w-full py-4 text-gray-400 text-sm font-medium hover:text-gray-600 flex items-center justify-center gap-1 safe-area-bottom"
      >
        일단 혼자서 시작해볼게요 <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default InviteFriendScreen;
