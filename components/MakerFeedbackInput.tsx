import React, { useState } from 'react';

interface MakerFeedbackInputProps {
  targetUser: { nickname: string };
  onSend: (comment: string) => void;
}

const MakerFeedbackInput: React.FC<MakerFeedbackInputProps> = ({ targetUser, onSend }) => {
  const [comment, setComment] = useState('');
  const quickTemplates = ["수요일 고비만 넘기면 완벽해요!", "최고의 성실함입니다!", "포기하지 마세요! 🔥", "조금만 더 힘내봐요!"];

  return (
    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#FFD046] rounded-full flex items-center justify-center font-bold text-secondary shadow-sm">
          {targetUser.nickname[0]}
        </div>
        <div>
          <h4 className="font-bold text-sm text-secondary">{targetUser.nickname}님을 위한 피드백</h4>
          <p className="text-[10px] text-gray-400">이번 주 달성률 82%에 맞춰 조언을 남겨주세요.</p>
        </div>
      </div>

      {/* 빠른 템플릿 */}
      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
        {quickTemplates.map((t, i) => (
          <button 
            key={i} 
            onClick={() => setComment(t)}
            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 rounded-full text-[10px] text-gray-500 border border-gray-100 active:bg-yellow-50 active:border-yellow-200 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-4 bg-gray-50 rounded-2xl text-xs min-h-[100px] outline-none focus:ring-2 focus:ring-[#FFD046] transition-all resize-none placeholder-gray-400"
        placeholder="조원에게 힘이 되는 한마디를 적어주세요..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button 
        onClick={() => {
          onSend(comment);
          setComment('');
        }}
        disabled={!comment}
        className="w-full mt-4 py-4 bg-[#333333] text-white rounded-2xl font-bold text-xs active:scale-95 transition-all disabled:opacity-30 hover:bg-black"
      >
        피드백 전송하기
      </button>
    </div>
  );
};

export default MakerFeedbackInput;