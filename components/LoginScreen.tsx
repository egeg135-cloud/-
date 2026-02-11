
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, UserPlus, LogIn, ChevronLeft, Mail, Lock, User as UserIcon, ShieldCheck, Search } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'find'>('login');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [brandSuffix, setBrandSuffix] = useState('DAY');
  
  const { login, signup } = useApp();

  // Dynamic Brand Suffix Logic
  useEffect(() => {
    const suffixes = ['DAY', 'ACTION', 'POWER', 'RUN', 'PEOPLE'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % suffixes.length;
      setBrandSuffix(suffixes[idx]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleAction = () => {
    setError(null);
    if (mode === 'login') {
      const success = login(id, pw);
      if (!success) setError('아이디 또는 비밀번호를 확인해주세요.');
    } else if (mode === 'signup') {
      if (!id || !pw || !nickname || !pwConfirm) {
        setError('모든 정보를 입력해주세요.');
        return;
      }
      if (pw !== pwConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      signup(nickname, id, pw);
    } else if (mode === 'find') {
      if (!email) {
        setError('이메일을 입력해주세요.');
        return;
      }
      setSuccessMsg('입력하신 이메일로 임시 정보를 발송했습니다.');
      setTimeout(() => {
        setMode('login');
        setSuccessMsg(null);
      }, 3000);
    }
  };

  const renderFindView = () => (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
          <Search size={32} />
        </div>
        <h2 className="text-xl font-black text-secondary">계정 정보를 잊으셨나요?</h2>
        <p className="text-xs text-gray-400 mt-2">가입 시 등록한 이메일을 입력하시면<br/>아이디와 임시 비밀번호를 보내드려요.</p>
      </div>
      
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
        <input 
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 pl-12 bg-gray-50 rounded-[20px] border border-gray-100 focus:border-primary outline-none font-bold"
        />
      </div>

      {successMsg && <p className="text-xs text-green-500 text-center font-bold animate-pulse">{successMsg}</p>}

      <button 
        onClick={handleAction}
        className="w-full py-5 bg-secondary text-white rounded-[24px] font-black text-lg active:scale-95 transition-all"
      >
        정보 찾기
      </button>

      <button onClick={() => setMode('login')} className="w-full text-xs text-gray-400 font-bold flex items-center justify-center gap-1">
        <ChevronLeft size={14} /> 로그인으로 돌아가기
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen px-8 justify-center bg-white animate-fade-in relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      
      {mode !== 'find' && (
        <div className="mb-12 relative z-10">
          <div className="flex items-baseline gap-1">
            <h1 className="text-5xl font-black text-secondary tracking-tighter">MOTI</h1>
            <h1 className={`text-5xl font-black text-primary tracking-tighter transition-all duration-300 ${brandSuffix === 'PEOPLE' ? 'scale-110' : 'scale-100'}`}>
              {brandSuffix}
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-medium mt-2">
            {mode === 'login' ? '함께 운동해서 더 즐거운 운동인들의 성지' : '더 나은 신체, 새로운 루틴의 시작! 💪'}
          </p>
        </div>
      )}

      {mode === 'find' ? renderFindView() : (
        <div className="space-y-4 relative z-10">
          {mode === 'signup' && (
            <div className="animate-slide-up relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setError(null); }}
                className="w-full p-4 pl-12 bg-gray-50 rounded-[20px] border border-gray-100 focus:border-primary outline-none font-bold"
              />
            </div>
          )}
          <div className="animate-slide-up relative" style={{ animationDelay: '0.1s' }}>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => { setId(e.target.value); setError(null); }}
              className="w-full p-4 pl-12 bg-gray-50 rounded-[20px] border border-gray-100 focus:border-primary outline-none font-bold"
            />
          </div>
          <div className="animate-slide-up relative" style={{ animationDelay: '0.2s' }}>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(null); }}
              className="w-full p-4 pl-12 bg-gray-50 rounded-[20px] border border-gray-100 focus:border-primary outline-none font-bold"
            />
          </div>
          {mode === 'signup' && (
            <div className="animate-slide-up relative" style={{ animationDelay: '0.3s' }}>
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password"
                placeholder="비밀번호 확인"
                value={pwConfirm}
                onChange={(e) => { setPwConfirm(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                className={`w-full p-4 pl-12 bg-gray-50 rounded-[20px] border ${pw && pwConfirm && pw !== pwConfirm ? 'border-red-300' : 'border-gray-100'} focus:border-primary outline-none font-bold`}
              />
            </div>
          )}
          
          {error && <p className="text-[11px] text-red-500 pl-2 font-bold animate-pulse">{error}</p>}

          <button 
            onClick={handleAction}
            className="mt-6 w-full py-5 bg-secondary text-white rounded-[24px] font-black text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            {mode === 'login' ? (
              <>로그인 <LogIn size={20} /></>
            ) : (
              <>회원가입 완료 <ArrowRight size={20} /></>
            )}
          </button>

          <div className="mt-8 flex justify-center gap-4 text-xs text-gray-400">
            {mode === 'login' ? (
              <>
                <span onClick={() => setMode('find')} className="cursor-pointer hover:text-gray-600">ID/PW 찾기</span>
                <span className="w-px h-3 bg-gray-200" />
                <span 
                  onClick={() => setMode('signup')}
                  className="font-black text-secondary cursor-pointer hover:underline underline-offset-4 decoration-primary decoration-4"
                >
                  회원가입
                </span>
              </>
            ) : (
              <button 
                onClick={() => setMode('login')}
                className="flex items-center gap-1 font-bold text-gray-500 hover:text-secondary"
              >
                <ChevronLeft size={14} /> 이미 계정이 있으신가요?
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-12 p-4 bg-gray-50 rounded-2xl text-[10px] text-gray-400 text-center relative z-10">
        <p className="mb-1 font-bold text-gray-500">테스트 계정 안내</p>
        <p>관리자: motimaker / motimaker</p>
        <p>참여자: general / general</p>
      </div>
    </div>
  );
};

export default LoginScreen;
