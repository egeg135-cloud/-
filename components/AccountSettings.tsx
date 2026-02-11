
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, ChevronRight, Shield, User, Bell, LogOut, Trash2, Check, Loader2, RotateCcw, LayoutDashboard } from 'lucide-react';
import { Avatar, Button, Badge } from './UIComponents';
import { useApp } from '../context/AppContext';
import MakerMode from './MakerMode';

interface AccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const { user, logout, updateProfileImage } = useApp();
  const [showMakerMode, setShowMakerMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleResetData = () => {
    if (confirm('⚠️ 모든 데이터가 초기화됩니다. 계속하시겠습니까?')) {
        localStorage.removeItem('MOTIDAY_APP_DATA_V1');
        localStorage.removeItem('motiday_welcome_seen');
        window.location.reload();
    }
  };

  return (
    <>
    <div className="absolute inset-0 z-[160] bg-[#FAFAFA] flex flex-col animate-slide-up overflow-y-auto hide-scrollbar">
       <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={onClose} className="p-1 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
          <h2 className="text-xl font-bold text-secondary">계정 관리</h2>
       </header>

       <div className="p-6 space-y-8">
          <section className="flex flex-col items-center">
             <div className="relative mb-4">
                <Avatar size="lg" src={user.profileImg} border />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-lg bg-[#1A1A1A] text-white active:scale-90"
                >
                   <Camera size={18} />
                </button>
             </div>
             <p className="text-xs text-gray-400 font-medium">프로필 사진은 그룹원들에게 공개됩니다.</p>
          </section>

          {user.role === 'MOTIMAKER' && (
             <section className="space-y-2">
                <button 
                  onClick={() => setShowMakerMode(true)}
                  className="w-full p-5 bg-gradient-to-r from-[#FFD046] to-orange-400 rounded-3xl flex items-center justify-between text-[#333333] shadow-lg shadow-yellow-100 active:scale-95 transition-all"
                >
                   <div className="flex items-center gap-3">
                      <LayoutDashboard size={20} />
                      <span className="font-black text-sm uppercase tracking-tight">Maker Mode 전환</span>
                   </div>
                   <ChevronRight size={18} />
                </button>
             </section>
          )}

          <section className="space-y-2">
             <h3 className="text-xs font-black text-gray-400 ml-1 mb-2 uppercase tracking-wider">Account Information</h3>
             <div className="bg-white border border-gray-100 rounded-[28px] p-5 flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-gray-400 mb-1 uppercase">Nickname</p>
                   <p className="text-sm font-bold text-secondary">{user.nickname}</p>
                </div>
                <button className="text-xs font-bold text-[#FFD046]">변경</button>
             </div>
          </section>

          <section className="space-y-2">
             <h3 className="text-xs font-black text-gray-400 ml-1 mb-2 uppercase tracking-wider">Danger Zone</h3>
             <button onClick={handleResetData} className="w-full p-5 flex items-center gap-3 text-red-400 bg-red-50 rounded-[28px] border border-red-100">
                <RotateCcw size={18} />
                <span className="text-sm font-bold">앱 데이터 초기화</span>
             </button>
             <button onClick={logout} className="w-full p-5 flex items-center gap-3 text-gray-400">
                <LogOut size={18} />
                <span className="text-sm font-bold">로그아웃</span>
             </button>
          </section>
       </div>
    </div>
    {showMakerMode && <MakerMode onClose={() => setShowMakerMode(false)} />}
    </>
  );
};

export default AccountSettings;
