
import React, { useEffect, useState } from 'react';
import { LEVEL_CONFIG } from '../constants';
import { X, CheckCircle2, AlertTriangle, Info, Sparkles, Trophy, ChevronRight, Star } from 'lucide-react';

// 토스트 컴포넌트
export const Toast: React.FC<{ message: string, type?: 'success' | 'error' | 'info', onClose: () => void }> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 size={18} className="text-green-400" />,
    error: <AlertTriangle size={18} className="text-red-400" />,
    info: <Info size={18} className="text-blue-400" />
  };

  return (
    <div className="fixed top-14 left-6 right-6 z-[999] flex items-center gap-3 px-6 py-4 rounded-[22px] shadow-2xl animate-slide-up glass-dark text-white justify-center">
      {icons[type]}
      <span className="text-[15px] font-black tracking-tight">{message}</span>
    </div>
  );
};

export const BaseModal: React.FC<{ isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md animate-fade-in p-6" onClick={onClose}>
      <div className="glass-card w-full max-w-sm rounded-[44px] animate-slide-up shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden border border-white/50" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-white/20 bg-white/20 sticky top-0 z-10">
          <h2 className="text-[18px] font-black text-[#1A1A1A]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 p-2 hover:bg-black/5 rounded-full transition-colors"><X size={22} /></button>
        </div>
        <div className="overflow-y-auto flex-1 hide-scrollbar p-6">
            {children}
        </div>
      </div>
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }> = ({ children, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseStyle = "w-full py-5 rounded-[24px] font-black transition-all active:scale-95 duration-200 flex items-center justify-center gap-3 text-[16px]";
  const styles = {
    primary: `bg-[#FFD046] text-[#1A1A1A] shadow-xl shadow-yellow-200/50 border-t border-white/30`,
    secondary: `glass-card text-[#1A1A1A] border border-white/50`,
    ghost: "bg-transparent text-gray-500",
  };
  return (
    <button disabled={disabled} className={`${baseStyle} ${styles[variant]} ${className} ${disabled ? 'opacity-50 grayscale' : ''}`} {...props}>
      {children}
    </button>
  );
};

export const Avatar: React.FC<{ src?: string, alt?: string, size?: 'sm' | 'md' | 'lg' | 'xs', border?: boolean }> = ({ src, alt = 'user', size = 'md', border = false }) => {
  const sizes = { xs: 'w-6 h-6', sm: 'w-8 h-8', md: 'w-11 h-11', lg: 'w-14 h-14' };
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden bg-gray-200 shrink-0 ${border ? 'ring-2 ring-white shadow-lg' : ''}`}>
      <img src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}`} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export const LevelBadge: React.FC<{ count: number }> = ({ count }) => {
  const currentLevel = [...LEVEL_CONFIG].reverse().find(l => count >= l.min) || LEVEL_CONFIG[0];
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/60 border border-white/60 shadow-sm backdrop-blur-md">
      <span className="text-sm leading-none">{currentLevel.icon}</span>
      <span className="text-[11px] font-black leading-none" style={{ color: currentLevel.color }}>
        {currentLevel.name}
      </span>
    </div>
  );
};

export const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactElement, label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-[#1A1A1A] scale-105' : 'text-gray-300'}`}>
    <div className={`${active ? 'drop-shadow-[0_0_12px_rgba(255,208,70,0.5)]' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { 
        size: 24, 
        strokeWidth: active ? 2.8 : 2.2,
        fill: active ? '#FFD046' : 'none'
      })}
    </div>
    <span className={`text-[11px] font-black ${active ? 'opacity-100 text-secondary' : 'opacity-60'} tracking-tighter`}>{label}</span>
  </button>
);

export const Badge: React.FC<{ children: React.ReactNode, type?: 'default' | 'motimaker' | 'success', className?: string }> = ({ children, type = 'default', className = '' }) => {
  const styles = {
    default: 'bg-white/60 text-gray-600',
    motimaker: 'bg-indigo-50/70 text-indigo-600 border-indigo-100',
    success: 'bg-emerald-50/70 text-emerald-600 border-emerald-100',
  };
  return (
    <span className={`px-2.5 py-1 text-[10px] font-black rounded-xl border border-white/50 backdrop-blur-md shadow-sm ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};

export const ImageWithSkeleton: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { className?: string }> = ({ className, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gray-100/50 ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />}
      <img {...props} onLoad={() => setLoaded(true)} className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export const HeartParticle: React.FC<{ x: number, y: number }> = ({ x, y }) => (
  <div className="fixed pointer-events-none z-[100] animate-float-up text-3xl" style={{ left: x, top: y }}>🔥</div>
);

export const ToggleSwitch: React.FC<{ checked: boolean, onChange: () => void }> = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-14 h-7 rounded-full p-1.5 transition-colors relative cursor-pointer ${checked ? 'bg-[#FFD046]' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${checked ? 'translate-x-7' : 'translate-x-0'}`} />
  </div>
);

// 레벨업 모달 컴포넌트
export const LevelUpModal: React.FC<{ level: { name: string, icon: string, color: string }, onClose: () => void }> = ({ level, onClose }) => {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fade-in p-6">
      <div className="bg-white w-full max-w-xs rounded-[40px] p-8 text-center animate-bounce-in shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: level.color }}></div>
        <div className="text-6xl mb-6">{level.icon}</div>
        <h2 className="text-2xl font-black text-secondary mb-2">새로운 등급 달성!</h2>
        <p className="text-sm text-gray-500 mb-6">축하합니다! <span className="font-black" style={{ color: level.color }}>{level.name}</span> 등급이 되셨습니다.</p>
        <Button onClick={onClose}>확인했습니다</Button>
      </div>
    </div>
  );
};
