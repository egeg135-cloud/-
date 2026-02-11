import React, { useRef, useState } from 'react';
import { RoutineType } from '../types';
import { ROUTINE_TYPE_CONFIG } from '../constants';
import { Sparkles, Share2, Download, Check, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface DNAShareCardProps {
  type: RoutineType;
  nickname: string;
}

const DNAShareCard: React.FC<DNAShareCardProps> = ({ type, nickname }) => {
  const config = ROUTINE_TYPE_CONFIG[type];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Function to generate image blob from the DOM element
  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Higher scale for better quality
        useCORS: true, // Enable CORS for external images (like avatars)
        backgroundColor: null, // Preserve transparency effects
        logging: false,
      });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Image generation failed', error);
      return null;
    }
  };

  const handleDownload = async () => {
    setIsCapturing(true);
    const blob = await generateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `motiday_dna_${type}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
    setIsCapturing(false);
  };

  const handleShareToStory = async () => {
    setIsCapturing(true);
    const blob = await generateImage();
    
    if (blob) {
      const file = new File([blob], `motiday_dna.png`, { type: 'image/png' });

      // 1. Try Native Web Share API (Mobile Support)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Routine DNA',
            text: `제 루틴 DNA는 '${config.label}' 입니다! @motiday.official`,
          });
        } catch (error) {
          console.log('Share canceled or failed', error);
        }
      } else {
        // 2. Fallback: Download image and try to open Instagram App
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `motiday_dna_${type}.png`;
        link.click();
        
        // Slight delay to allow download to start
        setTimeout(() => {
             alert('이미지가 저장되었습니다!\n인스타그램 스토리를 열어 업로드해주세요.');
             // Attempt to open Instagram (Deep Link)
             window.location.href = 'instagram://story-camera'; 
        }, 500);
      }
    }
    setIsCapturing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 animate-slide-up w-full">
      
      {/* Capture Target Area */}
      <div ref={cardRef} className="w-full max-w-sm relative">
        <div className={`w-full aspect-[4/5] rounded-[32px] bg-gradient-to-br ${config.color} text-white relative shadow-2xl overflow-hidden flex flex-col p-7`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
                {[...Array(30)].map((_, i) => (
                <span key={i} className="text-4xl">{config.icon}</span>
                ))}
            </div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
            <div>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70 mb-1">MOTIDAY DNA</p>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full w-fit">
                    <Sparkles size={10} className="text-white" />
                    <span className="text-[10px] font-bold tracking-wide">AI Analysis</span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold opacity-70">Rarity</p>
                <p className="text-lg font-black">Top {config.rarity}%</p>
            </div>
            </div>

            {/* Main Icon */}
            <div className="flex-1 flex items-center justify-center relative z-10 my-2">
            <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150"></div>
                {/* Reduced size to prevent overflow */}
                <span className="text-[80px] drop-shadow-2xl relative z-10 filter">{config.icon}</span>
            </div>
            </div>

            {/* Footer Info */}
            <div className="relative z-10">
            <p className="text-xs font-bold opacity-80 mb-1">Hello, I am</p>
            {/* Adjusted font size and line height, added break-keep */}
            <h2 className="text-2xl font-black leading-tight mb-3 break-keep">
                {nickname}님은<br/>{config.label}
            </h2>
            
            <div className="flex flex-wrap gap-1.5 mb-5">
                {config.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-black/20 rounded-md text-[10px] font-bold backdrop-blur-sm whitespace-nowrap">
                    {tag}
                </span>
                ))}
            </div>

            <div className="border-t border-white/20 pt-3 flex justify-between items-end">
                <p className="text-[9px] font-medium opacity-60">
                    Based on 4-week routine data
                </p>
                <p className="text-[10px] font-black italic tracking-tighter">@motiday.official</p>
            </div>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-sm">
        <button 
            onClick={handleShareToStory}
            disabled={isCapturing}
            className="flex-1 bg-[#1A1A1A] text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl text-xs"
        >
            {isCapturing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
            <span>스토리에 자랑하기</span>
        </button>
        
        <button 
            onClick={handleDownload}
            disabled={isCapturing}
            className={`p-3.5 rounded-2xl active:scale-95 transition-all shadow-sm border border-gray-100 flex items-center justify-center
                ${saveStatus === 'saved' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-[#1A1A1A]'}`}
        >
            {isCapturing ? (
                <Loader2 size={18} className="animate-spin text-gray-400" />
            ) : saveStatus === 'saved' ? (
                <Check size={18} />
            ) : (
                <Download size={18} />
            )}
        </button>
      </div>
    </div>
  );
};

export default DNAShareCard;