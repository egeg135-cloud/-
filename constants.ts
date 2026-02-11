
import { User, CohortInfo, FeedItem, Club, RoutineType, JoinedClub } from './types';

export const COLORS = {
  primary: '#FFD046',
  secondary: '#1A1A1A',
  background: '#FAFAFA',
  white: '#FFFFFF',
  gray: '#F0F0F0',
  textGray: '#888888',
  error: '#FF6B6B',
};

export const LEVEL_CONFIG = [
  { name: '씨앗', min: 0, color: '#A8D5BA', icon: '🌱', desc: '이제 막 갓생을 시작한 새싹' },
  { name: '새싹', min: 4, color: '#77DD77', icon: '🌿', desc: '작심삼일을 넘긴 꾸준함의 시작' },
  { name: '개화', min: 11, color: '#FFB7B2', icon: '🌸', desc: '습관이 꽃 피기 시작하는 단계' },
  { name: '네온', min: 26, routineMin: 2, color: '#00F3FF', icon: '⚡', desc: '강력한 루틴 에너지를 뿜어내는 상태' },
  { name: '마스터', min: 51, routineMin: 4, color: '#FFD046', icon: '👑', desc: '루틴이 삶 자체가 된 진정한 고수' },
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'c1',
    title: '근육파수꾼의 득근득근 헬스',
    makerName: '근육파수꾼',
    makerBio: '365일 헬스장에 상주하는 보디빌딩 전문가',
    makerCareer: ['생활스포츠지도사 2급', '바디프로필 5회 달성'],
    makerStats: { totalCheckins: 2450, topPercent: 0.1 },
    description: '오늘 태운 칼로리는 배신하지 않습니다. 하체 데이 환영!',
    price: 0,
    memberCount: 1560,
    category: '헬스',
    icon: '💪',
    curriculum: [{ week: 1, title: '기초: 자극 찾기', content: '정확한 타겟 근육 사용법' }]
  },
  {
    id: 'c2',
    title: '플로우메이커의 정통 필라테스',
    makerName: '플로우메이커',
    makerBio: '속근육부터 잡아주는 체형 교정 전문가',
    makerCareer: ['국제 필라테스 자격 보유', '물리치료사 면허'],
    makerStats: { totalCheckins: 1890, topPercent: 0.3 },
    description: '호흡 하나로 바뀌는 몸의 라인을 경험하세요.',
    price: 19900,
    memberCount: 840,
    category: '필라테스',
    icon: '🧘‍♀️',
    curriculum: []
  },
  {
    id: 'c3',
    title: '하루하루님의 완벽 식단+운동',
    makerName: '하루하루',
    makerBio: '지속 가능한 건강미를 추구하는 다이어트 코치',
    makerCareer: ['영양사 자격증', '-15kg 감량 성공 스토리'],
    makerStats: { totalCheckins: 3100, topPercent: 0.2 },
    description: '굶지 않고 건강하게, 클린 식단과 홈트의 완벽 조합.',
    price: 15000,
    memberCount: 2200,
    category: '식단',
    icon: '🥗',
    curriculum: []
  },
  {
    id: 'c4',
    title: '너만바래님의 우아한 바레 챌린지',
    makerName: '너만바래',
    makerBio: '발레와 피트니스를 결합한 바레 마스터',
    description: '가늘고 긴 근육, 곧은 자세를 만드는 4주간의 여정.',
    price: 25000,
    memberCount: 430,
    category: '바레',
    icon: '🩰',
    curriculum: []
  },
  {
    id: 'c5',
    title: '와드장인의 지옥 크로스핏',
    makerName: '와드장인',
    makerBio: '한계를 돌파하는 고강도 트레이너',
    description: '매일 새로운 운동 루틴과 함께 강인한 체력을 기르세요.',
    price: 0,
    memberCount: 1890,
    category: '크로스핏',
    icon: '🏋️‍♂️',
    curriculum: []
  },
  {
    id: 'c6',
    title: '러너스하이의 아침 러닝',
    makerName: '러너스하이',
    makerBio: '달리기로 하루를 여는 러닝 전도사',
    description: '혼자 뛰면 외롭지만 함께 뛰면 멀리 갑니다.',
    price: 9900,
    memberCount: 760,
    category: '러닝',
    icon: '🏃‍♂️',
    curriculum: []
  }
];

export const MOCK_MY_CLUBS: JoinedClub[] = [
  {
    id: 'c1',
    title: '근육파수꾼의 득근득근 헬스',
    mission: '오늘의 오운완 인증 📸',
    lastMessage: '근육파수꾼: 오늘 등 운동 다들 완료했나요?',
    lastTime: '방금',
    unreadCount: 2,
    icon: '💪',
    memberCount: 1560,
    teamProgress: 88,
    currentWeek: 3,
    status: 'active'
  }
];

export const MOCK_COMPLETED_CLUBS: JoinedClub[] = [
  {
    id: 'exp1',
    title: '21일 미라클 모닝 챌린지',
    mission: '새벽 6시 기상 인증 ☀️',
    lastMessage: '모두 완주를 축하합니다! 상위 1% 뱃지 지급 완료',
    lastTime: '1개월 전',
    unreadCount: 0,
    icon: '⏰',
    memberCount: 120,
    teamProgress: 100,
    currentWeek: 4,
    status: 'completed'
  },
  {
    id: 'exp2',
    title: '현업 개발자의 1일 1커밋',
    mission: '깃허브 잔디 인증 💻',
    lastMessage: '성실한 4주였습니다. 2기에서 만나요!',
    lastTime: '2개월 전',
    unreadCount: 0,
    icon: '💻',
    memberCount: 45,
    teamProgress: 100,
    currentWeek: 4,
    status: 'completed'
  }
];

export const INITIAL_FEED: FeedItem[] = [
  {
    id: '1',
    clubId: 'c1',
    userId: 'm1',
    nickname: '근육파수꾼',
    role: 'MOTIMAKER',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    text: '오늘 하체 데이 인증률 100% 가봅시다! 🔥',
    timestamp: '방금 전',
    reactions: 24,
    comments: [],
    isLiked: false,
  }
];

export const MOCK_MARKETPLACE_MAKERS: Club[] = [
  {
    id: 'm-1',
    title: '새벽 기상 & 요가',
    makerName: '요가마스터',
    description: '매일 새벽 5시, 몸과 마음을 깨우는 요가 루틴.',
    price: 19900,
    memberCount: 45,
    category: '운동',
    icon: '🧘‍♀️',
    curriculum: [],
    makerBio: '10년차 요가 강사'
  },
  {
    id: 'm-2',
    title: '독학으로 끝내는 알고리즘',
    makerName: '코드나이트',
    description: '매일 1문제, 코딩 테스트 정복 루틴.',
    price: 15000,
    memberCount: 82,
    category: '자기계발',
    icon: '💻',
    curriculum: []
  }
];

export const ROUTINE_TYPE_CONFIG: Record<RoutineType, any> = {
  WEEKDAY_WARRIOR: {
    label: '평일 전사',
    icon: '⚔️',
    color: 'from-blue-500 to-cyan-400',
    description: '평일에 모든 에너지를 쏟아붓는 타입입니다.',
    rarity: 15,
    tags: ['성실함', '평일 집중'],
    mateType: 'WEEKEND_SPRINTER',
    mateLabel: '환상의 짝꿍: 주말 스프린터',
    mateDesc: '서로의 부족한 시간을 채워줄 수 있어요.'
  },
  MORNING_PIONEER: {
    label: '아침 개척자',
    icon: '🌅',
    color: 'from-orange-400 to-yellow-300',
    description: '남들보다 일찍 하루를 시작하는 얼리버드입니다.',
    rarity: 8,
    tags: ['미라클 모닝', '새벽 공기'],
    mateType: 'NIGHT_OWL',
    mateLabel: '환상의 짝꿍: 밤 올빼미',
    mateDesc: '24시간 루틴 체인을 완성해보세요.'
  },
  NIGHT_OWL: {
    label: '밤 올빼미',
    icon: '🦉',
    color: 'from-indigo-600 to-purple-500',
    description: '모두가 잠든 밤에 최고의 효율을 내는 타입입니다.',
    rarity: 12,
    tags: ['심야 집중', '올빼미'],
    mateType: 'MORNING_PIONEER',
    mateLabel: '환상의 짝꿍: 아침 개척자',
    mateDesc: '상반된 매력이 시너지를 냅니다.'
  },
  WEEKEND_SPRINTER: {
    label: '주말 스프린터',
    icon: '🏃‍♂️',
    color: 'from-emerald-500 to-teal-400',
    description: '주말에 몰입하여 한 주의 성과를 만드는 타입입니다.',
    rarity: 20,
    tags: ['주말 몰입', '성과 중심'],
    mateType: 'WEEKDAY_WARRIOR',
    mateLabel: '환상의 짝꿍: 평일 전사',
    mateDesc: '일주일 내중 루틴이 끊기지 않게 도와줘요.'
  },
  ROUTINE_MASTER: {
    label: '루틴 마스터',
    icon: '👑',
    color: 'from-yellow-500 to-orange-500',
    description: '요일에 관계없이 완벽한 루틴을 유지하는 고수입니다.',
    rarity: 3,
    tags: ['완벽주의', '자기통제'],
    mateType: 'ROUTINE_MASTER',
    mateLabel: '환상의 짝꿍: 루틴 마스터',
    mateDesc: '고수끼리는 통하는 법이죠.'
  }
};
