
import React from 'react';
import { Home, Users, BarChart2, User, Compass, LayoutGrid } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavButton } from './UIComponents';

const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  if (activeTab === 'invite') return null;

  return (
    <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-2 py-3 pb-8 safe-area-bottom z-40 transition-all duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
      <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home />} label="홈" />
      <NavButton active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} icon={<Compass />} label="탐색" />
      <NavButton active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} icon={<LayoutGrid />} label="클럽" />
      <NavButton active={activeTab === 'report'} onClick={() => setActiveTab('report')} icon={<BarChart2 />} label="리포트" />
      <NavButton active={activeTab === 'my'} onClick={() => setActiveTab('my'} icon={<User />} label="내 정보" />
    </nav>
  );
};

export default BottomNav;
