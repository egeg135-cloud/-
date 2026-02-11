import React from 'react';
import { RoutineType } from '../types';
import { ROUTINE_TYPE_CONFIG } from '../constants';
import { Heart, ArrowRight } from 'lucide-react';

interface ChemistryMatchProps {
  myType: RoutineType;
  onFindMate?: () => void;
}

const ChemistryMatch: React.FC<ChemistryMatchProps> = ({ myType, onFindMate }) => {
  const myConfig = ROUTINE_TYPE_CONFIG[myType];
  const mateType = myConfig.mateType;
  const mateConfig = ROUTINE_TYPE_CONFIG[mateType];

  return (
    <div className="p-6 bg-white rounded-[28px] shadow-sm border border-gray-100 relative overflow-hidden group">
      {/* Decorative Background */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-50 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

      <div className="relative z-10">
        <h4 className="font-bold text-[#333333] text-sm mb-5 flex items-center gap-2">
           <Heart size={18} className="text-pink-500 fill-current animate-pulse" />
           Routine Chemistry
        </h4>

        <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-center flex-1">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-2 bg-gradient-to-br ${myConfig.color} shadow-lg text-white`}>
                    {myConfig.icon}
                </div>
                <p className="text-[10px] font-bold text-gray-400">ME</p>
            </div>
            
            <div className="text-pink-300">
                <ArrowRight size={20} className="animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>

            <div className="text-center flex-1">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-2 bg-gradient-to-br ${mateConfig.color} shadow-lg text-white opacity-90`}>
                    {mateConfig.icon}
                </div>
                <p className="text-[10px] font-bold text-gray-400">BEST MATE</p>
            </div>
        </div>

        <div className="bg-[#FFF0F5] p-4 rounded-2xl text-center border border-pink-100">
            <h4 className="font-bold text-[#333333] mb-1 text-sm">{myConfig.mateLabel}</h4>
            <p className="text-[11px] text-pink-600 leading-relaxed font-medium break-keep">
            "{myConfig.mateDesc}"<br/>
            함께 챌린지하면 <span className="font-bold underline">성공률이 1.5배</span> 상승해요!
            </p>
        </div>

        <button 
            onClick={onFindMate}
            className="mt-4 w-full py-3.5 bg-[#333333] text-white rounded-xl font-bold text-xs active:scale-95 transition-all shadow-md hover:bg-black"
        >
            나의 베스트 메이트 찾기
        </button>
      </div>
    </div>
  );
};

export default ChemistryMatch;