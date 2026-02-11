import React, { useEffect, useState } from 'react';
import { Bell, Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Toast, BaseModal, Button } from './UIComponents';
import RescheduleModal from './RescheduleModal';

// This component runs in the background (mounted in App) to handle logic
export const NotificationManager: React.FC = () => {
  const { userSettings, checkInCount } = useApp();
  const [activeNotification, setActiveNotification] = useState<'regular' | 'urgent' | 'missed' | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Listen for custom events triggered by DevTools (for demonstration)
  useEffect(() => {
    const handleTestTrigger = (e: CustomEvent) => {
      const type = e.detail.type;
      if (type === 'regular') {
        setToastMsg("☀️ 좋은 아침! 오늘 루틴인증, 9시에 함께 시작해요!");
      } else if (type === 'urgent') {
        setActiveNotification('urgent');
      } else if (type === 'missed') {
        setActiveNotification('missed');
      }
    };

    window.addEventListener('test-notification' as any, handleTestTrigger as any);
    return () => window.removeEventListener('test-notification' as any, handleTestTrigger as any);
  }, []);

  // Real-time Logic (Simulated)
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // 1. Regular 9 AM Reminder
      if (hours === 9 && minutes === 0) {
        setToastMsg("☀️ 좋은 아침! 오늘 루틴인증, 잊지 않으셨죠?");
      }

      // 2. Deadline Warning (1 Hour Before)
      // userSettings.checkInTime ex: "20:00"
      if (userSettings.checkInTime) {
        const [targetH] = userSettings.checkInTime.split(':').map(Number);
        if (hours === targetH - 1 && minutes === 0) {
           setActiveNotification('urgent');
        }
      }
    };

    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [userSettings.checkInTime]);

  const handleRescheduleOpen = () => {
    setActiveNotification(null);
    setShowReschedule(true);
  };

  return (
    <>
      {/* 1. Regular Toast Notification */}
      {toastMsg && (
        <Toast message={toastMsg} type="info" onClose={() => setToastMsg(null)} />
      )}

      {/* 2. Urgent Warning Banner (Bottom Sheet style) */}
      {activeNotification === 'urgent' && (
        <div className="fixed bottom-24 left-4 right-4 z-[200] bg-[#1A1A1A] rounded-2xl p-5 text-white shadow-2xl animate-slide-up border border-white/10">
           <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                    <Clock size={18} className="text-white" />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">마감 1시간 전! 🚨</h4>
                    <p className="text-[11px] text-gray-400">아직 인증을 못 하셨나요?</p>
                 </div>
              </div>
              <button onClick={() => setActiveNotification(null)} className="text-gray-500 hover:text-white"><X size={18}/></button>
           </div>
           
           <div className="flex gap-2">
              <button 
                onClick={() => { setActiveNotification(null); /* Logic to open camera would go here */ }}
                className="flex-1 py-3 bg-[#FFD046] text-[#333333] rounded-xl font-bold text-xs active:scale-95 transition-transform"
              >
                지금 인증하기
              </button>
              <button 
                onClick={handleRescheduleOpen}
                className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold text-xs active:scale-95 transition-transform hover:bg-white/20"
              >
                시간 변경 / 미루기
              </button>
           </div>
        </div>
      )}

      {/* 3. Missed Deadline Modal */}
      <BaseModal
        isOpen={activeNotification === 'missed'}
        onClose={() => setActiveNotification(null)}
        title="인증을 놓치셨나요? 😢"
      >
         <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto relative">
               <Calendar size={32} className="text-gray-400" />
               <div className="absolute bottom-0 right-0 bg-orange-100 p-1.5 rounded-full">
                  <ArrowRight size={14} className="text-orange-500" />
               </div>
            </div>
            
            <div>
               <p className="text-sm text-[#333333] font-bold mb-1">괜찮아요, 완벽하지 않아도 돼요.</p>
               <p className="text-xs text-gray-500 leading-relaxed break-keep">
                  오늘 못한 인증을 이번 주 다른 날로 옮기거나,<br/>
                  주말 보충 계획을 세워볼까요?
               </p>
            </div>

            <Button onClick={handleRescheduleOpen}>
               보충 계획 세우기
            </Button>
            
            <button 
              onClick={() => setActiveNotification(null)} 
              className="text-xs text-gray-400 font-medium underline"
            >
               이번엔 그냥 넘어갈게요 (패스 사용)
            </button>
         </div>
      </BaseModal>

      {/* Reschedule Interface */}
      {showReschedule && (
        <RescheduleModal onClose={() => setShowReschedule(false)} />
      )}
    </>
  );
};