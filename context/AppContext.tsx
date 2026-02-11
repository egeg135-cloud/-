
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeedItem, Comment, User, ChatRoom, Message, JoinedClub, Club, UserSettings, DayConfig, Bet } from '../types';
import { INITIAL_FEED, MOCK_MY_CLUBS } from '../constants';

interface AppContextType {
  user: User | null;
  login: (id: string, pw: string) => boolean;
  signup: (nickname: string, id: string, pw: string) => void;
  logout: () => void;
  updateProfileImage: (url: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  feed: FeedItem[];
  myClubs: JoinedClub[]; 
  joinClub: (club: Club) => void;
  myCheckIn: Record<string, boolean>;
  checkInCount: number;
  totalFocusTime: number; 
  addFocusTime: (seconds: number) => void;
  userSettings: UserSettings;
  addPost: (data: { text: string; image: string | null }, clubId?: string) => void;
  handleReaction: (id: string) => void;
  addComment: (feedId: string, text: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  showCelebration: boolean;
  setShowCelebration: (show: boolean) => void;
  isCheckInModalOpen: boolean;
  setIsCheckInModalOpen: (isOpen: boolean) => void;
  isClubSelectorOpen: boolean;
  setIsClubSelectorOpen: (isOpen: boolean) => void;
  isDevicePreviewOpen: boolean; 
  setIsDevicePreviewOpen: (isOpen: boolean) => void;
  currentClubId: string | null;
  openCheckInModal: (clubId: string) => void;
  shieldCount: number;
  useShield: () => void;
  showResuscitation: boolean;
  setShowResuscitation: (show: boolean) => void;
  
  friends: string[];
  sentRequests: string[];
  sendFriendRequest: (userId: string) => void;
  startChat: (userId: string, name: string, img?: string) => void;
  chats: ChatRoom[];
  sendMessage: (chatId: string, text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  clubChats: Record<string, Message[]>;
  sendClubMessage: (clubId: string, text: string, type?: 'text' | 'checkin', checkInData?: { id: string, image: string }) => void;
  activeClubId: string | null;
  setActiveClubId: (id: string | null) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;

  points: number;
  inventory: string[];
  activeSavings: { amount: number; goal: number; date: string } | null;
  activeBet: Bet | null;
  placeBet: (amount: number) => boolean;
  purchaseItem: (itemId: string, price: number) => boolean;
  startSavings: (amount: number) => boolean;

  toast: { message: string, type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  newLevel: { name: string; icon: string; color: string } | null;
  closeLevelUpModal: () => void;
  isNewUser: boolean;
  completeOnboarding: (settings: Partial<UserSettings>, profileImg?: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);
const STORAGE_KEY = 'MOTIDAY_APP_DATA_V1';

const DEFAULT_DAYS: Record<string, DayConfig> = {
  '월': { active: true, time: '22:00' },
  '화': { active: false, time: '22:00' },
  '수': { active: true, time: '22:00' },
  '목': { active: false, time: '22:00' },
  '금': { active: true, time: '22:00' },
  '토': { active: false, time: '22:00' },
  '일': { active: false, time: '22:00' },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadState = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  };

  const initialState = loadState();
  const [user, setUser] = useState<User | null>(initialState?.user || null);
  const [activeTab, setActiveTab] = useState('home');
  const [feed, setFeed] = useState<FeedItem[]>(initialState?.feed || INITIAL_FEED);
  const [myClubs, setMyClubs] = useState<JoinedClub[]>(initialState?.myClubs || MOCK_MY_CLUBS);
  const [myCheckIn, setMyCheckIn] = useState<Record<string, boolean>>(initialState?.myCheckIn || {});
  const [checkInCount, setCheckInCount] = useState(initialState?.checkInCount ?? 52);
  const [totalFocusTime, setTotalFocusTime] = useState(initialState?.totalFocusTime || 0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isClubSelectorOpen, setIsClubSelectorOpen] = useState(false);
  const [isDevicePreviewOpen, setIsDevicePreviewOpen] = useState(false);
  const [currentClubId, setCurrentClubId] = useState<string | null>(null);
  const [shieldCount, setShieldCount] = useState(initialState?.shieldCount || 1);
  const [showResuscitation, setShowResuscitation] = useState(false);
  const [friends] = useState<string[]>(initialState?.friends || ['m1']); 
  const [sentRequests, setSentRequests] = useState<string[]>(initialState?.sentRequests || []);
  const [chats, setChats] = useState<ChatRoom[]>(initialState?.chats || []);
  const [activeBet, setActiveBet] = useState<Bet | null>(initialState?.activeBet || null);
  const [clubChats, setClubChats] = useState<Record<string, Message[]>>(initialState?.clubChats || {});
  const [activeClubId, setActiveClubId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  const [points, setPoints] = useState<number>(initialState?.points || 2500);
  const [inventory, setInventory] = useState<string[]>(initialState?.inventory || []);
  const [activeSavings, setActiveSavings] = useState<{ amount: number; goal: number; date: string } | null>(initialState?.activeSavings || null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [newLevel, setNewLevel] = useState<{ name: string; icon: string; color: string } | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const [userSettings, setUserSettings] = useState<UserSettings>(initialState?.userSettings || {
    checkInDays: ['월', '수', '금'],
    schedule: DEFAULT_DAYS,
    routineSchedules: {},
    notifications: true,
    mode: 'team',
    birthDate: '2000-01-01',
    job: '직장인',
    category: '운동',
    pushStyle: 'soft',
    checkInTime: '22:00'
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user, feed, myClubs, myCheckIn, checkInCount, totalFocusTime, friends, chats, clubChats, userSettings, points, inventory, activeSavings, shieldCount, sentRequests, activeBet
    }));
  }, [user, feed, myClubs, myCheckIn, checkInCount, totalFocusTime, friends, chats, clubChats, userSettings, points, inventory, activeSavings, shieldCount, sentRequests, activeBet]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (id: string, pw: string) => {
    if (id === 'motimaker' && pw === 'motimaker') {
      setUser({ id: 'm1', nickname: '마스터 썬', role: 'MOTIMAKER', completedRoutines: 12 });
      return true;
    } else if (id === 'general' && pw === 'general') {
      setUser({ id: 'u1', nickname: '루틴이', role: 'PARTICIPANT', completedRoutines: 4 });
      return true;
    }
    return false;
  };

  const signup = (nickname: string, id: string, pw: string) => {
    setUser({ id, nickname, role: 'PARTICIPANT', completedRoutines: 0 });
    setIsNewUser(true);
  };

  const completeOnboarding = (settings: Partial<UserSettings>, profileImg?: string) => {
    setUserSettings(prev => ({ ...prev, ...settings }));
    if (profileImg && user) {
        setUser({ ...user, profileImg });
    }
    setIsNewUser(false);
  };

  const logout = () => { setUser(null); };

  const joinClub = (club: Club) => {
    if (myClubs.find(c => c.id === club.id)) return;
    const nc: JoinedClub = { id: club.id, title: club.title, mission: club.category, lastMessage: '', lastTime: '방금', unreadCount: 0, icon: club.icon || '🔥', memberCount: club.memberCount, currentWeek: 1, teamProgress: 0 };
    setMyClubs([nc, ...myClubs]);
    
    // 새 루틴 가입 시 기본 스케줄 자동 생성
    setUserSettings(prev => {
        const newRoutineSchedules = { ...prev.routineSchedules };
        newRoutineSchedules[club.id] = { ...DEFAULT_DAYS };
        return { ...prev, routineSchedules: newRoutineSchedules };
    });
  };

  const openCheckInModal = (clubId: string) => {
    setCurrentClubId(clubId);
    setIsCheckInModalOpen(true);
  };

  const sendClubMessage = (clubId: string, text: string, type: 'text' | 'checkin' = 'text', checkInData?: { id: string, image: string }) => {
      if (!user) return;
      const now = new Date();
      const timestamp = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      
      const newMessage: Message = {
          id: `club-msg-${Date.now()}`, 
          senderId: user.id, 
          text, 
          timestamp,
          type, 
          checkInId: checkInData?.id, 
          checkInImage: checkInData?.image
      };

      setClubChats(prev => ({ ...prev, [clubId]: [...(prev[clubId] || []), newMessage] }));
      setMyClubs(prev => prev.map(c => c.id === clubId ? { ...c, lastMessage: type === 'checkin' ? '📸 사진 인증 완료' : text, lastTime: '방금' } : c));
  };

  const sendMessage = (chatId: string, text: string) => {
    if (!user) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const newMessage: Message = { id: `msg-${Date.now()}`, senderId: user.id, text, timestamp };
    setChats(prev => prev.map(chat => chat.id === chatId ? {
      ...chat,
      messages: [...chat.messages, newMessage],
      lastMessage: text,
      lastTime: '방금'
    } : chat));
  };

  const sendFriendRequest = (userId: string) => {
    setSentRequests(prev => [...prev, userId]);
    showToast('친구 신청을 보냈습니다!');
  };

  const startChat = (userId: string, name: string, img?: string) => {
    const existingChat = chats.find(c => c.partnerId === userId);
    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat: ChatRoom = {
        id: `chat-${Date.now()}`,
        partnerId: userId,
        partnerName: name,
        partnerImg: img,
        messages: [],
        lastMessage: '',
        lastTime: '',
        unreadCount: 0
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    }
    setIsChatOpen(true);
  };

  const addPost = (data: { text: string; image: string | null }, clubId?: string) => {
    if (!user) return;
    const target = clubId || currentClubId || 'c4';
    const postText = data.text || '오늘의 루틴을 완료했습니다! 🔥';
    
    const newPost: FeedItem = { 
        id: `post-${Date.now()}`, 
        clubId: target, 
        userId: user.id, 
        nickname: user.nickname, 
        role: user.role, 
        image: data.image || 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8', 
        text: postText, 
        timestamp: '방금 전', 
        reactions: 0, 
        comments: [], 
        isLiked: false 
    };

    setFeed(prev => [newPost, ...prev]);
    setMyCheckIn(prev => ({ ...prev, [target]: true }));
    setCheckInCount(c => c + 1);
    
    sendClubMessage(target, postText, 'checkin', { id: newPost.id, image: newPost.image || '' });

    setIsCheckInModalOpen(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    
    setActiveTab('feed');
    setActiveClubId(target);
  };

  const handleReaction = (id: string) => {
    setFeed(prev => prev.map(item => 
      item.id === id 
        ? { ...item, reactions: item.isLiked ? item.reactions - 1 : item.reactions + 1, isLiked: !item.isLiked }
        : item
    ));
  };

  const startSavings = (amount: number) => {
    if (points >= amount) {
      setPoints(p => p - amount);
      setActiveSavings({ amount, goal: Math.floor(amount * 1.1), date: new Date().toLocaleDateString() });
      showToast('루틴 펀딩 예치가 완료되었습니다! 💰');
      return true;
    }
    return false;
  };

  const placeBet = (amount: number) => {
    if (points >= amount) {
      setPoints(p => p - amount);
      setActiveBet({ amount, potential: Math.floor(amount * 1.5) });
      return true;
    }
    return false;
  };

  const purchaseItem = (id: string, price: number) => {
    if (points >= price) {
      setPoints(p => p - price);
      setInventory([...inventory, id]);
      if (id === 'shield') setShieldCount(s => s + 1);
      return true;
    }
    return false;
  };

  const useShield = () => {
    if (shieldCount > 0) {
      setShieldCount(prev => prev - 1);
      setShowResuscitation(false);
      showToast('방어권을 사용해 루틴을 복구했습니다! 🛡️', 'success');
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, login, signup, logout, updateProfileImage: () => {}, activeTab, setActiveTab, 
      feed, myClubs, joinClub, myCheckIn, checkInCount, totalFocusTime, addFocusTime: (s) => setTotalFocusTime(t => t + s),
      userSettings, addPost, handleReaction, addComment: (fid, t) => {}, updateSettings: (s) => setUserSettings(p => ({...p, ...s})),
      showCelebration, setShowCelebration, isCheckInModalOpen, setIsCheckInModalOpen, isClubSelectorOpen, setIsClubSelectorOpen,
      isDevicePreviewOpen, setIsDevicePreviewOpen, currentClubId, openCheckInModal,
      shieldCount, useShield, showResuscitation, setShowResuscitation,
      friends, sentRequests, sendFriendRequest, startChat, chats, sendMessage, isChatOpen, setIsChatOpen, clubChats, sendClubMessage, activeClubId, setActiveClubId,
      activeChatId, setActiveChatId,
      points, inventory, activeSavings, activeBet, placeBet, purchaseItem, startSavings, toast, showToast, newLevel, closeLevelUpModal: () => setNewLevel(null), isNewUser, completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const c = useContext(AppContext);
  if (!c) throw new Error('useApp error');
  return c;
};
