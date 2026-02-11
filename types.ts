
export type UserRole = 'PARTICIPANT' | 'MOTIMAKER' | 'OFFICIAL';

export type RoutineType = 'WEEKDAY_WARRIOR' | 'MORNING_PIONEER' | 'NIGHT_OWL' | 'WEEKEND_SPRINTER' | 'ROUTINE_MASTER';

export interface User {
  id: string;
  nickname: string;
  role: UserRole;
  profileImg?: string;
  bio?: string;
  completedRoutines: number;
}

export interface DayConfig {
  active: boolean;
  time: string;
}

export interface UserSettings {
  checkInDays: string[];
  schedule: Record<string, DayConfig>; // 전역 설정 (하위 호환 유지)
  routineSchedules: Record<string, Record<string, DayConfig>>; // 루틴(클럽)별 개별 설정
  notifications: boolean;
  mode: 'solo' | 'team';
  birthDate: string;
  job: string;
  category: string;
  pushStyle: 'soft' | 'hard';
  checkInTime: string;
}

export interface Comment {
  id: string;
  userId: string;
  nickname: string;
  text: string;
}

export interface FeedItem {
  id: string;
  clubId: string;
  userId: string;
  nickname: string;
  role: UserRole;
  image?: string;
  text: string;
  timestamp: string;
  reactions: number;
  comments: Comment[];
  isLiked: boolean;
  isColumn?: boolean;
  category?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'checkin' | 'notice';
  checkInId?: string;
  checkInImage?: string;
}

export interface ChatRoom {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerImg?: string;
  messages: Message[];
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

export interface Club {
  id: string;
  title: string;
  makerName: string;
  makerBio?: string;
  makerCareer?: string[];
  makerStats?: { totalCheckins: number; topPercent: number };
  description: string;
  price: number;
  memberCount: number;
  category: string;
  icon?: string;
  curriculum: { week: number; title: string; content: string }[];
  reviews?: { user: string; text: string; rating: number; img?: string }[];
  startDate?: string;
  minMembers?: number;
  durationWeeks?: number;
}

export interface JoinedClub {
  id: string;
  title: string;
  mission: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  icon: string;
  memberCount: number;
  schedule?: Record<string, string>;
  startDate?: string;
  minMembers?: number;
  durationWeeks?: number;
  currentWeek?: number;
  teamProgress?: number; // 0-100
  status?: 'recruiting' | 'active' | 'completed';
}

export interface CohortInfo {
  title: string;
  dday: number;
  totalDays: number;
  groupName: string;
}

export interface Bet {
  amount: number;
  potential: number;
}
