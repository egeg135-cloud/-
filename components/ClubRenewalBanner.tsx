import React from 'react';
import { Ticket } from 'lucide-react';
import { Badge } from './UIComponents';

interface ClubRenewalBannerProps {
  clubName: string;
  onRenew: () => void;
}

const ClubRenewalBanner: React.FC<ClubRenewalBannerProps> = ({ clubName, onRenew }) => {
  return (
    <div className="mx-6 mb-6 p-6 rounded-[32px] bg-gradient-to-br from-[#FFD046] to-[#F5B800] text-[#333333] shadow-xl relative overflow-hidden transform transition-all hover:scale-[1.02]">
      {/* 장식용 코인 요소 */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Badge type="success" className="bg-white/40 border-none text-[#333333] backdrop-blur-sm">D-3 종료 예정</Badge>
          <div className="text-[10px] font-black uppercase opacity-60 tracking-tighter">Season Renewal</div>
        </div>

        <h3 className="text-lg font-bold mb-1 leading-tight">
          '{clubName}'<br/>다음 시즌도 함께할까요?
        </h3>
        <p className="text-[11px] font-medium opacity-80 mb-6">
          공유 미션으로 획득한 <span className="font-bold underline">10% 할인권</span>이<br/>
          이번 주 일요일에 만료됩니다! ⏰
        </p>

        <button 
          onClick={onRenew}
          className="w-full py-4 bg-[#333333] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-black/10"
        >
          <Ticket size={16} className="text-[#FFD046]" />
          할인 적용해서 재등록하기
        </button>
      </div>
    </div>
  );
};

export default ClubRenewalBanner;
