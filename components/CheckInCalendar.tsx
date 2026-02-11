
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Calendar as CalendarIcon, Trophy, Ban, Clock, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CheckInCalendarProps {
  onClose: () => void;
}

const CheckInCalendar: React.FC<CheckInCalendarProps> = ({ onClose }) => {
  const { userSettings } = useApp();
  const [date, setDate] = useState(new Date());
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  const getDayStatus = (d: number) => {
      const currentDayDate = new Date(year, month, d);
      const dayName = ['일', '월', '화', '수', '목', '금', '토'][currentDayDate.getDay()];
      const isGoalDay = userSettings.schedule[dayName]?.active;
      
      if (isCurrentMonth && d > todayDate) return isGoalDay ? 'future-goal' : 'future';
      
      const seed = (year + month + d) % 12;
      if (seed === 0 || seed === 2 || seed === 4 || seed === 6) return 'done';
      if (isGoalDay && seed === 3) return 'missed';
      if (seed === 5) return 'delayed'; 
      if (!isGoalDay && seed === 7) return 'substituted'; 
      return isGoalDay ? 'goal' : 'none';
  };

  const renderDays = () => {
    const dayElements = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    weekDays.forEach(day => {
        dayElements.push(<div key={`h-${day}`} className="h-8 flex items-center justify-center text-[10px] text-gray-400 font-black">{day}</div>);
    });

    for (let i = 0; i < firstDay; i++) {
        dayElements.push(<div key={`e-${i}`} className="aspect-[1/1.2]" />);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const status = getDayStatus(d);
        const isToday = isCurrentMonth && d === todayDate;
        
        dayElements.push(
            <div key={`d-${d}`} className={`aspect-[1/1.2] flex flex-col items-center pt-2 rounded-2xl transition-all ${isToday ? 'bg-[#FFD046]/10 ring-1 ring-[#FFD046]' : ''}`}>
                <span className={`text-[10px] font-bold mb-1 ${status.includes('future') ? 'text-gray-200' : 'text-gray-500'}`}>
                    {d}
                </span>
                <div className="flex-1 flex items-center justify-center">
                    {status === 'done' && <Flame size={14} className="text-[#FFD046] fill-current animate-bounce-in" />}
                    {status === 'missed' && <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />}
                    {status === 'delayed' && <Clock size={12} className="text-blue-400" />}
                    {status === 'substituted' && <Sparkles size={12} className="text-emerald-400" />}
                    {status.includes('goal') && status !== 'done' && <div className="w-1 h-1 bg-gray-200 rounded-full" />}
                </div>
            </div>
        );
    }
    return dayElements;
  };

  return (
    <div className="flex flex-col h-full bg-white max-h-[600px] animate-fade-in">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <button onClick={() => setDate(new Date(year, month - 1, 1))} className="p-1"><ChevronLeft size={20}/></button>
          <span className="font-black text-secondary">{year}.{String(month + 1).padStart(2, '0')}</span>
          <button onClick={() => setDate(new Date(year, month + 1, 1))} className="p-1"><ChevronRight size={20}/></button>
      </div>

      <div className="p-4">
          <div className="grid grid-cols-7 gap-y-2">
              {renderDays()}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 text-[9px] font-bold text-gray-400 bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2"><Flame size={10} className="text-primary fill-current" /> 성공</div>
              <div className="flex items-center gap-2"><div className="w-1 h-1 bg-red-400 rounded-full" /> 실패</div>
              <div className="flex items-center gap-2"><Clock size={10} className="text-blue-400" /> 지연</div>
              <div className="flex items-center gap-2"><Sparkles size={10} className="text-emerald-400" /> 보충</div>
          </div>
      </div>
    </div>
  );
};

export default CheckInCalendar;
