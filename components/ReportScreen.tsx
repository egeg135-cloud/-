
import React, { useState, useMemo } from 'react';
import { Award, TrendingUp, ChevronRight, Info, Sparkles, CheckCircle2, Share2, Trophy, Calendar, ChevronDown, Flame, Clock, X as XIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AIDeepAnalysis from './AIDeepAnalysis';
import HallOfFameCeremony from './HallOfFameCeremony';
import { BaseModal, Badge } from './UIComponents';

const TrendLine = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const width = 300;
  const height = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (v / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-6">
         <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            주차별 달성률 추이
         </h4>
      </div>
      <div className="relative h-24 w-full">
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <path 
              d={`M ${points}`} 
              fill="none" 
              stroke="#E5E7EB" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d={`M ${points}`} 
              fill="none" 
              stroke="#1A1A1A" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />
            {data.map((v, i) => (
              <circle 
                key={i} 
                cx={(i / (data.length - 1)) * width} 
                cy={height - (v / max) * height} 
                r="4" 
                fill="white" 
                stroke="#1A1A1A" 
                strokeWidth="2.5" 
              />
            ))}
         </svg>
      </div>
      <div className="flex justify-between mt-6 px-1">
          {['2월 2주', '2월 3주', '3월 1주', '3월 2주', '3월 3주'].map(w => <span key={w} className="text-[9px] font-bold text-gray-300">{w}</span>)}
      </div>
    </div>
  );
};

const ReportScreen: React.FC = () => {
  const { user, myClubs, activeClubId, setActiveClubId } = useApp();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCeremony, setShowCeremony] = useState(false);
  const [showClubSelector, setShowClubSelector] = useState(false);
  const [viewWeek, setViewWeek] = useState(3);

  const activeClub = myClubs.find(c => c.id === activeClubId) || myClubs[0];

  const pastReports = [
    { week: 1, rate: 100, status: 'perfect', date: '03.01 - 03.07' },
    { week: 2, rate: 40, status: 'warning', date: '03.08 - 03.14' },
    { week: 3, rate: 60, status: 'normal', date: '03.15 - 03.21' },
  ];

  const reportData = useMemo(() => {
    const weekMockData: Record<number, any> = {
      1: {
        comment: "첫 주부터 만점으로 기세를 잡았네요!\n정말 완벽한 시작입니다. 👑",
        stats: { goal: 5, actual: 5, rate: 100 },
        comparison: { maker: 5, me: 5, average: 3.2 },
        insight: "아침 시간대를 활용할 때 성공률이 가장 높게 나타납니다.",
        weeklyStatus: [
            { day: '월', status: 'done' }, { day: '화', status: 'none' }, { day: '수', status: 'done' },
            { day: '목', status: 'none' }, { day: '금', status: 'done' }, { day: '토', status: 'done' }, { day: '일', status: 'done' }
        ]
      },
      2: {
        comment: "지난주는 컨디션 조절이 필요해 보여요.\n그래도 포기하지 않은 게 어디예요? ✨",
        stats: { goal: 5, actual: 2, rate: 40 },
        comparison: { maker: 5, me: 2, average: 4.5 },
        insight: "목요일부터 급격히 피로도가 올라가는 패턴이 보여요. 휴식이 필요합니다.",
        weeklyStatus: [
            { day: '월', status: 'missed' }, { day: '화', status: 'none' }, { day: '수', status: 'done' },
            { day: '목', status: 'missed' }, { day: '금', status: 'missed' }, { day: '토', status: 'none' }, { day: '일', status: 'done' }
        ]
      },
      3: {
        comment: "이번 주 업무 때문에 흔들렸지만,\n그래도 멈추지 않고 이어갔어요! 🔥",
        stats: { goal: 5, actual: 3, rate: 60 },
        comparison: { maker: 5, me: 3, average: 4.1 },
        insight: "퇴근이 늦어지면 인증 확률이 떨어지지만, 미뤄서라도 성공하는 끈기가 대단해요.",
        weeklyStatus: [
          { day: '월', status: 'done' }, { day: '화', status: 'none' }, { day: '수', status: 'done' },
          { day: '목', status: 'missed' }, { day: '금', status: 'rescheduled' }, { day: '토', status: 'none' }, { day: '일', status: 'none' }
        ]
      }
    };
    return weekMockData[viewWeek] || weekMockData[3];
  }, [viewWeek, activeClubId]);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] pb-32 overflow-y-auto hide-scrollbar relative">
      <header className="px-6 py-6 bg-white sticky top-0 z-30 border-b border-gray-100 flex justify-between items-center">
        <div className="flex flex-col">
            <h1 className="text-[18px] font-black text-secondary tracking-tight">주간 리포트</h1>
            <button 
              onClick={() => setShowClubSelector(true)}
              className="flex items-center gap-1 mt-0.5 group"
            >
              <span className="text-[12px] text-gray-400 font-bold group-hover:text-secondary transition-colors truncate max-w-[160px]">
                {activeClub?.title}
              </span>
              <ChevronDown size={14} className="text-gray-300 group-hover:text-secondary" />
            </button>
        </div>
        <button onClick={() => setShowCeremony(true)} className="w-9 h-9 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center active:scale-95 transition-all">
            <Trophy size={18} />
        </button>
      </header>

      <div className="p-6 space-y-8">
        <section className="bg-[#FFF9E6] rounded-[36px] p-7 border border-[#FFD046]/20 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD046] rounded-full blur-[100px] opacity-10"></div>
            
            <div className="flex justify-between items-start mb-6">
                <Badge className="bg-white/60 text-secondary border-none px-3 py-1 font-black text-[10px] tracking-tight">{viewWeek}주차 분석결과</Badge>
                <button className="text-gray-400 p-1.5 hover:bg-white/50 rounded-full transition-colors"><Share2 size={16} /></button>
            </div>

            <h2 className="text-[22px] font-black text-secondary leading-[1.35] mb-8 whitespace-pre-line tracking-tight">
              {reportData.comment}
            </h2>

            <div className="bg-white rounded-[28px] p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6 border border-white">
                <div className="relative w-28 h-28 shrink-0">
                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                        <circle 
                            cx="50" cy="50" r={radius} 
                            stroke="#F3F4F6" strokeWidth="9" fill="transparent" 
                        />
                        <circle 
                          cx="50" cy="50" r={radius} 
                          stroke="#FFD046" strokeWidth="9" fill="transparent" 
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference * (1 - reportData.stats.rate / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20px] font-black text-secondary">{reportData.stats.rate}%</span>
                    </div>
                </div>
                <div className="flex-1 w-full space-y-5">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-bold text-gray-400">목표 달성 횟수</span>
                        <span className="text-[15px] font-black text-secondary">{reportData.stats.actual} <span className="text-[12px] text-gray-300">/ {reportData.stats.goal}회</span></span>
                    </div>
                    <div className="flex justify-between gap-1.5">
                        {reportData.weeklyStatus.map((s: any, i: number) => (
                           <div key={i} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all border-2
                             ${s.status === 'done' ? 'bg-[#FFD046] border-[#FFD046] text-[#333333]' : 
                               s.status === 'rescheduled' ? 'bg-[#EBF5FF] border-dashed border-[#007AFF] text-[#007AFF]' :
                               s.status === 'missed' ? 'bg-[#FFF0F0] border-[#FF4D4D] text-[#FF4D4D]' : 'bg-transparent border-gray-100 text-gray-200'}`}>
                              {s.status === 'done' && <Flame size={14} className="fill-current" />}
                              {s.status === 'rescheduled' && <Clock size={14} strokeWidth={2.5} />}
                              {s.status === 'missed' && <XIcon size={14} strokeWidth={3} />}
                              {s.status === 'none' && <span className="text-[8px] font-bold opacity-30">{s.day}</span>}
                           </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100/50">
                <p className="text-[10px] font-black text-gray-400 mb-6 text-center tracking-widest uppercase">그룹 내 상대 비교</p>
                <div className="flex justify-around items-end h-24 gap-6 px-4">
                    {[
                      { label: '메이커', val: reportData.comparison.maker, barColor: 'bg-[#FFD046]/30' },
                      { label: '나', val: reportData.comparison.me, barColor: 'bg-secondary' },
                      { label: '평균', val: reportData.comparison.average, barColor: 'bg-gray-200' }
                    ].map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <span className={`text-[10px] font-black ${item.label === '나' ? 'text-secondary' : 'text-gray-400'}`}>{item.val}회</span>
                          <div className={`w-full rounded-xl transition-all duration-1000 ease-out ${item.barColor}`} style={{ height: `${(item.val / 5) * 100}%` }}></div>
                          <span className="text-[10px] font-bold text-gray-300">{item.label}</span>
                      </div>
                    ))}
                </div>
            </div>
        </section>

        <section>
            <div className="bg-[#1A1A1A] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD046]/10 rounded-full blur-[80px]"></div>
                <div className="flex items-center justify-between mb-5">
                  <Badge className="bg-[#FFD046] text-[#1A1A1A] border-none px-3 py-1 font-black text-[9px]">AI 인사이트</Badge>
                  <Sparkles size={18} className="text-[#FFD046]" />
                </div>
                <p className="text-[16px] font-bold leading-[1.5] mb-6 break-keep">
                  "{reportData.insight}"
                </p>
                <div className="flex items-start gap-2.5 text-[11px] text-gray-500 font-medium leading-relaxed">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  <span>데이터 분석 결과, 오전 8시 전후의 인증이 성공률이 가장 높았습니다.</span>
                </div>
            </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[12px] font-black text-secondary px-1 tracking-tight">주차별 달성률 추이</h3>
           <TrendLine data={[100, 40, 60, 85, 90]} />
        </section>

        <button 
           onClick={() => setShowAnalysis(true)}
           className="w-full p-6 bg-white rounded-[28px] border border-gray-100 flex items-center justify-between shadow-sm active:scale-95 transition-all group"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-[18px] flex items-center justify-center text-[24px] shadow-inner group-hover:scale-110 transition-transform">🤖</div>
              <div className="text-left">
                <h4 className="text-secondary font-black text-sm mb-0.5">AI 루틴 성향 심층 분석</h4>
                <p className="text-gray-400 text-[10px] font-bold">내 무의식 속 루틴 패턴 발견하기</p>
              </div>
           </div>
           <ChevronRight className="text-gray-200 group-hover:text-primary" size={18} />
        </button>

        <section className="pt-2 pb-20">
           <div className="flex items-center justify-between mb-5 px-1">
             <h3 className="text-[12px] font-black text-secondary tracking-tight">지난 리포트 목록</h3>
             <span className="text-[10px] font-black text-gray-300">총 {pastReports.length}개</span>
           </div>
           <div className="space-y-3">
              {pastReports.map((report) => (
                 <div 
                   key={report.week} 
                   onClick={() => setViewWeek(report.week)}
                   className={`bg-white p-5 rounded-[24px] border transition-all cursor-pointer shadow-sm flex items-center justify-between
                     ${viewWeek === report.week ? 'border-primary ring-1 ring-primary/20' : 'border-gray-50'}`}
                 >
                    <div className="flex items-center gap-4">
                       <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center font-black text-[11px]
                         ${report.status === 'perfect' ? 'bg-emerald-50 text-emerald-500' : 
                           report.status === 'warning' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                          {report.week}주
                       </div>
                       <div>
                          <h4 className="text-[14px] font-black text-secondary mb-0.5">{report.week}주차 리포트</h4>
                          <p className="text-[10px] text-gray-400 font-bold">{report.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right">
                          <p className="text-[13px] font-black text-secondary">{report.rate}%</p>
                          <p className="text-[9px] text-gray-300 font-black tracking-tighter">달성률</p>
                       </div>
                       <ChevronRight size={16} className={viewWeek === report.week ? 'text-primary' : 'text-gray-200'} />
                    </div>
                 </div>
              ))}
           </div>
        </section>
      </div>

      <BaseModal isOpen={showClubSelector} onClose={() => setShowClubSelector(false)} title="분석 대상 루틴 선택">
          <div className="space-y-3 pb-4">
            {myClubs.map(club => (
              <button 
                key={club.id}
                onClick={() => { setActiveClubId(club.id); setShowClubSelector(false); }}
                className={`w-full p-5 rounded-[24px] border flex items-center justify-between transition-all group
                  ${activeClubId === club.id ? 'border-primary bg-[#FFF9E6]' : 'border-gray-50 bg-white hover:border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:rotate-6 transition-transform">{club.icon}</div>
                  <span className="text-[14px] font-black text-secondary">{club.title}</span>
                </div>
                {activeClubId === club.id && <CheckCircle2 size={20} className="text-primary" />}
              </button>
            ))}
          </div>
      </BaseModal>

      {showAnalysis && <AIDeepAnalysis onClose={() => setShowAnalysis(false)} nickname={user?.nickname} />}
      {showCeremony && <HallOfFameCeremony userData={user!} onClose={() => setShowCeremony(false)} />}
    </div>
  );
};

export default ReportScreen;
