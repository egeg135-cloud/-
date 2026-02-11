
import React, { useState, useRef } from 'react';
import { Camera, X, Timer, Image as ImageIcon, Loader2, Wand2, Sparkles, Check } from 'lucide-react';
import { Button } from './UIComponents';
import { useApp } from '../context/AppContext';
import { MOCK_MY_CLUBS } from '../constants';
import FocusTimer from './FocusTimer';
import { GoogleGenAI } from '@google/genai';

interface CheckInModalProps {
  onClose: () => void;
  onSubmit: (data: { text: string; image: string | null }, clubId?: string) => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ onClose, onSubmit }) => {
  const { currentClubId, myClubs, showToast } = useApp();
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<'photo' | 'timer' | 'ai'>('photo');
  const [isUploading, setIsUploading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSize, setAiSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeClub = myClubs.find(c => c.id === currentClubId) || MOCK_MY_CLUBS.find(c => c.id === currentClubId);

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: `${aiPrompt}, high quality, realistic workout scene` }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: aiSize } },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setPreview(`data:image/png;base64,${part.inlineData.data}`);
          showToast('AI 이미지가 생성되었습니다! ✨');
          break;
        }
      }
    } catch (e) {
      console.error(e);
      showToast('이미지 생성에 실패했습니다.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = () => {
    if (!preview && text.length === 0) return;
    onSubmit({ text, image: preview });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:w-[400px] rounded-t-[32px] sm:rounded-[32px] p-6 h-[90vh] sm:h-auto flex flex-col animate-slide-up shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{activeClub?.title}</span>
             <h2 className="text-lg font-black text-secondary break-keep">{activeClub?.mission || '오늘의 인증'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="flex p-1 bg-gray-50 rounded-2xl mb-6 overflow-x-auto hide-scrollbar">
            {['photo', 'timer', 'ai'].map((m) => (
                <button 
                    key={m}
                    onClick={() => setMode(m as any)}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 transition-all whitespace-nowrap px-4
                        ${mode === m ? 'bg-white text-secondary shadow-sm' : 'text-gray-400'}`}
                >
                    {m === 'photo' && <Camera size={12} />}
                    {m === 'timer' && <Timer size={12} />}
                    {m === 'ai' && <Wand2 size={12} />}
                    {m === 'photo' ? '사진' : m === 'timer' ? '타이머' : 'AI 인증'}
                </button>
            ))}
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {mode === 'ai' ? (
             <div className="space-y-4 mb-6">
                <div className="bg-[#1A1A1A] rounded-2xl p-4 text-white">
                   <div className="flex items-center gap-2 mb-3"><Sparkles size={14} className="text-[#FFD046]" /><span className="text-[10px] font-black uppercase tracking-widest">제미나이 3.0 프로</span></div>
                   <textarea 
                     className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-[#FFD046] transition-all resize-none"
                     placeholder="원하는 인증샷의 분위기를 입력하세요 (예: 새벽 공원의 조깅하는 사람)"
                     rows={3}
                     value={aiPrompt}
                     onChange={(e) => setAiPrompt(e.target.value)}
                   />
                   <div className="flex gap-2 mt-3">
                      {['1K', '2K', '4K'].map(s => (
                        <button key={s} onClick={() => setAiSize(s as any)} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${aiSize === s ? 'bg-[#FFD046] border-[#FFD046] text-[#1A1A1A]' : 'bg-white/5 border-white/10 text-gray-500'}`}>{s} 화질</button>
                      ))}
                   </div>
                   <button 
                     onClick={handleGenerateAI}
                     disabled={isGenerating || !aiPrompt.trim()}
                     className="w-full mt-4 py-3 bg-white text-[#1A1A1A] rounded-xl text-xs font-black flex items-center justify-center gap-2 disabled:opacity-30"
                   >
                     {isGenerating ? <Loader2 size={14} className="animate-spin" /> : 'AI 이미지 생성하기'}
                   </button>
                </div>
                {preview && <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 animate-fade-in"><img src={preview} className="w-full h-full object-cover" /><button onClick={() => setPreview(null)} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full"><X size={12}/></button></div>}
             </div>
          ) : mode === 'photo' ? (
            <div 
                onClick={() => !preview && !isUploading && fileInputRef.current?.click()}
                className={`w-full aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center mb-6 relative overflow-hidden transition-colors ${!preview ? 'cursor-pointer hover:bg-gray-100' : ''}`}
            >
                {isUploading ? <Loader2 size={24} className="text-primary animate-spin" /> : preview ? (
                <>
                    <img src={preview} alt="미리보기" className="w-full h-full object-cover" />
                    <button onClick={(e) => { e.stopPropagation(); setPreview(null); }} className="absolute top-3 right-3 p-1.5 bg-black/50 text-white rounded-full shadow-lg"><X size={14} /></button>
                </>
                ) : (
                <div className="flex flex-col items-center"><div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center mb-2"><ImageIcon size={20} className="text-gray-300" /></div><p className="text-[10px] text-gray-400 font-bold">인증샷 등록</p></div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="mb-6"><FocusTimer onComplete={(t) => { setPreview('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400'); setText(`[${t} 몰입 완료] 성장을 향한 한걸음! 🔥`); }} /></div>
          )}

          <textarea
            className="w-full p-4 bg-gray-50 rounded-2xl resize-none text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-primary placeholder-gray-300"
            rows={2}
            placeholder="오늘 루틴은 어떠셨나요? (50자 이내)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mt-6 pb-6 safe-area-bottom">
          <Button onClick={handleFinalSubmit} disabled={!preview && text.length === 0}>인증 완료하기</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
