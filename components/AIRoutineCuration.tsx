import React from 'react';
import { Sparkles, Plus, ArrowRight } from 'lucide-react';

const AIRoutineCuration = () => {
  // 예시: AI 분석 결과 "평일 오전 에너자이저" 타입에게 추천하는 루틴
  const recommendedRoutines = [
    { id: 1, emoji: '🧘‍♂️', title: '5분 아침 명상', tag: '오전 집중력 활용', reason: '높은 오전 에너지를 차분하게 정돈해줘요.' },
    { id: 2, emoji: '💧', title: '기상 직후 물 한 잔', tag: '작은 성공 경험', reason: '가장 쉽지만 확실한 건강 스위치예요.' },
    { id: 3, emoji: '📝', title: '오늘의 우선순위 3가지', tag: '생산성 극대화', reason: '맑은 정신으로 하루의 지도를 그려보세요.' },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-[32px] p-6 border border-gray-100 shadow-inner">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-[#FFD046]" />
        <h3 className="text-lg font-bold text-[#333333]">AI의 다음 단계 처방 💊</h3>
      </div>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed break-keep">
        "<span className="font-bold text-[#333333]">평일 한정 에너자이저</span>" 타입인 동호님을 위해,
        가장 효율이 좋은 오전 루틴들을 골라봤어요.
      </p>

      {/* 벤토 그리드 스타일 추천 카드 */}
      <div className="grid gap-3">
        {recommendedRoutines.map((routine, i) => (
          <div key={routine.id} className="group bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm hover:border-[#FFD046] transition-all flex items-center justify-between cursor-pointer active:scale-[0.98]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-yellow-50 transition-colors">
                {routine.emoji}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <h4 className="font-bold text-[#333333] text-sm break-keep">{routine.title}</h4>
                  <span className="text-[9px] font-bold text-[#FFD046] bg-[#FFF9E6] px-1.5 py-0.5 rounded-md whitespace-nowrap">
                    {routine.tag}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 break-keep leading-snug">{routine.reason}</p>
              </div>
            </div>
            <button className="w-8 h-8 shrink-0 bg-[#333333] text-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#FFD046] group-hover:text-[#333333] transition-all ml-2">
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-3 flex items-center justify-center gap-1 text-xs font-bold text-gray-400 hover:text-[#FFD046] transition-colors">
        더 많은 추천 보기 <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default AIRoutineCuration;