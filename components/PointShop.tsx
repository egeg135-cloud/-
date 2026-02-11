
import React, { useState } from 'react';
import { X, Shield, Star, MessageCircle, Ticket, CheckCircle2, Lock, Palette, Camera, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './UIComponents';

interface PointShopProps {
  onClose: () => void;
}

const PointShop: React.FC<PointShopProps> = ({ onClose }) => {
  const { points, purchaseItem, inventory, showToast } = useApp();
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  const items = [
    { id: 'shield', icon: <Shield size={24} />, name: '루틴 보호권', price: 1000, desc: '기록이 깨지지 않게 1회 방어', color: 'bg-blue-50 text-blue-500' },
    { id: 'theme_dark', icon: <Palette size={24} />, name: '심야 블랙 테마', price: 2000, desc: '프리미엄 블랙 UI 잠금 해제', color: 'bg-secondary text-white' },
    { id: 'filter_retro', icon: <Camera size={24} />, name: '레트로 필터', price: 1500, desc: '인증샷 전용 힙한 보정 필터', color: 'bg-pink-50 text-pink-500' },
    { id: 'gift_mate', icon: <Gift size={24} />, name: '친구 선물권', price: 800, desc: '메이트에게 응원 포인트 보내기', color: 'bg-emerald-50 text-emerald-500' },
  ];

  const handleBuy = (item: any) => {
    if (purchaseItem(item.id, item.price)) {
      setPurchasedId(item.id);
      setTimeout(() => setPurchasedId(null), 2000);
      showToast('성공적으로 구매했습니다! 🎁');
    } else {
      showToast('포인트가 부족해요 😢', 'error');
    }
  };

  return (
    <div className="absolute inset-0 z-[150] bg-white flex flex-col animate-slide-up h-full overflow-hidden">
      <header className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <h2 className="text-xl font-black text-secondary">모티 상점</h2>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
      </header>

      <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
         <div className="bg-[#FFF9E6] p-6 rounded-[32px] border border-[#FFD046]/30 mb-8 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-[#8A7000] uppercase tracking-widest mb-1">Available Points</p>
              <p className="text-2xl font-black text-[#333333]">{points.toLocaleString()} P</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">💰</div>
         </div>

         <div className="grid grid-cols-1 gap-4 pb-20">
            {items.map((item) => (
               <div key={item.id} className="bg-white p-5 rounded-[32px] border border-gray-100 flex items-center gap-5 relative overflow-hidden shadow-sm group">
                  {purchasedId === item.id && (
                     <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center animate-fade-in">
                        <CheckCircle2 size={32} className="text-green-500 mb-1" />
                        <span className="text-[10px] font-black text-green-600">SUCCESS</span>
                     </div>
                  )}
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${item.color}`}>
                     {item.icon}
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-secondary text-sm">{item.name}</h4>
                     <p className="text-[11px] text-gray-400 mb-2 leading-tight">{item.desc}</p>
                     <button 
                        onClick={() => handleBuy(item)}
                        className="bg-gray-50 text-secondary px-3 py-1.5 rounded-xl font-black text-[10px] hover:bg-primary transition-colors"
                     >
                        {item.price} P
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default PointShop;
