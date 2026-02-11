
import React, { useState, useMemo } from 'react';
import { Search, Users, Plus, X, ChevronRight, Trophy } from 'lucide-react';
import { Club } from '../types';
import { Badge, BaseModal, Button, ImageWithSkeleton } from './UIComponents';
import MakerMarketplace from './MakerMarketplace';
import { useApp } from '../context/AppContext';

interface ExploreScreenProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
}

const ClubCard: React.FC<{ club: Club; onClick: () => void; index: number }> = ({ club, onClick, index }) => {
  const getClubImage = (title: string) => {
    if (title.includes('헬스')) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400';
    if (title.includes('필라테스')) return 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400';
    if (title.includes('식단')) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400';
    if (title.includes('바레')) return 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400';
    if (title.includes('크로스핏')) return 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400';
    if (title.includes('러닝')) return 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&q=80&w=400';
    return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400';
  };

  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-[32px] overflow-hidden active:scale-[0.97] transition-all cursor-pointer flex flex-col h-full group shadow-xl border border-white/50"
    >
      <div className="relative aspect-[1/0.92] overflow-hidden">
        <ImageWithSkeleton src={getClubImage(club.title)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl text-[9px] text-white font-black uppercase tracking-wider">
          {club.category}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-[8px] font-black shadow-inner">메</div>
           <span className="text-[10px] text-gray-400 font-bold truncate">{club.makerName} 메이커</span>
        </div>
        <h3 className="text-[15px] font-black text-secondary mb-1.5 leading-tight line-clamp-1 tracking-tight">{club.title}</h3>
        <p className="text-[12px] text-gray-400 line-clamp-2 leading-relaxed font-medium mb-3 opacity-80">{club.description}</p>
        <div className="mt-auto flex items-center gap-2 text-[11px] font-black text-secondary/60">
           <Users size={12} className="text-primary" />
           <span>{club.memberCount.toLocaleString()}명 참가 중</span>
        </div>
      </div>
    </div>
  );
};

const ExploreScreen: React.FC<ExploreScreenProps> = ({ clubs, onSelectClub }) => {
  const { checkInCount } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [clubType, setClubType] = useState<'free' | 'paid'>('free');
  const [showMarketplace, setShowMarketplace] = useState(false);

  const categories = ['전체', '🔥 인기', '헬스', '필라테스', '러닝', '바레', '크로스핏', '식단'];

  const filteredClubs = useMemo(() => {
    let result = clubs.filter(c => clubType === 'free' ? c.price === 0 : c.price > 0);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(club => club.title.toLowerCase().includes(query) || club.description.toLowerCase().includes(query));
    }
    if (selectedCategory !== '전체') {
      if (selectedCategory === '🔥 인기') result.sort((a, b) => b.memberCount - a.memberCount);
      else result = result.filter(club => club.category === selectedCategory);
    }
    return result;
  }, [clubs, searchQuery, selectedCategory, clubType]);

  return (
    <div className="flex flex-col h-full bg-[#F4F7FB] animate-fade-in pb-28 overflow-y-auto hide-scrollbar">
      <div className="bg-white/40 backdrop-blur-2xl pt-16 pb-6 px-6 border-b border-white/20 sticky top-0 z-30 shadow-sm">
        <h1 className="text-2xl font-black text-secondary mb-6 tracking-tighter">함께하는 <span className="text-primary">4주 모티클럽</span></h1>
        
        <div className="glass-card rounded-[22px] flex items-center px-4 py-4 gap-3 border border-white/50 mb-6 shadow-inner">
          <Search size={20} className="text-gray-300" />
          <input 
            type="text" 
            placeholder="어떤 루틴을 시작해볼까요?" 
            className="bg-transparent text-[15px] w-full outline-none placeholder-gray-300 text-secondary font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto hide-scrollbar flex gap-2.5">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-[18px] text-[13px] font-black whitespace-nowrap transition-all border-2
                ${selectedCategory === cat 
                  ? 'bg-secondary border-secondary text-primary shadow-xl scale-105' 
                  : 'bg-white/60 border-white/40 text-gray-400 hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-8 mt-8">
        <div className="glass-card p-1.5 rounded-[20px] flex border border-white/40 shadow-lg">
           <button onClick={() => setClubType('free')} className={`flex-1 py-3 rounded-[16px] text-[13px] font-black transition-all ${clubType === 'free' ? 'bg-secondary text-white shadow-md' : 'text-gray-400'}`}>무료 클럽</button>
           <button onClick={() => setClubType('paid')} className={`flex-1 py-3 rounded-[16px] text-[13px] font-black transition-all ${clubType === 'paid' ? 'bg-secondary text-white shadow-md' : 'text-gray-400'}`}>프리미엄 챌린지</button>
        </div>

        <div className="flex justify-between items-center px-1">
          <h2 className="font-black text-secondary text-xl tracking-tighter">추천 루틴</h2>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{filteredClubs.length}개의 클럽</span>
        </div>

        <div className="grid grid-cols-2 gap-5 pb-10">
          {filteredClubs.map((club, idx) => (
            <ClubCard key={club.id} club={club} index={idx} onClick={() => onSelectClub(club)} />
          ))}
        </div>

        <button 
           onClick={() => setShowMarketplace(true)}
           className="glass-card rounded-[44px] p-10 text-[#1A1A1A] flex flex-col items-center gap-5 relative overflow-hidden group border-white shadow-2xl shadow-black/5"
        >
            <div className="w-14 h-14 bg-primary/20 rounded-[22px] flex items-center justify-center text-primary transition-transform group-hover:scale-110 shadow-inner"><Plus size={32} strokeWidth={3} /></div>
            <div className="text-center">
                <h3 className="text-xl font-black tracking-tight mb-1">나만의 루틴방 만들기</h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">메이커 되기</p>
                <p className="text-[14px] font-black text-secondary underline underline-offset-8 decoration-primary decoration-4">지금 바로 챌린지를 개설해보세요</p>
            </div>
        </button>
      </div>

      {showMarketplace && <MakerMarketplace checkInCount={checkInCount} onClose={() => setShowMarketplace(false)} />}
    </div>
  );
};

export default ExploreScreen;
